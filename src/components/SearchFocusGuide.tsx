import { useTranslation } from '../i18n/TranslationProvider';
import { searchFocusRevision, type SearchFocusKind } from '../data/searchFocus';

export function SearchFocusGuide({kind}:{kind:SearchFocusKind}) {
  const {t,href}=useTranslation();
  const card=(title:string,copy:string,path:string,label?:string)=><li key={path}><h3>{t(title)}</h3><p>{t(copy)}</p><a href={href(path)}>{t(label||title)} <span aria-hidden="true">→</span></a></li>;
  return <section className="search-focus-guide" aria-labelledby={`search-focus-${kind}`}>
    {kind==='curriculum'&&<>
      <h2 id="search-focus-curriculum">{t('Choose a starting point, not a trading signal')}</h2>
      <p>{t('This free ICT and Smart Money Concepts curriculum is for learners who want to understand chart terminology, distinguish observations from interpretations, and practise on historical or synthetic examples. No paid course or live account is required.')}</p>
      <h3>{t('Before you begin')}</h3><p>{t('Know what open, high, low and close mean. If those are new, start with market foundations. Use a demo or replay chart; these lessons do not establish a profitable strategy.')}</p>
      <ol className="search-focus-grid">
        {card('1. Learn how price and orders work','Start with order matching, liquidity and swing structure before naming entry patterns. Your first goal is to explain what is visible without claiming to know who traded.','/learn/what-actually-moves-price/','Start with market foundations')}
        {card('2. Define one pattern precisely','Study the FVG lesson, mark the outer-candle boundaries, then compare a valid gap with an overlapping example. Identify the pattern before deciding whether it has any practical value.','/learn/fair-value-gaps-fvg-and-consequent-encroachment/','Study fair value gaps')}
        {card('3. Practise without looking ahead','Use Chart Laboratory to make an observation before revealing the explanation. Record mistakes and uncertainty; recognising a shape is different from demonstrating a trading edge.','/tools/chartlab/','Open Chart Laboratory')}
      </ol><h3>{t('Following a particular ICT series?')}</h3><p>{t('Compare mentorship study paths rather than assuming every series teaches the same sequence. These are independent LearnSMC study notes, not an official ICT course or certification.')}</p><a href={href('/curriculum/mentorships/')}>{t('Compare mentorship paths')} →</a>
    </>}
    {kind==='masterclass'&&<>
      <h2 id="search-focus-masterclass">{t('Choose a masterclass by the question you need answered')}</h2><p>{t('Use this hub after studying basic candles, swing structure and liquidity. Each model is a framework to examine, not a signal to execute. Start with one category and define its conditions before comparing models.')}</p>
      <ul className="search-focus-grid">
        {card('Core frameworks','Study weekly profiles and delivery sequences. Suitable after foundations; calendar patterns are hypotheses, not fixed weekly outcomes.','/tools/masterclass/core-masterclasses/')}
        {card('PD arrays','Compare gaps, blocks and related reference zones. First learn FVG boundaries and market structure; similar-looking zones need different definitions.','/tools/masterclass/pd-arrays/')}
        {card('Entry models','Examine setup sequences after learning the component concepts. Write down entry, invalidation and costs before any paper test.','/tools/masterclass/entry-models/')}
        {card('Opening ranges','Study session reference windows after understanding time zones. A time window alone does not predict direction.','/tools/masterclass/opening-ranges/')}
        {card('Mentorship frameworks','Compare series-specific explanations after the prerequisites. Separate a definition used in one lesson from a universal market rule.','/tools/masterclass/mentorship-frameworks/')}
      </ul><a href={href('/curriculum/')}>{t('New to these terms? Start with the curriculum')} →</a><p>{t('After a masterclass, practise identifying its component patterns in Chart Laboratory before designing a separate backtest. The lab is illustrative, not proof of performance.')}</p><a href={href('/tools/chartlab/')}>{t('Open Chart Laboratory')} →</a>
    </>}
    {kind==='fvg'&&<>
      <h2 id="search-focus-fvg">{t('What is a fair value gap (FVG)?')}</h2><p>{t('An FVG is a three-candle price-range relationship. After candle 3 closes, a bullish FVG exists when candle 1 high is below candle 3 low; a bearish FVG exists when candle 1 low is above candle 3 high. Wicks count when measuring these boundaries.')}</p><p>{t('The middle candle may have traded through the entire zone. “Gap” does not mean no trades occurred there, and the pattern does not guarantee a revisit or reversal.')}</p>
      <h3>{t('Measure it: three synthetic examples')}</h3><div className="search-focus-table"><table><thead><tr><th scope="col">{t('Example')}</th><th scope="col">{t('Outer-candle measurements')}</th><th scope="col">{t('Conclusion')}</th></tr></thead><tbody>
        {[
          ['Bullish FVG','Candle 1 high = 100; candle 3 low = 102.','Zone 100–102. CE = (100 + 102) / 2 = 101.'],
          ['Bearish FVG','Candle 1 low = 100; candle 3 high = 98.','Zone 98–100. CE = (98 + 100) / 2 = 99.'],
          ['Not a bullish FVG','Candle 1 high = 100; candle 3 low = 99.5.','The outer ranges overlap. A large middle body does not change that.'],
        ].map(row=><tr key={row[0]}>{row.map((cell,i)=>i===0?<th scope="row" key={i}>{t(cell)}</th>:<td key={i}>{t(cell)}</td>)}</tr>)}
      </tbody></table></div><p>{t('If the boundaries merely touch, the gap has zero width. Do not count it as a positive-width FVG under this definition. Prices here are invented teaching values, not a market study.')}</p>
      <h3>{t('Check your understanding')}</h3><p>{t('Candle 1 high is 100 and candle 3 low is 102. Later, price trades through 100 and continues lower. Did the original gap never exist?')}</p><details><summary>{t('Reveal the explanation')}</summary><p>{t('It existed at formation. Later failure does not erase the original range relationship. Define in advance whether your paper-study invalidation uses a wick, a close or another rule; those choices change the results. CE is arithmetic, not a promised support level.')}</p></details>
      <h3>{t('Use this lesson, then test recognition')}</h3><p>{t('Read the explanation and source notes below, compare inverse FVGs and order blocks, then try an exercise without viewing future candles first.')}</p><nav className="search-focus-links" aria-label={t('Use this lesson, then test recognition')}><a href={href('/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/')}>{t('Compare inverse FVGs')} →</a><a href={href('/learn/order-blocks-ob-and-mitigation/')}>{t('Compare order blocks')} →</a><a href={href('/tools/chartlab/')}>{t('Open Chart Laboratory')} →</a></nav>
    </>}
    <p className="search-focus-revision">{t('Editorial learning guide updated')}: <time dateTime={searchFocusRevision.iso}>{searchFocusRevision.iso}</time></p>
  </section>;
}
