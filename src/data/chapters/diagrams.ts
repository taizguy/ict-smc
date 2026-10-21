export type DiagramTone = 'ink' | 'teal' | 'coral' | 'violet';
export type DiagramMark = { kind: 'line' | 'path' | 'zone' | 'candle' | 'label' | 'dot'; stage: number; tone?: DiagramTone; dashed?: boolean; x?: number; y?: number; x2?: number; y2?: number; w?: number; h?: number; d?: string; text?: string; open?: number; close?: number; high?: number; low?: number };
export interface ChapterDiagramSpec { title: string; steps: [string, string, string]; marks: DiagramMark[] }
export const chapterIllustrationRevision = { iso: '2026-10-20', label: '20 October 2026' };
/** Original chapter-specific schematics, not performance evidence or trading signals.
 * The suspension scene has separated bodies and overlapping wicks, intentionally.
 */
export const chapterDiagrams: Record<number, ChapterDiagramSpec> = {
  "1": {
    "title": "Price moves through transactions",
    "steps": [
      "A marketable buy meets the available offer.",
      "A thin offer can be exhausted by incoming orders.",
      "The next trade can occur at another price."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 175,
        "y": 65,
        "w": 100,
        "h": 35,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 225,
        "y": 88,
        "text": "ASK",
        "stage": 0
      },
      {
        "kind": "path",
        "d": "M45,82 L165,82",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 100,
        "y": 65,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "zone",
        "x": 175,
        "y": 115,
        "w": 100,
        "h": 35,
        "stage": 0,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 225,
        "y": 138,
        "text": "BID",
        "stage": 0
      },
      {
        "kind": "path",
        "d": "M295,82 L345,48",
        "stage": 2,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 310,
        "y": 115,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "2": {
    "title": "The order queue",
    "steps": [
      "Orders first compete by price.",
      "At the same price, time priority can apply.",
      "A fill depends on the venue and available quantity."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 40,
        "y": 60,
        "w": 92,
        "h": 54,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 86,
        "y": 91,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "zone",
        "x": 150,
        "y": 60,
        "w": 92,
        "h": 54,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 196,
        "y": 91,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "zone",
        "x": 260,
        "y": 60,
        "w": 92,
        "h": 54,
        "stage": 2,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 306,
        "y": 91,
        "text": "3",
        "stage": 2
      },
      {
        "kind": "path",
        "d": "M85,145 L195,145 L306,145",
        "stage": 2,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 196,
        "y": 174,
        "text": "FIFO",
        "stage": 2
      }
    ]
  },
  "3": {
    "title": "A visible book is incomplete",
    "steps": [
      "Displayed size is a snapshot of resting orders.",
      "Orders may be cancelled before a trade occurs.",
      "Displayed size alone cannot prove trader intent."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 65,
        "y": 45,
        "w": 90,
        "h": 22,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "zone",
        "x": 65,
        "y": 80,
        "w": 135,
        "h": 22,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "zone",
        "x": 65,
        "y": 115,
        "w": 200,
        "h": 22,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "zone",
        "x": 65,
        "y": 150,
        "w": 110,
        "h": 22,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "line",
        "x": 280,
        "y": 40,
        "x2": 280,
        "y2": 177,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M310,86 L350,115 L310,145",
        "stage": 1,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 335,
        "y": 61,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "dot",
        "x": 225,
        "y": 126,
        "stage": 2,
        "tone": "violet"
      },
      {
        "kind": "label",
        "x": 310,
        "y": 175,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "4": {
    "title": "Liquidity above and below",
    "steps": [
      "Repeated highs mark a reference area, not visible stops.",
      "A wick trades beyond the upper reference.",
      "A return inside is an observed sweep example."
    ],
    "marks": [
      {
        "kind": "line",
        "x": 40,
        "y": 70,
        "x2": 355,
        "y2": 70,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M40,135 L80,70 L116,130 L154,70 L194,133",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "candle",
        "x": 244,
        "open": 108,
        "close": 120,
        "high": 38,
        "low": 135,
        "stage": 1,
        "tone": "coral"
      },
      {
        "kind": "path",
        "d": "M270,120 L315,142 L350,125",
        "stage": 2,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 62,
        "y": 53,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 244,
        "y": 26,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 329,
        "y": 166,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "5": {
    "title": "One candle, many transactions",
    "steps": [
      "A period groups a sequence of trades.",
      "Open, high, low and close summarize that period.",
      "A large body does not identify its participants."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,130 L70,100 L100,142 L140,52 L178,86",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 210,
        "y": 35,
        "x2": 210,
        "y2": 180,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "candle",
        "x": 280,
        "open": 130,
        "close": 65,
        "high": 40,
        "low": 155,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "line",
        "x": 300,
        "y": 65,
        "x2": 353,
        "y2": 65,
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "line",
        "x": 300,
        "y": 130,
        "x2": 353,
        "y2": 130,
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 68,
        "y": 163,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 280,
        "y": 27,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 354,
        "y": 109,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "7": {
    "title": "Recognizing a swing high",
    "steps": [
      "The first candle establishes a high.",
      "The middle candle reaches a higher high.",
      "The right candle completes this three-candle example."
    ],
    "marks": [
      {
        "kind": "candle",
        "x": 95,
        "open": 145,
        "close": 115,
        "high": 93,
        "low": 160,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 95,
        "y": 185,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "candle",
        "x": 195,
        "open": 110,
        "close": 85,
        "high": 43,
        "low": 126,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 195,
        "y": 28,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "candle",
        "x": 295,
        "open": 100,
        "close": 133,
        "high": 80,
        "low": 150,
        "stage": 2,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 295,
        "y": 185,
        "text": "3",
        "stage": 2
      },
      {
        "kind": "line",
        "x": 65,
        "y": 43,
        "x2": 325,
        "y2": 43,
        "stage": 1,
        "tone": "violet",
        "dashed": true
      }
    ]
  },
  "9": {
    "title": "Continuation and a prior high",
    "steps": [
      "Mark the prior swing before the breakout.",
      "This example closes above that reference.",
      "A break alone does not guarantee continuation."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,160 L88,100 L135,140 L180,80 L225,120",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 157,
        "y": 80,
        "x2": 360,
        "y2": 80,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "candle",
        "x": 255,
        "open": 120,
        "close": 92,
        "high": 83,
        "low": 129,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "candle",
        "x": 289,
        "open": 92,
        "close": 65,
        "high": 56,
        "low": 101,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "candle",
        "x": 323,
        "open": 65,
        "close": 50,
        "high": 41,
        "low": 74,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 180,
        "y": 63,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 290,
        "y": 30,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "path",
        "d": "M325,50 L359,65",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 355,
        "y": 103,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "10": {
    "title": "An early change of character",
    "steps": [
      "Higher highs and lows establish this reference trend.",
      "Price breaks a selected shorter-term low.",
      "Treat the warning separately from a confirmed reversal."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,155 L82,97 L127,128 L174,65 L218,98 L253,44",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 108,
        "y": 128,
        "x2": 355,
        "y2": 128,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M253,44 L280,106 L309,154",
        "stage": 1,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M309,154 L352,115",
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 175,
        "y": 46,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 315,
        "y": 181,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 354,
        "y": 97,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "11": {
    "title": "A shift in context",
    "steps": [
      "A selected low is swept in this example.",
      "Displacement closes beyond the internal high.",
      "The structure and invalidation must be chosen in advance."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,85 L80,142 L125,108 L172,177",
        "stage": 0,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 35,
        "y": 150,
        "x2": 207,
        "y2": 150,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M172,177 L215,118 L254,63",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 103,
        "y": 108,
        "x2": 317,
        "y2": 108,
        "stage": 1,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "zone",
        "x": 235,
        "y": 95,
        "w": 95,
        "h": 25,
        "stage": 2,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 172,
        "y": 198,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 254,
        "y": 40,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 330,
        "y": 145,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "13": {
    "title": "A three-candle bullish FVG",
    "steps": [
      "Mark the first candle’s high.",
      "The third candle’s low stays above it here.",
      "The intervening price interval is the illustrated FVG."
    ],
    "marks": [
      {
        "kind": "candle",
        "x": 85,
        "open": 151,
        "close": 126,
        "high": 112,
        "low": 168,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 85,
        "y": 191,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "candle",
        "x": 155,
        "open": 125,
        "close": 65,
        "high": 51,
        "low": 138,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 155,
        "y": 184,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "candle",
        "x": 225,
        "open": 64,
        "close": 45,
        "high": 30,
        "low": 82,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 225,
        "y": 24,
        "text": "3",
        "stage": 1
      },
      {
        "kind": "zone",
        "x": 70,
        "y": 82,
        "w": 280,
        "h": 30,
        "stage": 2,
        "tone": "teal"
      },
      {
        "kind": "line",
        "x": 70,
        "y": 97,
        "x2": 350,
        "y2": 97,
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 306,
        "y": 70,
        "text": "FVG",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 309,
        "y": 135,
        "text": "50%",
        "stage": 2
      }
    ]
  },
  "14": {
    "title": "A failed gap changes role",
    "steps": [
      "Identify a previously marked bullish gap.",
      "Price closes through the lower boundary here.",
      "A later retest is an observation, not an automatic short."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 65,
        "y": 95,
        "w": 285,
        "h": 30,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M40,155 L88,65 L139,47",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M139,47 L187,103 L221,151",
        "stage": 1,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M221,151 L273,109 L332,146",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 85,
        "y": 86,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 218,
        "y": 176,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 280,
        "y": 87,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "15": {
    "title": "A bullish candle-run reference",
    "steps": [
      "Select this consecutive down-close run and its first opening price.",
      "An upward move crosses that opening reference in this example.",
      "A possible revisit is separate from the original opening reference."
    ],
    "marks": [
      {
        "kind": "candle",
        "x": 65,
        "open": 90,
        "close": 119,
        "high": 80,
        "low": 130,
        "stage": 0,
        "tone": "coral"
      },
      {
        "kind": "candle",
        "x": 105,
        "open": 119,
        "close": 145,
        "high": 108,
        "low": 157,
        "stage": 0,
        "tone": "coral"
      },
      {
        "kind": "zone",
        "x": 48,
        "y": 80,
        "w": 300,
        "h": 77,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "line",
        "x": 48,
        "y": 90,
        "x2": 348,
        "y2": 90,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 307,
        "y": 78,
        "text": "Open",
        "stage": 0
      },
      {
        "kind": "candle",
        "x": 150,
        "open": 145,
        "close": 105,
        "high": 96,
        "low": 155,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "candle",
        "x": 190,
        "open": 105,
        "close": 59,
        "high": 48,
        "low": 112,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "candle",
        "x": 230,
        "open": 59,
        "close": 37,
        "high": 25,
        "low": 68,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M230,37 L269,61 L318,112",
        "stage": 2,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 80,
        "y": 186,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 230,
        "y": 20,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 350,
        "y": 137,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "16": {
    "title": "A bearish breaker swing sequence",
    "steps": [
      "Select the prior high, intervening low and up-close reference.",
      "A higher high sweeps the prior high, then price breaks the intervening low.",
      "A return to the saved reference is possible, not guaranteed."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,112 L70,63 L115,139 L145,104",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 70,
        "y": 63,
        "x2": 205,
        "y2": 63,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "line",
        "x": 115,
        "y": 139,
        "x2": 300,
        "y2": 139,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "candle",
        "x": 145,
        "open": 137,
        "close": 103,
        "high": 96,
        "low": 145,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "zone",
        "x": 130,
        "y": 103,
        "w": 225,
        "h": 34,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 70,
        "y": 48,
        "text": "H",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 110,
        "y": 165,
        "text": "L",
        "stage": 0
      },
      {
        "kind": "path",
        "d": "M145,104 L185,37 L215,85 L261,175",
        "stage": 1,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 185,
        "y": 23,
        "text": "HH",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 265,
        "y": 198,
        "text": "LL",
        "stage": 1
      },
      {
        "kind": "path",
        "d": "M261,175 L306,120 L353,172",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 320,
        "y": 91,
        "text": "Retest?",
        "stage": 2
      }
    ]
  },
  "18": {
    "title": "A sweep is not a guaranteed reversal",
    "steps": [
      "Two lows supply a sell-side reference.",
      "Price trades below that reference.",
      "Observe the response before assigning a narrative."
    ],
    "marks": [
      {
        "kind": "line",
        "x": 40,
        "y": 135,
        "x2": 350,
        "y2": 135,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M40,75 L95,135 L145,84 L194,135",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "candle",
        "x": 247,
        "open": 125,
        "close": 114,
        "high": 91,
        "low": 177,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M267,114 L314,69 L350,89",
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 92,
        "y": 160,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 247,
        "y": 199,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 332,
        "y": 57,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "19": {
    "title": "Sessions on a shared clock",
    "steps": [
      "Choose a timezone before marking sessions.",
      "Session windows can overlap.",
      "Daylight saving changes must be handled by date."
    ],
    "marks": [
      {
        "kind": "line",
        "x": 35,
        "y": 164,
        "x2": 365,
        "y2": 164,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 45,
        "y": 55,
        "w": 130,
        "h": 25,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 110,
        "y": 73,
        "text": "Asia",
        "stage": 0
      },
      {
        "kind": "zone",
        "x": 135,
        "y": 92,
        "w": 130,
        "h": 25,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "label",
        "x": 200,
        "y": 110,
        "text": "London",
        "stage": 1
      },
      {
        "kind": "zone",
        "x": 226,
        "y": 129,
        "w": 130,
        "h": 25,
        "stage": 2,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 290,
        "y": 147,
        "text": "New York",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 50,
        "y": 194,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 200,
        "y": 194,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 350,
        "y": 194,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "20": {
    "title": "A week is a sequence, not a script",
    "steps": [
      "Start with the week’s opening context.",
      "Track the developing high and low.",
      "A named profile describes a hypothesis, not a schedule."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 45,
        "y": 55,
        "w": 55,
        "h": 110,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "zone",
        "x": 109,
        "y": 55,
        "w": 55,
        "h": 110,
        "stage": 0,
        "tone": "violet"
      },
      {
        "kind": "zone",
        "x": 173,
        "y": 55,
        "w": 55,
        "h": 110,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "zone",
        "x": 237,
        "y": 55,
        "w": 55,
        "h": 110,
        "stage": 1,
        "tone": "coral"
      },
      {
        "kind": "zone",
        "x": 301,
        "y": 55,
        "w": 55,
        "h": 110,
        "stage": 2,
        "tone": "violet"
      },
      {
        "kind": "path",
        "d": "M70,120 L136,149 L200,102 L264,65 L328,91",
        "stage": 2,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 72,
        "y": 191,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 200,
        "y": 191,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 329,
        "y": 191,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "21": {
    "title": "Range, excursion, expansion",
    "steps": [
      "A consolidation is selected before the next move.",
      "One excursion moves outside its boundary.",
      "A later expansion is only one possible outcome."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 35,
        "y": 95,
        "w": 115,
        "h": 45,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M35,122 L65,102 L90,131 L120,107 L150,122",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M150,122 L193,179 L225,126",
        "stage": 1,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M225,126 L270,72 L315,90 L355,42",
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 83,
        "y": 80,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 192,
        "y": 202,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 353,
        "y": 28,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "22": {
    "title": "Context before execution",
    "steps": [
      "Begin with a higher-timeframe question.",
      "Choose a lower-timeframe condition without hindsight.",
      "An entry requires an invalidation and a risk limit."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 35,
        "y": 45,
        "w": 130,
        "h": 40,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 100,
        "y": 71,
        "text": "HTF",
        "stage": 0
      },
      {
        "kind": "path",
        "d": "M165,65 L205,65 L205,105",
        "stage": 1,
        "tone": "violet",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 140,
        "y": 105,
        "w": 130,
        "h": 40,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "label",
        "x": 205,
        "y": 131,
        "text": "LTF",
        "stage": 1
      },
      {
        "kind": "path",
        "d": "M270,125 L311,125 L311,161",
        "stage": 2,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 246,
        "y": 161,
        "w": 126,
        "h": 35,
        "stage": 2,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 309,
        "y": 184,
        "text": "Risk",
        "stage": 2
      }
    ]
  },
  "23": {
    "title": "Separate bias from a trigger",
    "steps": [
      "A daily bias is a conditional expectation.",
      "An intraday observation may support or contradict it.",
      "Linked teaching does not establish verified performance."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 35,
        "y": 55,
        "w": 120,
        "h": 50,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 95,
        "y": 85,
        "text": "Bias",
        "stage": 0
      },
      {
        "kind": "path",
        "d": "M160,80 L225,55 L345,55",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M160,80 L225,143 L345,143",
        "stage": 2,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 289,
        "y": 42,
        "text": "?",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 289,
        "y": 176,
        "text": "?",
        "stage": 2
      },
      {
        "kind": "dot",
        "x": 225,
        "y": 55,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "dot",
        "x": 225,
        "y": 143,
        "stage": 2,
        "tone": "coral"
      }
    ]
  },
  "24": {
    "title": "Let an opening range form",
    "steps": [
      "Specify the opening timestamp and range duration.",
      "Only completed data defines the full range.",
      "A later breakout can continue or fail."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 55,
        "y": 65,
        "w": 150,
        "h": 95,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "candle",
        "x": 80,
        "open": 126,
        "close": 88,
        "high": 79,
        "low": 135,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "candle",
        "x": 111,
        "open": 88,
        "close": 131,
        "high": 79,
        "low": 140,
        "stage": 0,
        "tone": "coral"
      },
      {
        "kind": "candle",
        "x": 142,
        "open": 131,
        "close": 100,
        "high": 91,
        "low": 140,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "candle",
        "x": 173,
        "open": 100,
        "close": 116,
        "high": 91,
        "low": 125,
        "stage": 0,
        "tone": "coral"
      },
      {
        "kind": "line",
        "x": 205,
        "y": 40,
        "x2": 205,
        "y2": 180,
        "stage": 1,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M209,116 L254,49 L294,72 L350,95",
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 52,
        "y": 192,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 205,
        "y": 25,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 340,
        "y": 125,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "25": {
    "title": "Qualify the first presented gap",
    "steps": [
      "Inspect the preceding balanced range.",
      "A gap inside that balance can be disqualified.",
      "The first visible gap is not automatically a setup."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 40,
        "y": 58,
        "w": 235,
        "h": 105,
        "stage": 0,
        "tone": "violet"
      },
      {
        "kind": "path",
        "d": "M45,124 L95,69 L140,150 L189,76 L230,137",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 154,
        "y": 95,
        "w": 130,
        "h": 22,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "line",
        "x": 150,
        "y": 85,
        "x2": 286,
        "y2": 135,
        "stage": 2,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 150,
        "y": 135,
        "x2": 286,
        "y2": 85,
        "stage": 2,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 55,
        "y": 43,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 250,
        "y": 83,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 332,
        "y": 130,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "26": {
    "title": "Compare aligned market swings",
    "steps": [
      "Align the instruments and timestamps first.",
      "One market makes a higher high here.",
      "The other does not; divergence alone is not an entry."
    ],
    "marks": [
      {
        "kind": "line",
        "x": 35,
        "y": 105,
        "x2": 365,
        "y2": 105,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M45,85 L105,45 L167,89 L238,28 L350,70",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M45,180 L105,134 L167,183 L238,150 L350,180",
        "stage": 2,
        "tone": "violet",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 95,
        "y": 45,
        "x2": 285,
        "y2": 45,
        "stage": 1,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "line",
        "x": 95,
        "y": 134,
        "x2": 285,
        "y2": 134,
        "stage": 2,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 47,
        "y": 25,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 285,
        "y": 45,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 285,
        "y": 145,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "27": {
    "title": "Compare alternative weekly paths",
    "steps": [
      "Use the same starting information for each hypothesis.",
      "A midweek reversal is one possible profile.",
      "A continuing trend is another; record both."
    ],
    "marks": [
      {
        "kind": "dot",
        "x": 45,
        "y": 105,
        "stage": 0,
        "tone": "violet"
      },
      {
        "kind": "path",
        "d": "M45,105 L110,146 L180,164 L250,85 L350,49",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M45,105 L110,96 L180,77 L250,65 L350,33",
        "stage": 2,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "line",
        "x": 180,
        "y": 35,
        "x2": 180,
        "y2": 183,
        "stage": 0,
        "tone": "ink",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 45,
        "y": 84,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 180,
        "y": 201,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 352,
        "y": 83,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "28": {
    "title": "A rolling lookback window",
    "steps": [
      "Choose the trading-day lookback before the session.",
      "Move the window forward as new data arrives.",
      "An intraday trade still needs its own conditions."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 40,
        "y": 55,
        "w": 230,
        "h": 62,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M45,105 L91,69 L140,90 L185,63 L235,90 L270,72",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 110,
        "y": 85,
        "w": 230,
        "h": 62,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "path",
        "d": "M280,72 L310,107 L354,65",
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 54,
        "y": 42,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 329,
        "y": 176,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 354,
        "y": 43,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "29": {
    "title": "Weekly expansion or reversal",
    "steps": [
      "Define the current weekly range.",
      "An expansion can extend one boundary.",
      "A reversal hypothesis needs separate invalidation."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 45,
        "y": 80,
        "w": 140,
        "h": 70,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M50,120 L95,90 L140,140 L185,112",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M185,112 L238,64 L289,44 L352,55",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M185,112 L238,164 L289,140 L352,175",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 65,
        "y": 64,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 348,
        "y": 32,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 348,
        "y": 201,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "30": {
    "title": "Positioning is delayed context",
    "steps": [
      "A report snapshots positions on one date.",
      "Publication happens later.",
      "A swing decision can use only data already published."
    ],
    "marks": [
      {
        "kind": "line",
        "x": 45,
        "y": 120,
        "x2": 355,
        "y2": 120,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 50,
        "y": 60,
        "w": 95,
        "h": 45,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 97,
        "y": 88,
        "text": "COT",
        "stage": 0
      },
      {
        "kind": "path",
        "d": "M147,82 L225,82",
        "stage": 1,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "zone",
        "x": 230,
        "y": 60,
        "w": 112,
        "h": 45,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "label",
        "x": 286,
        "y": 88,
        "text": "COT",
        "stage": 1
      },
      {
        "kind": "path",
        "d": "M285,122 L285,165 L350,165",
        "stage": 2,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 60,
        "y": 153,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 238,
        "y": 153,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 351,
        "y": 195,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "31": {
    "title": "Seasonal tendency is not a timer",
    "steps": [
      "Mark a historical seasonal tendency.",
      "Compare it with current market conditions.",
      "Calendar dates do not force reversals."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,130 L85,65 L135,90 L185,145 L235,85 L285,61 L355,105",
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M35,160 L85,140 L135,110 L185,91 L235,100 L285,50 L355,38",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 185,
        "y": 38,
        "x2": 185,
        "y2": 180,
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 65,
        "y": 43,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 330,
        "y": 25,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 185,
        "y": 202,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "32": {
    "title": "Session volatility has two directions",
    "steps": [
      "Define the session and local clock.",
      "Observe expansion after the selected window begins.",
      "Timing does not choose direction for you."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 45,
        "y": 73,
        "w": 100,
        "h": 74,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M45,117 L80,92 L115,127 L145,107",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 160,
        "y": 35,
        "x2": 160,
        "y2": 179,
        "stage": 1,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M170,105 L220,65 L285,80 L352,39",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M170,105 L220,146 L285,130 L352,173",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 60,
        "y": 58,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 202,
        "y": 32,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 350,
        "y": 199,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "33": {
    "title": "Market-maker curves are interpretations",
    "steps": [
      "Choose the starting consolidation for this sell-model example.",
      "Map an upward curve and a possible turning region.",
      "A later downward curve is illustrative, not inevitable."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 35,
        "y": 136,
        "w": 80,
        "h": 35,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M35,150 L75,161 L110,147",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M110,147 L157,111 L192,121 L224,47",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M224,47 L260,111 L290,99 L350,150",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 70,
        "y": 194,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 224,
        "y": 30,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 350,
        "y": 175,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "34": {
    "title": "An objective is not a result",
    "steps": [
      "Set an objective before evaluating an example.",
      "Distinguish realized gains from protected open profit.",
      "An aspiration is not a weekly guarantee."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 45,
        "y": 132,
        "w": 90,
        "h": 38,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 90,
        "y": 157,
        "text": "Risk",
        "stage": 0
      },
      {
        "kind": "path",
        "d": "M90,130 L142,95 L197,107 L245,62",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 165,
        "y": 107,
        "x2": 355,
        "y2": 107,
        "stage": 1,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "zone",
        "x": 270,
        "y": 43,
        "w": 85,
        "h": 26,
        "stage": 2,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 310,
        "y": 33,
        "text": "?",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 48,
        "y": 192,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 194,
        "y": 141,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 354,
        "y": 85,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "35": {
    "title": "Same idea, different horizons",
    "steps": [
      "A swing plan observes a wider horizon.",
      "A day-trade plan uses its own session boundaries.",
      "A scalp has different costs and execution sensitivity."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 40,
        "y": 45,
        "w": 315,
        "h": 30,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 195,
        "y": 66,
        "text": "Swing",
        "stage": 0
      },
      {
        "kind": "zone",
        "x": 40,
        "y": 95,
        "w": 208,
        "h": 30,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "label",
        "x": 140,
        "y": 116,
        "text": "Day",
        "stage": 1
      },
      {
        "kind": "zone",
        "x": 40,
        "y": 145,
        "w": 100,
        "h": 30,
        "stage": 2,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 89,
        "y": 166,
        "text": "Scalp",
        "stage": 2
      }
    ]
  },
  "36": {
    "title": "The 2022 model as a study sequence",
    "steps": [
      "Observe a selected liquidity reference.",
      "Look for the specified shift and displacement.",
      "A gap return is conditional; failed examples matter."
    ],
    "marks": [
      {
        "kind": "line",
        "x": 40,
        "y": 140,
        "x2": 185,
        "y2": 140,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M40,80 L82,140 L123,101 L164,174",
        "stage": 0,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M164,174 L215,83 L251,52",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 203,
        "y": 94,
        "w": 140,
        "h": 25,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M251,52 L294,78 L327,107",
        "stage": 2,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 164,
        "y": 198,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 252,
        "y": 34,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 350,
        "y": 139,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "37": {
    "title": "Four descriptive market conditions",
    "steps": [
      "A bounded range illustrates consolidation.",
      "A sharp departure illustrates expansion.",
      "Retracement and reversal require a reference scale."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 35,
        "y": 115,
        "w": 100,
        "h": 48,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M35,140 L65,123 L95,151 L130,135",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M130,135 L193,44",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M193,44 L235,82 L275,55 L350,154",
        "stage": 2,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 55,
        "y": 99,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 191,
        "y": 27,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 350,
        "y": 183,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "38": {
    "title": "Risk comes before a reward ratio",
    "steps": [
      "Define the loss assumption before the entry.",
      "A larger target changes the ratio, not its probability.",
      "Costs and unfilled orders belong in the record."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 70,
        "y": 125,
        "w": 85,
        "h": 45,
        "stage": 0,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 113,
        "y": 155,
        "text": "1R",
        "stage": 0
      },
      {
        "kind": "zone",
        "x": 215,
        "y": 35,
        "w": 85,
        "h": 135,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 258,
        "y": 105,
        "text": "3R",
        "stage": 1
      },
      {
        "kind": "line",
        "x": 45,
        "y": 171,
        "x2": 350,
        "y2": 171,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 45,
        "y": 186,
        "x2": 350,
        "y2": 186,
        "stage": 2,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 53,
        "y": 151,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 323,
        "y": 63,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 355,
        "y": 201,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "39": {
    "title": "A top-down hypothesis can be wrong",
    "steps": [
      "Monthly context supplies a starting question.",
      "Weekly and daily evidence can disagree.",
      "Do not infer a specific institution from a candle."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 40,
        "y": 45,
        "w": 100,
        "h": 45,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 90,
        "y": 74,
        "text": "M",
        "stage": 0
      },
      {
        "kind": "zone",
        "x": 150,
        "y": 80,
        "w": 100,
        "h": 45,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "label",
        "x": 200,
        "y": 109,
        "text": "W",
        "stage": 1
      },
      {
        "kind": "zone",
        "x": 260,
        "y": 115,
        "w": 100,
        "h": 45,
        "stage": 2,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 310,
        "y": 144,
        "text": "D",
        "stage": 2
      },
      {
        "kind": "path",
        "d": "M90,92 L90,173 L310,173",
        "stage": 2,
        "tone": "ink",
        "dashed": true
      }
    ]
  },
  "40": {
    "title": "Price arrays and related markets",
    "steps": [
      "Mark distinct reference areas on the price chart.",
      "Compare a related rate market at aligned times.",
      "Correlation is contextual, not a fixed price rule."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 40,
        "y": 58,
        "w": 140,
        "h": 22,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "zone",
        "x": 40,
        "y": 125,
        "w": 140,
        "h": 22,
        "stage": 0,
        "tone": "coral"
      },
      {
        "kind": "path",
        "d": "M42,112 L80,85 L115,99 L165,52",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 205,
        "y": 38,
        "x2": 205,
        "y2": 180,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M232,145 L267,121 L300,151 L356,79",
        "stage": 1,
        "tone": "violet",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M232,60 L270,82 L310,64 L356,107",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 50,
        "y": 35,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 354,
        "y": 58,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 260,
        "y": 192,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "41": {
    "title": "Trading days and account denominators",
    "steps": [
      "Count the chosen lookback in trading days.",
      "A rolling window is not a fixed calendar quarter.",
      "State which capital amount a risk percentage uses."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 40,
        "y": 50,
        "w": 230,
        "h": 35,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 150,
        "y": 73,
        "text": "20 / 40 / 60",
        "stage": 0
      },
      {
        "kind": "zone",
        "x": 95,
        "y": 100,
        "w": 230,
        "h": 35,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "path",
        "d": "M270,67 L345,67 L345,153",
        "stage": 1,
        "tone": "violet",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 250,
        "y": 153,
        "w": 110,
        "h": 37,
        "stage": 2,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 306,
        "y": 178,
        "text": "%",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 49,
        "y": 38,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 105,
        "y": 161,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 225,
        "y": 183,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "42": {
    "title": "COT is optional swing context",
    "steps": [
      "Start with a higher-timeframe hypothesis.",
      "Positioning data has a snapshot and a later release.",
      "Open interest counts contracts, not directional certainty."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,141 L78,101 L120,120 L166,61",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 205,
        "y": 45,
        "w": 145,
        "h": 35,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "label",
        "x": 278,
        "y": 68,
        "text": "COT",
        "stage": 1
      },
      {
        "kind": "zone",
        "x": 205,
        "y": 125,
        "w": 65,
        "h": 45,
        "stage": 2,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 238,
        "y": 153,
        "text": "+",
        "stage": 2
      },
      {
        "kind": "zone",
        "x": 285,
        "y": 125,
        "w": 65,
        "h": 45,
        "stage": 2,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 318,
        "y": 153,
        "text": "−",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 40,
        "y": 175,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 197,
        "y": 38,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 278,
        "y": 197,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "43": {
    "title": "A curve can fail to complete",
    "steps": [
      "A price curve is selected retrospectively in many examples.",
      "Define a turning condition before the next move.",
      "Show both recovery and continuation as possibilities."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,55 L86,76 L125,70 L166,115 L205,161",
        "stage": 0,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 175,
        "y": 148,
        "w": 80,
        "h": 30,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "path",
        "d": "M205,161 L255,115 L295,125 L355,67",
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M205,161 L266,175 L355,189",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 60,
        "y": 36,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 186,
        "y": 134,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 354,
        "y": 46,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "44": {
    "title": "Daily open and possible paths",
    "steps": [
      "Use a stated daily-open reference.",
      "A low below the open is one bullish-day hypothesis.",
      "A daily profile does not dictate the next candle."
    ],
    "marks": [
      {
        "kind": "line",
        "x": 40,
        "y": 95,
        "x2": 355,
        "y2": 95,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "dot",
        "x": 45,
        "y": 95,
        "stage": 0,
        "tone": "violet"
      },
      {
        "kind": "path",
        "d": "M45,95 L111,161 L182,117 L260,53 L350,69",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M45,95 L110,62 L180,123 L260,155 L350,142",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 44,
        "y": 77,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 108,
        "y": 188,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 349,
        "y": 181,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "45": {
    "title": "A daily objective is not a daily entitlement",
    "steps": [
      "A consolidation defines a possible range study.",
      "A breakout may offer an example or a failed trade.",
      "Include no-trade days and costs in the journal."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 40,
        "y": 95,
        "w": 155,
        "h": 65,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M40,131 L78,106 L115,145 L155,114 L190,132",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M190,132 L235,72 L270,86",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 295,
        "y": 55,
        "w": 65,
        "h": 110,
        "stage": 2,
        "tone": "violet"
      },
      {
        "kind": "line",
        "x": 308,
        "y": 80,
        "x2": 347,
        "y2": 80,
        "stage": 2,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 308,
        "y": 107,
        "x2": 347,
        "y2": 107,
        "stage": 2,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 308,
        "y": 134,
        "x2": 347,
        "y2": 134,
        "stage": 2,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 50,
        "y": 80,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 251,
        "y": 50,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 326,
        "y": 190,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "46": {
    "title": "Compare markets without mixing units",
    "steps": [
      "Align the dates of two different instruments.",
      "Keep each instrument’s contract and price units.",
      "A related move is a question, not a conversion formula."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,85 L75,55 L115,96 L155,44",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 190,
        "y": 35,
        "x2": 190,
        "y2": 180,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M225,151 L265,117 L305,135 L355,91",
        "stage": 1,
        "tone": "violet",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 115,
        "y": 32,
        "x2": 115,
        "y2": 180,
        "stage": 2,
        "tone": "ink",
        "dashed": true
      },
      {
        "kind": "line",
        "x": 305,
        "y": 32,
        "x2": 305,
        "y2": 180,
        "stage": 2,
        "tone": "ink",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 45,
        "y": 121,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 349,
        "y": 66,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 220,
        "y": 195,
        "text": "≠",
        "stage": 2
      }
    ]
  },
  "47": {
    "title": "Preparation before a timed observation",
    "steps": [
      "Write the setup and invalidation before replay.",
      "A macro supplies a time window, not direction.",
      "Review losses and skipped sessions as well as wins."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 45,
        "y": 45,
        "w": 125,
        "h": 125,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "line",
        "x": 65,
        "y": 73,
        "x2": 145,
        "y2": 73,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 65,
        "y": 102,
        "x2": 145,
        "y2": 102,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 65,
        "y": 131,
        "x2": 125,
        "y2": 131,
        "stage": 0,
        "tone": "ink",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 210,
        "y": 72,
        "w": 135,
        "h": 50,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "path",
        "d": "M278,123 L278,165 L350,165",
        "stage": 2,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 55,
        "y": 194,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 278,
        "y": 101,
        "text": "Time",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 350,
        "y": 192,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "48": {
    "title": "Keep source windows separate",
    "steps": [
      "Pre-market observation is distinct from preparation.",
      "The cash open is a separate timestamp.",
      "A first-hour range is specific to its source example."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 35,
        "y": 55,
        "w": 175,
        "h": 35,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 122,
        "y": 78,
        "text": "07:00–09:00",
        "stage": 0
      },
      {
        "kind": "line",
        "x": 235,
        "y": 35,
        "x2": 235,
        "y2": 180,
        "stage": 1,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 235,
        "y": 195,
        "text": "09:30",
        "stage": 1
      },
      {
        "kind": "zone",
        "x": 235,
        "y": 113,
        "w": 130,
        "h": 35,
        "stage": 2,
        "tone": "violet"
      },
      {
        "kind": "label",
        "x": 302,
        "y": 138,
        "text": "10:30",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 39,
        "y": 115,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 235,
        "y": 25,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 359,
        "y": 174,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "49": {
    "title": "Above a historical high",
    "steps": [
      "Mark the last known historical high.",
      "A new high has no earlier traded prices above it.",
      "Projection levels remain hypotheses, not promised targets."
    ],
    "marks": [
      {
        "kind": "line",
        "x": 40,
        "y": 100,
        "x2": 350,
        "y2": 100,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M35,155 L85,103 L130,139 L175,95",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M175,95 L218,70 L258,90 L299,40",
        "stage": 1,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 205,
        "y": 39,
        "x2": 355,
        "y2": 39,
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 348,
        "y": 27,
        "text": "?",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 67,
        "y": 88,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 261,
        "y": 115,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 350,
        "y": 70,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "50": {
    "title": "Opening gaps are price intervals",
    "steps": [
      "Record the prior close using a stated session.",
      "Compare the next opening price.",
      "A gap midpoint is a reference, not a required fill."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,142 L80,117 L120,146 L155,128",
        "stage": 0,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 155,
        "y": 128,
        "x2": 350,
        "y2": 128,
        "stage": 0,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "candle",
        "x": 235,
        "open": 72,
        "close": 52,
        "high": 40,
        "low": 88,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "zone",
        "x": 178,
        "y": 72,
        "w": 175,
        "h": 56,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "line",
        "x": 178,
        "y": 100,
        "x2": 353,
        "y2": 100,
        "stage": 2,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 155,
        "y": 161,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 237,
        "y": 27,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 323,
        "y": 91,
        "text": "50%",
        "stage": 2
      }
    ]
  },
  "51": {
    "title": "Lunch, afternoon, final hour",
    "steps": [
      "Separate the named intraday observation windows.",
      "Record what price does during each window.",
      "A time label does not certify a trade."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 35,
        "y": 65,
        "w": 95,
        "h": 95,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 82,
        "y": 115,
        "text": "Lunch",
        "stage": 0
      },
      {
        "kind": "zone",
        "x": 145,
        "y": 65,
        "w": 95,
        "h": 95,
        "stage": 1,
        "tone": "violet"
      },
      {
        "kind": "label",
        "x": 192,
        "y": 115,
        "text": "PM",
        "stage": 1
      },
      {
        "kind": "zone",
        "x": 255,
        "y": 65,
        "w": 110,
        "h": 95,
        "stage": 2,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 310,
        "y": 115,
        "text": "End",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 82,
        "y": 190,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 192,
        "y": 190,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 310,
        "y": 190,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "52": {
    "title": "Event volatility and execution risk",
    "steps": [
      "Mark the scheduled release before the event.",
      "A fast move can widen spreads and skip prices.",
      "A stop cannot guarantee the requested fill price."
    ],
    "marks": [
      {
        "kind": "line",
        "x": 155,
        "y": 35,
        "x2": 155,
        "y2": 180,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M35,110 L75,103 L118,112 L150,106",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M150,106 L178,35 L205,180 L240,55 L274,147",
        "stage": 1,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "zone",
        "x": 285,
        "y": 78,
        "w": 70,
        "h": 47,
        "stage": 2,
        "tone": "coral"
      },
      {
        "kind": "label",
        "x": 320,
        "y": 68,
        "text": "?",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 155,
        "y": 24,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 205,
        "y": 202,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 353,
        "y": 152,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "53": {
    "title": "The Venom reference window",
    "steps": [
      "Mark 08:00–09:30 in New York local time.",
      "Observe the selected high raid and subsequent move lower.",
      "Aggressive and deferred entries are different variations."
    ],
    "marks": [
      {
        "kind": "zone",
        "x": 35,
        "y": 70,
        "w": 170,
        "h": 80,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "path",
        "d": "M35,120 L70,84 L110,138 L150,93 L195,124",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "label",
        "x": 120,
        "y": 58,
        "text": "08:00–09:30",
        "stage": 0
      },
      {
        "kind": "line",
        "x": 210,
        "y": 40,
        "x2": 210,
        "y2": 180,
        "stage": 1,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M210,125 L242,39 L277,125",
        "stage": 1,
        "tone": "coral",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M277,125 L310,99 L355,171",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 53,
        "y": 178,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 242,
        "y": 25,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 350,
        "y": 195,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "54": {
    "title": "One candle supplies a study range",
    "steps": [
      "State which candle and timeframe define the range.",
      "A later wick can trade beyond a boundary.",
      "The opposite boundary is not a compulsory destination."
    ],
    "marks": [
      {
        "kind": "candle",
        "x": 75,
        "open": 120,
        "close": 85,
        "high": 50,
        "low": 163,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "line",
        "x": 75,
        "y": 50,
        "x2": 355,
        "y2": 50,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "line",
        "x": 75,
        "y": 163,
        "x2": 355,
        "y2": 163,
        "stage": 0,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "candle",
        "x": 185,
        "open": 85,
        "close": 97,
        "high": 29,
        "low": 120,
        "stage": 1,
        "tone": "coral"
      },
      {
        "kind": "path",
        "d": "M205,97 L260,131 L315,115 L350,150",
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 75,
        "y": 193,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 185,
        "y": 21,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 351,
        "y": 190,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "55": {
    "title": "Body gap, overlapping wicks",
    "steps": [
      "The first candle provides a body boundary.",
      "The next body is separated while the wicks overlap.",
      "This body gap is not a standard wick-to-wick FVG."
    ],
    "marks": [
      {
        "kind": "candle",
        "x": 105,
        "open": 137,
        "close": 110,
        "high": 92,
        "low": 155,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 105,
        "y": 183,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "candle",
        "x": 215,
        "open": 85,
        "close": 61,
        "high": 46,
        "low": 118,
        "stage": 1,
        "tone": "teal"
      },
      {
        "kind": "label",
        "x": 215,
        "y": 29,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "zone",
        "x": 91,
        "y": 85,
        "w": 250,
        "h": 25,
        "stage": 2,
        "tone": "violet"
      },
      {
        "kind": "line",
        "x": 104,
        "y": 97,
        "x2": 215,
        "y2": 97,
        "stage": 2,
        "tone": "coral",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 313,
        "y": 75,
        "text": "Body",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 347,
        "y": 142,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "56": {
    "title": "Measure before projecting",
    "steps": [
      "Choose the source-defined measurement boundaries.",
      "A projection is calculated from that chosen interval.",
      "A projected level is not a guaranteed price destination."
    ],
    "marks": [
      {
        "kind": "candle",
        "x": 75,
        "open": 157,
        "close": 135,
        "high": 120,
        "low": 175,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "candle",
        "x": 135,
        "open": 134,
        "close": 72,
        "high": 61,
        "low": 144,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "candle",
        "x": 195,
        "open": 72,
        "close": 53,
        "high": 34,
        "low": 90,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "zone",
        "x": 60,
        "y": 90,
        "w": 170,
        "h": 30,
        "stage": 0,
        "tone": "teal"
      },
      {
        "kind": "line",
        "x": 258,
        "y": 90,
        "x2": 258,
        "y2": 120,
        "stage": 1,
        "tone": "violet",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 247,
        "y": 90,
        "x2": 269,
        "y2": 90,
        "stage": 1,
        "tone": "violet",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 247,
        "y": 120,
        "x2": 269,
        "y2": 120,
        "stage": 1,
        "tone": "violet",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 230,
        "y": 53,
        "x2": 355,
        "y2": 53,
        "stage": 2,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 343,
        "y": 40,
        "text": "?",
        "stage": 2
      },
      {
        "kind": "label",
        "x": 72,
        "y": 199,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 285,
        "y": 113,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 352,
        "y": 79,
        "text": "3",
        "stage": 2
      }
    ]
  },
  "57": {
    "title": "A lagging market may catch up",
    "steps": [
      "Compare the same swing across related indices.",
      "One market lags the others in this illustration.",
      "The reviewed example considers a conditional catch-up long."
    ],
    "marks": [
      {
        "kind": "path",
        "d": "M35,85 L95,42 L155,79 L215,30 L280,67 L350,39",
        "stage": 0,
        "tone": "teal",
        "dashed": false
      },
      {
        "kind": "path",
        "d": "M35,169 L95,136 L155,172 L215,151 L280,165",
        "stage": 1,
        "tone": "violet",
        "dashed": false
      },
      {
        "kind": "line",
        "x": 86,
        "y": 136,
        "x2": 353,
        "y2": 136,
        "stage": 1,
        "tone": "violet",
        "dashed": true
      },
      {
        "kind": "path",
        "d": "M280,165 L318,133 L354,103",
        "stage": 2,
        "tone": "teal",
        "dashed": true
      },
      {
        "kind": "label",
        "x": 55,
        "y": 23,
        "text": "1",
        "stage": 0
      },
      {
        "kind": "label",
        "x": 215,
        "y": 195,
        "text": "2",
        "stage": 1
      },
      {
        "kind": "label",
        "x": 356,
        "y": 86,
        "text": "3",
        "stage": 2
      }
    ]
  }
};
