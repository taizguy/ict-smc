export const labGuides:Record<string,{title:string;description:string;paragraphs:string[]}>={
 chartlab:{title:'Visual chart recognition',description:'Identify sweeps, displacement and three-candle gaps with selectable candles and visual hints.',paragraphs:[
 'Observe one event at a time. Later candles stay hidden while you identify the current pattern.',
 'Each task reveals only its required observation window. Sweep references come from earlier displayed candles; displacement compares open-to-close bodies in the stated window. The FVG task checks completed outer-wick non-overlap before the authored study window ends. If none qualifies, it uses the reference-area task.',
 'Hints are recorded only for this attempt. Nothing here is a prediction score, an independent assessment or saved account progress.',
 'The gap drill checks actual outer-candle non-overlap. When no qualifying gap is found, it uses the annotated reference area instead. A chart label does not reveal institutional orders.',
 ]},
 simulator:{title:'Candle-by-candle decision practice',description:'Lock a plan before revealing future candles. Explore stops, targets, gaps and the choice not to trade.',paragraphs:[
 'Choose long, short or no trade. Set a stop distance and target, lock the decision, then reveal one fictional candle at a time. A completed exercise can win, lose, remain ambiguous or end without a trade.',
 'Net results use a fixed 0.05R cost. Stop gaps use the opening price; target gaps use the target. If both barriers are touched in one candle, their sequence is unknown. No live execution or verified model performance is implied.',
 ]},
 backtest:{title:'Rule-based backtest research',description:'Scan a transparent FVG teaching rule on synthetic demo candles or your local CSV, with training and hold-out samples.',paragraphs:[
 'A completed three-candle FVG creates a signal. Entry uses the following open; the stop is the three-candle extreme. Choose direction, target R, maximum holding candles and fixed R costs before running.',
 'Use the first 70% for training and the last 30% as a separate hold-out. Positions do not cross the sample boundary. Review every qualifying entry and export the ledger. CSV data stays in your browser.',
 'Ambiguous candles touching both barriers are reported separately and excluded from net R. Stops can gap beyond planned risk. Synthetic examples, idealized fills and repeated hold-out inspection do not establish a real trading edge.',
 ]},
};
