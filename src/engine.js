export function cpuTime(ic, cpi, ghz) { return ic * cpi / (ghz * 1e9); }
export function weightedCPI(rows) { const ic = rows.reduce((s,r)=>s+r.count,0); const cycles=rows.reduce((s,r)=>s+r.count*r.cpi,0); return {ic,cycles,cpi:ic?cycles/ic:0}; }
export function amdahl(serial, cores) { return 1/(serial+(1-serial)/cores); }
export function bitValues(bits) { const unsigned=parseInt(bits.join(''),2); return {unsigned,signed:bits[0]?unsigned-2**bits.length:unsigned}; }
export function effectiveAddress(base,index,bytes) { return base+index*bytes; }
export function logic(gate,a,b) { return ({AND:a&b,OR:a|b,XOR:a^b,NAND:1-(a&b),NOR:1-(a|b),XNOR:1-(a^b),NOT:1-a})[gate]; }
export function wrap64(n) { return BigInt.asIntN(64,BigInt(n)); }
export const programs = {
 expression:{label:'f = (g + h) − (i + j)',code:['add x5, x20, x21','add x6, x22, x23','sub x19, x5, x6'],initial:{x20:8n,x21:4n,x22:3n,x23:2n},steps:[{op:'add',rd:'x5',a:'x20',b:'x21'},{op:'add',rd:'x6',a:'x22',b:'x23'},{op:'sub',rd:'x19',a:'x5',b:'x6'}]},
 cube:{label:'a³ · a = 3 · RV64M',code:['addi x5, x10, 0','mul x10, x10, x5','mul x10, x10, x5'],initial:{x10:3n},steps:[{op:'addi',rd:'x5',a:'x10',imm:0n},{op:'mul',rd:'x10',a:'x10',b:'x5'},{op:'mul',rd:'x10',a:'x10',b:'x5'}]},
 array:{label:'B[3] = B[1] + 7 · Doubleword',code:['ld x5, 8(x20)','addi x5, x5, 7','sd x5, 24(x20)'],initial:{x20:4096n},memory:{4104:12n,4120:0n},steps:[{op:'ld',rd:'x5',a:'x20',imm:8n},{op:'addi',rd:'x5',a:'x5',imm:7n},{op:'sd',b:'x5',a:'x20',imm:24n}]}
};
export function runStep(program,state) { const s=program.steps[state.pc]; if(!s)return state;const regs={...state.regs},memory={...state.memory};const a=regs[s.a]??0n,b=regs[s.b]??0n; if(s.op==='ld')regs[s.rd]=memory[Number(a+s.imm)]??0n; else if(s.op==='sd')memory[Number(a+s.imm)]=b; else regs[s.rd]=wrap64(s.op==='add'?a+b:s.op==='sub'?a-b:s.op==='mul'?a*b:a+s.imm);regs.x0=0n;return {regs,memory,pc:state.pc+1}; }
