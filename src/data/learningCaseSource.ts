import type {LabBar} from '../utils/backtestEngine';
import type {LearningCase} from './learningCases';
const opening = [
  [103, 104, 102, 103.4],
  [103.4, 105, 103, 104.5],
  [104.5, 106, 104, 105.5],
  [105.5, 105.8, 103.5, 104],
  [104, 104.4, 101.5, 102],
  [102, 103, 100, 101],
  [101, 103.5, 100.8, 103],
  [103, 104.2, 102.2, 103.7],
  [103.7, 104, 101.7, 102.2],
  [102.2, 102.7, 100.8, 101.3],
  [101.3, 101.7, 98.4, 100.7],
  [100.7, 101.2, 99.4, 100.2],
  [100.2, 104.8, 100.1, 104.6],
  [104.6, 105.6, 103.3, 105],
];
const follow = [
  [105, 105.4, 102.1, 103],
  [103, 103.4, 101.8, 102.7],
  [102.7, 104.9, 102.4, 104.6],
  [104.6, 106.5, 104.3, 106.1],
  [106.1, 107.4, 105.7, 106.8],
  [106.8, 108.4, 106.3, 107.7],
  [107.7, 109.1, 107, 108.5],
  [108.5, 110.4, 108.1, 110.1],
];
const losing = [
  ...follow.slice(0, 2),
  [102.7, 103, 100.9, 101.2],
  [101.2, 101.6, 99.3, 99.7],
  [99.7, 100.2, 97.7, 98.1],
  [98.1, 99, 97.5, 98.4],
];
const noReturn = [
  [105, 106.5, 104.5, 106],
  [106, 107.5, 105.5, 107],
  [107, 108.5, 106.5, 108],
  [108, 109.5, 107.5, 109],
  [109, 110.5, 108.5, 110],
];
function make(
  id: string,
  name: string,
  tail = follow,
  side: "long" | "short" = "long",
  complete = true,
  bias = side,
): LearningCase {
  const rows = complete
    ? [...opening, ...tail]
    : [
        ...opening.slice(0, 12),
        [100.2, 102.2, 99.8, 101.4],
        [101.4, 102, 100.5, 101],
        [101, 101.5, 99, 99.5],
        [99.5, 100, 97.8, 98.5],
      ];
  const bars = rows.map(([open, high, low, close], i) => ({
    time: new Date(Date.UTC(2026, 0, 6, 14, i * 5)).toISOString(),
    ...(side === "long"
      ? { open, high, low, close }
      : {
          open: 210 - open,
          high: 210 - low,
          low: 210 - high,
          close: 210 - close,
        }),
  }));
  const htfRows = [
    [94, 100, 93, 99],
    [99, 100, 95, 96],
    [96, 104, 95.5, 103],
    [103, 104, 98, 99],
    [99, 110, 98.5, 108],
    [108, 109, 101, 103],
  ];
  const mirror = bias === "short" ? (side === "short" ? 210 : 206) : null;
  const htfBars = htfRows.map(([open, high, low, close], i) => ({
    time: new Date(Date.UTC(2026, 0, 6, 8 + i)).toISOString(),
    ...(mirror === null
      ? { open, high, low, close }
      : {
          open: mirror - open,
          high: mirror - low,
          low: mirror - high,
          close: mirror - close,
        }),
  }));
  return {
    id,
    name,
    side,
    bias,
    bars,
    htfBars,
    contextTarget: mirror === null ? 110 : mirror - 110,
    contextSwing: mirror === null ? 98 : mirror - 98,
    entry: side === "long" ? 102 : 108,
    stop: side === "long" ? 98 : 112,
    target: side === "long" ? 110 : 100,
  };
}
export const learningCases: LearningCase[] = [
  make("a", "Case A"),
  make("b", "Case B", losing),
  make("c", "Case C", follow, "long", false),
  make("d", "Case D", follow, "short"),
  make("e", "Case E", noReturn),
  make("f", "Case F", follow, "long", true, "short"),
];
