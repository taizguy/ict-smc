import {
  runFvgTest,
  testSummary,
  type LabBar,
  type TestRule,
} from "../utils/backtestEngine";
self.onmessage = (
  event: MessageEvent<{ id: number; bars: LabBar[]; rule: TestRule }>,
) => {
  const { id, bars, rule } = event.data,
    split = Math.floor(bars.length * 0.7);
  const training = runFvgTest(bars.slice(0, split), rule),
    heldout = runFvgTest(bars.slice(split), rule);
  const sensitivity = [1, 1.5, 2, 2.5, 3].map((reward) => {
    const trades = runFvgTest(bars.slice(split), { ...rule, reward });
    return { reward, net: testSummary(trades).net, trades: trades.length };
  });
  // Reordering fixed R outcomes changes the path, not their sum. These are
  // permutation path envelopes, NOT confidence intervals or significance tests.
  const returns = testSummary(heldout).known.map((x) => x.result!);
  let seed = 931;
  const paths = Array.from({ length: 100 }, () => {
    const v = [...returns];
    for (let i = v.length - 1; i > 0; i--) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const j = seed % (i + 1);
      [v[i], v[j]] = [v[j], v[i]];
    }
    let sum = 0;
    return [0, ...v.map((r) => (sum += r))];
  });
  const envelope = Array.from({ length: returns.length + 1 }, (_, i) => {
    const values = paths.map((p) => p[i]).sort((a, b) => a - b);
    return { low: values[5], high: values[94] };
  });
  self.postMessage({ id, training, heldout, split, sensitivity, envelope });
};
