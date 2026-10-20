export const cheatSheetRevision = '2026-10-20';
export const cheatSheetTerms = [
 ['Liquidity','The ability to trade quantity with limited price impact. A chart does not reveal all resting orders.'],
 ['Buy-side / sell-side liquidity','ICT reference areas above highs or below lows where stops may cluster. Actual stop quantities are not observable from candles.'],
 ['Liquidity sweep','An excursion beyond a selected high or low. A return inside is one observed outcome, not a guaranteed reversal.'],
 ['Displacement','A relatively large directional candle body or move, judged against a stated context. It does not identify institutional participants.'],
 ['Swing high / low','A local price extreme defined by a chosen neighboring-candle convention. The timeframe and confirmation rule matter.'],
 ['Break of structure (BOS)','A break of a predefined swing reference under the study’s chosen close or wick rule. Continuation remains uncertain.'],
 ['Market structure shift (MSS)','A contextual change through a chosen internal swing, often combined with displacement. It is a study convention, not a verified forecast.'],
 ['Fair value gap (FVG)','A three-candle relationship: bullish when candle 1 high is below candle 3 low; bearish uses the opposite non-overlap.'],
 ['Consequent encroachment (CE)','The midpoint of the chosen FVG boundaries: (upper + lower) / 2. Arithmetic does not guarantee a reaction.'],
 ['Inverse FVG (IFVG)','A proposed change of role after price crosses a previously defined FVG. The crossing and retest rules must be specified.'],
 ['Order block (OB)','A selected reference candle or candle group associated with a subsequent move. Candle prices do not disclose an institution’s inventory.'],
 ['Mitigation','A framework interpretation of a revisit to a selected reference area. The revisit can fail; institutional intent is not directly measured.'],
 ['Premium / discount','Locations above or below the midpoint of a selected dealing range. Changing the range changes the classification.'],
 ['SMT divergence','A difference between corresponding swings in related instruments, aligned by time. Divergence alone is not an entry instruction.'],
 ['R (initial risk unit)','The planned price distance from entry to stop, adjusted for position size when expressed as money. Actual loss may exceed 1R.'],
 ['Reward-to-risk ratio','Planned target distance divided by initial stop distance. A larger ratio does not establish a higher probability of profit.'],
 ['Drawdown','The decline from an earlier equity peak. Always specify whether it is measured in money, percent or cumulative R.'],
 ['Backtest','An evaluation of explicit rules on historical data available at each decision. Costs, execution assumptions and unseen samples matter.'],
 ['Open interest','Outstanding futures contracts, counting one side of each contract. Every contract has both a buyer and a seller.'],
 ['COT report','Delayed futures positioning by reporting category. A snapshot date differs from publication; net positioning alone does not predict the next move.'],
] as const;
export const cheatSheetQuestions = [
 'Which instrument, timeframe and session am I observing?',
 'Which prices and reference boundaries were known at this moment?',
 'What exactly qualifies the setup, and what would invalidate it?',
 'What are the entry, stop, target, costs and maximum planned loss?',
 'What would a failure or no-trade example look like?',
 'Am I checking unseen examples, or repeatedly tuning to the same sample?',
] as const;
export const cheatSheetSources = [
 {title:'Official ICT teaching channel',url:'https://www.youtube.com/innercircletrader'},
 {title:'CFTC: COT explanatory notes',url:'https://www.cftc.gov/MarketReports/CommitmentsofTraders/ExplanatoryNotes/index.htm'},
 {title:'CME Group: open interest',url:'https://www.cmegroup.com/education/courses/introduction-to-futures/open-interest.html'},
 {title:'LearnSMC: reviewed curriculum sources and limits',url:'https://learnsmc.xyz/curriculum/mentorships/'},
] as const;
