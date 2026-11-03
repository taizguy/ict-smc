import {silverCases,silverEvidence,silverMeta,silverStages,silverQuestions} from './silverBulletStudy';
import {breakerBars,breakerCases,breakerMeta} from './breakerStudy';
import {remainingStudies} from './chartLabRemainingContent';
import {casesFor} from './chartLabRemaining';
import {studyQuestions} from './chartLabRemainingQuestions';
import type {ChartScenario} from '../types';
export const chartScenarios:ChartScenario[]=[{
    id:'nq_silver_bullet_short',title:'NQ Silver Bullet: five synthetic AM chart cases',asset:'Synthetic NQ-style prices',timeframe:'M1 execution and M5 prior context; America/New_York',
    htfContext:'Earlier authored opening-range references; no real exchange feed or verified daily bias.',description:silverMeta.description[0],
    candles:silverCases[0].bars.map(b=>({...b})),
    annotations:[{id:'silver-sweep',type:'SWEEP',label:'Synthetic earlier high sweep',priceLevel:silverEvidence(silverCases[0]).high,candleIndexStart:silverCases[0].sweep,candleIndexEnd:silverCases[0].sweep,description:'Original authored OHLC, not an observed trade.'}],
    replaySteps:silverStages.map((v,i)=>({candleIndex:silverCases[0].counts[i]-1,title:v[0],narrative:silverQuestions(silverCases[0])[i].explanation[0],activeLayers:['SWEEP']}))
  },
{
    id:'eurusd_failed_ob_breaker', title:'EUR/USD: Bearish breaker block practice', asset:'EUR/USD', timeframe:'15-minute UTC teaching bars',
    htfContext:'No higher-timeframe feed supplied. Original synthetic case study, not a trade signal.', description:breakerMeta.description[0],
    candles:breakerBars(breakerCases[0]).map(b=>({...b,time:b.time.slice(11,16)})),
    annotations:[
      {id:'eur-ob-orig',type:'OB',label:'Original bullish OB: 1.0850–1.0860',priceTop:1.0860,priceBottom:1.0850,candleIndexStart:3,candleIndexEnd:11,description:'Full range of candle 4, fixed before its failure.'},
      {id:'eur-bsl-sweep',type:'SWEEP',label:'Prior high 1.0866; sweep 1.0872',priceLevel:1.0866,candleIndexStart:5,candleIndexEnd:5,description:'Candle 6 moves above the prior high and closes back below; actual stop inventories are not observed.'},
      {id:'eur-breaker',type:'BREAKER',label:'Close-through at 1.0846, then retest',priceTop:1.0860,priceBottom:1.0850,candleIndexStart:6,candleIndexEnd:11,description:'The same zone is investigated as a bearish role-reversal candidate, not a guaranteed resistance.'},
    ],
    replaySteps:[
      {candleIndex:4,title:'Mark the original block',narrative:'Candle 4 has full range 1.0850–1.0860. Keep the selected range fixed.',activeLayers:['OB']},
      {candleIndex:5,title:'Check the high sweep',narrative:'Candle 6 reaches 1.0872 and closes at 1.0865 below the prior high 1.0866.',activeLayers:['OB','SWEEP']},
      {candleIndex:6,title:'Test the closing price',narrative:'Candle 7 closes at 1.0846 below the selected low 1.0850.',activeLayers:['OB','SWEEP','BREAKER']},
      {candleIndex:8,title:'Inspect the retest',narrative:'Candle 9 reaches 1.0856 and closes inside the unchanged zone at 1.0853.',activeLayers:['BREAKER']},
      {candleIndex:9,title:'Judge the response',narrative:'Candle 10 closes below the zone at 1.0845. This is a response to inspect, not an instruction to sell.',activeLayers:['BREAKER']},
      {candleIndex:11,title:'Compare the outcome',narrative:'The last close is 1.0830. Compare the failed, no-retest and wick-only paths in the dedicated exercise.',activeLayers:['BREAKER']},
    ],
  },...remainingStudies.map(study=>{const c=casesFor(study)[0];return {id:study.slug==='nq-ath-alchemy-ndog-macro'?'nq_2026_ath_alchemy_ndog_macro':study.slug.replace(/-/g,'_'),title:study.h1[0],asset:study.instrument,timeframe:'M'+c.tf+' · synthetic UTC bar opens',htfContext:study.rules[0][0],description:study.intro[0],candles:c.bars,annotations:[],replaySteps:studyQuestions(study,c).map((q,i)=>({title:study.stages[i][0],narrative:q.prompt[0],candleIndex:q.reveal-1,activeLayers:[]}))}})];
const order=['btc_2022_bullish_model','nq_silver_bullet_short','eurusd_failed_ob_breaker','xauusd_gold_legacy_model','eur_mmbm_propulsion_model','nq_2026_ath_alchemy_ndog_macro'];chartScenarios.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
