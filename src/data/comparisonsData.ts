import { ConceptComparison } from '../types';

export const conceptComparisons: ConceptComparison[] = [
  {
    id: 'fvg_vs_ifvg',
    title: 'Fair Value Gap (FVG) vs. Inverse Fair Value Gap (IFVG)',
    conceptA: {
      name: 'Fair Value Gap (FVG)',
      summary: 'A fresh 3-candle price imbalance acting in its original directional role (Support for Bullish, Resistance for Bearish).',
      keyPoints: [
        'Created by initial aggressive displacement',
        'Expects price to retrace into the gap and bounce/continue',
        'Represents efficient rebalancing of an untouched imbalance',
        'Invalidated when price closes with full bodies through the opposite boundary'
      ],
      idealCondition: 'First retracement into a fresh FVG aligned with Higher Timeframe trend and liquidity draw.'
    },
    conceptB: {
      name: 'Inverse Fair Value Gap (IFVG)',
      summary: 'A previously violated FVG whose role has inverted (Failed Bullish FVG becomes Bearish Resistance; Failed Bearish FVG becomes Bullish Support).',
      keyPoints: [
        'Created by the failure and decisive breach of an existing FVG',
        'Expects price to retest the broken zone from the opposite side',
        'Represents structural regime shift and collapse of previous directional demand/supply',
        'Highest probability when accompanied by a Market Structure Shift (MSS)'
      ],
      idealCondition: 'First retest of an FVG that was sliced through with strong opposite displacement following a major liquidity sweep.'
    },
    keyDifference: 'An FVG is an active imbalance respecting the original directional thesis; an IFVG is a failed imbalance providing evidence that the directional thesis has reversed.',
    commonConfusion: 'Traders often label a slight wick through an FVG as an IFVG. An IFVG strictly requires decisive candle body closes beyond the zone and structural confirmation.',
    decisionRule: 'If price bounces from the FVG, trade the FVG. If price destroys the FVG with displacement and closes beyond, flip your bias and watch for the IFVG retest.',
    diagramSnippet: 'Bullish FVG (Support) ──[Broken with displacement]──> Bearish IFVG (Resistance on retest)'
  },
  {
    id: 'ob_vs_breaker',
    title: 'Order Block (OB) vs. Breaker Block',
    conceptA: {
      name: 'Order Block (OB)',
      summary: 'The last opposing candle before significant displacement that led to a structural break, acting as the original base of momentum.',
      keyPoints: [
        'Origin of the original impulse move',
        'Acts in the same directional role as the initial displacement',
        'High probability when unmitigated and originating after a liquidity sweep',
        'Invalidated when price decisively trades through the entire candle range'
      ],
      idealCondition: 'Fresh retracement into the last down-candle in Daily discount following an SSL sweep and bullish MSS.'
    },
    conceptB: {
      name: 'Breaker Block',
      summary: 'A failed Order Block that produced a liquidity sweep before being violated, which subsequently flips role to act as opposing support/resistance.',
      keyPoints: [
        'Originates from a previously valid Order Block that made a new high/low',
        'Price swept liquidity on the other side before smashing through the OB',
        'Capitalizes on trapped participants who bought/sold the original OB',
        'The Unicorn Model combines a Breaker Block with an overlapping Fair Value Gap'
      ],
      idealCondition: 'Retest of a former Bullish OB after price swept BSL and aggressively broke downward through the OB.'
    },
    keyDifference: 'An Order Block is the primary launchpad of a move; a Breaker Block is a launchpad that got overrun and is now used by the opposing side.',
    commonConfusion: 'Calling any broken support a breaker. A true Breaker Block MUST have created a liquidity sweep (higher high or lower low) prior to its failure.',
    decisionRule: 'Did the OB make a new high/low and sweep liquidity before failing? If yes, it is a Breaker Block on retest. If no liquidity sweep occurred, it is a Mitigation Block.',
    diagramSnippet: 'OB -> Sweeps Liquidity -> Fails with Displacement -> Becomes Breaker on Retest'
  },
  {
    id: 'ob_vs_mitigation',
    title: 'Order Block (OB) vs. Mitigation Block',
    conceptA: {
      name: 'Order Block (OB)',
      summary: 'Origin of an impulse move that successfully broke structure and maintains its original directional role.',
      keyPoints: [
        'Priced in the direction of the continuing or newly shifted auction',
        'Represents institutional sponsorship origin',
        'Maintains its original role (Bullish OB = Support; Bearish OB = Resistance)'
      ],
      idealCondition: 'Retracement to the origin candle in discount/premium.'
    },
    conceptB: {
      name: 'Mitigation Block',
      summary: 'A failed swing level where price FAILED to sweep external liquidity (formed a failure swing / lower high / higher low) before reversing.',
      keyPoints: [
        'Originates from a failure swing (inability to reach liquidity)',
        'Signifies market exhaustion and sudden abandonment of the trend',
        'Retested by trapped traders to minimize/mitigate losses before expansion'
      ],
      idealCondition: 'Retest of an intermediate low after an uptrend failed to make a new high and collapsed.'
    },
    keyDifference: 'Breakers sweep liquidity before failure; Mitigation Blocks FAIL to sweep liquidity before failure (exhaustion).',
    commonConfusion: 'Confusing Breakers and Mitigation Blocks. Remember: Breakers = Liquidity Swept; Mitigation Blocks = Liquidity NOT Swept (Failure Swing).',
    decisionRule: 'Check the extreme swing: if price took the old high/low before reversing, mark a Breaker. If price formed a lower high or higher low, mark a Mitigation Block.',
    diagramSnippet: 'Uptrend -> Lower High (Failure Swing) -> Breaks Low -> Mitigation Block on Retest'
  },
  {
    id: 'bos_vs_mss_vs_choch',
    title: 'BOS vs. MSS vs. CHoCH',
    conceptA: {
      name: 'Break of Structure (BOS)',
      summary: 'Trend continuation event where price breaks a structural swing in the direction of the established trend.',
      keyPoints: [
        'Confirms the existing auction is intact and expanding',
        'Occurs repeatedly in strong healthy trends',
        'Never creates a new trend by itself'
      ],
      idealCondition: 'Bullish candle closing above previous Higher High during an established Daily uptrend.'
    },
    conceptB: {
      name: 'Market Structure Shift (MSS / CHoCH)',
      summary: 'Structural transition event where price decisively breaks the protected counter-swing with displacement after a liquidity event.',
      keyPoints: [
        'Signals transfer of directional control from buyers to sellers or vice versa',
        'Must be verified by displacement and candle body close',
        'Highest quality when occurring after an external liquidity sweep (BSL/SSL)'
      ],
      idealCondition: 'Decisive 5M displacement breaking the protected higher low after a PDH BSL sweep.'
    },
    keyDifference: 'BOS means "the trend continues"; CHoCH is the first warning crack; MSS is the verified transition supported by institutional displacement.',
    commonConfusion: 'Calling every 1-minute internal swing break a trend reversal. Most internal CHoCHs are simply pullbacks delivering price into higher-timeframe discount/premium.',
    decisionRule: 'Is the break with the trend? -> BOS. Is the break against the trend with weak momentum? -> Warning / Pullback (CHoCH). Is the break against the trend with violent displacement after a sweep? -> MSS.',
    diagramSnippet: 'Trend -> Higher High (BOS) -> Sweeps BSL -> Violates Protected Low with Displacement (MSS)'
  },
  {
    id: 'sweep_vs_breakout',
    title: 'Liquidity Sweep vs. Genuine Breakout',
    conceptA: {
      name: 'Liquidity Sweep (Raid / Grab)',
      summary: 'Price pierces a key level (PDH/PDL, EQH/EQL), collects stops, and immediately rejects back inside the range with opposite displacement.',
      keyPoints: [
        'Brief, sharp excursion beyond the level (often wick-dominated on HTF)',
        'Fails to establish acceptance on the other side',
        'Followed by rapid displacement in the opposite direction and MSS',
        'Used to trap breakout traders and trigger stops'
      ],
      idealCondition: 'Asian High pierced by 10 pips at London Open, immediately prints a massive bearish engulfing candle closing back below Asian High.'
    },
    conceptB: {
      name: 'Genuine Breakout (Acceptance)',
      summary: 'Price drives through a key level with aggressive volume, closes firmly beyond the level, and establishes sustained acceptance.',
      keyPoints: [
        'Candle bodies close strongly outside the range',
        'Retests the broken level from the opposite side and holds',
        'Expands toward the next major Higher Timeframe liquidity draw',
        'Do NOT short or fade a genuine breakout with acceptance'
      ],
      idealCondition: 'Price closes 3 consecutive 15M candles above Weekly High with expanding volume and retests the level as new support.'
    },
    keyDifference: 'A Sweep rejects and reclaims the old range; a Breakout accepts and builds a new range beyond the level.',
    commonConfusion: 'Shorting every time price crosses a high assuming it is a "sweep". Always wait for the market to prove rejection via displacement before entering.',
    decisionRule: 'Did price close back inside with displacement? -> Sweep. Did price close outside and hold on retest? -> Breakout.',
    diagramSnippet: 'Sweep = High -> Wick -> Closes Below; Breakout = High -> Body Closes Above -> Retests -> Continues'
  },
  {
    id: 'internal_vs_external_liquidity',
    title: 'Internal vs. External Range Liquidity (IRL vs ERL)',
    conceptA: {
      name: 'External Range Liquidity (ERL)',
      summary: 'Major structural swing highs and lows defining the outer boundaries of the current dealing range (e.g. Previous Week High/Low, Monthly High/Low).',
      keyPoints: [
        'The macro destination or Draw on Liquidity',
        'Visible to the entire market across higher timeframes',
        'Carries significant order density'
      ],
      idealCondition: 'Price in Daily discount targeting the unviolated Previous Week High BSL.'
    },
    conceptB: {
      name: 'Internal Range Liquidity (IRL)',
      summary: 'Minor swing highs, lows, and Fair Value Gaps residing inside the active dealing range.',
      keyPoints: [
        'Acts as intermediate steps or fuel along the journey',
        'Can be consumed sequentially without reversing the macro trend',
        'Provides intraday execution locations'
      ],
      idealCondition: 'Intraday pullback taking 15M internal SSL before continuing toward the external Daily target.'
    },
    keyDifference: 'ERL defines the macro highway destination; IRL defines the toll booths and gas stations along the road.',
    commonConfusion: 'Expecting price to reverse at every minor internal high. Internal liquidity is frequently consumed as fuel to power the move to the external target.',
    decisionRule: 'Start top-down: identify the ERL target first, then use IRL sweeps in discount/premium to find your execution entry.',
    diagramSnippet: 'External BSL [Target] <─── Internal High 1 <─── Internal High 2 <─── Price (Discount)'
  }
];
