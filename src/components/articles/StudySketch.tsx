import React, { useEffect, useId, useState } from 'react';
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

const palette: Record<VisualSeries, { ink: string; accent: string; soft: string; name: string }> = {
  expedition: { ink: '#314c35', accent: '#697844', soft: '#edf3e9', name: 'Pencil field expedition' },
  mission: { ink: '#29455e', accent: '#287b91', soft: '#eaf4f8', name: 'Mission-control comic' },
  museum: { ink: '#5b4331', accent: '#a57638', soft: '#faf1df', name: 'Museum sketchbook' },
  theatre: { ink: '#603a3c', accent: '#a44350', soft: '#fcf0ed', name: 'Opening-bell theatre' },
  laboratory: { ink: '#4d4269', accent: '#785cab', soft: '#f1eef8', name: 'Graph-paper laboratory' }
};

function Character({ series, step, x = 155, y = 225 }: { series: VisualSeries; step: number; x?: number; y?: number }) {
  const p = palette[series];
  return <g transform={`translate(${x + step * 7} ${y})`} stroke={p.ink} strokeWidth={series === 'expedition' ? 2.6 : 3.6} strokeLinecap="round" strokeLinejoin="round" fill="none">
    {series === 'museum' ? <ellipse cy="-59" rx="20" ry="23" fill="white" /> : <circle cy="-59" r={series === 'mission' ? 25 : 21} fill="white" />}
    <path d="M0-37v57m0 0-24 40m24-40 26 40" />
    <path d={step === 0 ? 'M0-20-29 1m29-21 30 4' : step === 1 ? 'M0-20-26-39-36-56m36 36 29-40' : 'M0-20-23 4m23-24 29-14 18-20'} />
    <path d="M-8-62h1m13 0h1M-7-49q7 7 14 0" strokeWidth="2" />
    {series === 'expedition' && <><path d="M-29-77h56M-19-78l6-16h22l8 16" fill={p.soft} /><rect x="-24" y="-31" width="19" height="40" rx="6" fill={p.soft} /></>}
    {series === 'mission' && <><rect x="-18" y="-74" width="36" height="20" rx="8" fill={p.soft} /><path d="M-16-33h32v40h-32Z" fill={p.soft} /><circle cx="5" cy="-17" r="4" fill={p.accent} /></>}
    {series === 'museum' && <><path d="M-27-79h54m-43 0v-21h31v21" fill={p.soft} /><path d="m-7-27 7 8 7-8M-4-19v14" stroke={p.accent} /></>}
    {series === 'theatre' && <><path d="m-8-31 8 8 8-8M0-23v14" stroke={p.accent} /><path d="m-23 60h-13m62 0h13" /></>}
    {series === 'laboratory' && <><path d="m-14-34-9 54 23-7 23 7-9-54" fill={p.soft} /><path d="M-18-65h15v13h-15Zm21 0h15v13H3Zm-6 6h6" strokeWidth="2" /></>}
  </g>;
}

/** Original SVG scenes. Each series uses its own characters, props and visual language. */
export function StudySketchSvg({ series, index = 0, step = 0 }: { series: VisualSeries; index?: number; step?: number }) {
  const p = palette[series], item = stories[series][index], id = useId();
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" width="720" height="360" className="article-sketch-svg" role="img" aria-labelledby={id}>
    <title id={id}>{`${p.name}: ${item.title}. ${item.steps[step]}`}</title>
    <rect width="720" height="360" fill="white" rx="12" />
    {series === 'expedition' && <g stroke={p.accent} strokeWidth="1.5" fill="none"><path d="M25 290 85 108 166 286 249 161 329 290" opacity=".2" /><path d="M38 305Q160 265 290 302T675 285" strokeDasharray="3 9" /><path d="M34 319q330-9 650 0" /><path d="M290 97 652 84 660 266 282 278Z" fill={p.soft} />{[0,1,2].map(i=><path key={i} d={`M${320+i*95} 115q-30 65 20 120`} opacity=".4" />)}<path d={`M317 237q55-${40+index*3} 100-20t${100+step*30}-50`} strokeWidth="4" /><circle cx={417+step*50} cy={217-step*25} r="8" fill={p.accent} /></g>}
    {series === 'mission' && <g stroke={p.ink} strokeWidth="2" fill="none"><rect x="282" y="82" width="380" height="179" rx="18" fill={p.soft} /><circle cx="352" cy="155" r="46" /><ellipse cx="352" cy="155" rx="62" ry="19" transform="rotate(-24 352 155)" /><circle cx={325+step*24} cy={126+step*13} r="7" fill={p.accent} />{[0,1,2].map(i=><g key={i}><rect x="447" y={112+i*41} width="176" height="25" rx="5" /><rect x="450" y={115+i*41} width={30+(step+i+index)%5*27} height="19" rx="3" fill={p.accent} opacity=".35" /></g>)}<path d="M304 262v35h330v-35M442 297v22m51-22v22" /><path d="M32 319h650" strokeDasharray="2 7" /></g>}
    {series === 'museum' && <g stroke={p.ink} fill="none"><path d="M31 318h651" />{[285,490].map((x,i)=><g key={x}><rect x={x} y="91" width="168" height="156" strokeWidth="7" stroke={p.accent} /><rect x={x+11} y="102" width="146" height="134" fill={p.soft} /><path d={`M${x+25} 200l28-${30+(index%3)*8} 30 18 35-${45+step*8} 23 20`} strokeWidth="4" />{step===2&&<path d={`m${x+105} 212 10 9 17-20`} stroke={p.accent} strokeWidth="3" />}<rect x={x+30} y="269" width="108" height="19" fill="white" /><path d={`M${x+84} 289v29`} /></g>)}</g>}
    {series === 'theatre' && <g stroke={p.ink} strokeWidth="2" fill="none"><path d="M20 86h680v222H20Z" /><path d="M20 86q50 85 108 0v189q-55-40-108 10ZM700 86q-50 85-108 0v189q55-40 108 10Z" fill={p.accent} opacity=".18" /><path d="M20 307h680v18H20Z" fill={p.soft} /><circle cx="460" cy="171" r="66" fill={p.soft} /><path d={`M460 171v-43m0 43 ${step===0?'29-18':step===1?'35 11':'-26 27'}`} strokeWidth="5" /><path d="M351 262h218" />{[0,1,2,3].map(i=><circle key={i} cx={360+i*66} cy="290" r="5" fill={step===i%3?p.accent:'white'} />)}</g>}
    {series === 'laboratory' && <g stroke={p.ink} strokeWidth="2" fill="none">{Array.from({length:17},(_,i)=><path key={i} d={`M${28+i*40} 85v225`} opacity=".07" />)}{[0,1,2,3,4,5].map(i=><path key={i} d={`M28 ${88+i*40}h660`} opacity=".07" />)}<path d="M272 270h390v17H272Z" fill={p.soft} /><path d="M297 287v33m340-33v33" />{[0,1,2].map(i=><g key={i}><path d={`M${315+i*118} 122v52l-27 66q-4 14 12 14h60q16 0 12-14l-27-66v-52`} fill={p.soft} /><path d={`M${309+i*118} 122h42M${300+i*118} 218h62`} /><circle cx={326+i*118} cy={234-step*13-i*4} r="8" fill={p.accent} opacity=".45" />{step===2&&<path d={`m${322+i*118} 105 7 6 11-15`} stroke={p.accent} />}</g>)}{index===0&&<path d="m142 135 13-26 6 29" fill={p.soft} />}</g>}
    <Character series={series} step={step} x={series==='theatre'?195:153} />
    <g fontFamily="sans-serif" textAnchor="middle" fill={p.ink}>
      <rect x="190" y="12" width="470" height="47" rx={series==='mission'?8:20} fill={p.soft} />
      <text x="425" y="42" fontSize="19">{item.joke}</text>
      <text x="370" y="344" fontSize="15" fontWeight="600">{item.labels[step === 0 ? 0 : 1]}</text>
    </g>
  </svg>;
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
    </div>}
    <details><summary>Read all three steps</summary><ol>{item.steps.map(s=><li key={s}>{s}</li>)}</ol></details>
  </figure>;
}
