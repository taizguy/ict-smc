/** Publication date confirmed by the author on 28 October 2026; no inferred backdating. */
export const alchemyDates = {
 published:{iso:'2026-10-28',label:'28 October 2026'},
 updated:{iso:'2026-10-28',label:'28 October 2026'},
 sourceReview:{iso:'2026-10-27',label:'27 October 2026'},
};
export const alchemyRisk='Educational purposes only. Futures trading involves substantial risk of loss. Hypothetical examples do not guarantee future results.';
export const alchemyLimits=[
 'The recordings supply a historical reading procedure, not every entry, protective-stop, sizing, cost or fill rule needed for a trading system.',
 'Range selection, advancing to another projection and choosing exit lows involve judgment. Range replications are not statistical standard deviations or probabilities.',
 'Drawings simplify the source sequence. The early-touch and continued-rise strips, and the quiz scenarios, are hypothetical contrasts.',
 'An order annotation is not an audited fill. The exact execution timestamp, a universal half-tick rounding rule, win rate and forward-tested edge remain unverified.',
 'The separate May 13 MNQ loss is not a failed instance of the May 14 lunch projection. Feed checks and remaining contract limits are listed with the sources.',
];
export const alchemyVerificationRows=[
 ['29,510.00','Prior 16:14 close','Source frame checked; May minute feed unavailable.'],
 ['29,476.25','09:30 opening price','Source frame checked; May minute feed unavailable.'],
 ['29,782.00','May 14 high','Matches the May 14 NQM2026 daily high on TradingView.'],
 ['29,692.25','Nearer low','Source frame checked; May minute feed unavailable.'],
 ['29,664.50','Nearer low','Source frame checked; May minute feed unavailable.'],
 ['29,595.50','Earlier marked low','Source frame checked; May minute feed unavailable.'],
 ['29,595.25','13:26 candle low','Source frame checked; May minute feed unavailable.'],
 ['29,139.25','May 13 planned stop annotation','Source annotation checked; not a public account-fill record.'],
 ['29,136.75','May 13 closing annotation','Source annotation checked; not a public account-fill record.'],
] as const;
