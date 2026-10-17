import React, { useEffect, useState } from 'react';
import { DrawingZoom, EditorialDrawing } from './EditorialDrawing';
import type { SketchKind } from '../../data/articles';

type Scene = 'cards' | 'sample' | 'pause' | 'journal' | 'bridge' | 'budget' | 'fork' | 'lens';
type Moment = { title: string; scene: Scene; labels: [string, string]; frames: [string, string, string] };
const moment = (title: string, scene: Scene, left: string, right: string, a: string, b: string, c: string): Moment => ({ title, scene, labels: [left, right], frames: [a, b, c] });

/** Seven new moments plus each essay's original three-step explainer = eight figures. */
const moments: Record<SketchKind, Moment[]> = {
  decision: [
    moment('The brain meets a red number', 'cards', 'THE DECISION', 'THE OUTCOME', 'Our fictional trader sees a loss and immediately judges the whole decision.', 'The written plan and the result are separate records. One does not replace the other.', 'Review the action against the plan before asking what the outcome teaches you.'),
    moment('One trade tries to chair the entire meeting', 'sample', 'ONE RESULT', 'MANY OBSERVATIONS', 'A single outcome has a very loud voice and very little company.', 'A series supplies more observations, provided conditions and records are comparable.', 'A larger sample can still be biased. Record costs and rule changes instead of declaring proof.'),
    moment('The revenge button has excellent marketing', 'pause', 'FIX IT NOW!', 'PAUSE FIRST', 'A loss can create an urge to recover money immediately.', 'The trader steps away from the button rather than increasing risk to satisfy the feeling.', 'A pause is a behavior rule, not a promise that the next trade will win.'),
    moment('Give your journal two columns', 'journal', 'WHAT I PLANNED', 'WHAT I DID', 'Write the conditions and risk before entering the fictional trade.', 'Afterward, record the action actually taken, including deviations and costs.', 'Compare the columns. A profitable deviation still needs to be acknowledged.'),
    moment('A small review beats a dramatic verdict', 'lens', 'THE RECORD', 'ONE QUESTION', 'The trader brings a recorded example to a scheduled review.', 'Ask whether the action followed the written conditions and sizing assumptions.', 'Choose one specific behavior to examine next. Avoid rewriting the whole process after one result.'),
    moment('Uncertainty gets its own chair', 'fork', 'FOLLOWED PLAN', 'UNKNOWN NEXT RESULT', 'Following a plan does not remove uncertainty.', 'Several future outcomes remain possible after a careful decision.', 'The plan itself also needs evidence. Discipline cannot turn an untested idea into an edge.'),
    moment('Leave with two report cards', 'cards', 'PROCESS REVIEW', 'OUTCOME REVIEW', 'Keep a record of decision quality.', 'Keep a separate record of financial results, including costs.', 'Use both records over time. Neither deserves to disappear because the other feels uncomfortable.')
  ],
  drawdown: [
    moment('The percentage forgot its starting point', 'cards', 'START: 100', 'AFTER LOSS: 80', 'The fictional account starts at 100 and loses 20.', 'The remaining balance is 80, so the next percentage applies to a smaller base.', 'Returning to 100 requires 20 / 80 = 25%, before costs. These are arithmetic examples.'),
    moment('Two sizing rules walk into the same losing streak', 'budget', 'FIXED AMOUNT', 'CURRENT BALANCE %', 'A fixed cash loss removes the same amount each time under the example assumptions.', 'A percentage of current equity changes the amount as the balance changes.', 'State which convention you use. The two paths cannot be compared as if they were identical.'),
    moment('Margin is a doorway, not a risk budget', 'budget', 'CAN OPEN', 'PLANNED LOSS', 'Available margin may permit a position to be opened.', 'Estimated loss depends on the instrument, size, exit assumption and costs.', 'Check whole-contract increments and actual specifications. Permission to open is not a loss limit.'),
    moment('The stop sign meets a gap', 'bridge', 'INTENDED EXIT', 'ACTUAL FILL?', 'A stop price marks an instruction under the relevant product rules.', 'A gap or fast market can produce a different execution price; some order types may not fill.', 'Stress the sizing assumption with worse exits. The drawing illustrates uncertainty, not expected slippage.'),
    moment('Five tickets, one shared driver', 'sample', 'SEPARATE TRADES', 'SHARED EXPOSURE', 'Several positions can look separate in a trade list.', 'They may respond to the same market event or underlying driver.', 'Review combined exposure. Counting tickets does not establish diversification.'),
    moment('The calculator asks for assumptions', 'journal', 'INPUTS', 'LIMITS', 'Write the balance, risk convention, multiplier and costs.', 'Calculate using those stated assumptions and valid size increments.', 'Keep execution limits beside the result. A precise number can still depend on uncertain inputs.'),
    moment('Recovery is arithmetic, not a deadline', 'pause', 'RECOVER TODAY?', 'REVIEW THE BUDGET', 'The account balance does not create an obligation for the market to pay it back.', 'The trader reviews exposure instead of inventing a recovery deadline.', 'A smaller risk budget can limit planned exposure; it cannot guarantee recovery or prevent every loss.')
  ],
  auction: [
    moment('Price receives a magnet costume', 'lens', 'WHAT WE SAW', 'WHAT WE INFERRED', 'The chart shows a move through a prior high.', 'Calling the level a magnet adds an explanation that the chart alone cannot verify.', 'Separate the observed move from a hypothesis about orders or institutional intent.'),
    moment('The visible order and the possible stop', 'cards', 'RESTING OFFER', 'POSSIBLE STOP', 'A resting sell limit offers liquidity at a specified price while it remains available.', 'A possible stop is conditional; its exact location and execution may be unknown.', 'Do not draw both as confirmed orders just because a level looks interesting.'),
    moment('The same high has more than one ending', 'fork', 'CONTINUATION', 'REVERSAL', 'Price moves beyond a previous high in this fictional sketch.', 'The move could continue, or it could reverse. The crossing alone does not settle it.', 'Define the later observation that would distinguish the outcomes before looking ahead.'),
    moment('One chart, several possible venues', 'sample', 'YOUR FEED', 'OTHER VENUES', 'A displayed quote belongs to a particular product and data feed.', 'Some markets are fragmented, so one view may not represent every available order.', 'Name the instrument and venue before making claims about the whole market.'),
    moment('Trade the magnet for a notebook', 'journal', 'DEFINED EVENT', 'RECORDED RESULT', 'Specify the level, crossing condition, time window and invalidation in advance.', 'Record all qualifying examples and costs, including the inconvenient ones.', 'A reproducible observation is more useful than selecting a dramatic screenshot afterward.'),
    moment('A question mark can be useful equipment', 'lens', 'KNOWN', 'NOT OBSERVABLE', 'The trader lists observable prices and executions.', 'The trader leaves hidden intentions in the unknown column.', 'Uncertainty is a reason to qualify an explanation, not to invent a more confident story.'),
    moment('Put the explanation on trial', 'cards', 'HYPOTHESIS', 'COUNTEREXAMPLE', 'Write the proposed explanation in terms that could be checked.', 'Look for cases where the expected behavior does not occur.', 'The goal is a better model of the evidence. No drawing here establishes a profitable strategy.')
  ],
  onchain: [
    moment('The dashboard tries on a wizard hat', 'lens', 'MEASUREMENT', 'PREDICTION?', 'A dashboard summarizes a defined dataset.', 'Its color or ratio does not supply tomorrow’s price.', 'Start by asking what is measured, how it is calculated, and what it leaves out.'),
    moment('Two gauges share an engine', 'cards', 'MVRV = 2', 'NUPL = 0.5', 'In the fictional network, market value is 120 and realized value is 60.', 'MVRV is 120 / 60 = 2; NUPL is (120 − 60) / 120 = 0.5.', 'With matching inputs, NUPL = 1 − 1 / MVRV. These gauges are not independent confirmations.'),
    moment('A map is not a buy button', 'fork', 'MARKET CONTEXT', 'ENTRY DECISION', 'A metric may help describe historical network conditions.', 'An entry decision also involves price, timing, execution and a risk assumption.', 'A contextual observation does not become an entry trigger by being placed beside a chart.'),
    moment('Read the small label first', 'journal', 'DEFINITION', 'VARIANT + DATE', 'Read the provider’s definition before interpreting the value.', 'Check entity adjustments, filters, update times and methodology changes.', 'Compare like with like. A matching metric name does not guarantee matching inputs.'),
    moment('Follow the source, not the screenshot', 'bridge', 'DASHBOARD', 'PRIMARY DEFINITION', 'A dashboard can suggest a question worth researching.', 'Trace the metric to its definition and any stated data limitations.', 'Create an original explanation and cite the source. Access to a page does not grant reuse rights.'),
    moment('One movement, several possible reasons', 'sample', 'ON-CHAIN MOVE', 'PURCHASE? TRANSFER?', 'A coin moves between transaction outputs.', 'The movement could reflect a transfer rather than a purchase at that price.', 'Movement-based valuation is a model. Avoid presenting it as every holder’s verified cost basis.'),
    moment('Leave the crystal ball unplugged', 'pause', 'CERTAIN FORECAST', 'BETTER QUESTION', 'A vivid chart can make a conclusion feel more certain than the data supports.', 'The trader writes down a question and the evidence needed to investigate it.', 'Keep the metric, its assumptions and its limits together. No live readings or forecasts are supplied here.')
  ]
};

export function ArticleMoment({ kind, index, staticMode = false }: { kind: SketchKind; index: number; staticMode?: boolean }) {
  const item = moments[kind][index];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPlaying(false); return; }
    if (step === 2) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setStep(s => s + 1), 2600);
    return () => window.clearTimeout(timer);
  }, [playing, step]);
  return <figure className="article-sketch article-moment">
    <EditorialDrawing series={kind} index={index === 0 ? 0 : index + 1} step={step} title={item.title} description={item.frames[step]} />
    <figcaption><strong>{item.title}</strong><p aria-live={playing ? 'off' : 'polite'}>{item.frames[step]}</p></figcaption>
    {!staticMode && <div className="sketch-controls" role="group" aria-label={`${item.title}: illustration controls`}>
      {item.frames.map((_, i) => <button type="button" key={i} aria-label={`Show illustration step ${i + 1}`} aria-pressed={step === i} onClick={() => { setPlaying(false); setStep(i); }}>{i + 1}</button>)}
      <button type="button" onClick={() => { if (playing) setPlaying(false); else { setStep(0); setPlaying(true); } }}>{playing ? 'Pause sketch' : 'Play sketch'}</button>
      <DrawingZoom series={kind} index={index === 0 ? 0 : index + 1} step={step} title={item.title} description={item.frames[step]} />
    </div>}
    <details><summary>Read all three steps</summary><ol>{item.frames.map(frame => <li key={frame}>{frame}</li>)}</ol></details>
  </figure>;
}
