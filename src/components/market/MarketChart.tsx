import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  LineSeries,
  createSeriesMarkers,
  ColorType,
  LineStyle,
  type IChartApi,
  type ISeriesApi,
  type Time,
  type Logical,
  type UTCTimestamp,
} from "lightweight-charts";
import type { LabBar } from "../../utils/backtestEngine";
import type { Mark } from "../../utils/marketEngine";
import { useTranslation } from "../../i18n/TranslationProvider";
export const patternColors = {
  FVG: "#178667",
  OB: "#a96710",
  BOS: "#2563eb",
  Sweep: "#8758c9",
};
type Level = { label: string; price: number; color: string; locked?: boolean };
type Props = {
  bars: LabBar[];
  marks: Mark[];
  events: { index: number; label: string; color: string }[];
  fitRevision: number;
  levels: Level[];
  selected: number | null;
  focus: number | null;
  drawing: boolean;
  adjustable: boolean;
  showHandles?: boolean;
  onPoint: (index: number, price: number) => void;
  onLevel: (label: string, price: number) => void;
  onFocus: (index: number) => void;
};
/** Annotation text follows the theme; candle direction colours stay unchanged. */
function markerColor(color: string) {
  if (document.documentElement.dataset.theme !== "dark") return color;
  const role: Record<string, string> = { "#2563eb": "--wb-marker-blue", "#8758c9": "--wb-marker-violet", "#a96710": "--wb-marker-amber", "#cf4b59": "--wb-marker-red", "#178667": "--wb-marker-green" };
  return role[color] ? getComputedStyle(document.documentElement).getPropertyValue(role[color]).trim() : color;
}
function options() {
  const styles = getComputedStyle(document.documentElement);
  const paint = (token: string) => styles.getPropertyValue(token).trim();
  return {
    layout: {
      background: {
        type: ColorType.Solid,
        color: paint("--wb-chart-paper"),
      },
      textColor: paint("--wb-chart-ink"),
      fontFamily: styles.getPropertyValue("--font-sans").trim(),
      fontSize: 12,
      attributionLogo: true,
    },
    grid: {
      vertLines: { color: paint("--wb-chart-grid") },
      horzLines: { color: paint("--wb-chart-grid") },
    },
    rightPriceScale: {
      borderColor: paint("--wb-chart-rule"),
      scaleMargins: { top: 0.15, bottom: 0.14 },
    },
    timeScale: {
      borderColor: paint("--wb-chart-rule"),
      timeVisible: true,
      secondsVisible: false,
      rightOffset: 4,
    },
    localization: {
      locale: document.documentElement.lang === "ur" ? "ur-PK" : "en-US",
    },
  };
}
export default function MarketChart(props: Props) {
  const { t } = useTranslation();
  const root = useRef<HTMLDivElement>(null),
    api = useRef<IChartApi | null>(null),
    series = useRef<ISeriesApi<"Candlestick"> | null>(null),
    latest = useRef(props);
  latest.current = props;
  const [hover, setHover] = useState<number | null>(null),
    [error, setError] = useState(false),
    [ready, setReady] = useState(0),
    [markerTheme, setMarkerTheme] = useState(0),
    [boxes, setBoxes] = useState<
      { mark: Mark; x: number; y: number; w: number; h: number }[]
    >([]),
    [handles, setHandles] = useState<{ level: Level; y: number }[]>([]);
  const layout = useRef<() => void>(() => {}),
    drag = useRef<string | null>(null);
  useEffect(() => {
    if (!root.current) return;
    let frame = 0;
    try {
      const chart = createChart(root.current, {
        ...options(),
        autoSize: true,
        height: 420,
      });
      api.current = chart;
      const candles = chart.addSeries(CandlestickSeries, {
        upColor: "#13866a",
        downColor: "#d45459",
        wickUpColor: "#13866a",
        wickDownColor: "#d45459",
        borderVisible: false,
        lastValueVisible: true,
        priceFormat: { type: "price", precision: 5, minMove: 0.00001 },
        autoscaleInfoProvider: (base) => {
          const range = base();
          if (!range) return null;
          const prices = latest.current.levels.map((l) => l.price);
          if (prices.length)
            range.priceRange = {
              minValue: Math.min(range.priceRange.minValue, ...prices),
              maxValue: Math.max(range.priceRange.maxValue, ...prices),
            };
          return range;
        },
      });
      series.current = candles;
      layout.current = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const { marks, bars, levels } = latest.current;
          setBoxes(
            marks
              .filter((m) => m.index < bars.length)
              .map((mark) => {
                const x =
                    chart
                      .timeScale()
                      .logicalToCoordinate(
                        Math.max(0, mark.start ?? mark.index - 2) as Logical,
                      ) ?? 0,
                  end =
                    chart
                      .timeScale()
                      .logicalToCoordinate(
                        Math.min(
                          bars.length - 1,
                          mark.end ?? mark.index + 5,
                        ) as Logical,
                      ) ?? x + 30,
                  y = candles.priceToCoordinate(mark.high) ?? 0,
                  bottom = candles.priceToCoordinate(mark.low) ?? y;
                return {
                  mark,
                  x,
                  y,
                  w: Math.max(12, end - x),
                  h: Math.max(3, bottom - y),
                };
              }),
          );
          setHandles(
            levels.map((level) => ({
              level,
              y: candles.priceToCoordinate(level.price) ?? -100,
            })),
          );
        });
      };
      chart.subscribeClick((e) => {
        if (e.logical !== undefined && e.point) {
          const index = Math.round(Number(e.logical)),
            price = candles.coordinateToPrice(e.point.y);
          if (
            price !== null &&
            index >= 0 &&
            index < latest.current.bars.length
          )
            latest.current.onPoint(index, price);
        }
      });
      chart.subscribeCrosshairMove((e) => {
        if (e.logical !== undefined)
          setHover(
            Math.max(
              0,
              Math.min(
                latest.current.bars.length - 1,
                Math.round(Number(e.logical)),
              ),
            ),
          );
      });
      chart.timeScale().subscribeVisibleLogicalRangeChange(layout.current);
      const observer = new ResizeObserver(() => layout.current());
      observer.observe(root.current);
      const theme = new MutationObserver(() => {
        chart.applyOptions(options());
        setMarkerTheme((n) => n + 1);
        layout.current();
      });
      theme.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme", "lang"],
      });
      setReady((n) => n + 1);
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        theme.disconnect();
        chart.remove();
        api.current = null;
        series.current = null;
      };
    } catch {
      setError(true);
    }
  }, []);
  useEffect(() => {
    const precision = Math.min(
      12,
      Math.max(2, Math.ceil(-Math.log10(props.bars.at(-1)?.close ?? 1)) + 4),
    );
    series.current?.applyOptions({
      priceFormat: { type: "price", precision, minMove: 10 ** -precision },
    });
    series.current?.setData(
      props.bars.map((b) => ({
        ...b,
        time: (Date.parse(b.time) / 1000) as UTCTimestamp,
      })),
    );
    layout.current();
  }, [props.bars, ready]);
  useEffect(() => {
    const s = series.current,
      c = api.current;
    if (!s || !c) return;

    const marks = createSeriesMarkers(
      s,
      [
        ...props.marks
          .filter((m) => m.user)
          .map((m) => ({
            index: m.index,
            color: patternColors[m.kind],
            text: m.kind,
          })),
        ...props.events.map((m) => ({
          index: m.index,
          color: m.color,
          text: t(m.label),
        })),
      ]
        .filter((m) => props.bars[m.index])
        .sort((a, b) => a.index - b.index)
        .map((m) => ({
          time: (Date.parse(props.bars[m.index].time) / 1000) as UTCTimestamp,
          position: "aboveBar" as const,
          shape: "circle" as const,
          color: markerColor(m.color),
          text: m.text,
        })),
    );
    const priceLines = props.levels.map((l) =>
      s.createPriceLine({
        price: l.price,
        color: l.color,
        lineWidth: 2,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: t(l.label),
      }),
    );
    if (props.selected !== null && props.bars[props.selected])
      c.setCrosshairPosition(
        props.bars[props.selected].close,
        (Date.parse(props.bars[props.selected].time) / 1000) as UTCTimestamp,
        s,
      );
    layout.current();
    return () => {
      marks.detach();
      priceLines.forEach((l) => s.removePriceLine(l));
    };
  }, [
    props.bars,
    props.marks,
    props.levels,
    props.selected,
    props.events,
    markerTheme,
    ready,
    t,
  ]);
  useEffect(() => {
    const c = api.current;
    if (!c) return;
    if (props.focus !== null)
      c.timeScale().setVisibleLogicalRange({
        from: Math.max(
          0,
          Math.min(props.bars.length - 1, Math.max(0, props.focus)) - 12,
        ),
        to: Math.min(props.bars.length - 1, Math.max(0, props.focus)) + 8,
      });
    else c.timeScale().fitContent();
    layout.current();
  }, [props.focus, props.fitRevision, ready]);
  const current =
    props.bars[
      Math.min(
        hover ?? props.selected ?? props.bars.length - 1,
        props.bars.length - 1,
      )
    ];
  return (
    <div className="market-chart" dir="ltr">
      <div className="market-ohlc">
        {current && (
          <>
            <span>
              {new Date(current.time).toISOString().slice(11, 16)} UTC
            </span>
            {(["open", "high", "low", "close"] as const).map((k, i) => (
              <span key={k}>
                {["O", "H", "L", "C"][i]} <b>{Number(current[k].toFixed(5))}</b>
              </span>
            ))}
          </>
        )}
      </div>
      <div
        className="market-plot"
        data-drawing={props.drawing}
        onWheel={() => layout.current()}
        onPointerMove={(e) => {
          if (e.buttons) layout.current();
        }}
        onPointerUp={() => layout.current()}
        onDoubleClick={() => layout.current()}
      >
        <div
          ref={root}
          className="market-canvas"
          role="img"
          aria-label={t("Interactive candlestick chart")}
        />
        <div className="market-overlays">
          {boxes.map(({ mark, x, y, w, h }) => (
            <button
              type="button"
              key={mark.id}
              className="market-zone"
              title={t(mark.kind)}
              aria-label={`${t(mark.kind)} ${mark.index + 1}`}
              tabIndex={mark.user ? 0 : -1}
              style={{
                left: x,
                pointerEvents: mark.user && !props.drawing ? "auto" : "none",
                top: y,
                width: w,
                height: h,
                borderColor: patternColors[mark.kind],
                background: patternColors[mark.kind] + "22",
              }}
              onClick={() => props.onFocus(mark.index)}
            >
              {mark.kind}
            </button>
          ))}
          {props.showHandles !== false &&
            handles.filter(({ level }) => !level.locked).map(({ level, y }, index) => (
              <button
                type="button"
                className="market-price-handle"
                disabled={!props.adjustable || level.locked}
                key={level.label}
                aria-label={t("Drag price level") + " " + t(level.label)}
                style={{
                  top: y - 18,
                  left: `calc(${index} * (100% - 95px) / 3)`,
                  borderColor: markerColor(level.color),
                  color: markerColor(level.color),
                }}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  drag.current = level.label;
                }}
                onPointerMove={(e) => {
                  if (
                    drag.current !== level.label ||
                    !root.current ||
                    !series.current
                  )
                    return;
                  const price = series.current.coordinateToPrice(
                    e.clientY - root.current.getBoundingClientRect().top,
                  );
                  if (price !== null && price > 0)
                    props.onLevel(level.label, price);
                }}
                onPointerUp={() => {
                  drag.current = null;
                }}
                onPointerCancel={() => {
                  drag.current = null;
                }}
                onKeyDown={(e) => {
                  if (["ArrowUp", "ArrowDown"].includes(e.key)) {
                    e.preventDefault();
                    props.onLevel(
                      level.label,
                      level.price +
                        (e.key === "ArrowUp" ? 1 : -1) *
                          Math.max(Math.abs(level.price) * 0.0001, 0.00001),
                    );
                  }
                }}
              >
                {t(level.label)} <span>↕</span>
              </button>
            ))}
        </div>
      </div>
      {error && (
        <p role="alert">
          {t("Chart unavailable. Exact values remain available below.")}
        </p>
      )}
      <p className="market-credit">
        <a
          href="https://www.tradingview.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TradingView Lightweight Charts™
        </a>{" "}
        · Copyright (с) 2025 TradingView, Inc. ·{" "}
        <a href="/licenses/lightweight-charts-LICENSE.txt">Apache 2.0</a>
      </p>
    </div>
  );
}
export function EquityChart({
  values,
  envelope,
  onSelect,
}: {
  values: number[];
  envelope?: { low: number; high: number }[];
  onSelect: (index: number) => void;
}) {
  const { t } = useTranslation();
  const root = useRef<HTMLDivElement>(null),
    latest = useRef(onSelect);
  latest.current = onSelect;
  useEffect(() => {
    if (!root.current) return;
    const chart = createChart(root.current, {
      ...options(),
      autoSize: true,
      height: 170,
      timeScale: { visible: false },
    });
    const add = (data: number[], color: string, dashed = false) => {
      const s = chart.addSeries(LineSeries, {
        color,
        lineWidth: 2,
        lineStyle: dashed ? LineStyle.Dashed : LineStyle.Solid,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      s.setData(
        data.map((value, i) => ({
          time: (Date.UTC(2026, 0, 1) / 1000 + i * 60) as UTCTimestamp,
          value,
        })),
      );
    };
    add(values, "#2563eb");
    if (envelope) {
      add(
        envelope.map((x) => x.low),
        "#a6a9b3",
        true,
      );
      add(
        envelope.map((x) => x.high),
        "#a6a9b3",
        true,
      );
    }
    chart.timeScale().fitContent();
    chart.subscribeClick((e) => {
      if (e.logical !== undefined)
        latest.current(Math.max(0, Math.round(Number(e.logical)) - 1));
    });
    const theme = new MutationObserver(() => chart.applyOptions(options()));
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "lang"],
    });
    return () => {
      theme.disconnect();
      chart.remove();
    };
  }, [values, envelope]);
  return (
    <div
      ref={root}
      className="market-equity"
      role="img"
      aria-label={t("Cumulative net R; select a point to inspect its trade")}
    />
  );
}
