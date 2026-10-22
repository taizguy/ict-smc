import { HistoryFigure } from './HistoryFigure';
import React from 'react';
import { ArticleTopicLinks } from '../TopicLearningGuide';
import { articleDateLabel, readingMinutes, type Article } from '../../data/articles';
import { financialDisclaimer } from '../../utils/publisher';
import { SketchStory } from './ArticleSketch';
import { ArticleMoment } from './ArticleMoments';
import { StudySketch } from './StudySketch';

export function ArticleContent({ article, staticMode = false }: { article: Article; staticMode?: boolean }) {
  const sources = (<section className="article-sources" id="sources"><h2>{article.historyOrder?'Sources and further reading':'Sources & what they support'}</h2><p>Sources were consulted on {articleDateLabel(article.updated || article.date)}. External links open their publishers’ pages. Examples and illustrations are original LearnSMC work; no live market readings are supplied.</p><ol>{article.sources.map((source, i) => <li id={`source-${i + 1}`} key={source.url}><a href={source.url}>{source.title}</a><p>{source.note}</p></li>)}</ol></section>);
  return <div className="article-body">
    <div className="article-byline"><a href="/about/#author">Muhammad Umer Ijaz</a><span>Published <time dateTime={article.date}>{articleDateLabel(article.date)}</time> · {readingMinutes(article)} min read</span></div>
    <p className="article-context">{article.historyOrder?`History of money and trading · Part ${article.historyOrder} of 20 · ${article.historyEra}`:'Original educational essay · Illustrated examples · No trade recommendations'}</p>{article.historyOrder&&<p className="history-language-note">English-first edition. Urdu translation will follow. Dates use BCE/CE; illustrations are explanatory, not evidence.</p>}
    <div className="article-intro">{article.intro.map(p => <p key={p}>{p}</p>)}</div>
    {article.historyOrder ? <HistoryFigure slug={article.slug} index={0} staticMode={staticMode}/> : article.visualSeries ? <StudySketch series={article.visualSeries} index={0} staticMode={staticMode} /> : <ArticleMoment kind={article.sketch} index={0} staticMode={staticMode} />}
    <nav className="article-toc" aria-label="In this article"><strong>In this article</strong><ol>{article.sections.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.title.replace(/^\d+\. /, '')}</a></li>)}</ol></nav>
    {article.sections.map((section, sectionIndex) => <section id={section.id} key={section.id} className="article-section">
      <h2>{section.title}</h2>
      {section.sketch && <SketchStory kind={section.sketch} staticMode={staticMode} />}
      {section.paragraphs.map(p => <p key={p}>{p}</p>)}
      {article.historyOrder ? sectionIndex<5&&<HistoryFigure slug={article.slug} index={sectionIndex+1} staticMode={staticMode}/> : article.visualSeries ? <StudySketch series={article.visualSeries} index={sectionIndex + 1} staticMode={staticMode} /> : !section.sketch && <ArticleMoment kind={article.sketch} index={sectionIndex} staticMode={staticMode} />}
      {section.takeaway && <aside className="article-takeaway"><span>Keep this thought</span><p>{section.takeaway}</p></aside>}
      {section.sources && <p className="article-citations">Sources for this section: {section.sources.map(n => <a href={`#source-${n}`} key={n}>[{n}] {article.sources[n - 1].title}</a>)}</p>}
    </section>)}
    {article.historyOrder ? <HistoryFigure slug={article.slug} index={6} staticMode={staticMode}/> : article.visualSeries ? <StudySketch series={article.visualSeries} index={7} staticMode={staticMode} /> : <ArticleMoment kind={article.sketch} index={6} staticMode={staticMode} />}
    {!article.historyOrder&&sources}

    <ArticleTopicLinks slug={article.slug}/>
    <section className="article-next"><h2>{article.historyOrder?'Continue the history':'Turn the idea into a study session'}</h2><ul>{article.links.map(link => <li key={link.href}><a href={link.href}>{link.title} <span aria-hidden="true">↗</span></a></li>)}</ul></section>
    <aside className="article-risk ymyl-disclaimer" aria-label="Financial education and risk notice"><h2>Financial education and risk</h2><p>{financialDisclaimer}</p><a href="/disclaimer/">Read the full risk disclosure</a></aside>
    <footer className="article-editorial"><p>Written and maintained by <a href="/about/#author">Muhammad Umer Ijaz</a>. <a href="/about/#editorial-policy">Editorial policy</a> · <a href="/contact/">Suggest a correction</a></p></footer>
    {article.historyOrder&&sources}
  </div>;
}
