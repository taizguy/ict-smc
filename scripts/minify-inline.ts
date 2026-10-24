import fs from 'node:fs';
import path from 'node:path';
import { transformSync } from 'esbuild';

/** Vite minifies bundled assets; prerendered documents also contain startup code. */
export function minifyInlineDocuments(directory: string) {
  let documents = 0;
  let savedBytes = 0;
  function visit(folder: string) {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) { visit(file); continue; }
      if (!entry.name.endsWith('.html')) continue;
      const original = fs.readFileSync(file, 'utf8');
      const compact = original
        .replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi, (_, open, css, close) =>
          open + transformSync(css, { loader: 'css', minify: true, legalComments: 'none' }).code.trim() + close)
        .replace(/(<script\b([^>]*)>)([\s\S]*?)(<\/script>)/gi, (_, open, attributes, code, close) => {
          if (/\bsrc\s*=/i.test(attributes) || !code.trim()) return open + code + close;
          const type = /\btype\s*=\s*["']([^"']+)["']/i.exec(attributes)?.[1]?.toLowerCase();
          if (type === 'application/ld+json') {
            return open + JSON.stringify(JSON.parse(code)).replace(/</g, '\\u003c') + close;
          }
          if (type && !['module', 'text/javascript', 'application/javascript'].includes(type)) return open + code + close;
          const js = transformSync(code, { loader: 'js', target: 'es2020', minify: true, legalComments: 'none' }).code.trim();
          return open + js.replace(/<\/script/gi, '<\\/script') + close;
        });
      savedBytes += Buffer.byteLength(original) - Buffer.byteLength(compact);
      fs.writeFileSync(file, compact);
      documents++;
    }
  }
  visit(directory);
  console.log(`Inline code minified: ${documents} HTML documents; ${savedBytes} bytes removed.`);
}
