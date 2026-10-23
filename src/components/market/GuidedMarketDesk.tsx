import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  StepForward,
} from "lucide-react";
import { useTranslation } from "../../i18n/TranslationProvider";
import {
  caseEvidence,
  casePlan,
  caseSource,
  evaluateCase,
  GUIDED_KEY,
  learningCases,
  type LearningCase,
} from "../../data/learningCases";
import { initialMarket, validPlan, type Mark } from "../../utils/marketEngine";
import { useMarketSession } from "./useMarketSession";
import { downloadLabFile } from "../labs/LabDesk";
import type { MarketMode } from "./MarketWorkspace";
const Chart = lazy(() => import("./MarketChart"));
const Sandbox = lazy(() =>
  import("./MarketWorkspace").then((m) => ({ default: m.MarketWorkspace })),
);
const names = {
  chartlab: "Chart Laboratory",
  simulator: "Trade Simulator",
  backtest: "Backtest Lab",
  delivery: "ICT Delivery Suite",
};
const goals = {
  chartlab: "Understand one complete setup.",
  simulator: "Make a decision before seeing the outcome.",
  backtest: "Learn to test a checklist, not a shape.",
  delivery: "Know your risk before placing a paper order.",
};
const leads = {
  chartlab:
    "Start here. We will read the context, watch a low or high get swept, check confirmation, and only then consider an entry.",
  simulator:
    "Read the supplied context, decide whether to wait or skip, then reveal what happens. A good-looking setup can still fail.",
  backtest:
    "Apply the same stated conditions to six teaching cases. See why some qualify, why others are skipped, and why a filled order can still lose.",
  delivery:
    "Move the stop and see the position size change. This fictional instrument is worth $1 per price point per unit.",
};
const stages = [
  "Read the context",
  "Find the liquidity event",
  "Wait for confirmation",
  "Find the entry area",
  "Define invalidation",
  "Review the outcome",
];
const n = (v: number) =>
  Number.isFinite(v) ? String(Number(v.toFixed(2))) : "—";
const live = (status?: string) => status === "open" || status === "pending";
type Result = ReturnType<typeof evaluateCase>;
export function GuidedMarketDesk({
  mode,
  studyFocus,
}: {
  mode: MarketMode;
  studyFocus?: string;
}) {
  const { t, href, message } = useTranslation(),
    {
      state: s,
      dispatch,
      ready,
      flush,
      storageError,
    } = useMarketSession(GUIDED_KEY);
  const [stage, setStage] = useState(0),
    [answered, setAnswered] = useState(false),
    [hint, setHint] = useState(false),
    [feedback, setFeedback] = useState(""),
    [wrong, setWrong] = useState(false),
    [selected, setSelected] = useState<number | null>(null),
    [revealed, setRevealed] = useState(false);
  const [higherView, setHigherView] = useState(true);
  const [playing, setPlaying] = useState(false),
    [editing, setEditing] = useState(false),
    [skipped, setSkipped] = useState(false),
    [sandbox, setSandbox] = useState(false),
    [inspected, setInspected] = useState<string | null>(null),
    [researchCursor, setResearchCursor] = useState(14);
  const [minimumR, setMinimumR] = useState(1.5),
    [cost, setCost] = useState(0.05),
    [results, setResults] = useState<{
      minimumR: number;
      cost: number;
      items: Result[];
    } | null>(null),
    [checks, setChecks] = useState<Record<string, boolean>>({});
  const stagePanel = useRef<HTMLElement>(null),
    chartColumn = useRef<HTMLDivElement>(null);
  const sessionCase =
    learningCases.find((c) => caseSource(c) === s.source) || learningCases[0];
  const c =
    mode === "backtest" && inspected
      ? learningCases.find((v) => v.id === inspected) || sessionCase
      : sessionCase;
  const e = caseEvidence(c),
    long = c.side === "long",
    p =
      mode === "backtest"
        ? casePlan(c, results?.cost ?? cost)
        : s.order?.plan || s.draft;
  const resetLesson = () => {
    setStage(0);
    setHigherView(true);
    setAnswered(false);
    setHint(false);
    setFeedback("");
    setWrong(false);
    setSelected(null);
    setRevealed(false);
    setPlaying(false);
    setEditing(false);
    setSkipped(false);
    setInspected(null);
    setChecks({});
  };
  const loadCase = (next: LearningCase) => {
    dispatch({
      type: "load",
      state: {
        ...initialMarket(),
        source: caseSource(next),
        bars: next.bars,
        cursor: 14,
        seen: 14,
        draft: casePlan(next),
      },
    });
    resetLesson();
  };
  useEffect(() => {
    if (ready && !learningCases.some((v) => caseSource(v) === s.source))
      loadCase(learningCases[0]);
  }, [ready, s.source]);
  useEffect(() => {
    if (!playing || !live(s.order?.status) || s.cursor >= c.bars.length) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => dispatch({ type: "step" }), 900);
    return () => clearTimeout(timer);
  }, [playing, s.cursor, s.order, c.bars.length, dispatch]);
  const result =
    mode === "backtest"
      ? results?.items.find((r) => r.case.id === c.id)
      : undefined;
  const visibleCount =
    mode === "chartlab"
      ? revealed
        ? c.bars.length
        : [10, 11, 13, 14, 14, 14][stage]
      : mode === "backtest"
        ? researchCursor
        : s.cursor;
  const higher = mode === "chartlab" && stage === 0 && higherView;
  const bars = useMemo(
    () =>
      higher
        ? c.htfBars
        : c.bars.slice(0, Math.max(3, Math.min(c.bars.length, visibleCount))),
    [c, visibleCount, higher],
  );
  const showPlan = mode !== "chartlab" || stage >= 4;
  const showZone =
    (mode !== "chartlab" || stage >= 3) &&
    (mode !== "chartlab" || hint || answered || stage > 3) &&
    e.hasGap;
  const marks: Mark[] = showZone
    ? [
        {
          id: "entry-area",
          kind: "FVG",
          index: 13,
          start: 11,
          end: Math.min(bars.length - 1, 18),
          low: e.gap.low,
          high: e.gap.high,
        },
      ]
    : [];
  const showSweep =
    mode !== "chartlab" || stage > 1 || (stage === 1 && (hint || answered));
  const showShift =
    mode !== "chartlab" || stage > 2 || (stage === 2 && (hint || answered));
  const order = mode === "backtest" ? result?.order : s.order;
  const executionEvents = [
    ...(mode === "chartlab" && stage === 3
      ? [
          { index: 11, label: "Candle 12", color: "#a96710" },
          { index: 13, label: "Candle 14", color: "#a96710" },
        ]
      : []),
    ...(showSweep && e.swept
      ? [{ index: 10, label: "Beyond the old range", color: "#8758c9" }]
      : []),
    ...(showShift && e.shifted && e.displaced
      ? [{ index: 12, label: "Confirmation candle", color: "#2563eb" }]
      : []),
    ...(selected === null
      ? []
      : [{ index: selected, label: "Your selection", color: "#a96710" }]),
    ...(order?.filledAt === undefined
      ? []
      : [{ index: order.filledAt, label: "Order filled", color: "#2563eb" }]),
    ...(order?.exitAt === undefined
      ? []
      : [
          {
            index: order.exitAt,
            label: order.fill === undefined ? "No fill" : "Exit",
            color: "#a96710",
          },
        ]),
  ].filter((v) => v.index < bars.length);
  const events = higher
    ? [
        {
          index: 3,
          label:
            c.bias === "long" ? "Selected higher low" : "Selected lower high",
          color: "#8758c9",
        },
        {
          index: 4,
          label:
            c.bias === "long" ? "Selected higher high" : "Selected lower low",
          color: "#2563eb",
        },
      ]
    : executionEvents;
  const levels = higher
    ? [
        {
          label: "Selected swing reference",
          price: c.contextSwing,
          color: "#8758c9",
        },
        {
          label: "External reference",
          price: c.contextTarget,
          color: "#2563eb",
        },
      ]
    : showPlan && e.qualified
      ? [
          { label: "Entry", price: p.entry, color: "#2563eb" },
          { label: "Stop", price: p.stop, color: "#cf4b59" },
          { label: "Target", price: p.target, color: "#178667", locked: true },
        ]
      : [
          {
            label: long ? "Old range low" : "Old range high",
            price: long ? e.rangeLow : e.rangeHigh,
            color: "#8758c9",
          },
          ...(stage >= 2 || mode !== "chartlab"
            ? [
                {
                  label: "Short-term reference",
                  price: e.structure,
                  color: "#2563eb",
                },
              ]
            : []),
        ];
  const risk = Math.abs(p.entry - p.stop),
    reward = risk ? Math.abs(p.target - p.entry) / risk : 0;
  const beyond = long ? p.stop < c.bars[10].low : p.stop > c.bars[10].high;
  const eligible =
    e.qualified &&
    validPlan(p) &&
    p.side === c.side &&
    p.entry >= e.gap.low &&
    p.entry <= e.gap.high &&
    beyond &&
    reward >= 1.5;
  const budget = (p.account * p.risk) / 100,
    size = eligible ? Math.floor(budget / (risk * p.value)) : 0;
  const done = order && !live(order.status),
    last = c.bars[Math.min(s.cursor, c.bars.length) - 1];
  const respond = (correct: boolean, yes: string, no: string) => {
    setWrong(!correct);
    setAnswered(correct);
    setFeedback(correct ? yes : no);
  };
  const selectCandle = (index: number) => {
    if (higher) return;
    setSelected(index);
    if (mode !== "chartlab") return;
    if (stage === 1)
      respond(
        index === 10,
        "Yes. This candle traded beyond the old range and closed back inside. That is an observation, not an entry signal.",
        "Compare the wick with the purple range level. Look for a candle beyond that level which closes back inside.",
      );
    if (stage === 2 && e.shifted)
      respond(
        index === 12,
        "Yes. The larger body closes beyond the blue reference. For this exercise, that is the required confirmation. A gap by itself would not satisfy it.",
        "Find the candle whose body closes beyond the blue reference. A long wick or a gap alone does not satisfy this rule.",
      );
  };
  const nextStage = () => {
    setStage((v) => (stage === 2 && !e.qualified ? 5 : Math.min(5, v + 1)));
    setAnswered(false);
    setHint(false);
    setFeedback("");
    setWrong(false);
    setSelected(null);
    stagePanel.current?.focus({ preventScroll: true });
  };
  const outcomeLabel = (r: Result) =>
    r.reason
      ? "Skipped"
      : r.order?.fill === undefined
        ? "No fill"
        : r.order.status === "target"
          ? "Target reached"
          : r.order.status === "stop"
            ? "Invalidated"
            : r.order.status === "ambiguous"
              ? "Sequence unresolved"
              : "Closed at the end";
  const moveLevel = (label: string, price: number) => {
    if (s.order || !Number.isFinite(price)) return;
    const key = label === "Entry" ? "entry" : label === "Stop" ? "stop" : null;
    if (key) dispatch({ type: "draft", plan: { ...s.draft, [key]: price } });
  };
  const exportReview = () =>
    downloadLabFile("learnsmc-teaching-case.json", {
      case: c.id,
      source: "Authored synthetic teaching case; not historical performance",
      plan: p,
      order: s.order,
      notes: s.notes,
    });
  const goLink = (target: MarketMode) =>
    href("/tools/" + (target === "delivery" ? "delivery-suite" : target) + "/");
  return (
    <section
      className="guided-desk market-workspace"
      aria-label={t(names[mode])}
    >
      <header className="guided-intro">
        <span className="guided-eyebrow">
          {t("A clear task. One step at a time.")}
        </span>
        <h2>{t(goals[mode])}</h2>
        <p>{t(leads[mode])}</p>
        <div className="guided-example-label">
          {t(
            "Fictional teaching case · not a historical replay or trading signal",
          )}
        </div>
      </header>
      <div className="guided-session-bar">
        <span>
          <b>{t(c.name)}</b> ·{" "}
          {t(long ? "Long-side study" : "Short-side study")}
        </span>
        <details>
          <summary>{t("Try another case")}</summary>
          <p>{t("Changing the case starts a fresh paper attempt.")}</p>
          <div>
            {learningCases.map((v) => (
              <button
                key={v.id}
                disabled={live(s.order?.status)}
                aria-pressed={v.id === c.id}
                onClick={() => loadCase(v)}
              >
                {t(v.name)}
              </button>
            ))}
          </div>
        </details>
        <button onClick={() => loadCase(sessionCase)}>
          <RotateCcw size={15} />
          {t("Restart this case")}
        </button>
      </div>
      {mode === "simulator" && !s.order && s.seen > 14 && (
        <p className="guided-small">
          {t(
            "You have already reviewed later candles in this case. Treat this as a repeat exercise, not a blind assessment.",
          )}
        </p>
      )}
      {mode === "chartlab" && (
        <ol className="guided-progress" aria-label={t("Lesson progress")}>
          {stages.map((v, i) => (
            <li key={v} aria-current={i === stage ? "step" : undefined}>
              <span>{i < stage ? <Check size={14} /> : i + 1}</span>
              <small>{t(v)}</small>
            </li>
          ))}
        </ol>
      )}
      <div className="guided-workspace">
        <div className="guided-chart-column" ref={chartColumn}>
          <div className="guided-chart-caption">
            <b>
              {t(
                mode === "chartlab"
                  ? higher
                    ? "Earlier 1-hour context"
                    : "5-minute execution window"
                  : "The chart shows the current evidence.",
              )}
            </b>
            <span>
              {message("Showing {count} candles", { count: bars.length })}
            </span>
          </div>
          {mode === "chartlab" && stage === 0 && (
            <div className="guided-replay">
              <button
                aria-pressed={higherView}
                onClick={() => setHigherView(true)}
              >
                {t("Earlier 1-hour context")}
              </button>
              <button
                aria-pressed={!higherView}
                onClick={() => setHigherView(false)}
              >
                {t("5-minute execution window")}
              </button>
            </div>
          )}
          <Suspense
            fallback={
              <div className="market-chart-loading">{t("Opening chart…")}</div>
            }
          >
            <Chart
              showHandles={
                (mode === "delivery" || (mode === "simulator" && editing)) &&
                !s.order
              }
              bars={bars}
              marks={marks}
              levels={levels.filter(
                (v) => Number.isFinite(v.price) && v.price > 0,
              )}
              events={events}
              fitRevision={higher ? -1 : visibleCount}
              selected={selected}
              focus={null}
              drawing={false}
              adjustable={
                (mode === "delivery" || (mode === "simulator" && editing)) &&
                !s.order
              }
              onPoint={selectCandle}
              onFocus={selectCandle}
              onLevel={moveLevel}
            />
          </Suspense>
          <div className="guided-chart-key">
            {showPlan && e.qualified ? (
              <>
                <span>
                  <i className="confirmation" />
                  {t("Blue: planned entry")}
                </span>
                <span>
                  <i className="stop" />
                  {t("Red: invalidation")}
                </span>
                <span>
                  <i className="area" />
                  {t("Green: target reference")}
                </span>
              </>
            ) : (
              <>
                <span>
                  <i className="context" />
                  {t(
                    higher
                      ? "Purple: the selected swing"
                      : "Purple: the earlier range",
                  )}
                </span>
                <span>
                  <i className="confirmation" />
                  {t(
                    higher
                      ? "Blue: the external reference"
                      : "Blue: the confirmation reference",
                  )}
                </span>
              </>
            )}
            {showZone && (
              <span>
                <i className="area" />
                {t("Shaded area: the completed gap")}
              </span>
            )}
          </div>
          {mode === "chartlab" && (stage === 1 || stage === 2) && (
            <div className="guided-candle-picker">
              <span>{t("You can click a candle, or choose its number:")}</span>
              {Array.from(
                { length: Math.min(5, bars.length) },
                (_, i) => bars.length - Math.min(5, bars.length) + i,
              ).map((i) => (
                <button
                  key={i}
                  aria-pressed={selected === i}
                  onClick={() => selectCandle(i)}
                >
                  {message("Candle {number}", { number: i + 1 })}
                </button>
              ))}
            </div>
          )}
          {mode === "simulator" && s.order && (
            <div className="guided-replay">
              <button
                disabled={!live(s.order.status)}
                onClick={() => setPlaying((v) => !v)}
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
                {t(playing ? "Pause" : "Play the next candles")}
              </button>
              <button
                disabled={!live(s.order.status)}
                onClick={() => dispatch({ type: "step" })}
              >
                <StepForward size={17} />
                {t("Reveal one candle")}
              </button>
              <span>{message("Candle {number}", { number: s.cursor })}</span>
            </div>
          )}
          {mode === "backtest" && results && (
            <div className="guided-replay">
              <span>{t("Inspect the selected case:")}</span>
              <button onClick={() => setResearchCursor(14)}>
                {t("Before the order")}
              </button>
              {result?.order?.filledAt !== undefined && (
                <button
                  onClick={() => setResearchCursor(result.order!.filledAt! + 1)}
                >
                  {t("At the fill")}
                </button>
              )}
              <button
                onClick={() =>
                  setResearchCursor(
                    (result?.order?.exitAt ?? c.bars.length - 1) + 1,
                  )
                }
              >
                {t("At the outcome")}
              </button>
            </div>
          )}
          <details className="guided-context">
            <summary>
              {t("Where does the higher-timeframe context come from?")}
            </summary>
            <p>
              {t(
                "The context view uses separate, earlier authored hourly candles. Its chosen swing references support the stated interpretation; they are not the only possible interpretation. The 5-minute view is the later execution window, not a substitute for that context.",
              )}
            </p>
            <p>
              {t(
                "Session timestamps are illustrative. News, spreads, margin and a real exchange order book are not modeled.",
              )}
            </p>
          </details>
        </div>
        <aside
          className="guided-coach"
          ref={stagePanel}
          tabIndex={-1}
          aria-label={t("Your next task")}
        >
          {mode === "chartlab" ? (
            <>
              <span className="guided-eyebrow">
                {message("Step {number} of 6", { number: stage + 1 })}
              </span>
              <h3>{t(stages[stage])}</h3>
              {stage === 0 && (
                <>
                  <p>
                    {t(
                      "First read the earlier hourly candles. The marked swings explain the chosen directional interpretation and external reference. That context must agree with the candidate trade; it never gives an entry by itself.",
                    )}
                  </p>
                  <div className="guided-premise">
                    <span>{t("Supplied context")}</span>
                    <b>
                      {t(
                        c.bias === "long"
                          ? "Higher-timeframe long bias"
                          : "Higher-timeframe short bias",
                      )}
                    </b>
                    <span>
                      {t("External reference price")}:{" "}
                      <bdi>{n(c.contextTarget)}</bdi>
                    </span>
                  </div>
                  <h4>{t("What should we do first?")}</h4>
                  <button
                    className="guided-answer"
                    onClick={() =>
                      respond(
                        true,
                        "Correct. Bias narrows what we investigate. We still need the remaining conditions, an invalidation and acceptable risk.",
                        "",
                      )
                    }
                  >
                    {t("Wait for the rest of the evidence")}
                  </button>
                  <button
                    className="guided-answer"
                    onClick={() =>
                      respond(
                        false,
                        "",
                        "A directional opinion does not supply an entry, stop or proof that price must move that way.",
                      )
                    }
                  >
                    {t("Enter because the bias agrees")}
                  </button>
                </>
              )}
              {stage === 1 && (
                <>
                  <p>
                    {t(
                      "The purple line marks the old range edge. We are looking for price to trade beyond it and then close back inside.",
                    )}
                  </p>
                  <h4>{t("Select the candle that does both.")}</h4>
                  <p className="guided-small">
                    {t(
                      "A sweep alone is not a reversal signal. The next question is whether price confirms a change.",
                    )}
                  </p>
                </>
              )}
              {stage === 2 && (
                <>
                  <p>
                    {t(
                      "Now compare the body closes with the blue short-term reference. Our stated rule also requires a larger directional body after the sweep.",
                    )}
                  </p>
                  {e.shifted ? (
                    <h4>
                      {t("Select the candle that closes beyond the reference.")}
                    </h4>
                  ) : (
                    <>
                      <h4>{t("Has the required confirmation happened?")}</h4>
                      <button
                        className="guided-answer"
                        onClick={() =>
                          respond(
                            true,
                            "Correct. The close has not broken the reference with the required displacement. This case is a no-trade under the stated checklist.",
                            "",
                          )
                        }
                      >
                        {t("No. Wait or skip this case.")}
                      </button>
                      <button
                        className="guided-answer"
                        onClick={() =>
                          respond(
                            false,
                            "",
                            "The sweep does not replace confirmation. We cannot invent a completed setup because we want an entry.",
                          )
                        }
                      >
                        {t("The sweep is enough to enter")}
                      </button>
                    </>
                  )}
                </>
              )}
              {stage === 3 && (
                <>
                  <p>
                    {t(
                      "Only after context, sweep and confirmation do we inspect the three-candle gap. Compare candle 12 with candle 14: the outer wicks define this interval.",
                    )}
                  </p>
                  <h4>
                    {t("Which price interval is between those outer wicks?")}
                  </h4>
                  {[
                    { low: e.gap.low, high: e.gap.high, correct: true },
                    {
                      low: Math.min(c.bars[10].low, c.bars[10].high),
                      high: Math.max(c.bars[10].low, c.bars[10].high),
                      correct: false,
                    },
                  ].map((v, i) => (
                    <button
                      className="guided-answer"
                      key={i}
                      onClick={() =>
                        respond(
                          v.correct,
                          "Yes. This is the completed gap in the already-confirmed sequence. It is an area to investigate, not a promise that a revisit will hold.",
                          "Those are the sweep candle’s limits, not the gap between the two outer wicks.",
                        )
                      }
                    >
                      <bdi>
                        {n(v.low)}–{n(v.high)}
                      </bdi>
                    </button>
                  ))}
                </>
              )}
              {stage === 4 && (
                <>
                  <p>
                    {t(
                      "This paper plan uses an entry inside the gap, an invalidation beyond the sweep extreme, and the supplied external reference as its target.",
                    )}
                  </p>
                  <dl className="guided-plan">
                    <div>
                      <dt>{t("Entry")}</dt>
                      <dd>{n(c.entry)}</dd>
                    </div>
                    <div>
                      <dt>{t("Stop")}</dt>
                      <dd>{n(c.stop)}</dd>
                    </div>
                    <div>
                      <dt>{t("Target")}</dt>
                      <dd>{n(c.target)}</dd>
                    </div>
                  </dl>
                  <h4>{t("Why is the stop beyond the sweep extreme?")}</h4>
                  <button
                    className="guided-answer"
                    onClick={() =>
                      respond(
                        true,
                        "Yes. That is the invalidation convention stated for this example. Other models may define invalidation differently; a stop is not a guarantee of the fill price.",
                        "",
                      )
                    }
                  >
                    {t("That is where this example’s premise is invalidated")}
                  </button>
                  <button
                    className="guided-answer"
                    onClick={() =>
                      respond(
                        false,
                        "",
                        "A smaller stop changes the trade’s premise and exposure. A more attractive displayed ratio does not make the setup more reliable.",
                      )
                    }
                  >
                    {t("Any tiny stop makes the trade better")}
                  </button>
                </>
              )}
              {stage === 5 && (
                <>
                  <p>
                    {t(
                      e.qualified
                        ? "All stated conditions qualified. That still cannot tell us which outcome will follow."
                        : "The conditions did not all qualify. The correct result is no trade, not a forced entry.",
                    )}
                  </p>
                  <button
                    className="guided-primary"
                    disabled={live(s.order?.status)}
                    onClick={() => {
                      setRevealed(true);
                      if (!s.order)
                        dispatch({ type: "seek", cursor: c.bars.length });
                    }}
                  >
                    {t("Reveal this teaching case")}
                  </button>
                  {live(s.order?.status) && (
                    <p>
                      {t(
                        "Finish or reset the paper attempt before opening its outcome.",
                      )}
                    </p>
                  )}
                  {revealed && (
                    <div className="guided-feedback">
                      <b>{t(outcomeLabel(evaluateCase(c, 1.5, 0.05)))}</b>
                      <p>
                        {t(
                          evaluateCase(c, 1.5, 0.05).reason ||
                            "The lesson is the decision process, not memorizing the ending. Compare a different case before drawing conclusions.",
                        )}
                      </p>
                    </div>
                  )}
                  <a
                    className="guided-next-link"
                    href={goLink("simulator")}
                    onClick={flush}
                  >
                    {t("Next: practise the decision")} <ArrowRight size={16} />
                  </a>
                </>
              )}
              {stage < 5 && (
                <>
                  <button
                    className="guided-hint"
                    onClick={() => setHint((v) => !v)}
                  >
                    <Lightbulb size={16} />
                    {t(
                      hint ? "Hide the explanation" : "Show me what to look at",
                    )}
                  </button>
                  {hint && (
                    <p className="guided-hint-copy">
                      {t(
                        stage === 0
                          ? "Compare the two marked swings in the hourly view. This is a selected structure interpretation. Move to the 5-minute window only after deciding what that context means."
                          : stage === 1
                            ? "Candle 11 crosses the old range edge and closes back inside. Compare its wick and close with the purple line."
                            : stage === 2
                              ? e.shifted
                                ? "Candle 13 closes beyond the blue reference with the larger directional body."
                                : "No body closes beyond the reference with the required displacement."
                              : stage === 3
                                ? "The gap is the empty interval between candle 12 and candle 14. The middle candle traded through it."
                                : "The stop belongs beyond the sweep extreme under this example’s stated rule.",
                      )}
                    </p>
                  )}
                </>
              )}
            </>
          ) : mode === "simulator" ? (
            <>
              <span className="guided-eyebrow">{t("Your decision")}</span>
              <h3>
                {t(
                  !e.qualified
                    ? "Would you stand aside?"
                    : s.order
                      ? "Follow the paper order."
                      : "The setup qualified. Do we chase it?",
                )}
              </h3>
              <EvidenceList c={c} />
              {!e.qualified ? (
                <>
                  <p>
                    {t(
                      "At least one required condition is missing. This exercise will not create an order from an isolated gap or sweep.",
                    )}
                  </p>
                  <button
                    className="guided-primary"
                    onClick={() => setSkipped(true)}
                  >
                    {t("Stand aside: no trade")}
                  </button>
                  {skipped && (
                    <button
                      onClick={() =>
                        dispatch({ type: "seek", cursor: c.bars.length })
                      }
                    >
                      {t("Review what followed without a trade")}
                    </button>
                  )}
                  {skipped && (
                    <p className="guided-feedback">
                      {t(
                        "A deliberate no-trade is a valid decision. Review which condition was missing.",
                      )}
                    </p>
                  )}
                </>
              ) : !s.order && !skipped ? (
                <>
                  <p>
                    {t(
                      "Price is away from the planned entry. We can wait for a return to the area or skip the case. We do not need to trade every pattern.",
                    )}
                  </p>
                  <dl className="guided-plan">
                    <div>
                      <dt>{t("Entry")}</dt>
                      <dd>{n(p.entry)}</dd>
                    </div>
                    <div>
                      <dt>{t("Stop")}</dt>
                      <dd>{n(p.stop)}</dd>
                    </div>
                    <div>
                      <dt>{t("Target")}</dt>
                      <dd>{n(p.target)}</dd>
                    </div>
                  </dl>
                  <button
                    className="guided-primary"
                    disabled={!eligible || s.cursor >= c.bars.length}
                    onClick={() => {
                      dispatch({ type: "lock", plan: s.draft });
                      setEditing(false);
                      setFeedback(
                        "The limit order is locked. Reveal one candle and check whether the entry was actually touched.",
                      );
                    }}
                  >
                    {t("Wait for the planned entry")}
                  </button>
                  <button
                    className="guided-answer"
                    onClick={() => {
                      setSkipped(true);
                      setFeedback(
                        "You chose not to participate. That is allowed even when this checklist qualifies.",
                      );
                    }}
                  >
                    {t("Skip this case")}
                  </button>
                  <button
                    className="guided-hint"
                    onClick={() =>
                      setFeedback(
                        "Chasing would be a different trade with a different invalidation and reward. This exercise only models the plan you can see, not an impulse entry.",
                      )
                    }
                  >
                    {t("What if I chase the move?")}
                  </button>
                  <button
                    className="guided-hint"
                    onClick={() => setEditing((v) => !v)}
                  >
                    {t(
                      editing
                        ? "Finish adjusting"
                        : "Adjust the paper entry and stop",
                    )}
                  </button>
                  {editing && <PlanFields plan={p} onChange={moveLevel} />}
                  <p className="guided-small">
                    {t(
                      "For this exercise: entry inside the shaded gap, stop beyond the sweep, target at the supplied reference, and at least 1.5R before costs.",
                    )}
                  </p>
                  {!eligible && (
                    <p role="alert">
                      {t(
                        "The edited plan does not satisfy those conditions. Adjust it before continuing.",
                      )}
                    </p>
                  )}
                  {s.cursor >= c.bars.length && (
                    <p>
                      {t(
                        "You have reached the end. Restart the case before placing another paper order.",
                      )}
                    </p>
                  )}
                </>
              ) : skipped ? (
                <>
                  <button
                    onClick={() =>
                      dispatch({ type: "seek", cursor: c.bars.length })
                    }
                  >
                    {t("Review what followed without a trade")}
                  </button>
                  <p className="guided-feedback">
                    {t(
                      "No position taken. You can restart or study another case.",
                    )}
                  </p>
                </>
              ) : (
                <>
                  <div className="guided-order-state">
                    <b>
                      {t(
                        s.order!.status === "pending"
                          ? "Waiting for a fill"
                          : s.order!.status === "open"
                            ? "Position open"
                            : s.order!.status === "target"
                              ? "Target reached"
                              : s.order!.status === "stop"
                                ? "Invalidated"
                                : s.order!.status === "ambiguous"
                                  ? "Sequence unresolved"
                                  : s.order!.fill === undefined
                                    ? "No fill"
                                    : "Closed at the end",
                      )}
                    </b>
                    <p>
                      {t(
                        s.order!.status === "pending"
                          ? "The limit must be touched before a position exists. A correct forecast without a fill is not a trade."
                          : s.order!.status === "open"
                            ? "The entry filled. Keep comparing the next candle with the original stop and target."
                            : "Review the process against the original plan. One outcome does not validate or disprove a strategy.",
                      )}
                    </p>
                    {s.order!.r !== undefined && (
                      <strong>
                        {s.order!.r === null ? "—" : n(s.order!.r) + "R"}{" "}
                        <small>{t("after the assumed 0.05R cost")}</small>
                      </strong>
                    )}
                  </div>
                  {!done && (
                    <button
                      className="guided-primary"
                      onClick={() => dispatch({ type: "step" })}
                    >
                      <StepForward size={17} />
                      {t("Reveal one candle")}
                    </button>
                  )}
                  {done && (
                    <button onClick={exportReview}>
                      {t("Export this decision review")}
                    </button>
                  )}
                  <p className="guided-small">
                    {t(
                      "OHLC cannot always establish intrabar order. Unknown entry/target sequences stay unresolved; stop gaps use the opening price.",
                    )}
                  </p>
                </>
              )}
              <a
                className="guided-next-link"
                href={goLink("chartlab")}
                onClick={flush}
              >
                {t("Explain the setup step by step")}
              </a>
            </>
          ) : mode === "backtest" ? (
            <>
              <span className="guided-eyebrow">
                {t("State the rules first")}
              </span>
              <h3>{t("Same checklist. Every case.")}</h3>
              <ol className="guided-recipe">
                {[
                  "Context agrees with the direction",
                  "Earlier range is swept and reclaimed",
                  "Displacement closes beyond the reference",
                  "A completed gap exists after confirmation",
                  "Limit entry, defined invalidation and target",
                ].map((v) => (
                  <li key={v}>{t(v)}</li>
                ))}
              </ol>
              <label>
                {t("Minimum planned reward / risk")}
                <select
                  value={minimumR}
                  onChange={(v) => setMinimumR(+v.target.value)}
                >
                  {[1.5, 2, 2.5].map((v) => (
                    <option key={v} value={v}>
                      {v}R
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t("Assumed round-trip cost (R)")}
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={cost}
                  onChange={(v) =>
                    setCost(Math.max(0, Math.min(1, +v.target.value || 0)))
                  }
                />
              </label>
              <button
                className="guided-primary"
                disabled={live(s.order?.status)}
                onClick={() => {
                  setResults({
                    minimumR,
                    cost,
                    items: learningCases.map((v) =>
                      evaluateCase(v, minimumR, cost),
                    ),
                  });
                  setInspected(c.id);
                  setResearchCursor(14);
                  setRevealed(true);
                }}
              >
                {t("Apply the checklist to six cases")}
              </button>
              {live(s.order?.status) && (
                <p>
                  {t(
                    "Finish or reset the paper attempt before opening its outcome.",
                  )}
                </p>
              )}
              <p className="guided-small">
                {t(
                  "These are hand-authored teaching cases, including failures and missing conditions. They are not a historical sample and cannot establish win rate or an edge.",
                )}
              </p>
              {result && (
                <div className="guided-feedback">
                  <b>{t(c.name)}</b>
                  <p>{t(result.reason || outcomeLabel(result))}</p>
                </div>
              )}
              {results &&
                (results.cost !== cost || results.minimumR !== minimumR) && (
                  <p role="status">
                    {t(
                      "Settings changed. Apply the checklist again before using the results.",
                    )}
                  </p>
                )}
            </>
          ) : (
            <>
              <span className="guided-eyebrow">{t("Prepare the risk")}</span>
              <h3>{t("What changes when the stop moves?")}</h3>
              <p>
                {t(
                  "A wider stop increases the loss per unit. With the same cash risk limit, you must use fewer units. Try moving the red line, then check the arithmetic below.",
                )}
              </p>
              <EvidenceList c={c} />
              <label>
                {t("Fictional account balance (USD)")}
                <input
                  type="number"
                  min={1}
                  value={p.account}
                  disabled={!!s.order}
                  onChange={(v) =>
                    dispatch({
                      type: "draft",
                      plan: { ...s.draft, account: +v.target.value },
                    })
                  }
                />
              </label>
              <label>
                {t("Paper risk limit (%)")}
                <input
                  type="range"
                  min={0.25}
                  max={2}
                  step={0.25}
                  value={p.risk}
                  disabled={!!s.order}
                  onChange={(v) =>
                    dispatch({
                      type: "draft",
                      plan: { ...s.draft, risk: +v.target.value },
                    })
                  }
                />
                <bdi>{n(p.risk)}%</bdi>
              </label>
              <div className="guided-size">
                <span>{t("Maximum planned cash loss")}</span>
                <b>${n(budget)}</b>
                <span>{t("Whole paper units")}</span>
                <strong>{eligible ? size : "—"}</strong>
                <small>{t("at $1 per price point per unit")}</small>
              </div>
              <p className="guided-arithmetic">
                <bdi>
                  ${n(budget)} ÷ {n(risk)} {t("points per unit")} ={" "}
                  {eligible ? size : "—"} {t("whole units")}
                </bdi>
              </p>
              <PlanFields plan={p} disabled={!!s.order} onChange={moveLevel} />
              {!eligible && (
                <p role="alert">
                  {t(
                    "The setup or edited plan is incomplete. Sizing is withheld until the stated conditions are satisfied.",
                  )}
                </p>
              )}
              {s.order && (
                <p>
                  {t(
                    "A paper order is already locked. Reset the case to edit its risk plan.",
                  )}
                </p>
              )}
              <p className="guided-small">
                {t(
                  "This is planned risk before costs. Gaps can produce a larger loss. This fictional multiplier is not a specification for a real futures or forex contract.",
                )}
              </p>
              <h4>{t("Before taking this to a real chart")}</h4>
              {[
                "Review separate higher-timeframe evidence",
                "Check session, news and instrument details",
                "Define the invalidation before entry",
              ].map((v) => (
                <label className="guided-check" key={v}>
                  <input
                    type="checkbox"
                    checked={!!checks[v]}
                    onChange={(event) =>
                      setChecks((old) => ({
                        ...old,
                        [v]: event.target.checked,
                      }))
                    }
                  />
                  {t(v)}
                </label>
              ))}
              <a
                className="guided-next-link"
                href={goLink("simulator")}
                onClick={flush}
              >
                {t("Practise this paper plan")} <ArrowRight size={16} />
              </a>
            </>
          )}

          {mode !== "chartlab" && feedback && (
            <div className="guided-feedback" role="status">
              {t(feedback)}
            </div>
          )}
        </aside>
      </div>
      {mode === "chartlab" && feedback && (
        <div
          className={"guided-feedback " + (wrong ? "needs-review" : "")}
          role="status"
        >
          {t(feedback)}
        </div>
      )}
      {mode === "chartlab" && stage < 5 && (
        <div className="guided-step-actions">
          <button
            disabled={stage === 0}
            onClick={() => {
              setStage((v) => Math.max(0, v - 1));
              setAnswered(false);
              setHint(false);
              setFeedback("");
            }}
          >
            <ChevronLeft size={16} />
            {t("Back")}
          </button>
          <button
            className="guided-primary"
            disabled={!answered}
            onClick={nextStage}
          >
            {t("Continue")}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
      {mode === "backtest" && results && (
        <section className="guided-case-results">
          <header>
            <h3>{t("Why each case qualified or was skipped")}</h3>
            <button
              onClick={() =>
                downloadLabFile("learnsmc-checklist-cases.json", results)
              }
            >
              {t("Export the case review")}
            </button>
          </header>
          <p>
            {t(
              "Select a row to inspect that case on the chart. Skipped and unfilled cases stay in the record.",
            )}
          </p>
          <div className="guided-result-rows">
            {results.items.map((r) => (
              <button
                key={r.case.id}
                aria-pressed={c.id === r.case.id}
                onClick={() => {
                  setInspected(r.case.id);
                  setResearchCursor(14);
                  setSelected(null);
                  chartColumn.current?.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "instant"
                      : "smooth",
                    block: "start",
                  });
                }}
              >
                <b>{t(r.case.name)}</b>
                <span>{t(r.reason || outcomeLabel(r))}</span>
                <bdi>
                  {r.order?.r === undefined || r.order.r === null
                    ? "—"
                    : n(r.order.r) + "R"}
                </bdi>
              </button>
            ))}
          </div>
        </section>
      )}
      <div className="guided-bottom-note">
        <b>{t("Why not trade every FVG or order block?")}</b>
        <p>
          {t(
            "A pattern describes one part of price action. It does not supply higher-timeframe context, a liquidity objective, confirmation, invalidation or execution assumptions. This desk teaches one explicitly stated sequence; it is not a universal ICT entry model or a guarantee of profit.",
          )}
        </p>
      </div>
      {storageError && (
        <p role="status">
          {t(
            "Device storage is unavailable. Export the review before leaving.",
          )}
        </p>
      )}
      {studyFocus && (
        <details>
          <summary>{t("About this study link")}</summary>
          <p>{t(studyFocus)}</p>
          <p>
            {t(
              "The guided case is a fictional illustration of the decision process, not a complete implementation of every named model.",
            )}
          </p>
        </details>
      )}
      <details className="guided-context">
        <summary>{t("Read the concepts and execution assumptions")}</summary>
        <nav className="guided-next-tools">
          <a
            href={href(
              "/learn/the-complete-ict-top-down-model-and-execution-blueprint/",
            )}
          >
            {t("Context and execution sequence")}
          </a>
          <a href={href("/learn/liquidity-engineering-and-liquidity-runs/")}>
            {t("Liquidity: observation versus interpretation")}
          </a>
          <a
            href={href(
              "/learn/fair-value-gaps-fvg-and-consequent-encroachment/",
            )}
          >
            {t("Fair value gaps in context")}
          </a>
          <a
            href="https://www.cmegroup.com/education/courses/trade-and-risk-management/proper-position-size"
            target="_blank"
            rel="noopener noreferrer"
          >
            CME: {t("Position sizing")}
          </a>
          <a
            href="https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders"
            target="_blank"
            rel="noopener noreferrer"
          >
            Investor.gov: {t("Order types")}
          </a>
        </nav>
      </details>
      <nav className="guided-next-tools" aria-label={t("Continue learning")}>
        {(Object.keys(names) as MarketMode[])
          .filter((v) => v !== mode)
          .map((v) => (
            <a key={v} href={goLink(v)} onClick={flush}>
              {t(names[v])}
              <ArrowRight size={15} />
            </a>
          ))}
      </nav>
      {mode === "backtest" && (
        <details className="guided-advanced">
          <summary onClick={() => setSandbox(true)}>
            {t("Advanced: isolated FVG geometry research")}
          </summary>
          <p>
            {t(
              "The CSV sandbox below tests gap geometry only. It does not implement the full checklist taught above and must not be presented as an ICT strategy backtest.",
            )}
          </p>
          {sandbox && (
            <Suspense fallback={<p>{t("Opening chart…")}</p>}>
              <Sandbox mode="backtest" />
            </Suspense>
          )}
        </details>
      )}
    </section>
  );
}
function EvidenceList({ c }: { c: LearningCase }) {
  const { t } = useTranslation(),
    e = caseEvidence(c);
  return (
    <ul className="guided-evidence">
      {[
        [e.aligned, "Context agrees"],
        [e.swept, "Range edge swept and reclaimed"],
        [e.shifted && e.displaced, "Confirmation close and displacement"],
        [e.hasGap, "Completed gap after the event"],
      ].map(([ok, label]) => (
        <li key={String(label)} data-met={Boolean(ok)}>
          <span>{ok ? "✓" : "—"}</span>
          {t(String(label))}
        </li>
      ))}
    </ul>
  );
}
function PlanFields({
  plan,
  disabled,
  onChange,
}: {
  plan: { entry: number; stop: number; target: number };
  disabled?: boolean;
  onChange: (label: string, price: number) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="guided-plan-fields">
      {(["Entry", "Stop"] as const).map((label) => (
        <label key={label}>
          {t(label)}
          <input
            type="number"
            step=".1"
            min={0.01}
            disabled={disabled}
            value={plan[label.toLowerCase() as "entry" | "stop"]}
            onChange={(v) => onChange(label, +v.target.value)}
          />
        </label>
      ))}
      <p>
        {t(
          "The target is the supplied reference, not a freely invented price.",
        )}{" "}
        <bdi>{n(plan.target)}</bdi>
      </p>
    </div>
  );
}
