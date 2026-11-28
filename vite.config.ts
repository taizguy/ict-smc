import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {performanceBundlePlugin} from './scripts/performance-bundle-plugin';

const ROUTE_CSS_MAP: Record<string, string[]> = {
  'src/components/articles/ArticlesView.tsx': ['/src/styles/articles.css'],
  'src/components/LearningFirstHome.tsx': ['/src/styles/home-playground.css'],
  'src/components/ReadingRoomLayout.tsx': ['/src/styles/reading-room.css'],
  'src/components/market/ChartLabHubPage.tsx': ['/src/styles/workbench-hallmark/page.css', '/src/styles/chartlab-analysis.css'],
  'src/components/ChartLab.tsx': ['/src/styles/chartlab-analysis.css', '/src/styles/practice-loop.css'],
  'src/components/TradeSimulator.tsx': ['/src/styles/practice-loop.css'],
  'src/components/BacktestLab.tsx': ['/src/styles/practice-loop.css'],
  'src/components/InstitutionalToolsSuite.tsx': ['/src/styles/practice-loop.css'],
  'src/components/MasterclassHub.tsx': ['/src/styles/masterclass-hub.css'],
  'src/components/GlossaryReference.tsx': ['/src/styles/glossary-reference.css'],
  'src/components/practice/PracticeLoopPage.tsx': ['/src/styles/workbench-hallmark/page.css', '/src/styles/practice-loop.css'],
  'src/components/TradingToolsWorkbench.tsx': ['/src/styles/workbench-hallmark/page.css'],
  'src/components/ChapterRoom.tsx': [
    '/src/styles/fvg-document.css',
    '/src/styles/delivery-lesson.css',
    '/src/styles/mentorship2025.css',
    '/src/styles/mentorship2026.css',
    '/src/styles/mentorship2026-alchemy.css',
  ],
  'src/components/SilverLessonContent.tsx': ['/src/styles/silver-lesson.css', '/src/styles/liquidity-document.css'],
  'src/components/BreakDocumentContent.tsx': ['/src/styles/break-document.css', '/src/styles/liquidity-document.css'],
  'src/components/StructureDocumentContent.tsx': ['/src/styles/structure-document.css', '/src/styles/liquidity-document.css'],
  'src/components/SwingDocumentContent.tsx': ['/src/styles/swing-document.css', '/src/styles/liquidity-document.css'],
  'src/components/LiquidityDocumentContent.tsx': ['/src/styles/liquidity-document.css'],
  'src/components/OrderBookContent.tsx': ['/src/styles/order-book-document.css', '/src/styles/liquidity-document.css'],
  'src/components/MarketMakerContent.tsx': ['/src/styles/market-maker-document.css', '/src/styles/liquidity-document.css'],
  'src/components/Model2022Content.tsx': ['/src/styles/model-2022-document.css', '/src/styles/liquidity-document.css'],
  'src/components/OteContent.tsx': ['/src/styles/ote-document.css'],
  'src/components/HtfLiquidityContent.tsx': ['/src/styles/htf-liquidity-lesson.css'],
  'src/components/DolContent.tsx': ['/src/styles/dol-lesson.css'],
  'src/components/TurtleSoupContent.tsx': ['/src/styles/turtle-soup-lesson.css'],
  'src/components/LiquidityRunContent.tsx': ['/src/styles/liquidity-run-lesson.css'],
  'src/components/BslSslContent.tsx': ['/src/styles/bsl-ssl-lesson.css'],
  'src/components/EqhEqlContent.tsx': ['/src/styles/eqh-eql-lesson.css'],
  'src/components/SweepHuntContent.tsx': ['/src/styles/sweep-hunt-lesson.css'],
  'src/components/TrendRangeContent.tsx': ['/src/styles/trend-range-lesson.css'],
  'src/components/MssContent.tsx': ['/src/styles/mss-lesson.css'],
  'src/components/BosChochMssContent.tsx': ['/src/styles/bos-choch-mss-lesson.css'],
  'src/components/DealingRangeContent.tsx': ['/src/styles/dealing-range-lesson.css'],
  'src/components/RdrbContent.tsx': ['/src/styles/rdrb-document.css'],
  'src/components/PdArrayContent.tsx': ['/src/styles/pd-array-lesson.css'],
  'src/components/SuspensionReaperContent.tsx': ['/src/styles/suspension-reaper-lesson.css'],
  'src/components/BreakerBlockContent.tsx': ['/src/styles/breaker-block-lesson.css'],
  'src/components/OrderBlockLessonContent.tsx': ['/src/styles/order-block-lesson.css'],
  'src/components/MitigationDocumentContent.tsx': ['/src/styles/mitigation-document.css'],
  'src/components/PriceMovementContent.tsx': ['/src/styles/price-movement.css'],
  'src/components/FvgDocumentContent.tsx': ['/src/styles/fvg-document.css'],
};

function routeCssPlugin() {
  return {
    name: 'learnsmc-route-css',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      const cleanId = id.split('?')[0].replace(/\\/g, '/');
      const match = Object.keys(ROUTE_CSS_MAP).find(suffix => cleanId.endsWith('/' + suffix) || cleanId === suffix);
      if (!match) return null;
      const imports = ROUTE_CSS_MAP[match].map(css => `import ${JSON.stringify(css)};`).join('\n');
      return { code: `${imports}\n${code}`, map: null };
    },
  };
}

function stripClientUrduJsonPlugin() {
  const stripPairs = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.length === 2 && typeof value[0] === 'string' && typeof value[1] === 'string'
        ? [value[0], '']
        : value.map(stripPairs)
      : value && typeof value === 'object'
        ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, stripPairs(v)]))
        : value;
  return {
    name: 'learnsmc-strip-client-urdu-json',
    apply: 'build' as const,
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      const cleanId = id.split('?')[0].replace(/\\/g, '/');
      if (!cleanId.endsWith('/src/data/chapters/priceMovementLesson.json')) return null;
      return { code: JSON.stringify(stripPairs(JSON.parse(code))), map: null };
    },
  };
}

function legacyRedirectsPlugin() {
  return {
    name: 'learnsmc-legacy-redirects',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url) return next();
        const urlObj = new URL(req.url, 'http://localhost:3000');
        const pathname = urlObj.pathname;
        const chapterParam = urlObj.searchParams.get('chapter');

        if (chapterParam) {
          const { textbookChapters } = await import('./src/data/chaptersData.ts');
          const matched = textbookChapters.find((c: any) => String(c.id) === chapterParam || c.slug === chapterParam);
          const target = matched ? `/learn/${matched.slug}/` : '/curriculum/';
          res.writeHead(301, { Location: target });
          res.end();
          return;
        }

        const chapterMatch = pathname.match(/^\/chapter[-/](\d+)/i);
        if (chapterMatch) {
          const cid = parseInt(chapterMatch[1], 10);
          const { textbookChapters } = await import('./src/data/chaptersData.ts');
          const matched = textbookChapters.find((c: any) => c.id === cid);
          const target = matched ? `/learn/${matched.slug}/` : '/curriculum/';
          res.writeHead(301, { Location: target });
          res.end();
          return;
        }

        if (pathname === '/chapter' || pathname === '/chapter/') {
          res.writeHead(301, { Location: '/curriculum/' });
          res.end();
          return;
        }

        next();
      });
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url) return next();
        const urlObj = new URL(req.url, 'http://localhost:3000');
        const pathname = urlObj.pathname;
        const chapterParam = urlObj.searchParams.get('chapter');

        if (chapterParam) {
          const { textbookChapters } = await import('./src/data/chaptersData.ts');
          const matched = textbookChapters.find((c: any) => String(c.id) === chapterParam || c.slug === chapterParam);
          const target = matched ? `/learn/${matched.slug}/` : '/curriculum/';
          res.writeHead(301, { Location: target });
          res.end();
          return;
        }

        const chapterMatch = pathname.match(/^\/chapter[-/](\d+)/i);
        if (chapterMatch) {
          const cid = parseInt(chapterMatch[1], 10);
          const { textbookChapters } = await import('./src/data/chaptersData.ts');
          const matched = textbookChapters.find((c: any) => c.id === cid);
          const target = matched ? `/learn/${matched.slug}/` : '/curriculum/';
          res.writeHead(301, { Location: target });
          res.end();
          return;
        }

        if (pathname === '/chapter' || pathname === '/chapter/') {
          res.writeHead(301, { Location: '/curriculum/' });
          res.end();
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [stripClientUrduJsonPlugin(), routeCssPlugin(), react({ jsxImportSource: '@learnsmc/i18n' }), tailwindcss(), legacyRedirectsPlugin(), performanceBundlePlugin()],
    resolve: {
      alias: {
        '@learnsmc/i18n': path.resolve(__dirname, 'src/i18n'),
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'esnext',
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/node_modules[\\/](?:lightweight-charts|fancy-canvas)[\\/]/.test(id)) return 'chart-vendor';
            if (/node_modules[\\/]three[\\/]/.test(id)) return 'three-vendor';
            if (/node_modules[\\/](?:motion|motion-dom|motion-utils|framer-motion)[\\/]/.test(id)) return 'motion-vendor';
            if (/node_modules[\\/]react|react-dom|scheduler/.test(id) && /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/.test(id)) return 'react-vendor';
            if (id.includes('src/data/masood')) {
              return 'data-masood';
            }
            if (id.includes('src/data/conceptsData')) {
              return 'data-concepts';
            }
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
