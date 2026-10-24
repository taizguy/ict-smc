import assert from 'node:assert/strict';
import worker from '../src/worker';
import { mentorshipLessonPath, selectedMentorship } from '../src/data/mentorshipTracks';

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
  ...[
    ['what-actually-moves-price', 'core-2016-2017'],
    ['time-and-session-liquidity-the-global-clock', '2022'],
    ['fair-value-gaps-fvg-and-consequent-encroachment', '2022'],
    ['order-blocks-ob-and-mitigation', '2022'],
  ].flatMap(([slug, track]) => ['', '/ur'].map(locale => [
    `https://learnsmc.xyz${locale}/learn/${slug}/?mentorship=${track}`,
    `https://learnsmc.xyz${locale}${mentorshipLessonPath(slug, track)}`,
  ])),
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
assert.equal(selectedMentorship({hash:'#mentorship=2022',search:''}), '2022');
assert.equal(selectedMentorship({hash:'#mentorship=2022',search:'?mentorship=2025'}), '2022', 'Fragment takes precedence');
assert.equal(selectedMentorship({hash:'',search:'?mentorship=2022'}), '2022', 'Legacy local-preview links still work');
assert.equal(selectedMentorship({hash:'#section-1',search:''}), null);
for (const suffix of ['', '?mentorship=unknown-track']) {
  const page = await worker.fetch(new Request(`https://learnsmc.xyz/learn/fair-value-gaps-fvg-and-consequent-encroachment/${suffix}`), env);
  assert.equal(page.status, 200, 'Canonical and unrecognized preferences must not loop or redirect elsewhere');
}
console.log('Routing checks passed: canonical host, HTTPS, legacy query/path redirects, missing routes and asset casing.');
