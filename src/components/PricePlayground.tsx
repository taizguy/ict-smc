import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import { chapterCount } from '../utils/catalogCounts';

export function PricePlayground({staticOnly=false}:{staticOnly?:boolean}) {
  const {locale,href}=useTranslation();
  const copy=(en:string,ur:string)=>locale==='ur'?ur:en;
  const root=useRef<HTMLElement>(null);
  const [active,setActive]=useState<'sweep'|'fvg'|'ob'>('fvg');
  const [open,setOpen]=useState(false),[apart,setApart]=useState(false);
  useEffect(()=>{
    if(staticOnly||!root.current)return;
    let cancelled=false,cleanup:(()=>void)|undefined;
    const modulePath='/playground/scene.js';
    import(/* @vite-ignore */ modulePath).then(module=>{if(!cancelled&&root.current)cleanup=module.mountScene(root.current);}).catch(()=>{});
    return ()=>{cancelled=true;cleanup?.();};
  },[staticOnly]);
  const concepts={
    sweep:{title:copy('Below the obvious low.','نمایاں نچلی سطح کے نیچے۔'),label:copy('Follow the sweep','سویپ کا جائزہ لیں'),text:copy('Price trades below an earlier low, then later candles recover. Traders may call this a liquidity sweep. Candles alone cannot prove whose stops traded or why.','قیمت سابقہ نچلی سطح سے نیچے جاتی ہے، پھر بعد کی کینڈلز واپس اوپر آتی ہیں۔ اسے Liquidity Sweep کہا جا سکتا ہے۔ صرف کینڈلز سے معلوم نہیں ہو سکتا کہ کس کے اسٹاپ لگے یا کیوں۔')},
    fvg:{title:copy('Three candles. A visible gap.','تین کینڈلز۔ ایک واضح خلا۔'),label:copy('Look inside the gap','گیپ کے اندر دیکھیں'),text:copy('In this bullish example, the first candle’s high is below the third candle’s low. Blue marks this three-candle fair value gap. A revisit or profitable reaction is never guaranteed.','اس صعودی مثال میں پہلی کینڈل کی بلند ترین قیمت تیسری کینڈل کی کم ترین قیمت سے نیچے ہے۔ نیلا حصہ اس تین کینڈل Fair Value Gap کو ظاہر کرتا ہے۔ واپسی یا منافع بخش ردعمل کی ضمانت نہیں۔')},
    ob:{title:copy('A reference, not a promise.','ایک حوالہ، ضمانت نہیں۔'),label:copy('Question the block','بلاک کو پرکھیں'),text:copy('The last down candle before the upward move is a possible bullish order-block reference. Definitions vary; this illustration marks its body. It does not establish institutional buying.','اوپر کی حرکت سے پہلے آخری نزولی کینڈل ممکنہ Bullish Order Block کا حوالہ ہے۔ تعریفیں مختلف ہیں؛ یہاں اس کی باڈی نمایاں ہے۔ یہ ادارہ جاتی خریداری کا ثبوت نہیں۔')}
  };
  const Heading=staticOnly?'h2':'h1';
  return <section ref={root} className="price-playground" data-active={active} data-apart={apart} aria-label={copy('The Price Playground','پرائس پلے گراؤنڈ')}>
    <div className="playground-watermark" aria-hidden="true">PRICE IS A STORY.</div>
    <div className="playground-intro"><p className="playground-eyebrow"><span aria-hidden="true">✳</span>{copy('WELCOME TO THE PRICE PLAYGROUND','پرائس پلے گراؤنڈ میں خوش آمدید')}</p>
      <Heading>{copy('Don’t just','صرف قیمت')}<br/>{copy('read price.','پڑھیں نہیں۔')}<br/><em>{copy('Explore it.','اسے سمجھیں۔')}</em></Heading>
      <p>{copy('A chart is more interesting when you can take it apart.','چارٹ کو حصوں میں سمجھنا سیکھنے کو دلچسپ بناتا ہے۔')}</p>
      <button className="playground-primary" onClick={()=>{setActive('fvg');setOpen(true);setApart(false);}}>{copy('Show me something','مجھے کچھ دکھائیں')} <span aria-hidden="true">↗</span></button>
      <a className="playground-guided" href={href('/curriculum/')}>{copy('I’d rather follow a learning path','میں ترتیب سے سیکھنا چاہتا ہوں')} →</a>
      <small>{chapterCount} {copy('lessons. No paywall. A little curiosity goes a long way.','اسباق۔ بالکل مفت۔ تھوڑا تجسس بہت کچھ سکھاتا ہے۔')}</small>
    </div>
    <div className="playground-world" id="world"><div id="fallback" className="playground-fallback"><p>{copy('An illustrative chart—not live prices. Explore the concepts with the numbered buttons.','یہ تعلیمی چارٹ ہے، لائیو قیمتیں نہیں۔ نمبر والے بٹن سے تصورات سمجھیں۔')}</p><svg viewBox="0 0 600 260" role="img" aria-label={copy('Illustrative bullish and bearish candles','صعودی اور نزولی کینڈلز کی تعلیمی مثال')}>{[110,90,115,100,140,180,130,70,50,80,55,30].map((y,i)=><g key={i} transform={`translate(${30+i*47},0)`}><path d={`M0 ${y-15}V${y+45}`} stroke={i%3===2?'#c74d61':'#178465'} strokeWidth="3"/><rect x="-12" y={y} width="24" height="30" rx="2" fill={i%3===2?'#c74d61':'#178465'}/></g>)}</svg></div><canvas id="scene" aria-label={copy('Drag to rotate the illustrative chart, or use the view buttons.','تعلیمی چارٹ گھمانے کے لیے ڈریگ کریں یا بٹن استعمال کریں۔')}/></div>
    {!staticOnly&&<><div className="playground-pins">{(['sweep','fvg','ob'] as const).map((key,i)=><button key={key} id={'pin-'+key} className="playground-pin" aria-pressed={open&&active===key} onClick={()=>{setActive(key);setOpen(true);setApart(false);}}><i>{String(i+1).padStart(2,'0')}</i><span>{concepts[key].label}</span></button>)}</div>
    <aside id="inspector" className="playground-inspector" hidden={!open} aria-live="polite"><button className="playground-close" aria-label={copy('Close explanation','وضاحت بند کریں')} onClick={()=>{setOpen(false);setApart(false);}}>×</button><span className="playground-eyebrow">{copy('LOOK CLOSER','غور سے دیکھیں')}</span><h2>{concepts[active].title}</h2><p>{concepts[active].text}</p><button className="playground-primary" aria-pressed={apart} onClick={()=>setApart(!apart)}>{apart?copy('Put it back together','واپس جوڑیں'):copy('Pull the pattern apart','پیٹرن کو الگ کریں')} ↗</button><a href={href('/curriculum/')}>{copy('Explore the full curriculum','مکمل نصاب دیکھیں')} →</a></aside>
    <div className="playground-dock" aria-label={copy('Chart view controls','چارٹ ویو کنٹرولز')}><button id="reset" onClick={()=>setApart(false)}>{copy('Reset','ری سیٹ')} ↶</button><button id="rotate-left" aria-label={copy('Rotate left','بائیں گھمائیں')}>↶</button><button id="rotate-right" aria-label={copy('Rotate right','دائیں گھمائیں')}>↷</button><button id="zoom-out" aria-label={copy('Zoom out','چھوٹا کریں')}>−</button><button id="zoom-in" aria-label={copy('Zoom in','بڑا کریں')}>＋</button><button id="replay">▶ {copy('Build the chart','چارٹ بنائیں')}</button></div></>}
    <p className="playground-note">{copy('Synthetic price. Real questions. Educational illustration · No trading signals.','فرضی قیمتیں۔ حقیقی سوالات۔ تعلیمی مثال · ٹریڈنگ سگنلز نہیں۔')}</p>
  </section>;
}
