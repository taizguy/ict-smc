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
    <p className="search-focus-revision">{t('Editorial learning guide updated')}: <time dateTime={searchFocusRevision.iso}>{searchFocusRevision.iso}</time></p>
  </section>;
}
