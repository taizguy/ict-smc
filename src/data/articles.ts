import { studyArticles } from './articles-study-series';

export type ArticleTopic = 'Psychology' | 'Risk' | 'Market mechanics' | 'On-chain' | 'Learning process' | 'Trading frameworks' | 'Sessions & timing';
export type VisualSeries = 'expedition' | 'mission' | 'museum' | 'theatre' | 'laboratory';
export type SketchKind = 'decision' | 'drawdown' | 'auction' | 'onchain';
export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  sketch?: SketchKind;
  takeaway?: string;
  sources?: number[];
}
export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  topic: ArticleTopic;
  sketch: SketchKind;
  visualSeries?: VisualSeries;
  date: string;
  updated?: string;
  intro: string[];
  sections: ArticleSection[];
  sources: { title: string; url: string; note: string }[];
  links: { title: string; href: string }[];
}

/** Original LearnSMC writing. Stories and numbers are explicitly illustrative. */
export const articles: Article[] = [
  ...studyArticles,
  {
    slug: 'a-good-trade-can-lose', seoTitle: 'Trading Psychology: Good Decisions Can Still Lose | LearnSMC',
    title: 'A good trade can lose. Your brain would like a word.',
    description: 'Separate trading decisions from their outcomes with an illustrated story, a two-column journal and a practical review routine.',
    topic: 'Psychology', sketch: 'decision', date: '2026-10-16', updated: '2026-10-17',
    intro: [
      'A trader follows the plan, takes a small loss, and feels foolish. On the next trade, the same trader ignores the plan, moves the stop, and gets rescued by a bounce. That one feels brilliant. The account has just delivered a very confusing performance review.',
      'Meet Ari, our fictional trader. Ari is not a case study, a client, or a disguised version of the author. Ari is a convenient little person with a very large urge to judge every decision by the last number on the screen. This article follows that urge, then builds a more useful review process.',
      'The puzzle is simple: a result is visible immediately, while the quality of a decision takes more work to inspect. A profitable result can hide a fragile process. A losing result can reveal either a mistake or an ordinary cost of taking a properly limited risk. We need a way to tell those stories apart.'
    ],
    sections: [
      { id: 'two-report-cards', title: '1. The trade needs two report cards', sketch: 'decision', paragraphs: [
        'Imagine two envelopes on Ari’s desk. One says “What happened?” It contains the entry, exit, costs and realized result. The other says “What did I know and do?” It contains the plan recorded before entry, the conditions actually observed, the risk chosen and the rules followed or broken. Neither envelope can replace the other.',
        'The outcome envelope is necessary. A beautifully documented method that keeps losing after realistic costs needs serious investigation. But a single outcome does not establish whether an uncertain decision was sensible. The process envelope stops the newest candle from rewriting what was knowable at the time.',
        'Suppose Ari’s written practice rule is to risk one hypothetical unit and exit if a defined price level fails. The level fails; the loss is one unit. That is a planned loss. Now suppose Ari doubles the exposure after a loss, removes the stop, and eventually makes two units. That is a profitable result accompanied by a broken risk rule. Calling both trades “good” or “bad” based only on money throws away the distinction.'
      ], takeaway: 'Record outcome and rule adherence separately. A green result does not repair a broken rule.' },
      { id: 'the-sample-problem', title: '2. One result is a very small committee', paragraphs: [
        'For a thought experiment, imagine a process that independently gains two units with probability 40% and loses one unit otherwise. Before costs, its assumed arithmetic expectation is 0.4 × 2 − 0.6 × 1 = 0.2 units per attempt. Those assumptions describe a toy model, not a claim about any trading strategy.',
        'In that imaginary world, four consecutive losses have probability 0.6 to the fourth power, or 12.96%, for a particular four-trade block. A positive assumed average does not make a short run comfortable. Nor does it guarantee that the assumptions resemble a real market. Dependence between trades, costs and changing conditions can make the model inappropriate.',
        'Ari’s mistake would be to treat every loss as a referendum on personal ability. The opposite mistake is equally dangerous: treating every loss as harmless variance even when the method has no demonstrated edge. The useful question is whether this result conflicts with a documented expectation, and whether that expectation was supported in the first place.'
      ] },
      { id: 'the-repair-urge', title: '3. The expensive urge to make the day look tidy', paragraphs: [
        'Ari is down one unit. The next thought is not “What opportunity meets my rules?” It is “One decent winner and this ugly red number goes away.” The objective has quietly changed from evaluating an opportunity to repairing a feeling. The chart has been promoted to emotional support equipment.',
        'This story is an illustration, not a diagnosis. Research summarized by the SEC identifies several behaviors that can damage investor performance, including excessive activity and a tendency to realize winners more readily than losers. That bulletin does not prove what motivates any particular trader, or validate a specific intraday intervention. It provides a reason to inspect behavior rather than assume more activity is progress.',
        'A practical interruption is to write the reason for the next action before taking it. “I want the account back to even” is a statement about the account, not evidence about the opportunity. If a rule cannot be stated without mentioning the previous trade’s P&L, Ari has a useful warning sign to investigate.'
      ], sources: [1] },
      { id: 'two-column-journal', title: '4. A journal that refuses to flatter you', paragraphs: [
        'Make one column for execution: timestamp with timezone, instrument, entry, original stop, exit, size, fees and realized R. Make another for the decision: what condition was required, whether it was present before entry, what would invalidate the idea, and whether exposure stayed inside the written limit. Save the original screenshot before later candles make everything look obvious.',
        'Use specific descriptions. “Bad discipline” is too broad to repair. “Entered before the required candle closed” is observable. “Unlucky” is too broad as well. “Stopped at the original level; no rule violation identified” distinguishes a planned loss from an execution mistake without pretending the underlying strategy is validated.',
        'The journal should also contain decisions not to trade. If Ari skips a setup because the spread exceeds a prewritten limit, the later rally does not retroactively make that decision foolish. Recording the skip creates a fair comparison: what did the rule ask, what information was available, and what did Ari do? A missing trade is not automatically a missed opportunity.'
      ], takeaway: 'Describe one observable action you can repeat or change. Avoid turning a trade review into a verdict on yourself.' },
      { id: 'review-without-rewriting', title: '5. Review the pattern, then change one thing', paragraphs: [
        'At a planned review time, group executions by rule adherence before looking for attractive charts. Count the trades taken according to the specified method, the trades taken outside it, and the valid observations skipped. Compare their recorded results after costs. Do not combine different versions of a setup and call the mixture a tested strategy.',
        'If a recurring mistake appears, choose a concrete response and a review date. For example: add a required written invalidation sentence before submitting a practice order. That is an experiment in behavior. It is not evidence that writing sentences improves market returns. Track whether the behavior changes and whether the rule remains useful.',
        'If correctly executed trades also perform poorly, inspect the method, sample, costs and market conditions. Better compliance with an unprofitable rule is not a complete solution. If trading is causing persistent distress or impairing daily life, stepping away and seeking appropriate support can be more useful than another optimization session.'
      ] },
      { id: 'next-session', title: '6. A quieter question for the next session', paragraphs: [
        'Before the next practice session, Ari writes three lines: the conditions required to act, the maximum exposure permitted, and the point at which the session ends. Afterward, Ari reviews whether those lines were followed and records the actual result. It is a small ritual with an intentionally limited job: making behavior visible.',
        'The aim is not to become a person who enjoys losing, or a person who never feels an impulse. It is to stop making the last result the only teacher in the room. A trade can be a planned loss, an avoidable mistake, a lucky escape, or a well-executed opportunity. Those are different lessons. Give them different names.'
      ] }
    ],
    sources: [{ title: 'SEC / Investor.gov: Behavioral Patterns of U.S. Investors', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-72', note: 'Background on documented investor behaviors. The Ari story, arithmetic example and journal exercise are original illustrations, not findings from this bulletin.' }],
    links: [{ title: 'Keep a device-local trading journal', href: '/tools/journal/' }, { title: 'Explore hypothetical trade paths', href: '/tools/backtest/' }]
  },
  {
    slug: 'drawdown-math-is-not-symmetric', seoTitle: 'Drawdown Math: Why a 20% Loss Needs a 25% Gain | LearnSMC', title: 'The hole gets deeper faster than the ladder gets taller.',
    description: 'Why a 20% trading loss needs a 25% recovery: drawdown arithmetic, position sizing, costs and an illustrated risk-budget example.',
    topic: 'Risk', sketch: 'drawdown', date: '2026-10-16', updated: '2026-10-17',
    intro: [
      'Start with 100 imaginary tokens. Lose 20%. You have 80. Gain 20% on those 80 and you have 96. Four tokens have apparently wandered off during a conversation that sounded perfectly symmetrical.',
      'No market trick is required. The loss and the gain use different starting amounts. A drawdown changes the base from which recovery is measured. This small arithmetic fact explains why recovering a damaged account can feel much harder than the original percentage suggested.',
      'The examples below are hypothetical and ignore taxes unless stated. They explain accounting relationships, not how much anyone should risk or whether a strategy is profitable. Our illustrated trader is carrying a ladder into a hole. The ladder is not a trading signal.'
    ],
    sections: [
      { id: 'different-denominators', title: '1. The denominator moved', sketch: 'drawdown', paragraphs: [
        'Call the original equity E and the fractional loss d. After the loss, equity is E × (1 − d). The amount required to recover is E × d. Divide that missing amount by the smaller remaining account and the required fractional gain is d ÷ (1 − d). The original account size cancels out.',
        'A 10% loss needs about 11.11% to recover. A 20% loss needs 25%. A 40% loss needs about 66.67%. A 50% loss needs 100%. At a 100% loss, there is no remaining base to compound: the recovery expression is undefined. These are arithmetic identities, not observations from a return series.',
        'When a chart or dashboard says “drawdown,” check its reference. Peak-to-trough drawdown compares equity with an earlier running peak. A loss from the initial deposit is a different measure. If the account grows from 100 to 120 and then falls to 108, it is 8% above the start and 10% below its peak. Both statements can be true.'
      ], takeaway: 'Recovery gain = loss fraction ÷ remaining fraction. Equal percentages do not cancel when their bases differ.' },
      { id: 'streaks-and-sizing', title: '2. Ten losses do not all cost the same amount', paragraphs: [
        'Suppose a fictional rule risks 1% of current equity on each attempt, and each losing attempt loses exactly that amount. Starting with 10,000, ten consecutive losses leave 10,000 × 0.99¹⁰, approximately 9,043.82. The drawdown from the starting balance is about 9.56%. The monetary amount at risk shrinks as equity falls.',
        'Now change the rule to a fixed 100 per loss. Ten losses leave 9,000. After several losses, that fixed amount represents a larger fraction of the remaining balance. A label such as “one unit” is not enough; specify whether the unit is fixed money, a percentage of initial equity or a percentage of current equity.',
        'Neither sequence estimates the probability of ten real losses. A run’s likelihood depends on the process, including dependence between trades. The arithmetic only answers what the account would contain if those assumptions held. The useful habit is to write the sizing convention beside every performance figure.'
      ] },
      { id: 'risk-is-not-margin', title: '3. The number you can open is not the number you can lose', paragraphs: [
        'A platform may permit a position because the margin requirement fits the account. That is a financing or collateral condition. A trade-risk estimate asks a different question: how much could the position lose between the intended entry and assumed exit, including costs? Available margin does not answer that question.',
        'In a simplified example, an instrument is worth 5 per point per contract, and the intended stop is 20 points away. Planned price risk is 100 per contract before costs. A 250 budget permits at most two whole contracts under those assumptions, leaving 50 for costs or unused capacity. It does not permit 2.5 contracts if the product trades only in whole contracts.',
        'If estimated total costs for two contracts are 60, the planned total is 260, above the 250 budget. The price-only calculation was incomplete. Contract multipliers, tick values, settlement currency and minimum increments must match the actual product. An example multiplier is not a substitute for checking the exchange and broker specifications.'
      ] },
      { id: 'stops-and-gaps', title: '4. A stop is an instruction, not a force field', paragraphs: [
        'The previous arithmetic assumed an exact loss at the intended stop. Real execution can differ. The SEC explains that a stock stop order becomes a market order when triggered; its execution price can differ from the stop price. A stop-limit order adds a price constraint but may not execute. Product and broker rules matter, so confirm the actual order type rather than applying stock-market wording to every instrument.',
        'For a practice risk budget, separate planned price loss, estimated ordinary costs and a stress scenario. For example, compare the plan with an exit five points worse than intended. This is not a prediction of slippage. It is a way to notice that an apparently comfortable position depends on a fragile execution assumption.',
        'Also ask what happens when several positions respond to the same event. Five trades labeled separately can still represent one concentrated exposure. Counting tickets is not a measure of diversification. Write down the shared driver and consider the combined effect of an adverse move.'
      ], sources: [1] },
      { id: 'no-recovery-deadline', title: '5. The account does not owe you a recovery date', paragraphs: [
        'A fictional trader sees a 20% drawdown and decides to make it back by Friday. That decision adds a deadline but no evidence of an opportunity. To hit the deadline, the trader may increase exposure precisely when the account has less room to absorb mistakes. The target return has become a demand placed on a random sequence.',
        'A review can instead ask whether the method still has support, whether losses stayed within the planned assumptions, and whether real costs were larger than expected. A reduced position or a pause can create space for that review, but neither guarantees eventual recovery. Some strategies stop working; some never worked outside an attractive sample.',
        'The same restraint applies to a simulation. Changing hypothetical win probability until the recovery curve looks pleasant does not improve the underlying evidence. Label every assumption. Preserve the losing paths alongside the attractive ones. A teaching model becomes useful when it exposes a dependency, not when it promises a timetable.'
      ] },
      { id: 'risk-card', title: '6. Put five numbers on a small card', paragraphs: [
        'For your next paper-trading review, record the running equity peak, current equity, planned monetary risk per attempt, estimated costs and combined exposure across open positions. Add the product’s size increment. Those entries connect the account-level question to an executable position instead of leaving “risk management” as a motivational phrase.',
        'Then calculate drawdown from the peak and the gain needed to reach it again. Keep the recovery calculation descriptive. It says how far away the peak is; it does not say that the peak will return. The arithmetic is useful precisely because it makes no effort to cheer you up.'
      ] }
    ],
    sources: [{ title: 'SEC / Investor.gov: Stop, Stop-Limit, and Trailing Stop Orders', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15', note: 'Order-type and execution limitations for stocks. All drawdown and sizing numbers here are independently constructed arithmetic examples.' }],
    links: [{ title: 'Inspect tick-aware sizing assumptions', href: '/tools/delivery-suite/ote-calculator/' }, { title: 'Explore hypothetical drawdown paths', href: '/tools/backtest/' }]
  },
  {
    slug: 'liquidity-is-not-a-magnet', seoTitle: 'Liquidity Sweeps, Stop Orders & Market Mechanics | LearnSMC', title: 'Liquidity is not a magnet. So why does price go there?',
    description: 'An illustrated explanation of liquidity, stop orders and sweeps that separates visible price action from claims about institutional intent.',
    topic: 'Market mechanics', sketch: 'auction', date: '2026-10-16', updated: '2026-10-17',
    intro: [
      'Draw a line above yesterday’s high. Label it “liquidity.” Watch price approach. It is tempting to imagine a little magnet pulling every candle upward. Unfortunately, the magnet has no order ID, and the exchange has not installed one.',
      'Liquidity is a useful word with several meanings. It can describe the ability to transact with limited price impact, the quoted orders available at a venue, or a charting framework’s hypothesis about potential stop orders near a reference level. Confusing those meanings makes a neat drawing sound more certain than the evidence permits.',
      'This article uses a fictional auction and a schematic chart. Neither is a recording of an actual order book. The aim is to make the mechanics easier to reason about while leaving uncertainty visible.'
    ],
    sections: [
      { id: 'the-little-auction', title: '1. Start with a very small auction', sketch: 'auction', paragraphs: [
        'Imagine a simplified continuous order book. Sellers offer three units at 100 and four units at 101. A marketable buy order seeks five units. If those offers stay available and there are no other matching complications, it trades three at 100 and two at 101. The last execution is higher because the order used the lower-priced offers and reached the next level.',
        'There were five bought units and five sold units. “More buyers than sellers” is not the accounting explanation for those completed trades. The important details are how much executable interest existed at each price and how incoming orders interacted with it. The little auction is intentionally incomplete: actual venues have additional order types, priority rules, cancellations and hidden interest.',
        'A displayed quote is also not a permanent object. If the four offered units at 101 are canceled before the incoming order reaches them, our hypothetical fill changes. A screenshot of the book and a later candle cannot by themselves reconstruct the full sequence of messages and executions.'
      ], sources: [1] },
      { id: 'two-kinds-of-level', title: '2. A resting offer and a possible stop are different things', paragraphs: [
        'A resting sell limit can offer liquidity to an aggressive buyer. A buy stop above a swing high is a conditional instruction that may generate buying when triggered. In chart education, both may be discussed near the same price, but they play different roles in an execution sequence.',
        'For stocks, the SEC distinguishes stop-market orders, which become market orders after triggering, from stop-limit orders, which become limit orders. The latter may remain unfilled. Check the rules of the actual broker, product and venue. It is inaccurate to declare that every stop in every market becomes a guaranteed market fill.',
        'The old high is observable on the chosen chart. A dense cluster of stops above it is an inference unless suitable order data establishes it. A named institution’s intention is a stronger claim again. Treat these as separate statements with different evidence requirements rather than letting one familiar label stand in for all three.'
      ], sources: [2], takeaway: 'A reference price is visible. The orders around it and the motives behind them may not be.' },
      { id: 'a-sweep-has-two-futures', title: '3. The same high can lead to two different endings', paragraphs: [
        'Take a fictional range with a high at 100. Price trades at 101 and later returns below 100. Under a stated convention, you might label that a sweep and rejection. Now take another path: price trades at 101, holds above 100, and continues to 104. Crossing the old high happened in both paths. The later behavior differs.',
        'A rule that labels only the first path after seeing the reversal may be a useful description, but it is not automatically a usable prediction. To evaluate a trade, specify what had to be observable before entry: the excursion, a close back inside, a defined structural break, or another condition. Different definitions produce different samples.',
        'Also specify what would disprove the idea. “It will reverse eventually” has no clear boundary. “The thesis fails if price closes above this defined reference before the target” is testable in a chosen dataset. It can still be a poor strategy. Testability gives an idea a fair examination, not a free pass.'
      ] },
      { id: 'which-market', title: '4. First ask which market your chart belongs to', paragraphs: [
        'The BIS describes spot foreign exchange execution as fragmented across venues and arrangements. A spot FX chart should not be treated as a consolidated view of every order in a single global exchange book. Likewise, a crypto exchange’s visible depth represents that venue’s feed, not all possible activity everywhere.',
        'This matters when a lesson borrows exchange vocabulary to explain a broker chart. You can study reference highs and lows without claiming to see the entire underlying market. Record the symbol, venue or broker feed, timezone, session definition and whether prices are last trades, bids, asks or another construction.',
        'Two feeds can show different extrema. That does not automatically prove manipulation or invalidate all chart study. It does mean the definition and dataset must travel with the conclusion. “This low was swept” is incomplete until a reader knows which low, which feed and which time interval.'
      ], sources: [3] },
      { id: 'the-testable-notebook', title: '5. Replace the magnet with a notebook', paragraphs: [
        'Before examining outcomes, choose a reference such as the previous session high, define the session in a named timezone, and decide what qualifies as an excursion. Write the required confirmation, entry rule, stop, target, cost assumptions and maximum observation period. Exclude future information from every decision point.',
        'Collect the failures as carefully as the reversals. Include the path that crosses the level and keeps going, the one that reverses before your confirmation, and the one that gives an entry but cannot be filled at your assumed price. A collection of attractive screenshots is an illustration library, not a representative performance sample.',
        'Split rule development from evaluation where possible. If you keep changing the excursion threshold after looking at results, the resulting sample is helping you invent the rule rather than independently evaluate it. Save the old version and record what changed. Otherwise the notebook becomes a very elaborate way to forget unsuccessful ideas.'
      ] },
      { id: 'useful-less-certain', title: '6. A less dramatic explanation can be more useful', paragraphs: [
        'You do not need to know the identity of every participant to describe a range break, a rejection or a structure change. Those observations can organize a study. The problem begins when the description is promoted into a universal explanation of intent or a promise about the next candle.',
        'Keep the chart labels, but attach their definitions and limits. “Potential stop interest above a prior high” is less cinematic than “the algorithm must hunt this level.” It also leaves room for the continuation case, which your risk plan needs to survive. Our little magnet can retire to the fridge, where its predictive record is excellent.'
      ] }
    ],
    sources: [
      { title: 'SEC / Investor.gov: Understanding Order Types', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-14', note: 'Background on market and limit orders. The five-unit auction is an original simplified example.' },
      { title: 'SEC / Investor.gov: Stop, Stop-Limit, and Trailing Stop Orders', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15', note: 'Distinguishes stock stop orders and execution limitations; confirm product-specific rules.' },
      { title: 'BIS: FX trade execution — complex and highly fragmented', url: 'https://www.bis.org/publications/qr-201912/fx-trade-execution-complex-and-highly-fragmented', note: 'Market-structure context. It does not validate a sweep-trading strategy.' }
    ],
    links: [{ title: 'Study how exchange matching works', href: '/learn/how-an-exchange-matches-orders/' }, { title: 'Explore glossary definitions', href: '/tools/glossary/' }, { title: 'Practice without revealing later candles', href: '/tools/chartlab/' }]
  },
  {
    slug: 'bitcoin-dashboard-is-not-a-crystal-ball', seoTitle: 'Bitcoin MVRV, Realized Price & NUPL Explained | LearnSMC', title: 'Your Bitcoin dashboard is not a crystal ball.',
    description: 'Understand realized price, MVRV and NUPL through a tiny fictional Bitcoin network, with formulas, data limits and a source checklist.',
    topic: 'On-chain', sketch: 'onchain', date: '2026-10-16', updated: '2026-10-17',
    intro: [
      'Open an on-chain dashboard and the market acquires a second personality. There are ratios, bands, heatmaps and colors with the confidence of a weather forecast. A line enters a green zone and a small voice says: surely someone has finally turned uncertainty into a household appliance.',
      'Dashboards such as BlockHorizon are useful places to discover questions. What is realized price? Does a valuation ratio identify a particular entry? Are two agreeing indicators actually two independent pieces of evidence? Answering those questions starts with definitions, not with the color of the latest cell.',
      'We will use a tiny fictional network with invented values. These are arithmetic examples, not current Bitcoin readings, and no chart in this article is a live feed. The distinction matters: an explanation of a metric is not a market forecast.'
    ],
    sections: [
      { id: 'two-price-tags', title: '1. Give the network two different price tags', sketch: 'onchain', paragraphs: [
        'In a basic Bitcoin realized-cap formulation, coins are valued using the price associated with their last on-chain movement rather than marking every coin at today’s price. Realized price divides realized capitalization by the corresponding supply. Coin Metrics documents these conventions; provider variants and supply definitions must be checked.',
        'For our fictional example, imagine only three coins. One last moved when price was 10, another at 20, and the third at 30. Their realized capitalization is 60. If today’s price is 40, market capitalization is 120. Realized price is 60 ÷ 3 = 20. This tiny model makes the different price tags visible.',
        'Calling realized price “what everyone paid” would overstate the information. Bitcoin transactions spend outputs and create new ones; an on-chain movement need not be a purchase by a new economic owner. Wallet housekeeping and transfers can change observations without representing a new market purchase. Consult the methodology rather than treating a useful proxy as an audited account statement.'
      ], sources: [1, 2], takeaway: 'A metric is a defined construction. Its name is not a complete description of what the data can establish.' },
      { id: 'mvrv-and-nupl', title: '2. Two gauges may share the same engine', paragraphs: [
        'For matching definitions, MVRV is market capitalization divided by realized capitalization. In the toy network it is 120 ÷ 60 = 2. NUPL can be expressed as (market cap − realized cap) ÷ market cap, giving (120 − 60) ÷ 120 = 0.5. Glassnode documents the latter relationship.',
        'Now do a little algebra: NUPL = 1 − 1/MVRV, provided both use exactly the same compatible capitalization inputs and the denominator is nonzero. Two agreeing displays may therefore be transformations of shared information. Their agreement alone does not create a second independent observation.',
        'For contrast, suppose a provider shows a cohort-adjusted version of one series and an unadjusted version of another. The neat relationship may not hold. Before declaring that the data is broken, check the asset, cohort, interval, adjustment, timestamp and supply conventions. A matching acronym does not ensure a matching calculation.'
      ], sources: [1, 3] },
      { id: 'context-versus-entry', title: '3. Context and an entry answer different questions', paragraphs: [
        'A ratio summarizes a relationship at an observation time. An entry rule must also specify an action, execution conditions, risk and a way to be wrong. “The ratio is low” supplies none of those details by itself. Even a relationship that looked useful in several previous cycles can persist, shift or fail in the next one.',
        'In our toy network, let the current price fall from 40 to 30 while the movement-based values stay unchanged. Market cap falls to 90, MVRV becomes 1.5 and NUPL becomes one third. All three calculations changed without any invented rule telling us whether the next price is 20 or 50. Arithmetic describes the inputs; it does not generate an order.',
        'For an actual historical investigation, state the threshold before evaluating it, define the next action and include costs. Preserve all observations meeting the rule, not just the cycle low that makes the screenshot attractive. Check whether the data available today differs from the data that would have been available at the historical decision time.'
      ] },
      { id: 'read-the-label', title: '4. Read the label before reading the color', paragraphs: [
        'For each chart, record the exact metric name and provider, the asset, unit, interval, latest observation timestamp and methodology link. Distinguish the data timestamp from the time you opened the page. A chart refreshed this morning can still show a previous daily observation.',
        'Then inspect transformations. Is the axis logarithmic? Is the series a moving average, a ratio, a z-score or a percentage? Is a colored band fixed in advance or fitted to the displayed history? You cannot responsibly compare an unadjusted daily series with an adjusted weekly one merely because their lines have the same color.',
        'Missing values need their own label. An empty chart is not a zero. A paywalled history is not evidence that nothing happened earlier. If you cannot verify a reading, say so and link readers to the provider. For an evergreen explainer, an explicitly invented worked example is more useful than a stale number presented as current.'
      ] },
      { id: 'research-not-reposting', title: '5. Use the dashboard to find a question worth explaining', paragraphs: [
        'A strong article might ask why MVRV and NUPL appear to agree, then show the algebra and its assumptions. Another could compare an address-based count with an ownership claim, or explain why a change in coin movement is not automatically a change in conviction. Each starts with a question readers can examine, rather than a borrowed chart followed by a dramatic conclusion.',
        'BlockHorizon links are provided for readers who want to explore its interface. No live values, screenshots, proprietary data series or provider graphics have been reproduced here. Public viewing access is not treated as permission to republish data or artwork. A future data-led article should record the retrieval date, terms and methodology, and obtain the necessary reuse rights for any external asset.',
        'Our own diagram can explain a formula without pretending to be a market chart. If a future article does contain real historical observations, its caption should name the provider, period, frequency, transformation and access date. That turns the illustration into something a reader can check.'
      ], sources: [4] },
      { id: 'one-useful-question', title: '6. Leave with a better question', paragraphs: [
        'Choose one metric and explain it in ordinary language without using the words “bullish” or “bearish.” List what observations go into it and one thing it cannot reveal. Next, change one input in a small invented example and calculate the effect. If the result surprises you, that is an excellent reason to keep studying before attaching a trading rule.',
        'A dashboard can organize evidence, expose an unusual condition and help you ask a more precise question. It cannot remove the need to specify a method, investigate failure cases and control exposure. Keep the gauges. Retire the crystal ball.'
      ] }
    ],
    sources: [
      { title: 'Coin Metrics: Market Capitalization — realized cap and MVRV definitions', url: 'https://docs.coinmetrics.io/network-data/network-data-overview/market/market-capitalization', note: 'Metric definitions and variant conventions. No provider dataset or graphic is reproduced.' },
      { title: 'Bitcoin Developer Guide: Transactions', url: 'https://developer.bitcoin.org/devguide/transactions.html', note: 'Transaction inputs and outputs; on-chain movements are not automatically purchases.' },
      { title: 'Glassnode: Net Unrealized Profit/Loss', url: 'https://docs.glassnode.com/further-information/metric-guides/unrealized-profit-loss/nupl-net-unrealized-profit-loss', note: 'NUPL formula. The three-coin network and examples here are invented.' },
      { title: 'BlockHorizon dashboard', url: 'https://charts.blockhorizon.io/dashboard', note: 'Optional external exploration. Not a source of live readings in this article, an endorsement, or a trading signal.' }
    ],
    links: [{ title: 'Study the mechanics behind a price move', href: '/learn/what-actually-moves-price/' }, { title: 'Review risk and hypothetical outcomes', href: '/tools/backtest/' }]
  }
];

export const articleImageKey = (article: Article) => article.visualSeries || article.sketch;
export const articleDateLabel = (date: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
export const articlePath = (article: Article) => `/articles/${article.slug}/`;
export function articleWordCount(article: Article) {
  return [...article.intro, ...article.sections.flatMap(s => [s.title, ...s.paragraphs, s.takeaway || ''])].join(' ').trim().split(/\s+/).length;
}
export const readingMinutes = (article: Article) => Math.max(1, Math.ceil(articleWordCount(article) / 210));
