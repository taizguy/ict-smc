import assert from 'node:assert/strict';
import worker from '../src/worker';

let calls = 0;
const env = { ASSETS: { fetch: async (request: Request) => {
  calls++;
  const p = new URL(request.url).pathname;
  return new Response(p === '/404.html' ? 'Not found' : p, { status: p === '/missing/' ? 404 : 200 });
} } };
for (const [input, destination] of [
  ['http://learnsmc.xyz/curriculum/', 'https://learnsmc.xyz/curriculum/'],
  ['https://www.learnsmc.xyz/masood/', 'https://learnsmc.xyz/masood/'],
  ['https://learnsmc.xyz/Masood//Lectures/masood-beg-1/', 'https://learnsmc.xyz/masood/lectures/masood-beg-1/'],
  ['https://learnsmc.xyz/?chapter=13', 'https://learnsmc.xyz/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  ['https://learnsmc.xyz/chapter-13/', 'https://learnsmc.xyz/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
]) {
  const response = await worker.fetch(new Request(input), env);
  assert.equal(response.status, 301); assert.equal(response.headers.get('Location'), destination);
}
assert.equal(calls, 0, 'Redirects should not request an asset');
for (const path of ['/missing/', '/?chapter=not-a-lesson', '/chapter/not-a-lesson/']) {
  const response = await worker.fetch(new Request(`https://learnsmc.xyz${path}`), env);
  assert.equal(response.status, 404); assert.equal(response.headers.get('X-Robots-Tag'), 'noindex');
}
const asset = await worker.fetch(new Request('https://learnsmc.xyz/assets/CaseSensitive.webp'), env);
assert.equal(await asset.text(), '/assets/CaseSensitive.webp');
const preview = await worker.fetch(new Request('http://localhost:8788/masood/'), env);
assert.equal(preview.status, 200, 'Local and preview hosts should stay on the preview');
console.log('Routing checks passed: canonical host, HTTPS, legacy query/path redirects, missing routes and asset casing.');
