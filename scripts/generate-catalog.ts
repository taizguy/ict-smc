import { articles } from '../src/data/articles';
import fs from 'node:fs';
import { textbookChapters } from '../src/data/chaptersData';
import { masoodPlaylistsData } from '../src/data/masoodData';

const data = {
  articleCatalog: articles.map(({ slug, title, description, topic }) => ({ slug, title, description, topic })),
  chapterCatalog: textbookChapters.map(({ id, slug, title, part }) => ({ id, slug, title, part })),
  lectureCatalog: masoodPlaylistsData.flatMap(p => p.lectures.map(({ id, title, lectureNumber, playlistType }) => ({ id, title, lectureNumber, playlistType }))),
  playlistCatalog: masoodPlaylistsData.map(({ id, title }) => ({ id, title })),
};
const output = '// Generated from lesson data by scripts/generate-catalog.ts.\n' +
  Object.entries(data).map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`).join('\n');
fs.writeFileSync(new URL('../src/data/catalog.generated.ts', import.meta.url), output + '\n');
console.log(`Catalog: ${data.chapterCatalog.length} chapters, ${data.lectureCatalog.length} lectures, ${data.playlistCatalog.length} series`);
