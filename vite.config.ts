import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {performanceBundlePlugin} from './scripts/performance-bundle-plugin';

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
    plugins: [react({ jsxImportSource: '@learnsmc/i18n' }), tailwindcss(), legacyRedirectsPlugin(),performanceBundlePlugin()],
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
            if (/node_modules[\\/](?:react|react-dom|scheduler)[\\/]/.test(id)) return 'react-vendor';
            if (id.includes('src/data/chapters/')) {
              return 'data-chapters';
            }
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
