/* 运行：node tests/spirit-instance.test.js —— 从 lab-scheduler.html 抽取 SPINST 模块并测试 */
const fs = require('fs'), assert = require('assert'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'lab-scheduler.html'), 'utf8');
const src = html.slice(html.indexOf('/* SPINST-BEGIN'), html.indexOf('/* SPINST-END */'));
const factory = new Function(src.replace(/var spInstApi[\s\S]*$/, '') + '; return {spInstMake};');
const {spInstMake} = factory();
let n = 0, clock = Date.parse('2026-01-01T00:00:00Z'), alarms = [], saves = 0, audits = [];
function build(){
  const G = {users:{}, spInst:{}, spSnap:{}, spLog:{}};
  const mk = (name, sp, xp)=>{ G.users[name] = {user:name, xp:{a:5}, totalXp:99, counters:{c:1}, equip:{season:'', trial:{}}, ss:{s1:{sp, xp, intimacy:1}}, tr:{t1:{xp:10, intimacy:0}}, mys:{}}; };
  mk('alice','dragon',100); mk('bob','dragon',100); mk('cat','fox',50);
  const state = {super:true, see:true};
  const env = {store:()=>G, now:()=>new Date(clock).toISOString(), nowMs:()=>clock, uid:p=>p+(++n), isSuper:()=>state.super, canSee:()=>state.see, me:()=>'root',
    locate:m=>{ const u = G.users[m.user]; const rec = {season:u?.ss, trial:u?.tr, own:u?.mys}[m.kind]?.[m.key]; return rec ? {rec, u} : null; },
    stageOf:xp=>Math.min(5, 1+Math.floor(xp/100)),
    listAll:()=>{ const o = []; Object.values(G.users).forEach(u=>[['season',u.ss],['trial',u.tr],['own',u.mys]].forEach(([k,m])=>Object.keys(m).forEach(key=>o.push({user:u.user, kind:k, key, rec:m[key], u})))); return o; },
    spiritId:(k,key,rec)=>k==='season' ? rec.sp : key, limits:()=>({intimacyMax:1000, moodMax:100}), windowDays:()=>7,
    persist:()=>saves++, audit:(a,u,d)=>audits.push(a), alarm:(a,d)=>alarms.push(a)};
  const api = spInstMake(env); api.sync();
  const id = (u,k='season',key='s1')=>G.users[u][{season:'ss',trial:'tr'}[k]][key].instanceId;
  return {G, state, api, id, env};
}
const tests = {
  '修改单只不串号'(){ const {G, api, id} = build(); const r = api.updateSpirit(id('alice'), {xp:500}, {reason:'t'}); assert(r.ok);
    assert.equal(G.users.alice.ss.s1.xp, 500); assert.equal(G.users.bob.ss.s1.xp, 100); assert.equal(G.users.cat.ss.s1.xp, 50); assert.equal(G.users.alice.totalXp, 99); assert.equal(G.users.alice.tr.t1.xp, 10); },
  '不接受类别/批次/精灵ID作为键'(){ const {api} = build(); ['dragon','s1','spb_1'].forEach(k=>assert.equal(api.updateSpirit(k, {xp:1}, {reason:'t'}).code, 'not-found')); },
  '实例ID唯一，复制/共享引用被重新分配'(){ const {G, api} = build(); G.users.bob.ss.s1 = JSON.parse(JSON.stringify(G.users.alice.ss.s1)); api.sync();
    assert.notEqual(G.users.bob.ss.s1.instanceId, G.users.alice.ss.s1.instanceId); assert(api.checkUnique().ok);
    G.users.cat.ss.s1 = G.users.alice.ss.s1; assert.equal(api.checkUnique().code, 'shared-ref'); assert.equal(api.updateSpirit(G.users.alice.ss.s1.instanceId, {xp:1}, {reason:'t'}).ok, false); },
  '操作员校验与字段白名单'(){ const {api, id} = build(); assert.equal(api.updateSpirit(id('alice'), {xp:1}, {reason:'t', operator:'bob'}).code, 'wrong-operator');
    assert.equal(api.updateSpirit(id('alice'), {totalXp:1}, {reason:'t'}).code, 'bad-field'); assert.equal(api.updateSpirit(id('alice'), {xp:1}, {}).code, 'no-reason'); },
  '访客/非超管不可修改'(){ const {api, id, state} = build(); state.see = false; assert.equal(api.updateSpirit(id('alice'), {xp:1}, {reason:'t'}).code, 'forbidden'); state.see = true; state.super = false;
    assert.equal(api.updateSpirit(id('alice'), {xp:1}, {reason:'t'}).code, 'forbidden'); assert.deepEqual(api.query({}), []); },
  '批量修改不误伤'(){ const {G, api, id} = build(); const r = api.batchUpdate([id('alice'), id('cat')], {xp:300}, {reason:'t'}); assert(r.ok);
    assert.equal(G.users.alice.ss.s1.xp, 300); assert.equal(G.users.cat.ss.s1.xp, 300); assert.equal(G.users.bob.ss.s1.xp, 100); assert.equal(G.users.alice.tr.t1.xp, 10);
    assert(r.snapshots.every(s=>s.batchId===r.batchId)); },
  '批量中途失败整批还原'(){ const {G, api, id} = build(); const r = api.batchUpdate([id('alice'), 'nope'], {xp:300}, {reason:'t'}); assert(!r.ok); assert.equal(G.users.alice.ss.s1.xp, 100); assert.equal(Object.keys(G.spSnap).length, 0); },
  '回滚恢复，重复回滚失败'(){ const {G, api, id} = build(); const r = api.updateSpirit(id('alice'), {xp:500, skin:'x', tag:'admin'}, {reason:'t'});
    assert.equal(api.rollback(r.snapshot.snapshotId, '').code, 'no-reason'); assert(api.rollback(r.snapshot.snapshotId, '误改').ok);
    assert.equal(G.users.alice.ss.s1.xp, 100); assert.equal(G.users.alice.equip.season, ''); assert.equal(G.users.bob.ss.s1.xp, 100);
    assert.equal(api.rollback(r.snapshot.snapshotId, 'again').code, 'already-rolled'); assert(api.query({instanceId:id('alice')}).some(x=>x.action==='rollback')); },
  '批量回滚恢复'(){ const {G, api, id} = build(); const r = api.batchUpdate([id('alice'), id('cat')], {xp:300}, {reason:'t'}); assert(api.batchRollback(r.batchId, '撤销').ok);
    assert.equal(G.users.alice.ss.s1.xp, 100); assert.equal(G.users.cat.ss.s1.xp, 50); assert.equal(api.batchRollback(r.batchId, 'x').code, 'already-rolled'); },
  '过期无法回滚'(){ const {G, api, id} = build(); const r = api.updateSpirit(id('alice'), {xp:500}, {reason:'t'}); clock += 7*86400000 + 1000;
    assert.equal(api.rollback(r.snapshot.snapshotId, 'late').code, 'expired'); assert.equal(G.users.alice.ss.s1.xp, 500); clock = Date.parse('2026-01-01T00:00:00Z'); },
  '仅超管可回滚'(){ const {api, id, state} = build(); const r = api.updateSpirit(id('alice'), {xp:500}, {reason:'t'}); state.super = false; assert.equal(api.rollback(r.snapshot.snapshotId, 'r').code, 'forbidden'); },
  '并发幂等'(){ const {G, api, id, env} = build(); const a = api.updateSpirit(id('alice'), {xp:500}, {reason:'t', requestId:'R1'}), b = api.updateSpirit(id('alice'), {xp:500}, {reason:'t', requestId:'R1'});
    assert(a.ok && b.idempotent); assert.equal(Object.keys(G.spSnap).length, 1);
    const s = a.snapshot.snapshotId; assert(api.rollback(s, 'r').ok); assert(!api.rollback(s, 'r').ok); assert.equal(G.users.alice.ss.s1.xp, 100); },
  '串号检测：异常时还原并报警'(){ const {G, api, id, env} = build();
    const orig = env.stageOf; let first = true; env.stageOf = (xp)=>{ if(first && xp===777){ first = false; G.users.bob.ss.s1.xp = 1; } return orig(xp); };
    const r = api.updateSpirit(id('alice'), {xp:777}, {reason:'t'}); assert.equal(r.code, 'cross-contamination'); assert.equal(G.users.alice.ss.s1.xp, 100); assert(alarms.length); },
  '审计查询与导出'(){ const {api, id} = build(); api.updateSpirit(id('alice'), {xp:500}, {reason:'t'}); api.updateSpirit(id('bob'), {xp:400}, {reason:'t'});
    assert.equal(api.query({operator:'alice'}).length, 1); assert.equal(api.query({spiritId:'dragon'}).length, 2); assert.equal(api.query({from:'2999-01-01'}).length, 0);
    assert(api.exportCsv({}).split('\r\n').length === 3); },
};
let fail = 0; for(const [k, f] of Object.entries(tests)){ try{ f(); console.log('ok   ', k); }catch(e){ fail++; console.log('FAIL ', k, e.message); } }
process.exit(fail ? 1 : 0);
