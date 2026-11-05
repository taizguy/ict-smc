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
<fieldset class="chapter-quiz-question"><legend>Choose the supported statement</legend><ul><li>Guaranteed profits</li><li>Losses remain possible</li></ul><strong>Losses remain possible</strong><p>The explanation rejects a profit guarantee.</p></fieldset>
</main>
<script type="application/ld+json">{"@type":"Question","name":"Is a stop price a guaranteed exit?","acceptedAnswer":{"@type":"Answer","text":"No. Execution can differ from the requested stop price."}}</script>`);
const report='outputs/practice-performance/claims-scan.json';
const previous=fs.existsSync(report)?fs.readFileSync(report):undefined;
try{
 const run=spawnSync(process.execPath,['node_modules/tsx/dist/cli.mjs','scripts/verify-emitted-claims.ts'],{encoding:'utf8',env:{...process.env,PRERENDER_OUT_DIR:directory}});
 assert.notEqual(run.status,0,'Unqualified claims must fail the gate');
 const result=JSON.parse(fs.readFileSync(report,'utf8'));
 assert.equal(result.findings.length,3,'Explicit negatives, reporting instructions, quiz distractors and answered questions must not be false positives');
 assert.deepEqual(result.findings.map((f:any)=>f.rule).sort(),['algorithmic-delivery','guarantee','win-rate']);
 assert.deepEqual(result.findings.map((f:any)=>f.line),[3,4,5]);
 fs.writeFileSync('outputs/practice-performance/claims-gate-test.json',JSON.stringify({passed:true,expectedRejected:result.findings,qualifiedContexts:result.contextualCaveats},null,2));
 console.log('Claims gate: three promises rejected with line context; bounded negatives/questions/distractors/reporting accepted.');
}finally{
 if(previous)fs.writeFileSync(report,previous);
 else if(fs.existsSync(report))fs.unlinkSync(report);
}
