import { createElement } from 'react';
import { registerChapterModule } from '../src/components/chapterContentRegistry';
import { SilverLessonContent } from '../src/components/SilverLessonContent';
import { silverLessonDates } from '../src/data/chapters/silverBulletLesson';
import { BreakDocumentContent } from '../src/components/BreakDocumentContent';
import { breakDates } from '../src/data/chapters/breakDocuments';
import { StructureDocumentContent } from '../src/components/StructureDocumentContent';
import { structureRoomDates } from '../src/data/chapters/structureDocument';
import { SwingDocumentContent } from '../src/components/SwingDocumentContent';
import { swingDates } from '../src/data/chapters/swingDocument';
import { LiquidityDocumentContent, LiquidityRelatedLinks } from '../src/components/LiquidityDocumentContent';
import { liquidityDates } from '../src/data/chapters/liquidityDocument';
import { OrderBookContent, OrderBookRelatedLinks } from '../src/components/OrderBookContent';
import { orderBookDates } from '../src/data/chapters/orderBookLesson';
import { MarketMakerContent, MarketMakerRelatedLinks } from '../src/components/MarketMakerContent';
import { marketMakerDates, marketMakerDocument } from '../src/data/chapters/marketMakerLesson';
import { Model2022Content, Model2022RelatedLinks } from '../src/components/Model2022Content';
import { model2022Dates, model2022Document } from '../src/data/chapters/model2022Lesson';
import { OteContent, OteRelatedLinks } from '../src/components/OteContent';
import { oteDates, oteDocument } from '../src/data/chapters/oteLesson';
import { RdrbContent, RdrbRelatedLinks } from '../src/components/RdrbContent';
import { rdrbDates, rdrbDocument } from '../src/data/chapters/rdrbLesson';
import { PdArrayContent, PdArrayRelatedLinks } from '../src/components/PdArrayContent';
import { pdArrayDates, pdArrayDocument } from '../src/data/chapters/pdArrayLesson';
import { SuspensionReaperContent, SuspensionReaperRelatedLinks } from '../src/components/SuspensionReaperContent';
import { suspensionReaperDates, suspensionReaperDocument } from '../src/data/chapters/suspensionReaperLesson';
import { MitigationDocumentContent, MitigationRelatedLinks } from '../src/components/MitigationDocumentContent';
import { mitigationDates } from '../src/data/chapters/mitigationDocument';
import { fvgDocumentDates } from '../src/data/chapters/fvgDocument';
import { FvgDocumentContent } from '../src/components/FvgDocumentContent';
import { priceMovementDates } from '../src/data/chapters/priceMovementLesson';
import { PriceMovementContent } from '../src/components/PriceMovementContent';

registerChapterModule(1064, { Content: SilverLessonContent, dates: silverLessonDates });
registerChapterModule(9, {
  Content: (props) => createElement(BreakDocumentContent, { topic: 'bos', ...props }),
  dates: breakDates,
});
registerChapterModule(10, {
  Content: (props) => createElement(BreakDocumentContent, { topic: 'choch', ...props }),
  dates: breakDates,
});
registerChapterModule(1010, { Content: StructureDocumentContent, dates: structureRoomDates });
registerChapterModule(7, { Content: SwingDocumentContent, dates: swingDates });
registerChapterModule(4, { Content: LiquidityDocumentContent, RelatedLinks: LiquidityRelatedLinks, dates: liquidityDates });
registerChapterModule(3, { Content: OrderBookContent, RelatedLinks: OrderBookRelatedLinks, dates: orderBookDates });
registerChapterModule(33, {
  Content: MarketMakerContent,
  RelatedLinks: MarketMakerRelatedLinks,
  dates: marketMakerDates,
  tocSections: marketMakerDocument.sections.map((sec, i) => ({
    id: `33.toc.${sec.number}`,
    title: sec.title,
    stableAnchor: `rr-section-${i}`,
  })),
  quickAnswer: marketMakerDocument.quickAnswer,
});
registerChapterModule(36, {
  Content: Model2022Content,
  RelatedLinks: Model2022RelatedLinks,
  dates: model2022Dates,
  tocSections: model2022Document.sections.map((sec, i) => ({
    id: `36.toc.${sec.number}`,
    title: sec.title,
    stableAnchor: `rr-section-${i}`,
  })),
  quickAnswer: model2022Document.quickAnswer,
});
registerChapterModule(55, {
  Content: SuspensionReaperContent,
  RelatedLinks: SuspensionReaperRelatedLinks,
  dates: suspensionReaperDates,
  tocSections: suspensionReaperDocument.sections.map((sec, i) => ({
    id: `55.toc.${sec.number}`,
    title: sec.title,
    stableAnchor: `rr-section-${i}`,
  })),
  quickAnswer: suspensionReaperDocument.quickAnswer,
});
registerChapterModule(56, {
  Content: RdrbContent,
  RelatedLinks: RdrbRelatedLinks,
  dates: rdrbDates,
  tocSections: rdrbDocument.sections.map((sec, i) => ({
    id: `56.toc.${sec.number}`,
    title: sec.title,
    stableAnchor: `rr-section-${i}`,
  })),
  quickAnswer: rdrbDocument.quickAnswer,
});
registerChapterModule(59, {
  Content: PdArrayContent,
  RelatedLinks: PdArrayRelatedLinks,
  dates: pdArrayDates,
  tocSections: pdArrayDocument.sections.map((sec, i) => ({
    id: `59.toc.${sec.number}`,
    title: sec.title,
    stableAnchor: `rr-section-${i}`,
  })),
  quickAnswer: pdArrayDocument.quickAnswer,
});
registerChapterModule(1034, {
  Content: OteContent,
  RelatedLinks: OteRelatedLinks,
  dates: oteDates,
  tocSections: oteDocument.sections.map((sec, i) => ({
    id: `1034.toc.${sec.number}`,
    title: sec.title,
    stableAnchor: `rr-section-${i}`,
  })),
  quickAnswer: oteDocument.quickAnswer,
});
registerChapterModule(1031, { Content: MitigationDocumentContent, RelatedLinks: MitigationRelatedLinks, dates: mitigationDates });
registerChapterModule(1, { Content: PriceMovementContent, dates: priceMovementDates });
registerChapterModule(13, { Content: FvgDocumentContent, dates: fvgDocumentDates });
