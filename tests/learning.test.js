import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cpuTime,weightedCPI,amdahl,bitValues,effectiveAddress,logic,programs,runStep,wrap64} from '../src/engine.js';
import {lessons,groups,refs} from '../src/content.js';
import {questions} from '../src/questions.js';
test('All 80 questions, answers, and practice controls are entirely English',()=>{
 assert.equal(questions.length,80);
 assert.deepEqual(questions.map(q=>q.id),Array.from({length:80},(_,i)=>i+1));
 for(const q of questions){
  for(const text of [q.text,q.explanation,q.answer,q.difficulty,q.source,...(q.options||[])]){
   if(text)assert.doesNotMatch(text,/\p{Script=Arabic}/u,`Question ${q.id}`);
  }
  assert.ok(['Basic','Applied','Advanced'].includes(q.difficulty));
 }
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const practice=main.slice(main.indexOf('function questionCard('),main.indexOf('function glossaryPage('));
 assert.doesNotMatch(practice,/\p{Script=Arabic}/u);
});
test('Lab02 performance examples and optimization factors',()=>{
 assert.equal(cpuTime(1e6,2,2),.001);
 assert.equal(cpuTime(.8e6,3,2.5),.00096);
 assert.equal(cpuTime(1e6,2,4),.0005);
 assert.ok(Math.abs(cpuTime(1e6,1.2,2)/cpuTime(1e6,2,4)-1.2)<1e-12);
 assert.ok(Math.abs((.8*1.15)-.92)<1e-12);
});
test('Lecture2 weighted instruction mixes',()=>{
 assert.deepEqual(weightedCPI([{count:2,cpi:1},{count:1,cpi:2},{count:2,cpi:3}]),{ic:5,cycles:10,cpi:2});
 assert.deepEqual(weightedCPI([{count:4,cpi:1},{count:1,cpi:2},{count:1,cpi:3}]),{ic:6,cycles:9,cpi:1.5});
});
test('Amdahl limits and full serial/parallel endpoints',()=>{
 assert.equal(amdahl(.2,4),2.5);assert.equal(amdahl(1,64),1);assert.equal(amdahl(0,64),64);assert.equal(amdahl(.2,Infinity),5);
});
test('All 256 eight-bit patterns preserve signed and unsigned meanings',()=>{
 for(let n=0;n<256;n++){const bits=n.toString(2).padStart(8,'0').split('').map(Number);assert.deepEqual(bitValues(bits),{unsigned:n,signed:n<128?n:n-256});}
});
test('Load/store addresses depend on element size',()=>{assert.equal(effectiveAddress(4096,8,8),4160);assert.equal(effectiveAddress(4096,3,4),4108);});
test('Gate outputs match exhaustive truth tables',()=>{
 const expected={AND:[0,0,0,1],OR:[0,1,1,1],XOR:[0,1,1,0],NAND:[1,1,1,0],NOR:[1,0,0,0],XNOR:[1,0,0,1]};
 for(const [gate,values] of Object.entries(expected))for(let n=0;n<4;n++)assert.equal(logic(gate,n>>1,n&1),values[n]);assert.equal(logic('NOT',0,0),1);assert.equal(logic('NOT',1,0),0);
});
test('Stepper executes arithmetic, cube, and array examples',()=>{
 for(const [id,p] of Object.entries(programs)){let s={pc:0,regs:{x0:0n,...p.initial},memory:{...p.memory}};for(const _ of p.steps)s=runStep(p,s);assert.equal(s.pc,3);assert.equal(s.regs.x0,0n);if(id==='expression')assert.equal(s.regs.x19,7n);if(id==='cube')assert.equal(s.regs.x10,27n);if(id==='array'){assert.equal(s.memory[4120],19n);assert.equal(s.memory[4104],12n);assert.equal(s.regs.x20,4096n);}}
 assert.equal(wrap64((1n<<63n)-1n+1n),-(1n<<63n));
});
test('All study content and questions have valid provenance and destinations',()=>{
 assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length);assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 for(const l of lessons){assert.ok(groups.some(g=>g.id===l.group));assert.ok(l.sections.length>=5);for(const s of l.sections)if(s.ref)assert.ok(refs[s.ref]);}
 for(const q of questions){assert.ok(lessons.some(l=>l.id===q.lesson));assert.ok(q.source.includes('.pdf'));if(q.type==='mcq'){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.explanation);assert.ok(q.correct>=0&&q.correct<4);}else assert.ok(q.answer);}
 assert.ok(questions.length>=70);
});
