type Pair=readonly [string,string];
const simulator:Record<string,Pair>={
 'ict-2022-model':['ICT 2022 Model','ICT 2022 ماڈل'],
 'silver-bullet-short':['Silver Bullet Short','سلور بُلٹ شارٹ'],
 'london-judas-swing':['London Judas Swing','لندن جوڈاس سوئنگ'],
 'failed-ob-breaker':['Failed Order Block & Breaker','ناکام آرڈر بلاک اور بریکر'],
 'ote-expansion-long':['Optimal Trade Entry (OTE)','آپٹمل ٹریڈ انٹری (OTE)'],
 'news-driver-reversal':['Macro News Reversal','میکرو نیوز ریورسل'],
};
const backtest:Record<string,Pair>={
 '2022-mentorship-model':['2022 Mentorship Model','2022 مینٹرشپ ماڈل'],
 'charter-model-1':['Charter Model 1','چارٹر ماڈل 1'],
 'charter-model-8':['Charter Model 8','چارٹر ماڈل 8'],
 'charter-model-9':['Charter Model 9','چارٹر ماڈل 9'],
 'silver-bullet':['Silver Bullet','سلور بُلٹ'],
 'breaker-reversal':['Breaker Block','بریکر بلاک'],
};
export const legacyPracticeMetadata=Object.fromEntries(
 Object.entries({simulator,backtest}).flatMap(([family,topics])=>Object.entries(topics).map(([slug,topic])=>{
  const sim=family==='simulator';
  return [`/tools/${family}/${slug}/`,{topic,title:[topic[0]+(sim?': Decision Practice':': Rule Study')+' | LearnSMC',topic[1]+(sim?': فیصلے کی مشق':': شرط کا مطالعہ')+' | LearnSMC'] as Pair,
   h1:[topic[0]+(sim?': Practise waiting, participating or standing aside':': Test the same checklist across different cases'),topic[1]+(sim?': انتظار، شرکت یا چھوڑنے کی مشق کریں':': مختلف کیسز پر ایک ہی چیک لسٹ جانچیں')] as Pair}];
 })));
export const legacyPracticeUrdu=Object.fromEntries(Object.values(legacyPracticeMetadata).flatMap(m=>[m.title,m.h1,[m.topic[0]+' — convention and evidence study',m.topic[1]+' — روایت اور شواہد کا مطالعہ']]));

export const legacyPracticeTopicsUrdu=Object.fromEntries(Object.values(legacyPracticeMetadata).map(m=>m.topic));
