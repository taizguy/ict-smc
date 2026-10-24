const text = (en:string,ur:string)=>({en,ur});
export const fvgStoryCopy = {
  eyebrow:text('THE ANATOMY OF A GAP','گیپ کی ساخت'),
  title:text('Watch the space between the candles.','کینڈلز کے درمیان جگہ کو دیکھیں۔'),
  intro:text('A small interval. A much bigger story. Follow its formation, measure it, then see what price actually does next.','ایک چھوٹا وقفہ، ایک بڑی کہانی۔ اس کی تشکیل دیکھیں، اسے ناپیں، پھر قیمت کی اگلی حرکت دیکھیں۔'),
  stage:text('Story stage','کہانی کا مرحلہ'),
  synthetic:text('Original illustration · invented prices','اصل خاکہ · فرضی قیمتیں'),
  play:text('Play the story','کہانی چلائیں'),
  pause:text('Pause the story','کہانی روکیں'),
  restart:text('Replay from the beginning','شروع سے دوبارہ دیکھیں'),
  previous:text('Previous stage','پچھلا مرحلہ'),
  next:text('Next stage','اگلا مرحلہ'),
  timeline:text('Scrub through the FVG story','FVG کی کہانی میں آگے پیچھے جائیں'),
  speed:text('Playback speed','چلنے کی رفتار'),
  compare:text('Change the ending. Keep the definition.','نتیجہ بدلیں، تعریف برقرار رکھیں۔'),
  compareText:text('Compare a revisit, a failure and a gap that stays untouched in this window. The overlap example tests whether a gap exists at all.','واپسی، ناکامی اور دکھائی گئی مدت میں نہ چھوئے گئے گیپ کا موازنہ کریں۔ اوورلیپ کی مثال میں جانچیں کہ گیپ بنتا بھی ہے یا نہیں۔'),
  observe:text('LOOK HERE','یہاں دیکھیں'),
  before:text('Earlier candles','پہلی کینڈلز'),
  core:text('The three-candle formation','تین کینڈل تشکیل'),
  after:text('Later observations','بعد کے مشاہدات'),
  reading:text('Read the chart','چارٹ سمجھیں'),
  high:text('Upper boundary','اوپری حد'),
  low:text('Lower boundary','نچلی حد'),
  midpoint:text('CE · halfway through','CE · بالکل درمیان'),
  pending:text('Wait for the close','کلوز کا انتظار کریں'),
  noZone:text('No positive-width gap','مثبت چوڑائی والا گیپ نہیں'),
  reduced:text('Reduced motion is on. Choose a stage to inspect a still frame.','کم حرکت کا اختیار فعال ہے۔ ساکن خاکہ دیکھنے کے لیے مرحلہ منتخب کریں۔'),
  takeaway:text('The useful distinction','اہم فرق'),
  takeawayText:text('Recognising the shape, choosing a setup and observing its result are three separate decisions.','شکل پہچاننا، سیٹ اپ منتخب کرنا اور نتیجہ دیکھنا تین الگ باتیں ہیں۔'),
};
export const fvgStoryBeats = [
  {at:0, title:text('First, read the scene.','پہلے منظر سمجھیں۔'), short:text('Context','سیاق'), line:text('The candles on the left give us a little history. This cropped, invented chart does not establish a complete trading setup.','بائیں کینڈلز کچھ پچھلا منظر دکھاتی ہیں۔ یہ مختصر فرضی چارٹ مکمل ٹریڈنگ سیٹ اپ ثابت نہیں کرتا۔'), cue:text('Start with what is already visible.','پہلے سے نظر آنے والی معلومات سے شروع کریں۔')},
  {at:6, title:text('One candle leaves a reference.','ایک کینڈل حوالہ چھوڑتی ہے۔'), short:text('Candle 1','کینڈل 1'), line:text('Watch the first numbered candle finish. Its wick gives us one boundary to compare later. A single candle cannot define an FVG.','پہلی نمبر والی کینڈل مکمل ہوتے دیکھیں۔ اس کی وِک بعد کے موازنے کے لیے ایک حد دیتی ہے۔ اکیلی کینڈل FVG نہیں بناتی۔'), cue:text('Remember the outer wick.','بیرونی وِک یاد رکھیں۔')},
  {at:12, title:text('The middle candle makes the move.','درمیانی کینڈل حرکت بناتی ہے۔'), short:text('The move','حرکت'), line:text('Price travels through the middle candle’s range. A forceful body catches the eye, but we still need candle 3 to complete the comparison.','قیمت درمیانی کینڈل کی رینج سے گزرتی ہے۔ بڑی باڈی توجہ کھینچتی ہے، مگر موازنے کے لیے تیسری کینڈل کا مکمل ہونا ضروری ہے۔'), cue:text('Big body. Still no completed FVG.','بڑی باڈی، مگر ابھی مکمل FVG نہیں۔')},
  {at:18, title:text('Now let candle 3 close.','اب تیسری کینڈل بند ہونے دیں۔'), short:text('The close','کلوز'), line:text('Only after this candle completes can we compare the two outer wick ranges. The later candles are still hidden.','اس کینڈل کے مکمل ہونے پر ہی بیرونی وِکس کا موازنہ ہو سکتا ہے۔ بعد کی کینڈلز ابھی پوشیدہ ہیں۔'), cue:text('The close comes before the box.','باکس سے پہلے کلوز آتا ہے۔')},
  {at:24, title:text('The gap is between the wicks.','گیپ وِکس کے درمیان ہے۔'), short:text('The interval','وقفہ'), line:text('Trace the two outer boundaries. When they do not overlap, the interval between them is the FVG. The middle candle traded through that space.','دونوں بیرونی حدیں دیکھیں۔ اوورلیپ نہ ہو تو ان کے درمیان وقفہ FVG ہے۔ درمیانی کینڈل اس جگہ سے گزری تھی۔'), cue:text('Measure the wicks, not the middle body.','وِکس ناپیں، درمیانی باڈی نہیں۔')},
  {at:30, title:text('Halfway has a name: CE.','درمیانی قیمت کا نام CE ہے۔'), short:text('The midpoint','وسط'), line:text('For the 100–102 interval, halfway is 101. The arithmetic is exact. A future reaction at that price is uncertain.','100–102 کے وقفے کا وسط 101 ہے۔ حساب واضح ہے، مگر اس قیمت پر آئندہ ردعمل یقینی نہیں۔'), cue:text('(100 + 102) ÷ 2 = 101','(100 + 102) ÷ 2 = 101')},
  {at:36, title:text('Then price writes the ending.','پھر قیمت اگلا منظر بناتی ہے۔'), short:text('What follows','اگلا منظر'), line:text('Reveal the later candles. A formation can be revisited, fail under a stated rule, or stay untouched during the observation window.','بعد کی کینڈلز دیکھیں۔ تشکیل پر واپسی ہو سکتی ہے، مقررہ اصول کے تحت ناکامی ہو سکتی ہے، یا مشاہدے کی مدت میں وہ چھوئی ہی نہ جائے۔'), cue:text('A definition is not a promise.','تعریف کوئی وعدہ نہیں۔')},
];
export const fvgStoryUrdu:Record<string,string>={};
function collect(value:unknown):void{if(!value||typeof value!=='object')return;if('en'in value&&'ur'in value){const p=value as {en:string;ur:string};fvgStoryUrdu[p.en]=p.ur;return;}Object.values(value).forEach(collect);}
collect(fvgStoryCopy);collect(fvgStoryBeats);
