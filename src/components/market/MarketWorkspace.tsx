import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  Play,
  Pause,
  StepForward,
  RotateCcw,
  Download,
  Upload,
  Focus,
  ArrowRight,
  MousePointer2,
  SquareDashed,
} from "lucide-react";
import { useTranslation } from "../../i18n/TranslationProvider";
import { useMarketSession } from "./useMarketSession";
import {
  initialMarket,
  draftFor,
  matchMark,
  patterns,
  restoreMarket,
  validPlan,
  type Mark,
  type PatternKind,
  type Plan,
} from "../../utils/marketEngine";
import {
  readBars,
  testSummary,
  type LabBar,
  type TestTrade,
  type TestRule,
} from "../../utils/backtestEngine";
import { downloadLabFile } from "../labs/LabDesk";
const Chart = lazy(() => import("./MarketChart"));
const Equity = lazy(() =>
  import("./MarketChart").then((m) => ({ default: m.EquityChart })),
);
const modes = {
  chartlab: [
    "Recognize",
    "Chart Laboratory",
    "Find the structure. Mark your evidence.",
  ],
  simulator: [
    "Decide",
    "Trade Simulator",
    "Place the plan. Experience the next candle.",
  ],
  backtest: [
    "Investigate",
    "Backtest Lab",
    "Follow every result back to its candle.",
  ],
  delivery: [
    "Prepare",
    "ICT Delivery Suite",
    "See how time and risk change your plan.",
  ],
} as const;
export type MarketMode = keyof typeof modes;
type Research = {
  appliedRule: TestRule;
  training: TestTrade[];
  heldout: TestTrade[];
  split: number;
  sensitivity: { reward: number; net: number; trades: number }[];
  envelope: { low: number; high: number }[];
};
const fmtR = (n: number) =>
  Number.isFinite(n) ? String(Number(n.toFixed(2))) : "—";
const fmt = (n: number) =>
  Number.isFinite(n) ? String(Number(n.toFixed(5))) : "—";
function groupBars(bars: LabBar[], factor: number) {
  return Array.from({ length: Math.ceil(bars.length / factor) }, (_, i) => {
    const part = bars.slice(i * factor, i * factor + factor);
    return {
      time: part[0].time,
      open: part[0].open,
      high: Math.max(...part.map((x) => x.high)),
      low: Math.min(...part.map((x) => x.low)),
      close: part[part.length - 1].close,
    };
  });
}
export function MarketWorkspace({
  mode,
  context,
  scenarioBars,
}: {
  mode: MarketMode;
  context?: string;
  scenarioBars?: LabBar[];
}) {
  const { t, href, message } = useTranslation(),
    { state: s, dispatch, ready, storageError, flush } = useMarketSession();
  const [playing, setPlaying] = useState(false),
    [speed, setSpeed] = useState(700),
    [focus, setFocus] = useState<number | null>(null),
    [kind, setKind] = useState<PatternKind>("FVG"),
    [drawing, setDrawing] = useState(false),
    [anchor, setAnchor] = useState<{ index: number; price: number } | null>(
      null,
    ),
    [review, setReview] = useState(false),
    [fog, setFog] = useState(0),
    [status, setStatus] = useState("");
  const [layers, setLayers] = useState<PatternKind[]>(["FVG"]),
    [factor, setFactor] = useState(1),
    [elapsed, setElapsed] = useState(0),
    [stress, setStress] = useState(3),
    [clock, setClock] = useState<Date | null>(null),
    [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const plan = s.draft;
  const setPlan = (value: Plan | ((previous: Plan) => Plan)) =>
    dispatch({
      type: "draft",
      plan: typeof value === "function" ? value(s.draft) : value,
    });
  const [confirm, setConfirm] = useState(false),
    [rule, setRule] = useState<TestRule>({
      reward: 2,
      hold: 12,
      cost: 0.05,
      side: "both",
    }),
    [research, setResearch] = useState<Research | null>(null),
    [researchError, setResearchError] = useState(false),
    [busy, setBusy] = useState(false),
    [sample, setSample] = useState<"training" | "heldout">("heldout"),
    [inspection, setInspection] = useState<number | null>(null);
  const [fitRevision, setFitRevision] = useState(0);
  const chartStage = useRef<HTMLDivElement>(null);
  const showChart = () =>
    chartStage.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
  const worker = useRef<Worker | null>(null),
    request = useRef(0),
    file = useRef<HTMLInputElement>(null),
    sessionFile = useRef<HTMLInputElement>(null);
  const visible = useMemo(() => s.bars.slice(0, s.cursor), [s.bars, s.cursor]);
  const truth = useMemo(() => patterns(visible), [visible]);
  const trades = research?.[sample] || [],
    summary = useMemo(() => testSummary(trades), [trades]),
    sampleOffset = sample === "heldout" ? research?.split || 0 : 0,
    inspected = inspection === null ? null : trades[inspection];
  useEffect(() => {
    if (
      !playing ||
      !ready ||
      s.cursor >= s.bars.length ||
      (mode === "simulator" &&
        (!s.order || !["open", "pending"].includes(s.order.status)))
    ) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => dispatch({ type: "step" }), speed);
    return () => clearTimeout(timer);
  }, [playing, ready, s.cursor, s.bars.length, s.order, mode, speed, dispatch]);
  useEffect(() => {
    if (mode !== "chartlab") return;
    const timer = setInterval(() => setElapsed((x) => x + 1), 1000);
    return () => clearInterval(timer);
  }, [mode]);
  useEffect(() => {
    if (mode !== "delivery") return;
    setClock(new Date());
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, [mode]);
  useEffect(() => () => worker.current?.terminate(), []);
  useEffect(() => {
    setResearch(null);
    setInspection(null);
    setBusy(false);
    worker.current?.terminate();
  }, [s.bars]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("input,textarea,select,button,a") ||
        e.altKey ||
        e.metaKey ||
        e.ctrlKey
      )
        return;
      if (e.code === "Space") {
        e.preventDefault();
        if (mode !== "simulator" || s.order) dispatch({ type: "step" });
      }
      if (e.key === "Escape") {
        setDrawing(false);
        setAnchor(null);
        setPlaying(false);
      }
      if (mode === "chartlab" && ["1", "2", "3", "4"].includes(e.key)) {
        setKind(
          (["FVG", "OB", "BOS", "Sweep"] as PatternKind[])[Number(e.key) - 1],
        );
        setDrawing(true);
        setFactor(1);
        setAnchor(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, s.order, dispatch]);
  const changePlan = (key: keyof Plan, value: number | string) => {
    setConfirm(false);
    setPlan((p) => ({ ...p, [key]: value }));
  };
  const reset = () => {
    setPlaying(false);
    dispatch({ type: "reset" });
    setConfirm(false);
    setFocus(null);
    setReview(false);
    setStatus("Replay reset. Previously seen candles remain recorded.");
  };
  const loadBars = (bars: LabBar[], source: string) => {
    setPlaying(false);
    dispatch({
      type: "load",
      state: {
        ...initialMarket(),
        bars,
        draft: draftFor(
          bars,
          Math.min(36, Math.max(3, Math.floor(bars.length * 0.2))),
        ),
        source,
        cursor: Math.min(36, Math.max(3, Math.floor(bars.length * 0.2))),
        seen: Math.min(36, Math.max(3, Math.floor(bars.length * 0.2))),
      },
    });
    setFocus(null);
    setReview(false);
    setAnchor(null);
    setDrawing(false);
    setFog(0);
    setFactor(1);
    setStatus("Dataset loaded. Previous annotations and plans were cleared.");
  };
  const importCsv = async (f: File) => {
    try {
      if (f.size > 5_000_000) throw new Error("Use a CSV smaller than 5 MB.");
      const bars = readBars(await f.text());
      loadBars(bars, "Imported local CSV");
      const gaps = bars
        .slice(2)
        .some(
          (b, i) =>
            Date.parse(b.time) - Date.parse(bars[i + 1].time) !==
            Date.parse(bars[1].time) - Date.parse(bars[0].time),
        );
      if (gaps)
        setStatus(
          "CSV loaded with irregular intervals. Market closures can create gaps; inspect the timestamps.",
        );
    } catch (e) {
      setStatus((e as Error).message);
    }
  };
  const onPoint = (index: number, price: number) => {
    const absolute =
      index * factor + Math.max(0, fog ? visible.length - fog : 0);
    dispatch({ type: "select", index: absolute });
    if (!drawing) return;
    if ((kind === "FVG" || kind === "OB") && !anchor) {
      setAnchor({ index: absolute, price });
      setStatus("Select the opposite corner of your zone.");
      return;
    }
    const b = s.bars[absolute],
      low = anchor ? Math.min(anchor.price, price) : b.low,
      high = anchor ? Math.max(anchor.price, price) : b.high;
    dispatch({
      type: "mark",
      mark: {
        id: crypto.randomUUID(),
        kind,
        index: Math.max(anchor?.index ?? absolute, absolute),
        low,
        high,
        start: Math.min(anchor?.index ?? absolute, absolute),
        end: Math.max(anchor?.index ?? absolute, absolute),
        user: true,
      },
    });
    setAnchor(null);
    setDrawing(false);
    setReview(false);
    setStatus("Annotation added. Compare it with the stated reference rules.");
  };
  const shown = useMemo(
    () => groupBars(fog ? visible.slice(-fog) : visible, factor),
    [visible, factor, fog],
  );
  const marks = useMemo(() => {
    const start = Math.max(0, fog ? visible.length - fog : 0);
    return [
      ...s.marks.filter((m) => m.index < s.cursor),
      ...(mode === "chartlab" && !review
        ? []
        : truth.filter((m) => layers.includes(m.kind)).slice(-24)),
    ]
      .filter((m) => m.index >= start)
      .map((m) => ({
        ...m,
        index: Math.floor((m.index - start) / factor),
        start:
          m.start === undefined
            ? undefined
            : Math.max(0, Math.floor((m.start - start) / factor)),
        end:
          m.end === undefined
            ? undefined
            : Math.floor((m.end - start) / factor),
      }));
  }, [
    s.marks,
    s.cursor,
    truth,
    layers,
    mode,
    review,
    factor,
    fog,
    visible.length,
  ]);
  const active = s.order?.plan || plan;
  const levels = useMemo(
    () =>
      mode === "chartlab" || (mode === "backtest" && !inspected)
        ? []
        : inspected && mode === "backtest"
          ? [
              { label: "Entry", price: inspected.entry, color: "#2563eb" },
              { label: "Stop", price: inspected.stop, color: "#cf4b59" },
              { label: "Target", price: inspected.target, color: "#178667" },
            ]
          : [
              { label: "Entry", price: active.entry, color: "#2563eb" },
              { label: "Stop", price: active.stop, color: "#cf4b59" },
              { label: "Target", price: active.target, color: "#178667" },
            ],
    [mode, inspected, active],
  );
  const chartLevels=useMemo(()=>levels.filter(l=>Number.isFinite(l.price)&&l.price>0),[levels]);
  const riskDistance = Math.abs(active.entry - active.stop),
    size =
      riskDistance > 0
        ? Math.floor(
            (active.account * active.risk) /
              100 /
              ((s.order?.riskDistance ?? riskDistance) * active.value),
          )
        : 0;
  const current = s.bars[s.cursor - 1],
    pnl =
      s.order?.fill !== undefined
        ? ((current.close - s.order.fill) * (active.side === "long" ? 1 : -1)) /
            s.order.riskDistance -
          active.cost
        : 0;
  let equity = 0,
    peak = 0,
    worst = 0,
    drawdownTrade = 0;
  trades.forEach((tr, i) => {
    if (tr.result === null) return;
    equity += tr.result;
    peak = Math.max(peak, equity);
    if (peak - equity > worst) {
      worst = peak - equity;
      drawdownTrade = i;
    }
  });
  const selectTrade = (index: number) => {
    const tr = trades[index];
    if (!tr) return;
    setInspection(index);
    const candle = tr.exitBar + sampleOffset;
    dispatch({ type: "seek", cursor: candle + 1 });
    dispatch({ type: "select", index: tr.entryBar + sampleOffset });
    setFocus(tr.entryBar + sampleOffset);
    showChart();
  };
  const run = () => {
    if (s.order) {
      setStatus("Reset the current plan before running research.");
      return;
    }
    worker.current?.terminate();
    setBusy(true);
    setResearchError(false);
    setInspection(null);
    const id = ++request.current;
    try {
      const w = new Worker(
        new URL("../../workers/marketResearch.worker.ts", import.meta.url),
        { type: "module" },
      );
      worker.current = w;
      w.onmessage = (e) => {
        if (e.data.id !== request.current) return;
        setResearch({ ...e.data, appliedRule: { ...rule } });
        setBusy(false);
        dispatch({ type: "seek", cursor: s.bars.length });
        setFocus(null);
      };
      w.onerror = () => {
        setBusy(false);
        setResearchError(true);
        w.terminate();
      };
      w.postMessage({ id, bars: s.bars, rule });
    } catch {
      setBusy(false);
      setResearchError(true);
    }
  };
  const journal = () => {
    const o = s.order;
    if (!o || o.r === null || o.r === undefined) return;
    try {
      const date = new Date(s.bars[o.exitAt ?? s.cursor - 1].time);
      localStorage.setItem(
        "learnsmc_journal_draft_v1",
        JSON.stringify({
          asset: s.source + " · SIMULATED",
          direction: o.plan.side === "long" ? "LONG" : "SHORT",
          model: "Shared-engine practice",
          date: date.toISOString().slice(0, 10),
          time: date.toISOString().slice(11, 16),
          timezone: "UTC",
          timeframe: "Local candle sequence",
          result: o.r > 0 ? "WIN" : o.r < 0 ? "LOSS" : "BE",
          r: String(o.r),
          pnl: "",
          notes:
            "SIMULATED, not a live trade. Stress " +
            stress +
            "/5. Decisions: " +
            o.decisions.join(", ") +
            ". " +
            s.notes,
          bias: "",
          liquidity: "",
          entry: String(o.fill ?? o.plan.entry),
          stop: String(o.plan.stop),
          target: String(o.plan.target),
          checks: [],
        }),
      );
      setStatus(
        "Simulation draft sent to the journal. Review it before saving.",
      );
    } catch {
      setStatus("Device storage is unavailable. Export the session instead.");
    }
  };
  const replayEt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(current.time));
  const checklistItems = [
    "Mark the observed range",
    "Define an invalidation",
    "Check the risk budget",
    "Review the session context",
  ];
  return (
    <section className="market-workspace" aria-label={t(modes[mode][1])}>
      <nav className="market-views" aria-label={t("Shared chart workspace")}>
        {(Object.keys(modes) as MarketMode[]).map((m) => (
          <a
            key={m}
            aria-current={m === mode ? "page" : undefined}
            href={href(
              "/tools/" + (m === "delivery" ? "delivery-suite" : m) + "/",
            )}
            onClick={flush}
          >
            <span>{t(modes[m][0])}</span>
            <small>{t(modes[m][1])}</small>
          </a>
        ))}
      </nav>
      <header className="market-heading">
        <div>
          <p className="market-kicker">{t("One chart. Four ways to learn.")}</p>
          <h2>{t(modes[mode][2])}</h2>
          <p>
            {t(
              "Synthetic or local CSV candles. No live prices or trading signals.",
            )}
          </p>
          {s.source === "Authored teaching scenario" && (
            <p>
              {t(
                "Authored times use an illustrative UTC date, not a historical market record.",
              )}
            </p>
          )}
          {context && (
            <p className="market-context">
              {t(context)} ·{" "}
              {t(
                "General execution practice; not a full named-model implementation.",
              )}
            </p>
          )}
        </div>
        <div className="market-file-actions">
          <button disabled={!!s.order} onClick={() => file.current?.click()}>
            <Upload size={16} />
            {t("Load CSV")}
          </button>
          <button
            onClick={() => {
              flush();
              downloadLabFile("learnsmc-chart-session.json", s);
            }}
          >
            <Download size={16} />
            {t("Export session")}
          </button>
          <button
            disabled={!!s.order}
            onClick={() => sessionFile.current?.click()}
          >
            {t("Import session")}
          </button>
          {scenarioBars && (
            <button
              disabled={!!s.order}
              onClick={() =>
                loadBars(scenarioBars, "Authored teaching scenario")
              }
            >
              {t("Load this page’s scenario")}
            </button>
          )}
        </div>
      </header>
      <input
        ref={file}
        hidden
        type="file"
        accept=".csv,text/csv"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void importCsv(f);
          e.currentTarget.value = "";
        }}
      />
      <input
        ref={sessionFile}
        hidden
        type="file"
        accept=".json,application/json"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          try {
            if (f.size > 8_000_000)
              throw new Error("Session file is too large.");
            setPlaying(false);
            dispatch({ type: "load", state: restoreMarket(await f.text()) });
            setStatus("Chart restored. Imported orders are reset.");
          } catch {
            setStatus("Invalid session file. Your current chart was kept.");
          }
          e.target.value = "";
        }}
      />
      <div className="market-data-strip">
        <span>{t(s.source)}</span>
        <span>{message("{count} candles", { count: s.bars.length })}</span>
        <span>{message("Revealed: {count}", { count: s.cursor })}</span>
        {(s.seen > s.cursor || s.seen === s.bars.length) && (
          <span>{t("Previously seen data")}</span>
        )}
        <button
          onClick={() => {
            if (!s.order)
              loadBars(initialMarket().bars, "Synthetic teaching data");
          }}
          disabled={!!s.order}
        >
          {t("Use demo data")}
        </button>
      </div>
      {storageError && (
        <p role="status">
          {t("Device storage is unavailable. Export the session instead.")}
        </p>
      )}
      <div className="market-terminal">
        <div className="market-stage" ref={chartStage}>
          <div className="market-chart-tools">
            <div role="group" aria-label={t("Chart actions")}>
              <button
                onClick={() => {
                  setDrawing(false);
                  setAnchor(null);
                }}
                aria-pressed={!drawing}
              >
                <MousePointer2 size={16} />
                {t("Inspect")}
              </button>
              {mode === "chartlab" && (
                <button
                  aria-pressed={drawing}
                  onClick={() => {
                    setFactor(1);
                    setDrawing((v) => !v);
                    setAnchor(null);
                  }}
                >
                  <SquareDashed size={16} />
                  {t("Mark zone")}
                </button>
              )}
              <button
                onClick={() => {
                  setFocus(null);
                  setFitRevision((v) => v + 1);
                }}
              >
                <Focus size={16} />
                {t("Fit chart")}
              </button>
            </div>
            <div role="group" aria-label={t("Candle grouping")}>
              {[1, 3, 12].map((f) => (
                <button
                  key={f}
                  aria-pressed={factor === f}
                  disabled={drawing}
                  onClick={() => {
                    setFactor(f);
                    setFocus(null);
                  }}
                >
                  {f}×
                </button>
              ))}
            </div>
          </div>
          {drawing && (
            <p className="market-prompt">
              {t(
                anchor
                  ? "Select the opposite corner of your zone."
                  : "Choose a candle. For FVG and OB, select two zone corners.",
              )}
            </p>
          )}
          <Suspense
            fallback={
              <div className="market-chart-loading">{t("Opening chart…")}</div>
            }
          >
            <Chart
              bars={shown}
              fitRevision={fitRevision}
              events={(inspected && mode === "backtest"
                ? [
                    {
                      index: inspected.signal + sampleOffset,
                      label: "Signal",
                      color: "#8758c9",
                    },
                    {
                      index: inspected.entryBar + sampleOffset,
                      label: "Entry",
                      color: "#2563eb",
                    },
                    {
                      index: inspected.exitBar + sampleOffset,
                      label: "Exit",
                      color: "#a96710",
                    },
                  ]
                : s.order
                  ? [
                      ...(s.order.filledAt === undefined
                        ? []
                        : [
                            {
                              index: s.order.filledAt,
                              label: "Entry",
                              color: "#2563eb",
                            },
                          ]),
                      ...(s.order.exitAt === undefined
                        ? []
                        : [
                            {
                              index: s.order.exitAt,
                              label:
                                s.order.fill === undefined ? "No fill" : "Exit",
                              color: "#a96710",
                            },
                          ]),
                    ]
                  : []
              )
                .filter(
                  (e) =>
                    e.index < s.cursor &&
                    e.index >= Math.max(0, fog ? visible.length - fog : 0),
                )
                .map((e) => ({
                  ...e,
                  index: Math.floor(
                    (e.index - Math.max(0, fog ? visible.length - fog : 0)) /
                      factor,
                  ),
                }))}
              marks={marks}
              levels={chartLevels}
              selected={
                s.selected === null
                  ? null
                  : Math.floor(
                      (s.selected -
                        Math.max(0, fog ? visible.length - fog : 0)) /
                        factor,
                    )
              }
              focus={
                focus === null
                  ? null
                  : Math.floor(
                      (focus - Math.max(0, fog ? visible.length - fog : 0)) /
                        factor,
                    )
              }
              drawing={drawing}
              adjustable={!s.order && mode !== "backtest"}
              onPoint={onPoint}
              onFocus={(i) => {
                const absolute =
                  i * factor + Math.max(0, fog ? visible.length - fog : 0);
                setFocus(absolute);
                dispatch({ type: "select", index: absolute });
              }}
              onLevel={(label, price) => {
                if (s.order || mode === "backtest") return;
                changePlan(label.toLowerCase() as keyof Plan, price);
              }}
            />
          </Suspense>
          <div className="market-replay">
            <button
              onClick={() => setPlaying((v) => !v)}
              disabled={
                !ready ||
                s.cursor >= s.bars.length ||
                (mode === "simulator" &&
                  (!s.order || !["pending", "open"].includes(s.order.status)))
              }
              aria-label={t(playing ? "Pause replay" : "Play replay")}
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={() => dispatch({ type: "step" })}
              disabled={
                s.cursor >= s.bars.length || (mode === "simulator" && !s.order)
              }
              aria-label={t("Next candle")}
            >
              <StepForward size={18} />
            </button>
            <input
              aria-label={t("Replay position")}
              type="range"
              min={3}
              max={s.bars.length}
              value={s.cursor}
              disabled={!!s.order}
              onChange={(e) => {
                setPlaying(false);
                dispatch({ type: "seek", cursor: +e.target.value });
              }}
            />
            <span>
              <bdi>
                {s.cursor} / {s.bars.length}
              </bdi>
            </span>
            <select
              aria-label={t("Replay speed")}
              value={speed}
              onChange={(e) => setSpeed(+e.target.value)}
            >
              <option value={1400}>0.5×</option>
              <option value={700}>1×</option>
              <option value={250}>3×</option>
            </select>
            <button onClick={reset} aria-label={t("Reset replay")}>
              <RotateCcw size={16} />
            </button>
          </div>
          <p className="market-footnote">
            {t(
              "Space: next candle · Escape: cancel · 1–4: pattern tool. Grouping combines only revealed candles; the latest group may be incomplete.",
            )}
          </p>
          <details className="market-exact">
            <summary>{t("Exact candle values and keyboard controls")}</summary>
            <label>
              {t("Inspect candle")}
              <input
                type="number"
                min={1}
                max={s.cursor}
                value={(s.selected ?? s.cursor - 1) + 1}
                onChange={(e) => {
                  const i = Math.max(
                    0,
                    Math.min(s.cursor - 1, +e.target.value - 1),
                  );
                  dispatch({ type: "select", index: i });
                  setFocus(i);
                }}
              />
            </label>
            <dl>
              {(["open", "high", "low", "close"] as const).map((k) => (
                <div key={k}>
                  <dt>{t(k)}</dt>
                  <dd>{fmt(s.bars[s.selected ?? s.cursor - 1]?.[k] ?? 0)}</dd>
                </div>
              ))}
            </dl>
            {mode === "chartlab" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget),
                    low = +String(f.get("low")),
                    high = +String(f.get("high"));
                  if (low <= 0 || high < low || !Number.isFinite(high)) {
                    setStatus("Enter positive boundaries with high above low.");
                    return;
                  }
                  dispatch({
                    type: "mark",
                    mark: {
                      id: crypto.randomUUID(),
                      kind,
                      index: s.selected ?? s.cursor - 1,
                      low,
                      high,
                      user: true,
                    },
                  });
                }}
              >
                <label>
                  {t("Low")}
                  <input name="low" type="number" step="any" required />
                </label>
                <label>
                  {t("High")}
                  <input name="high" type="number" step="any" required />
                </label>
                <button>{t("Add annotation")}</button>
              </form>
            )}
          </details>
        </div>
        <aside className="market-inspector">
          {mode === "chartlab" ? (
            <>
              <p className="market-kicker">{t("Observation desk")}</p>
              <h3>{t("Mark first. Compare second.")}</h3>
              <div className="market-patterns">
                {(["FVG", "OB", "BOS", "Sweep"] as PatternKind[]).map(
                  (k, i) => (
                    <button
                      key={k}
                      aria-pressed={kind === k}
                      onClick={() => {
                        setKind(k);
                        setDrawing(true);
                        setAnchor(null);
                        setFactor(1);
                      }}
                    >
                      <span className={"market-pattern-dot " + k} />
                      <b>{k}</b>
                      <small>{i + 1}</small>
                    </button>
                  ),
                )}
              </div>
              <label>
                {t("Fog: show recent candles")}
                <select
                  value={fog}
                  onChange={(e) => {
                    setFog(+e.target.value);
                    setFocus(null);
                  }}
                >
                  <option value={0}>{t("All revealed candles")}</option>
                  {[1, 5, 12].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <p className="market-footnote">
                {t("Fog hides older context, never reveals future prices.")}
              </p>
              <button
                className="market-primary"
                onClick={() => {
                  setReview(true);
                  setDrawing(false);
                  setFog(0);
                }}
              >
                {t("Reveal and compare")} <ArrowRight size={16} />
              </button>
              <p className="market-footnote">
                <bdi>
                  {Math.floor(elapsed / 60)}:
                  {String(elapsed % 60).padStart(2, "0")}
                </bdi>{" "}
                · {t("Practice time")}
              </p>
              {review && (
                <div className="market-scorecard">
                  {(["FVG", "OB", "BOS", "Sweep"] as PatternKind[]).map((k) => {
                    const own = s.marks.filter(
                        (m) => m.kind === k && m.index < s.cursor,
                      ),
                      remaining = truth.filter((m) => m.kind === k);
                    let correct = 0;
                    for (const mark of own) {
                      const hit = remaining.findIndex((reference) =>
                        matchMark(mark, [reference]),
                      );
                      if (hit >= 0) {
                        correct++;
                        remaining.splice(hit, 1);
                      }
                    }
                    const missed = remaining.length;
                    return (
                      <div key={k}>
                        <strong>{k}</strong>
                        <span>
                          {message(
                            "{correct} matched · {missed} missed · {falseMarks} unmatched",
                            {
                              correct,
                              missed,
                              falseMarks: own.length - correct,
                            },
                          )}
                        </span>
                      </div>
                    );
                  })}
                  <p>
                    {t(
                      "Geometry comparison only. OB and structure references use the simplified rules below, not proof of market intent.",
                    )}
                  </p>
                </div>
              )}
            </>
          ) : mode === "backtest" ? (
            <>
              <p className="market-kicker">{t("Visual rule builder")}</p>
              <h3>{t("Change a rule. Follow its trades.")}</h3>
              <ol className="market-rule-nodes">
                <li>
                  <b>1</b>
                  <span>
                    {t("Completed three-candle FVG")}
                    <select
                      aria-label={t("Trade direction")}
                      value={rule.side}
                      onChange={(e) =>
                        setRule((r) => ({
                          ...r,
                          side: e.target.value as TestRule["side"],
                        }))
                      }
                    >
                      <option value="both">{t("Both directions")}</option>
                      <option value="long">{t("Long")}</option>
                      <option value="short">{t("Short")}</option>
                    </select>
                  </span>
                </li>
                <li>
                  <b>2</b>
                  <span>{t("Next-open entry; stop beyond pattern")}</span>
                </li>
                <li>
                  <b>3</b>
                  <span>
                    <label>
                      {t("Target R")}
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.25}
                        value={rule.reward}
                        onChange={(e) =>
                          setRule((r) => ({ ...r, reward: +e.target.value }))
                        }
                      />
                      <bdi>{rule.reward}R</bdi>
                    </label>
                  </span>
                </li>
              </ol>
              <label>
                {t("Maximum holding candles")}
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={rule.hold}
                  onChange={(e) =>
                    setRule((r) => ({
                      ...r,
                      hold: Math.max(1, Math.min(100, +e.target.value || 1)),
                    }))
                  }
                />
              </label>
              <label>
                {t("Round-trip cost (R)")}
                <input
                  type="number"
                  min={0}
                  max={2}
                  step={0.01}
                  value={rule.cost}
                  onChange={(e) =>
                    setRule((r) => ({
                      ...r,
                      cost: Math.max(0, Math.min(2, +e.target.value || 0)),
                    }))
                  }
                />
              </label>
              <button
                className="market-primary"
                disabled={busy || !!s.order}
                onClick={run}
              >
                {t(busy ? "Running research…" : "Run 70 / 30 research split")}
              </button>
              <p>
                {t(
                  "One position at a time. Same-candle stop and target touches stay unresolved. Research reveals the dataset and marks it as previously seen.",
                )}
              </p>
              {researchError && (
                <p role="alert">
                  {t(
                    "Research worker unavailable. Reload or export your data.",
                  )}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="market-kicker">
                {t(
                  mode === "delivery" ? "Session preparation" : "Trade ticket",
                )}
              </p>
              <h3>
                {t(
                  s.order
                    ? "Locked plan"
                    : "Drag the lines to build your plan.",
                )}
              </h3>
              <div className="market-directions">
                {(["long", "short"] as const).map((side) => (
                  <button
                    key={side}
                    disabled={!!s.order}
                    aria-pressed={active.side === side}
                    onClick={() => {
                      const d = Math.abs(plan.entry - plan.stop) || 1;
                      setConfirm(false);
                      setPlan((p) => ({
                        ...p,
                        side,
                        stop: p.entry + (side === "long" ? -d : d),
                        target: p.entry + (side === "long" ? d * 2 : -d * 2),
                      }));
                    }}
                  >
                    {t(side === "long" ? "Long" : "Short")}
                  </button>
                ))}
              </div>
              {(["entry", "stop", "target"] as const).map((k) => (
                <label key={k}>
                  {t(
                    k === "entry" ? "Entry" : k === "stop" ? "Stop" : "Target",
                  )}
                  <input
                    type="number"
                    step="any"
                    min={0.000001}
                    disabled={!!s.order}
                    value={Number.isFinite(active[k]) ? active[k] : ""}
                    onChange={(e) =>
                      changePlan(
                        k,
                        e.target.value === "" ? NaN : +e.target.value,
                      )
                    }
                  />
                </label>
              ))}
              <dl className="market-ticket-metrics">
                <div>
                  <dt>{t("Reward / risk")}</dt>
                  <dd>
                    {(s.order?.riskDistance ?? riskDistance) > 0
                      ? fmt(
                          Math.abs(active.target - active.entry) /
                            (s.order?.riskDistance ?? riskDistance),
                        )
                      : "—"}
                    R
                  </dd>
                </div>
                <div>
                  <dt>{t("Current price")}</dt>
                  <dd>
                    <button onClick={() => setFocus(s.cursor - 1)}>
                      {fmt(current.close)}
                    </button>
                  </dd>
                </div>
              </dl>
              {mode === "simulator" && (
                <>
                  <label>
                    {t("Round-trip cost (R)")}
                    <input
                      disabled={!!s.order}
                      type="number"
                      min={0}
                      max={2}
                      step={0.01}
                      value={active.cost}
                      onChange={(e) => changePlan("cost", +e.target.value)}
                    />
                  </label>
                  {!s.order ? (
                    <>
                      {confirm ? (
                        <div className="market-confirm">
                          <p>
                            {t(
                              "Confirm this limit-order plan. Future candles stay hidden until you step or play.",
                            )}
                          </p>
                          <button
                            className="market-primary"
                            onClick={() => {
                              dispatch({ type: "lock", plan });
                              setConfirm(false);
                            }}
                          >
                            {t("Confirm and lock")}
                          </button>
                          <button onClick={() => setConfirm(false)}>
                            {t("Keep editing")}
                          </button>
                        </div>
                      ) : (
                        <button
                          className="market-primary"
                          disabled={
                            !validPlan(plan) || s.cursor >= s.bars.length
                          }
                          onClick={() => setConfirm(true)}
                        >
                          {t("Review and lock plan")}
                        </button>
                      )}
                      {s.cursor >= s.bars.length && (
                        <p>
                          {t(
                            "Replay finished. Reset before planning another attempt.",
                          )}
                        </p>
                      )}
                      {!validPlan(plan) && (
                        <p>
                          {t(
                            "Long: stop < entry < target. Short: target < entry < stop. Use positive finite prices.",
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <strong className="market-order-status">
                        {t(s.order.status)}
                      </strong>
                      <p>
                        {t(
                          s.order.fill === undefined
                            ? s.order.status === "end"
                              ? "Replay ended without a fill."
                              : "Limit order waiting for a touch."
                            : "Order filled; now follow price against the locked plan.",
                        )}
                      </p>
                      <button
                        className="market-pnl"
                        onClick={() => setFocus(s.cursor - 1)}
                      >
                        {t(
                          s.order.r === undefined
                            ? "Unrealized net R"
                            : "Resolved net R",
                        )}{" "}
                        <bdi>
                          {s.order.r === null ? "?" : fmtR(s.order.r ?? pnl)}R
                        </bdi>
                      </button>
                      {s.order.status === "open" && (
                        <div className="market-decision">
                          <h4>{t("What would you do now?")}</h4>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "decision",
                                decision: "breakeven",
                              })
                            }
                          >
                            {t("Move stop to entry")}
                          </button>
                          <button
                            onClick={() =>
                              dispatch({ type: "decision", decision: "hold" })
                            }
                          >
                            {t("Keep the plan")}
                          </button>
                          <p>
                            {t(
                              "Stop changes apply to subsequent candles. A stop can only improve while remaining beyond current price.",
                            )}
                          </p>
                        </div>
                      )}
                      {s.order.r !== undefined && (
                        <>
                          <label>
                            {t("Stress during this attempt")}
                            <input
                              type="range"
                              min={1}
                              max={5}
                              value={stress}
                              onChange={(e) => setStress(+e.target.value)}
                            />
                            <bdi>{stress} / 5</bdi>
                          </label>
                          <button
                            disabled={s.order.r === null}
                            onClick={journal}
                          >
                            {t("Send draft to journal")}
                          </button>
                          <a href={href("/tools/journal/")} onClick={flush}>
                            {t("Open journal")}
                          </a>
                          <button onClick={reset}>
                            {t("Start another attempt")}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              {mode === "delivery" && (
                <>
                  <div className="market-clock">
                    <span>{t("Replay time in New York")}</span>
                    <bdi>{replayEt} ET</bdi>
                    <small>
                      {t("Wall clock")}{" "}
                      {clock
                        ? new Intl.DateTimeFormat("en-US", {
                            timeZone: "America/New_York",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }).format(clock)
                        : "—"}
                    </small>
                  </div>
                  {(["account", "risk", "value"] as const).map((k) => (
                    <label key={k}>
                      {t(
                        k === "account"
                          ? "Account balance (USD)"
                          : k === "risk"
                            ? "Risk budget (%)"
                            : "USD per price unit per contract",
                      )}
                      <input
                        type="number"
                        min={0.00001}
                        step="any"
                        value={active[k]}
                        disabled={!!s.order}
                        onChange={(e) => changePlan(k, +e.target.value)}
                      />
                    </label>
                  ))}
                  <div className="market-sizing">
                    <strong>
                      <bdi>{validPlan(active) ? size : "—"}</bdi>{" "}
                      {t("Whole contracts")}
                    </strong>
                    <progress
                      max={Math.max(1, (active.account * active.risk) / 100)}
                      value={
                        Number.isFinite(size * riskDistance * active.value)
                          ? size * riskDistance * active.value
                          : 0
                      }
                    />
                    <p>
                      {t("Risk before costs")}{" "}
                      <bdi>${fmt(size * riskDistance * active.value)}</bdi>
                    </p>
                  </div>
                  <p>
                    {t(
                      "Sizing uses your multiplier and whole contracts. Verify instrument specifications; costs, margin and gaps are not included.",
                    )}
                  </p>
                  <button
                    onClick={() => {
                      if (!validPlan(active)) return;
                      const low = Math.min(active.stop, active.entry),
                        high = Math.max(active.stop, active.entry);
                      dispatch({
                        type: "mark",
                        mark: {
                          id: crypto.randomUUID(),
                          kind: "OB",
                          index: s.cursor - 1,
                          low,
                          high,
                          user: true,
                        },
                      });
                      setLayers(["OB"]);
                    }}
                  >
                    {t("Save hypothetical reference zone")}
                  </button>
                  <p>
                    {t(
                      "A reference zone is a user hypothesis, not an OB detection or a forecast.",
                    )}
                  </p>
                  <progress
                    max={4}
                    value={checklistItems.filter((k) => checklist[k]).length}
                  />
                  {checklistItems.map((k) => (
                    <label className="market-check" key={k}>
                      <input
                        type="checkbox"
                        checked={!!checklist[k]}
                        onChange={(e) =>
                          setChecklist((v) => ({ ...v, [k]: e.target.checked }))
                        }
                      />
                      {t(k)}
                    </label>
                  ))}
                </>
              )}
            </>
          )}
        </aside>
      </div>
      <div
        className="market-layer-strip"
        role="group"
        aria-label={t("Reference layers")}
      >
        {(["FVG", "OB", "BOS", "Sweep"] as PatternKind[]).map((k) => (
          <button
            key={k}
            aria-pressed={layers.includes(k)}
            onClick={() => {
              setLayers((v) =>
                v.includes(k) ? v.filter((x) => x !== k) : [...v, k],
              );
              if (mode === "chartlab") setReview(true);
            }}
          >
            {k}
          </button>
        ))}
        <span>{t("Reference rules, not guaranteed signals.")}</span>
      </div>
      <p role="status" className="market-status">
        {status
          ? t(status)
          : t("Inspect a candle, move a line, or step the replay to begin.")}
      </p>
      {s.marks.length > 0 && (
        <details>
          <summary>
            {t("Your annotations")} ({s.marks.length})
          </summary>
          <div className="market-mark-list">
            {s.marks.slice(-30).map((m) => (
              <div key={m.id}>
                <button
                  onClick={() => {
                    dispatch({
                      type: "seek",
                      cursor: Math.max(s.cursor, m.index + 1),
                    });
                    dispatch({ type: "select", index: m.index });
                    setFog(0);
                    setFocus(m.index);
                  }}
                >
                  {m.kind} · {m.index + 1} ·{" "}
                  <bdi>
                    {fmt(m.low)}—{fmt(m.high)}
                  </bdi>
                </button>
                <button
                  aria-label={t("Remove annotation")}
                  onClick={() => dispatch({ type: "remove", id: m.id })}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </details>
      )}
      {mode === "backtest" && research && (
        <section className="market-research">
          <header>
            <h3>{t("Research follows the candles.")}</h3>
            <div className="market-actions">
              {(["training", "heldout"] as const).map((v) => (
                <button
                  aria-pressed={sample === v}
                  key={v}
                  onClick={() => {
                    setSample(v);
                    setInspection(null);
                    setFocus(null);
                  }}
                >
                  {t(
                    v === "training"
                      ? "Training · first 70%"
                      : "Holdout · last 30%",
                  )}
                </button>
              ))}
              <button
                onClick={() =>
                  downloadLabFile("learnsmc-research.json", {
                    source: s.source,
                    rule: research.appliedRule,
                    ...research,
                  })
                }
              >
                {t("Export research")}
              </button>
              <button
                onClick={() => {
                  const csv =
                    "entry_candle,exit_candle,direction,net_R,reason\n" +
                    trades
                      .map((tr) =>
                        [
                          tr.entryBar + sampleOffset + 1,
                          tr.exitBar + sampleOffset + 1,
                          tr.direction,
                          tr.result ?? "",
                          tr.reason,
                        ].join(","),
                      )
                      .join("\n");
                  const url = URL.createObjectURL(
                      new Blob([csv], { type: "text/csv" }),
                    ),
                    link = document.createElement("a");
                  link.href = url;
                  link.download = "learnsmc-trades.csv";
                  link.click();
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
              >
                {t("Download trade ledger")}
              </button>
            </div>
          </header>
          {JSON.stringify(rule) !== JSON.stringify(research.appliedRule) && (
            <p role="status">
              {t("Rules changed. Run again to update the results below.")}
            </p>
          )}
          <p>
            {t(
              "After inspecting holdout results or tuning parameters, this is exploratory research, not an untouched validation sample.",
            )}
          </p>
          <div className="market-summary">
            {[
              [t("Resolved net R"), fmtR(summary.net) + "R"],
              [t("Resolved trades"), summary.known.length],
              [
                t("Win rate"),
                summary.known.length
                  ? fmtR((summary.wins / summary.known.length) * 100) + "%"
                  : "—",
              ],
              [t("Maximum drawdown"), fmtR(summary.drawdown) + "R"],
              [t("Ambiguous trades"), summary.ambiguous],
            ].map(([label, value], i) => (
              <button
                key={label}
                onClick={() =>
                  selectTrade(
                    i === 3 ? drawdownTrade : Math.max(0, trades.length - 1),
                  )
                }
              >
                <span>{label}</span>
                <strong>{value}</strong>
              </button>
            ))}
          </div>
          <Suspense fallback={<p>{t("Opening chart…")}</p>}>
            <Equity
              values={summary.curve}
              envelope={sample === "heldout" ? research.envelope : undefined}
              onSelect={(i) => {
                const tr = summary.known[i];
                if (tr) selectTrade(trades.indexOf(tr));
              }}
            />
          </Suspense>
          <p>
            {t(
              "Dashed lines show the 5th–95th percentile of 100 shuffled trade-order paths. They are not confidence intervals; shuffling leaves total fixed-R return unchanged.",
            )}
          </p>
          <div
            className="market-trade-list"
            role="group"
            aria-label={t("Inspect a trade")}
          >
            {trades.map((tr, i) => (
              <button
                key={i}
                className={
                  tr.result === null
                    ? "unknown"
                    : tr.result >= 0
                      ? "gain"
                      : "loss"
                }
                aria-pressed={inspection === i}
                onClick={() => selectTrade(i)}
              >
                {i + 1}: {tr.result === null ? "?" : fmtR(tr.result) + "R"}
              </button>
            ))}
          </div>
          {inspected && (
            <div className="market-trade-detail">
              <h4>
                {t("Trade inspection")} {inspection! + 1}
              </h4>
              <button
                onClick={() => {
                  dispatch({
                    type: "seek",
                    cursor: inspected.signal + sampleOffset + 1,
                  });
                  setFocus(inspected.signal + sampleOffset);
                  showChart();
                }}
              >
                {t("Signal")}
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: "seek",
                    cursor: inspected.entryBar + sampleOffset + 1,
                  });
                  setFocus(inspected.entryBar + sampleOffset);
                  showChart();
                }}
              >
                {t("Entry")} {fmt(inspected.entry)}
              </button>
              <button onClick={() => selectTrade(inspection!)}>
                {t("Exit")} · {t(inspected.reason)} ·{" "}
                {inspected.exitBar + sampleOffset + 1}
              </button>
            </div>
          )}
          <h4>{t("Reward sensitivity on the viewed holdout")}</h4>
          <div className="market-sensitivity">
            {research.sensitivity.map((p) => (
              <button
                key={p.reward}
                onClick={() => setRule((r) => ({ ...r, reward: p.reward }))}
              >
                <bdi>
                  {p.reward}R → {fmtR(p.net)}R
                </bdi>
                <span>
                  {p.trades} {t("Trades")}
                </span>
              </button>
            ))}
          </div>
          {!trades.length && (
            <p>
              {t(
                "No qualifying trades. Keep the rules visible rather than tuning until a winner appears.",
              )}
            </p>
          )}
        </section>
      )}
      <label className="market-notes">
        {t("Session notes")}
        <textarea
          value={s.notes}
          onChange={(e) => dispatch({ type: "notes", text: e.target.value })}
          maxLength={3000}
        />
      </label>
      <details className="market-method">
        <summary>{t("How the engine works")}</summary>
        <p>
          {t(
            "FVG: completed outer-wick non-overlap. BOS: close beyond the preceding eight-candle range. Sweep: wick outside that range with a close back inside. OB: opposing candle before a body greater than 1.5 times the prior eight-body average. These transparent teaching definitions are simplified and subjective.",
          )}
        </p>
        <p>
          {t(
            "Limit orders fill at a favorable opening price or at their touched limit. Intrabar entry and exit ordering can be ambiguous. Stops can gap; targets use idealized limit fills. Fixed R costs are assumptions, not broker quotes. No margin, partial fills or tick-path simulation is modeled.",
          )}
        </p>
        <p>
          {t(
            "CSV stays on your device. Use 30–20,000 positive-price candles, ordered ISO timestamps, and time, open, high, low, close columns. No market data service is connected.",
          )}
        </p>
      </details>
    </section>
  );
}
