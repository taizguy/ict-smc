import type { ComponentType } from 'react';

export interface ChapterDatePair {
  published: { iso: string; label: string };
  updated: { iso: string; label: string };
}

export interface ChapterTocSection {
  id: string;
  title: string;
  stableAnchor?: string;
}

export interface LoadedChapterModule {
  Content: ComponentType<{ staticOnly?: boolean }>;
  RelatedLinks?: ComponentType;
  dates: ChapterDatePair;
  tocSections?: ChapterTocSection[];
  quickAnswer?: string;
}

export const REBUILT_CONTENT_CHAPTER_IDS = new Set([
  1, 3, 4, 7, 9, 10, 11, 13, 15, 16, 18, 33, 36, 45, 53, 55, 56, 59, 60, 1010, 1011, 1015, 1016, 1017, 1018, 1019, 1023, 1024, 1031, 1034, 1064,
]);

const registry = new Map<number, LoadedChapterModule>();
const inflight = new Map<number, Promise<LoadedChapterModule | undefined>>();

export function registerChapterModule(chapterId: number, mod: LoadedChapterModule): void {
  registry.set(chapterId, mod);
}

export function getRegisteredChapterModule(chapterId: number): LoadedChapterModule | undefined {
  return registry.get(chapterId);
}

export function hasRebuiltChapterContent(chapterId: number): boolean {
  return REBUILT_CONTENT_CHAPTER_IDS.has(chapterId);
}

export async function loadChapterModule(chapterId: number): Promise<LoadedChapterModule | undefined> {
  const existing = registry.get(chapterId);
  if (existing) return existing;
  if (!REBUILT_CONTENT_CHAPTER_IDS.has(chapterId)) return undefined;

  const pending = inflight.get(chapterId);
  if (pending) return pending;

  const promise = (async (): Promise<LoadedChapterModule | undefined> => {
    switch (chapterId) {
      case 1064: {
        const [{ SilverLessonContent }, { silverLessonDates }] = await Promise.all([
          import('./SilverLessonContent'),
          import('../data/chapters/silverBulletLesson'),
        ]);
        const mod: LoadedChapterModule = { Content: SilverLessonContent, dates: silverLessonDates };
        registry.set(chapterId, mod);
        return mod;
      }
      case 9:
      case 10: {
        const [{ BreakDocumentContent }, { breakDates, breakTopic }] = await Promise.all([
          import('./BreakDocumentContent'),
          import('../data/chapters/breakDocuments'),
        ]);
        const topic = breakTopic(chapterId)!;
        const mod: LoadedChapterModule = {
          Content: ({ staticOnly }) => BreakDocumentContent({ topic, staticOnly }),
          dates: breakDates,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1010: {
        const [{ StructureDocumentContent }, { structureRoomDates }] = await Promise.all([
          import('./StructureDocumentContent'),
          import('../data/chapters/structureDocument'),
        ]);
        const mod: LoadedChapterModule = { Content: StructureDocumentContent, dates: structureRoomDates };
        registry.set(chapterId, mod);
        return mod;
      }
      case 7: {
        const [{ SwingDocumentContent }, { swingDates }] = await Promise.all([
          import('./SwingDocumentContent'),
          import('../data/chapters/swingDocument'),
        ]);
        const mod: LoadedChapterModule = { Content: SwingDocumentContent, dates: swingDates };
        registry.set(chapterId, mod);
        return mod;
      }
      case 4: {
        const [{ LiquidityDocumentContent, LiquidityRelatedLinks }, { liquidityDates }] = await Promise.all([
          import('./LiquidityDocumentContent'),
          import('../data/chapters/liquidityDocument'),
        ]);
        const mod: LoadedChapterModule = {
          Content: LiquidityDocumentContent,
          RelatedLinks: LiquidityRelatedLinks,
          dates: liquidityDates,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 3: {
        const [{ OrderBookContent, OrderBookRelatedLinks }, { orderBookDates }] = await Promise.all([
          import('./OrderBookContent'),
          import('../data/chapters/orderBookLesson'),
        ]);
        const mod: LoadedChapterModule = {
          Content: OrderBookContent,
          RelatedLinks: OrderBookRelatedLinks,
          dates: orderBookDates,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 33: {
        const [{ MarketMakerContent, MarketMakerRelatedLinks }, { marketMakerDates, marketMakerDocument }] = await Promise.all([
          import('./MarketMakerContent'),
          import('../data/chapters/marketMakerLesson'),
        ]);
        const mod: LoadedChapterModule = {
          Content: MarketMakerContent,
          RelatedLinks: MarketMakerRelatedLinks,
          dates: marketMakerDates,
          tocSections: marketMakerDocument.sections.map((sec, i) => ({
            id: `33.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: marketMakerDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 36: {
        const [{ Model2022Content, Model2022RelatedLinks }, { model2022Dates, model2022Document }] = await Promise.all([
          import('./Model2022Content'),
          import('../data/chapters/model2022Lesson'),
        ]);
        const mod: LoadedChapterModule = {
          Content: Model2022Content,
          RelatedLinks: Model2022RelatedLinks,
          dates: model2022Dates,
          tocSections: model2022Document.sections.map((sec, i) => ({
            id: `36.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: model2022Document.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 55: {
        const [{ SuspensionReaperContent, SuspensionReaperRelatedLinks }, { suspensionReaperDates, suspensionReaperDocument }] = await Promise.all([
          import('./SuspensionReaperContent'),
          import('../data/chapters/suspensionReaperLesson'),
        ]);
        const mod: LoadedChapterModule = {
          Content: SuspensionReaperContent,
          RelatedLinks: SuspensionReaperRelatedLinks,
          dates: suspensionReaperDates,
          tocSections: suspensionReaperDocument.sections.map((sec, i) => ({
            id: `55.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: suspensionReaperDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 56: {
        const [{ RdrbContent, RdrbRelatedLinks }, { rdrbDates, rdrbDocument }] = await Promise.all([
          import('./RdrbContent'),
          import('../data/chapters/rdrbLesson'),
        ]);
        const mod: LoadedChapterModule = {
          Content: RdrbContent,
          RelatedLinks: RdrbRelatedLinks,
          dates: rdrbDates,
          tocSections: rdrbDocument.sections.map((sec, i) => ({
            id: `56.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: rdrbDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 59: {
        const [{ PdArrayContent, PdArrayRelatedLinks }, { pdArrayDates, pdArrayDocument }] = await Promise.all([
          import('./PdArrayContent'),
          import('../data/chapters/pdArrayLesson'),
        ]);
        const mod: LoadedChapterModule = {
          Content: PdArrayContent,
          RelatedLinks: PdArrayRelatedLinks,
          dates: pdArrayDates,
          tocSections: pdArrayDocument.sections.map((sec, i) => ({
            id: `59.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: pdArrayDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1011: {
        const [{ TrendRangeContent, TrendRangeRelatedLinks }, { trendRangeDates, trendRangeDocument }] =
          await Promise.all([
            import('./TrendRangeContent'),
            import('../data/chapters/trendRangeLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: TrendRangeContent,
          RelatedLinks: TrendRangeRelatedLinks,
          dates: trendRangeDates,
          tocSections: trendRangeDocument.sections.map((sec, i) => ({
            id: `1011.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: trendRangeDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 11: {
        const [{ MssContent, MssRelatedLinks }, { mssDates, mssDocument }] =
          await Promise.all([
            import('./MssContent'),
            import('../data/chapters/mssLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: MssContent,
          RelatedLinks: MssRelatedLinks,
          dates: mssDates,
          tocSections: mssDocument.sections.map((sec, i) => ({
            id: `11.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: mssDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1015: {
        const [{ BosChochMssContent, BosChochMssRelatedLinks }, { bosChochMssDates, bosChochMssDocument }] =
          await Promise.all([
            import('./BosChochMssContent'),
            import('../data/chapters/bosChochMssLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: BosChochMssContent,
          RelatedLinks: BosChochMssRelatedLinks,
          dates: bosChochMssDates,
          tocSections: bosChochMssDocument.sections.map((sec, i) => ({
            id: `1015.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: bosChochMssDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1016: {
        const [{ DealingRangeContent, DealingRangeRelatedLinks }, { dealingRangeDates, dealingRangeDocument }] =
          await Promise.all([
            import('./DealingRangeContent'),
            import('../data/chapters/dealingRangeLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: DealingRangeContent,
          RelatedLinks: DealingRangeRelatedLinks,
          dates: dealingRangeDates,
          tocSections: dealingRangeDocument.sections.map((sec, i) => ({
            id: `1016.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: dealingRangeDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1017: {
        const [{ BslSslContent, BslSslRelatedLinks }, { bslSslDates, bslSslDocument }] =
          await Promise.all([
            import('./BslSslContent'),
            import('../data/chapters/bslSslLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: BslSslContent,
          RelatedLinks: BslSslRelatedLinks,
          dates: bslSslDates,
          tocSections: bslSslDocument.sections.map((sec, i) => ({
            id: `1017.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: bslSslDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1018: {
        const [{ EqhEqlContent, EqhEqlRelatedLinks }, { eqhEqlDates, eqhEqlDocument }] =
          await Promise.all([
            import('./EqhEqlContent'),
            import('../data/chapters/eqhEqlLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: EqhEqlContent,
          RelatedLinks: EqhEqlRelatedLinks,
          dates: eqhEqlDates,
          tocSections: eqhEqlDocument.sections.map((sec, i) => ({
            id: `1018.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: eqhEqlDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1019: {
        const [{ SweepHuntContent, SweepHuntRelatedLinks }, { sweepHuntDates, sweepHuntDocument }] =
          await Promise.all([
            import('./SweepHuntContent'),
            import('../data/chapters/sweepHuntLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: SweepHuntContent,
          RelatedLinks: SweepHuntRelatedLinks,
          dates: sweepHuntDates,
          tocSections: sweepHuntDocument.sections.map((sec, i) => ({
            id: `1019.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: sweepHuntDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 18: {
        const [{ LiquidityRunContent, LiquidityRunRelatedLinks }, { liquidityRunDates, liquidityRunDocument }] =
          await Promise.all([
            import('./LiquidityRunContent'),
            import('../data/chapters/liquidityRunLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: LiquidityRunContent,
          RelatedLinks: LiquidityRunRelatedLinks,
          dates: liquidityRunDates,
          tocSections: liquidityRunDocument.sections.map((sec, i) => ({
            id: `18.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: liquidityRunDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 60: {
        const [{ TurtleSoupContent, TurtleSoupRelatedLinks }, { turtleSoupDates, turtleSoupDocument }] =
          await Promise.all([
            import('./TurtleSoupContent'),
            import('../data/chapters/turtleSoupLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: TurtleSoupContent,
          RelatedLinks: TurtleSoupRelatedLinks,
          dates: turtleSoupDates,
          tocSections: turtleSoupDocument.sections.map((sec, i) => ({
            id: `60.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: turtleSoupDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1023: {
        const [{ DolContent, DolRelatedLinks }, { drawOnLiquidityDates, drawOnLiquidityDocument }] =
          await Promise.all([
            import('./DolContent'),
            import('../data/chapters/drawOnLiquidityLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: DolContent,
          RelatedLinks: DolRelatedLinks,
          dates: drawOnLiquidityDates,
          tocSections: drawOnLiquidityDocument.sections.map((sec, i) => ({
            id: `1023.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: drawOnLiquidityDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1024: {
        const [{ HtfLiquidityContent, HtfLiquidityRelatedLinks }, { htfLiquidityDates, htfLiquidityDocument }] =
          await Promise.all([
            import('./HtfLiquidityContent'),
            import('../data/chapters/htfLiquidityLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: HtfLiquidityContent,
          RelatedLinks: HtfLiquidityRelatedLinks,
          dates: htfLiquidityDates,
          tocSections: htfLiquidityDocument.sections.map((sec, i) => ({
            id: `1024.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: htfLiquidityDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1034: {
        const [{ OteContent, OteRelatedLinks }, { oteDates, oteDocument }] = await Promise.all([
          import('./OteContent'),
          import('../data/chapters/oteLesson'),
        ]);
        const mod: LoadedChapterModule = {
          Content: OteContent,
          RelatedLinks: OteRelatedLinks,
          dates: oteDates,
          tocSections: oteDocument.sections.map((sec, i) => ({
            id: `1034.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: `rr-section-${i}`,
          })),
          quickAnswer: oteDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1031: {
        const [{ MitigationDocumentContent, MitigationRelatedLinks }, { mitigationDates }] = await Promise.all([
          import('./MitigationDocumentContent'),
          import('../data/chapters/mitigationDocument'),
        ]);
        const mod: LoadedChapterModule = {
          Content: MitigationDocumentContent,
          RelatedLinks: MitigationRelatedLinks,
          dates: mitigationDates,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 1: {
        const [{ PriceMovementContent }, { priceMovementDates }] = await Promise.all([
          import('./PriceMovementContent'),
          import('../data/chapters/priceMovementLesson'),
        ]);
        const mod: LoadedChapterModule = { Content: PriceMovementContent, dates: priceMovementDates };
        registry.set(chapterId, mod);
        return mod;
      }
      case 13: {
        const [{ FvgDocumentContent }, { fvgDocumentDates }] = await Promise.all([
          import('./FvgDocumentContent'),
          import('../data/chapters/fvgDocument'),
        ]);
        const mod: LoadedChapterModule = { Content: FvgDocumentContent, dates: fvgDocumentDates };
        registry.set(chapterId, mod);
        return mod;
      }
      case 15: {
        const [{ OrderBlockLessonContent, OrderBlockRelatedLinks }, { orderBlockDates, orderBlockDocument }] =
          await Promise.all([
            import('./OrderBlockLessonContent'),
            import('../data/chapters/orderBlockLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: OrderBlockLessonContent,
          RelatedLinks: OrderBlockRelatedLinks,
          dates: orderBlockDates,
          tocSections: orderBlockDocument.sections.map((sec, i) => ({
            id: `15.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: sec.faqs?.length ? 'order-block-faq' : `rr-section-${i}`,
          })),
          quickAnswer: orderBlockDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 16: {
        const [{ BreakerBlockContent, BreakerBlockRelatedLinks }, { breakerBlockDates, breakerBlockDocument }] =
          await Promise.all([
            import('./BreakerBlockContent'),
            import('../data/chapters/breakerBlockLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: BreakerBlockContent,
          RelatedLinks: BreakerBlockRelatedLinks,
          dates: breakerBlockDates,
          tocSections: breakerBlockDocument.sections.map((sec, i) => ({
            id: `16.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: sec.faqs?.length ? 'breaker-block-faq' : `rr-section-${i}`,
          })),
          quickAnswer: breakerBlockDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 45: {
        const [{ BreadButterLessonContent, BreadButterRelatedLinks }, { breadButterDates, breadButterDocument }] =
          await Promise.all([
            import('./BreadButterLessonContent'),
            import('../data/chapters/breadButterLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: BreadButterLessonContent,
          RelatedLinks: BreadButterRelatedLinks,
          dates: breadButterDates,
          tocSections: breadButterDocument.sections.map((sec, i) => ({
            id: `45.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: sec.faqs?.length ? 'bread-butter-faq' : `rr-section-${i}`,
          })),
          quickAnswer: breadButterDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      case 53: {
        const [{ VenomLessonContent, VenomRelatedLinks }, { venomModelDates, venomModelDocument }] =
          await Promise.all([
            import('./VenomLessonContent'),
            import('../data/chapters/venomModelLesson'),
          ]);
        const mod: LoadedChapterModule = {
          Content: VenomLessonContent,
          RelatedLinks: VenomRelatedLinks,
          dates: venomModelDates,
          tocSections: venomModelDocument.sections.map((sec, i) => ({
            id: `53.toc.${sec.number}`,
            title: sec.title,
            stableAnchor: sec.faqs?.length ? 'venom-model-faq' : `rr-section-${i}`,
          })),
          quickAnswer: venomModelDocument.quickAnswer,
        };
        registry.set(chapterId, mod);
        return mod;
      }
      default:
        return undefined;
    }
  })().finally(() => {
    inflight.delete(chapterId);
  });

  inflight.set(chapterId, promise);
  return promise;
}
