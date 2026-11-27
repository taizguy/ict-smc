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
  1, 3, 4, 7, 9, 10, 13, 33, 36, 55, 56, 59, 1010, 1031, 1034, 1064,
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
      default:
        return undefined;
    }
  })().finally(() => {
    inflight.delete(chapterId);
  });

  inflight.set(chapterId, promise);
  return promise;
}
