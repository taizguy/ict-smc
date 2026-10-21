import type { ICTConcept } from '../types';
import { topicJourneys, topicReferenceCopy } from './topicJourneys';

/** Concise references share the reviewed lesson conventions, not performance claims. */
function reference(chapterId: number, id: string, name: string, category: ICTConcept['category'], diagramType: ICTConcept['diagramType']): ICTConcept {
  const journey = topicJourneys.find(item=>item.chapterId===chapterId)!;
  const copy = chapterId===13 ? topicReferenceCopy.fvg : topicReferenceCopy.ob;
  return {
    id, name, category, diagramType,
    shortDefinition: copy.definition.en,
    whyItExists: journey.purpose.en,
    problemItSolves: journey.cases[0].takeaway.en,
    howItForms: journey.method.en,
    chartAnatomy: journey.example.en,
    identificationRules: journey.cases.map(item=>item.options[item.answer].explanation.en),
    validCharacteristics: [journey.cases[0].options[journey.cases[0].answer].explanation.en],
    invalidCharacteristics: [journey.cases[1].options[1-journey.cases[1].answer].explanation.en],
    howICTUsesIt: journey.method.en,
    commonMistakes: journey.cases.map(item=>item.options[1-item.answer].explanation.en),
    advancedNuances: journey.limitation.en,
    prerequisites: ['Candlestick Anatomy', 'Market Structure'],
    relatedConcepts: chapterId===13 ? ['Order Block (OB)', 'Inverse Fair Value Gap'] : ['Fair Value Gap (FVG)', 'Mitigation'],
    bullishScenario: journey.example.en,
    bearishScenario: copy.bearish.en,
    counterexample: journey.cases[1].takeaway.en,
    invalidationCriteria: copy.invalidation.en,
    simplifiedExplanation: journey.purpose.en,
    tripartiteView: {
      ictTeaching: journey.method.en,
      observableMarketBehavior: journey.example.en,
      derivedInterpretation: journey.limitation.en,
    },
    explanationLadder: {
      level1Child: journey.purpose.en,
      level2Beginner: copy.definition.en,
      level3Trader: journey.example.en,
      level4Advanced: copy.invalidation.en,
      level5ICTFramework: journey.limitation.en,
      whenItMatters: journey.method.en,
      whenToIgnore: journey.limitation.en,
    },
    counterexamples: journey.cases.map(item=>({
      title:item.question.en,
      trapDescription:item.options[1-item.answer].label.en,
      whyItFails:item.options[1-item.answer].explanation.en,
      ruleOfThumb:item.takeaway.en,
    })),
  };
}
export const fvgReference = reference(13,'fair_value_gap','Fair Value Gap (FVG)','imbalances','fvg_formation');
export const orderBlockReference = reference(15,'order_block','Order Block (OB)','order_blocks','order_block');
