import fs from 'node:fs';
import { cheatSheetTerms, cheatSheetQuestions, cheatSheetSources } from '../src/data/cheatSheet';

fs.mkdirSync('outputs/learning-update', { recursive: true });
fs.writeFileSync('outputs/learning-update/cheat-data.json', JSON.stringify({
  cheatSheetTerms, cheatSheetQuestions, cheatSheetSources,
}, null, 2));
