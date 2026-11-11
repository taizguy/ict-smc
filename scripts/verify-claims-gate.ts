import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const directory='outputs/practice-performance/claims-fixture';
fs.mkdirSync(directory,{recursive:true});
fs.writeFileSync(directory+'/statements.html',`<!doctype html>
<main>
<p>This method produces guaranteed profits.</p>
<p>This framework has the highest statistical win rate.</p>
<p>Algorithmic price delivery controls every candle.</p>
<p>No method offers guaranteed profits.</p>
<p>Report sample size and costs alongside win rate.</p>
<p>Break-even win rate before costs = 1 ÷ (1 + 3) = 25%. Spreads, commissions and slippage raise that rate.</p>
<fieldset class="chapter-quiz-question"><legend>Choose the supported statement</legend><ul><li>Guaranteed profits</li><li>Losses remain possible</li></ul><strong>Losses remain possible</strong><p>The explanation rejects a profit guarantee.</p></fieldset>
</main>
<script type="application/ld+json">{"@type":"Question","name":"Is a stop price a guaranteed exit?","acceptedAnswer":{"@type":"Answer","text":"No. Execution can differ from the requested stop price."}}</script>
<table><thead><tr><th>Myth</th><th>Reality</th></tr></thead><tbody><tr><th>"Bigger confluence always means higher win rate."</th><td>Only if layers add independent information</td></tr></tbody></table>
<figure><details><summary>"Bigger confluence always means higher win rate."</summary><p>Only if layers add independent information</p></details><figcaption>Myth vs reality</figcaption></figure>
<table><thead><tr><th>Myth</th><th>Reality</th></tr></thead><tbody><tr><th>"Bigger confluence always means higher win rate."</th><td>It always works.</td></tr></tbody></table>
<figure><details><summary>"Bigger confluence always means higher win rate."</summary><p>It always works.</p></details><figcaption>Myth vs reality</figcaption></figure>`);
const report='outputs/practice-performance/claims-scan.json';
const previous=fs.existsSync(report)?fs.readFileSync(report):undefined;
try{
 const run=spawnSync(process.execPath,['node_modules/tsx/dist/cli.mjs','scripts/verify-emitted-claims.ts'],{encoding:'utf8',env:{...process.env,PRERENDER_OUT_DIR:directory}});
 assert.notEqual(run.status,0,'Unqualified claims must fail the gate');
 const result=JSON.parse(fs.readFileSync(report,'utf8'));
 assert.ok(result.contextualCaveats.some((f:any)=>f.context.includes('Break-even win rate before costs')), 'Accept only the explicit cost-qualified algebraic identity');
 assert.equal(result.findings.length,5,'Reject promises and unrebutted quoted myths; accept bounded negatives/questions/distractors/reporting and paired conditional myths');
 assert.deepEqual(result.findings.map((f:any)=>f.rule).sort(),['algorithmic-delivery','guarantee','win-rate','win-rate','win-rate']);
 assert.deepEqual(result.findings.slice(0,3).map((f:any)=>f.line),[3,4,5]);
 assert.equal(result.contextualCaveats.filter((f:any)=>/quoted metric myth/.test(f.context)).length,2);
 fs.writeFileSync('outputs/practice-performance/claims-gate-test.json',JSON.stringify({passed:true,expectedRejected:result.findings,qualifiedContexts:result.contextualCaveats},null,2));
 console.log('Claims gate: three promises and two unrebutted quoted myths rejected; bounded caveats and two paired conditional myths accepted. No route allowlist.');
}finally{
 if(previous)fs.writeFileSync(report,previous);
 else if(fs.existsSync(report))fs.unlinkSync(report);
}
