import React, { useEffect, useState } from 'react';
import { DrawingZoom, EditorialDrawing } from './EditorialDrawing';
import type { VisualSeries } from '../../data/articles';

type Beat = { title: string; joke: string; labels: [string, string]; steps: [string, string, string] };
const beat = (title: string, joke: string, left: string, right: string, a: string, b: string, c: string): Beat => ({ title, joke, labels: [left, right], steps: [a, b, c] });
const stories: Record<VisualSeries, Beat[]> = {
  expedition: [
    beat('Sam enters the acronym jungle', 'I packed every setup.', 'MORE LABELS', 'A CLEAR QUESTION', 'Sam arrives with a backpack full of unfamiliar chart labels.', 'The pile grows, but the study question remains blank.', 'Sam keeps one question and starts a smaller, repeatable study.'),
    beat('The compass is labeled contract specifications', 'How much is a point?', 'THE PRODUCT', 'THE PRICE MOVE', 'A move on a chart has a product-specific cash value.', 'Sam checks the instrument, venue, tick size and multiplier.', 'The map now names the market it describes. No imaginary universal contract is required.'),
    beat('One trail per study session', 'All trails before lunch?', 'MANY QUESTIONS', 'ONE OBSERVATION', 'Five signposts point toward five different study goals.', 'Sam chooses one defined condition and one observation window.', 'The other trails can wait. A smaller question can still produce a useful finding.'),
    beat('The field guide needs an actual definition', 'Clean-ish is not a unit.', 'SETUP NAME', 'WRITTEN RULE', 'A label marks a possible pattern without defining it.', 'Sam writes the boundaries, timeframe and confirmation time.', 'Another reader can now try the same rule and compare markings.'),
    beat('Tomorrow is not allowed on the expedition', 'No spoilers, candle.', 'KNOWN NOW', 'HIDDEN FUTURE', 'The completed chart wants to reveal the ending.', 'Sam covers future bars and records a decision before advancing.', 'The observation uses only information available at that moment.'),
    beat('The notebook refuses a glamour filter', 'Please keep the failures.', 'THE NICE EXAMPLE', 'THE WHOLE LOG', 'One attractive screenshot goes into the notebook.', 'The missed conditions and failures join it.', 'The record is more representative than a collection of favorites.'),
    beat('A routine fits in a sensible backpack', 'The kitchen sink can stay.', 'PREPARE', 'REVIEW', 'Sam prepares one study task instead of an entire trading career.', 'A separate review checks the definitions and disagreements.', 'The next session begins with a useful question rather than a new pile of labels.'),
    beat('The finish line says not yet', 'No setup. Still learning.', 'PRESS A BUTTON?', 'RECORD THE ABSENCE', 'No qualifying condition appears during the selected window.', 'Sam records a no-setup session.', 'Recognizing absence is a learning outcome. A trade is not compulsory.')
  ],
  mission: [
    beat('Mission control gets an exit door', 'Bullish is not furniture.', 'THE EXPECTATION', 'THE EVIDENCE', 'The captain announces a directional expectation.', 'The crew writes the condition that would weaken it.', 'The exit door stays usable when the evidence changes.'),
    beat('Three screens, three jobs', 'Who hired twelve monitors?', 'CONTEXT', 'TRIGGER', 'A broad chart describes location and structure.', 'An intermediate chart defines the event under study.', 'The execution chart still needs an observable trigger. The screens do not vote a trade into existence.'),
    beat('The ruler files its flight plan', 'Please stop moving the moon.', '100 TO 120', 'MIDPOINT 110', 'The fictional reference range has a low of 100 and a high of 120.', 'Its midpoint is 110, so 106 lies in the lower half.', 'Changing the anchors changes the coordinates. It does not change the arithmetic.'),
    beat('The neutral light finally gets a shift', 'WAIT is a real setting.', 'CONDITIONAL CASE', 'INVALIDATION', 'The crew names a possible destination and required conditions.', 'Contradictory evidence gets a defined boundary.', 'When neither case is supported, the control panel can show WAIT.'),
    beat('The small chart requests clearance', 'Destination is not entry.', 'BROAD SCENARIO', 'LOCAL SEQUENCE', 'A larger scenario suggests a possible direction.', 'The selected lower-timeframe sequence has not yet completed.', 'The crew waits. A destination can be reached without this particular entry ever appearing.'),
    beat('Risk control has a separate circuit', 'Confidence is not a size.', 'CONVICTION', 'CASH EXPOSURE', 'The captain feels increasingly certain.', 'Risk control checks distance, size, multiplier and costs.', 'The cash calculation does not gain a confidence button.'),
    beat('The flight recorder has no eraser', 'Timestamp the new opinion.', 'ORIGINAL VIEW', 'REVISED VIEW', 'The morning scenario is stored with its timestamp.', 'New evidence changes the view later in the session.', 'Both versions remain in the log. The afternoon does not rewrite the morning.'),
    beat('The intern returns the enormous printer', 'A five-line plan will do.', 'PREPARATION', 'REVIEW', 'The crew records context, destination, trigger, invalidation and exclusions.', 'The session produces observations rather than a guaranteed result.', 'The compact plan survives review better than a wall-sized prediction.')
  ],
  museum: [
    beat('The museum bans unlabeled rectangles', 'Is this one institutional?', 'THE DRAWING', 'THE CLAIM', 'A visitor admires a shaded price zone.', 'The guide asks for its definition and boundaries.', 'The exhibit can describe price without claiming to identify its participants.'),
    beat('Premium gets a reference label', 'Relative to which range?', 'SELECTED ANCHORS', 'RELATIVE LOCATION', 'The guide selects a range from 100 to 120.', 'A level is classified relative to its midpoint of 110.', 'Another range can classify the same price differently. The label needs its anchors.'),
    beat('The middle candle objects', 'I traded there, actually.', 'OUTER CANDLES', 'MIDDLE CANDLE', 'The first and third candle ranges do not overlap in the selected interval.', 'The middle candle may still have traded across that interval.', 'An FVG drawing does not establish that no transactions occurred there.'),
    beat('The detective hat is decorative', 'No investor register inside.', 'CANDLE ZONE', 'UNKNOWN INVENTORY', 'A candle-based reference is marked using a stated convention.', 'The visitor guesses who owned the trades.', 'The drawing does not reveal participant identities or verify their remaining inventory.'),
    beat('The failed exhibit keeps its old label', 'No retroactive masterpiece.', 'FIRST HYPOTHESIS', 'NEW HYPOTHESIS', 'A zone fails under the written condition.', 'A separately defined inversion hypothesis may then be studied.', 'The new label does not delete the original failure.'),
    beat('Four labels share one display case', 'We are the same candles.', 'MANY NAMES', 'SHARED INPUTS', 'One price leg receives several different chart labels.', 'The guide notices that the labels share their underlying observations.', 'Confluence is not automatically independent evidence.'),
    beat('A specimen card beats a dramatic spotlight', 'Please include the awkward one.', 'THE RULE', 'ALL QUALIFIERS', 'A card records formation, boundaries and expiry.', 'The collection includes failures and zones never revisited.', 'The collection can now support a more honest descriptive study.'),
    beat('The gift shop stops selling certainty', 'We still have pencils.', 'DESCRIPTION', 'PREDICTION?', 'The exhibit explains an observed structure.', 'A visitor asks whether it guarantees the next move.', 'The guide offers a study question instead. The certainty shelf remains empty.')
  ],
  theatre: [
    beat('The bell rings. Nobody orders a trade.', 'It is not a delivery driver.', 'OPENING BELL', 'YOUR CONDITION', 'A session begins and the fictional trader reaches for the keyboard.', 'The stage manager checks whether a defined setup exists.', 'Hearing a bell does not make participation compulsory.'),
    beat('The clocks rehearse together', 'EST has a summer understudy.', 'NEW YORK TIME', 'DATE-AWARE CLOCK', 'A fixed offset labels the chart throughout the year.', 'The stage manager checks standard time, daylight time and the date.', 'The named timezone keeps the observation aligned with New York wall-clock time.'),
    beat('The gap and range refuse to share a costume', 'We are different props.', 'TWO REFERENCES', 'A TIME WINDOW', 'The gap compares a chosen previous reference with the new opening reference.', 'The opening range uses highs and lows from a defined observation window.', 'The two measurements keep separate definitions even when drawn on the same chart.'),
    beat('The final range arrives after its scene', 'No borrowing the last act.', '9:42 OBSERVATION', '10:00 RANGE END', 'The thirty-minute range is still developing at 9:42.', 'Its final high and low become available only after the selected window ends.', 'A rule requiring the completed range cannot use its final boundaries early.'),
    beat('The projection removes its lab coat', 'A ruler is not a probability.', 'WIDTH: 8', 'HALF-WIDTH: 4', 'A fictional completed range runs from 100 to 108.', 'A half-width extension above 108 is 112.', 'The arithmetic does not supply a probability or a statistical standard deviation.'),
    beat('The director approves a third ending', 'Nothing happens is a plot.', 'CONTINUE', 'REVERSE OR WAIT', 'Price approaches the selected boundary.', 'Continuation and reversal need their own definitions.', 'The session may satisfy neither. An inconclusive path remains in the record.'),
    beat('The ticket is not a fill receipt', 'A touch cannot sign for it.', 'PRICE TOUCH', 'EXECUTABLE ORDER', 'A historical bar touches the hypothetical entry level.', 'The study checks timing, costs and the order-fill assumption.', 'The touch alone does not establish that the desired quantity could execute there.'),
    beat('The stage manager closes the script', 'The market owes no encore.', 'PREPARE', 'OBSERVE', 'The session card defines the window and conditions.', 'The trader observes the path without editing the rules afterward.', 'A no-trade session can complete the study just as honestly as an active one.')
  ],
  laboratory: [
    beat('The Unicorn requests peer review', 'The horn is not evidence.', 'MODEL NAME', 'WRITTEN RULE', 'Five named models arrive with memorable branding.', 'The technician asks each for a complete decision rule.', 'The models receive the same information and evaluation conditions.'),
    beat('The clipboard has separate compartments', 'Context goes in this drawer.', 'CONTEXT', 'EXECUTION', 'A broader scenario describes the setting.', 'The trigger, order, exit and expiry are written separately.', 'An entry shape cannot quietly stand in for the rest of the process.'),
    beat('OTE brings a measuring tape', 'Optimal is a name, not a vow.', '100 TO 120', 'RETRACEMENT BAND', 'The invented upward leg advances twenty units.', 'Retracing 62–79% measures a band from 107.6 down to 104.2.', 'The measurement is correct under those anchors. A profitable reaction remains unproven.'),
    beat('The ingredients demand timestamps', 'Please stop shuffling us.', 'REQUIRED ORDER', 'KNOWN AT THE TIME', 'The chart contains several ingredients of a model.', 'The technician checks their order and recognition times.', 'An ingredient that occurred too early or was known too late does not satisfy a different sequence.'),
    beat('The receipt printer declines a candle', 'Touch detected. Fill unknown.', 'PLANNED DISTANCE', 'ACTUAL ASSUMPTIONS', 'Entry 105, assumed exit 102 and target 111 describe 3 units of risk and 6 of reward.', 'The technician adds quantity, costs and an order-fill convention.', 'The resulting 2R price-distance ratio is neither a win probability nor a guaranteed fill.'),
    beat('The favorite model gets a sealed exam', 'No peeking at the answers.', 'DEVELOPMENT', 'UNSEEN CHECK', 'Earlier sessions help develop the written rule.', 'Later, unseen sessions challenge it.', 'If the rule changes after seeing the check, preserve that result and seek a new independent check.'),
    beat('The rejected experiments return', 'We would like a footnote.', 'SELECTED WINNER', 'ALL ATTEMPTS', 'One combination looks best among many attempted variations.', 'The technician records the rejected combinations too.', 'Extensive searching increases the chance of selecting a historical fluke.'),
    beat('The mascot hands over the grade book', 'I can keep the tiny horn?', 'MEMORABLE NAME', 'EVIDENCE', 'A model can be easy to remember and still fail a careful study.', 'The technician records the assumptions, findings and uncertainty.', 'The mascot keeps its costume. It does not grade its own exam.')
  ]
};

export function StudySketchSvg({ series, index = 0, step = 0 }: { series: VisualSeries; index?: number; step?: number }) {
  const item = stories[series][index];
  return <EditorialDrawing series={series} index={index} step={step} title={item.title} description={item.steps[step]} />;
}

export function StudySketch({ series, index, staticMode = false }: { series: VisualSeries; index: number; staticMode?: boolean }) {
  const [step, setStep] = useState(0), [playing, setPlaying] = useState(false);
  const item = stories[series][index];
  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPlaying(false); return; }
    if (step === 2) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setStep(s => s + 1), 2600);
    return () => window.clearTimeout(timer);
  }, [playing, step]);
  return <figure className={`article-sketch study-sketch study-sketch-${series}`}>
    <StudySketchSvg series={series} index={index} step={step} />
    <figcaption><strong>{item.title}</strong><p aria-live={playing?'off':'polite'}>{item.steps[step]}</p></figcaption>
    {!staticMode && <div className="sketch-controls" role="group" aria-label={`${item.title}: illustration controls`}>
      {item.steps.map((_,i)=><button type="button" key={i} aria-label={`Show illustration step ${i+1}`} aria-pressed={step===i} onClick={()=>{setPlaying(false);setStep(i);}}>{i+1}</button>)}
      <button type="button" onClick={()=>{if(playing)setPlaying(false);else{setStep(0);setPlaying(true);}}}>{playing?'Pause sketch':'Play sketch'}</button>
      <DrawingZoom series={series} index={index} step={step} title={item.title} description={item.steps[step]} />
    </div>}
    <details><summary>Read all three steps</summary><ol>{item.steps.map(s=><li key={s}>{s}</li>)}</ol></details>
  </figure>;
}
