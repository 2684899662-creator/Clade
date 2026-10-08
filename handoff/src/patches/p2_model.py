# 拍板 4：LV3 起 S1 拟人副骨架、spSkelHas 主副骨架共存；拍板 5：LV5 材质最多两种 + 领域；
# 拍板 6：elem「能量翼 / 能量尾」→「能量形态延伸」并进 elem 白名单；拍板 7：LV5 去法器（法器化入领域）；拍板 3：LV1 蛋形接入渲染
import sys
W = sys.argv[1]
def patch(path, pairs):
    s = open(path).read()
    for a, b in pairs:
        assert s.count(a) == 1, (path, s.count(a), a[:90])
        s = s.replace(a, b)
    open(path, 'w').write(s)

# ---------------- p43 六层建模 ----------------
patch(W + '/parts/p43.js', [
  # 部件值：能量形态延伸（旧值保留，兼容管理员已保存的覆写）
  ("'能量翼':['能量翼','Energy wings','Cánh năng lượng'],",
   "'能量翼':['能量翼','Energy wings','Cánh năng lượng'],'能量形态延伸':['能量形态延伸（非翼非尾）','Energy-form extension (neither wing nor tail)','Phần kéo dài dạng năng lượng (không phải cánh hay đuôi)'],"),
  ("  elem:['S3','S10','G11','G4',['无头','能量体','无','火焰尾','能量翼','无','无','元素纹','环绕','粒子','能量核','无'],",
   "  elem:['S3','S10','G11','G4',['无头','能量体','无','能量形态延伸','无','无','无','元素纹','环绕','粒子','能量核','无'],"),
  # 阶段规则文案
  ("  3:{sk:['主骨架','Main skeleton','Khung chính'],",
   "  3:{sk:['主骨架 + S1 拟人副骨架','Main skeleton + S1 humanoid secondary','Khung chính + khung phụ người S1'],"),
  ("  4:{sk:['主骨架 + 副骨架','Main + secondary skeleton','Khung chính + phụ'],",
   "  4:{sk:['主骨架 + 副骨架 + S1','Main + secondary skeleton + S1','Khung chính + phụ + S1'],"),
  ("  5:{sk:['副骨架 + 专属','Secondary skeleton + exclusive','Khung phụ + riêng'],",
   "  5:{sk:['副骨架 + 专属 + S1','Secondary skeleton + exclusive + S1','Khung phụ + riêng + S1'],"),
  ("mat:['多材质 + 领域','Multiple materials + domain','Nhiều chất liệu + lĩnh vực']",
   "mat:['最多两种材质 + 领域（领域不计入材质）','At most two materials + domain (the domain is not a material)','Tối đa hai chất liệu + lĩnh vực (lĩnh vực không tính là chất liệu)']"),
  ("parts:[9,12], mat:", "parts:[9,11], mat:"),
  # spModelOf：S1 副骨架 / LV5 材质节点 ≤2 / LV5 法器槽交给领域
  ("  if(opts.sk){ sk = opts.sk; sk2 = opts.sk2 || null; } if(opts.geo) geo = opts.geo;\n",
   "  if(opts.sk){ sk = opts.sk; sk2 = opts.sk2 || null; } if(opts.geo) geo = opts.geo;\n"
   "  /* v2.5 LV3 起加 S1 拟人副骨架，与主骨架 / 其他副骨架共存（主骨架本身是 S1 时不重复） */\n"
   "  const subs = [sk2].filter(v=>v && v!==sk); if(st>=3 && F.skel && sk!=='S1' && !subs.includes('S1')) subs.push('S1');\n"),
  ("  SP_PART_SLOTS.forEach(([k],i)=>{ const v = parts[i]; if(v && v!=='无' && n < nP){ on[k] = v; n++; } else if(k==='head' || k==='torso'){ on[k] = v; } });\n"
   "  const ns = st===1 ? nodes.slice(0,1) : st===2 ? nodes.slice(0,2) : nodes;\n",
   "  let heldDom = null;   /* v2.5 LV5 去法器：法器不再拿在手上，化入领域 */\n"
   "  SP_PART_SLOTS.forEach(([k],i)=>{ const v = parts[i]; if(st>=5 && k==='held'){ if(v && v!=='无') heldDom = v; return; } if(v && v!=='无' && n < nP){ on[k] = v; n++; } else if(k==='head' || k==='torso'){ on[k] = v; } });\n"
   "  const ns = st===1 ? nodes.slice(0,1) : st===2 || st>=5 ? nodes.slice(0,2) : nodes;   /* LV5 最多两种材质，领域另算 */\n"),
  ("  return {ck, sk, sk2, lv, geo, nodes:F.mat ? ns : ['M1'],",
   "  return {ck, sk, sk2, subs, heldDom, lv, geo, nodes:F.mat ? ns : ['M1'],"),
  # spSkelHas / spSkelRender
  ("function spSkelHas(sk){ return ['S1','S2','S4','S5','S7','S9','S12'].includes(sk); }   /* 有自己的四肢 */\n"
   "function spSkelRender(M, x, st){\n"
   "  const out = {back:'', front:'', replace:M.sk!=='S1' && M.sk!=='S5', lift:0, lower:null};\n",
   "/* 有自己的四肢；v2.5 支持主副骨架共存：spSkelHas(主骨架, [副骨架…]) 任一带四肢即为真 */\n"
   "function spSkelHas(sk, subs){ const L = ['S1','S2','S4','S5','S7','S9','S12']; return [sk].concat(subs||[]).some(s=>s && L.includes(s)); }\n"
   "function spSkelArms(sk){ return ['S1','S5','S9','S12'].includes(sk); }   /* 自带手臂 */\n"
   "function spSkelSubs(M){ return (M.subs || [M.sk2]).filter(s=>s && s!==M.sk); }\n"
   "function spSkelRender(M, x, st){\n"
   "  const out = {back:'', front:'', replace:M.sk!=='S1' && M.sk!=='S5', lift:0, lower:null, arms:false}, subs = spSkelSubs(M);\n"),
  ("  if(M.sk2 && M.sk2!==M.sk){ const needLimbs = !spSkelHas(M.sk) && spSkelHas(M.sk2) && M.sk2!=='S1'; add(M.sk2, Math.max(1, M.lv-1), !needLimbs); }\n  return out;\n",
   "  subs.filter(s=>s!=='S1').forEach(s=>{ const needLimbs = !spSkelHas(M.sk) && spSkelHas(s); add(s, Math.max(1, M.lv-1), !needLimbs); });\n"
   "  /* S1 拟人副骨架：主骨架与其他副骨架都没有手臂时，补一对类人手臂（保留主骨架的腿 / 根 / 环 / 漂浮） */\n"
   "  if(subs.includes('S1') && out.replace && !spSkelArms(M.sk) && !subs.some(k=>k!=='S1' && spSkelArms(k))) out.arms = true;\n"
   "  return out;\n"),
])
s = open(W + '/parts/p43.js').read()
a = "function spSkelPart(sk, lv, x, st, sig){"
assert s.count(a) == 1
s = s.replace(a, r'''/* S1 拟人副骨架的手臂：LV3 短臂，LV4 起按基因的类人手臂（前层） */
function spSkelArmsSvg(st, def, c, dk){
  if(st<3) return ''; const S = `fill="${c}" stroke="${dk}" stroke-width=".9" stroke-linejoin="round"`;
  if(st===3) return `<g class="sk-limb sk-s1" ${S}><ellipse cx="12.2" cy="32.5" rx="2.3" ry="3.6" transform="rotate(28 12.2 32.5)"/><ellipse cx="35.8" cy="32.5" rx="2.3" ry="3.6" transform="rotate(-28 35.8 32.5)"/></g>`;
  const f = spLimbs(4, def, c, dk)[1]; return f ? `<g class="sk-limb sk-s1">${f}</g>` : '';
}
/* 元素系「能量形态延伸」：从身体两侧向后上方分叉的能量形（不是翅膀，也不是尾巴）；LV2~LV4，LV5 做减法收回 */
function spModelExt(x, st){
  const {c, ac, dk} = x, fill = spMixC(spMixC(c, ac, .5), '#fff', .25), n = st>=4 ? 3 : 2; let s = '';
  for(let i=0;i<n;i++) [-1, 1].forEach(sd=>{ const y0 = 35 - i*4.2, len = 5.5 + st*1.2 - i*.8, bx = 24 + sd*8.6, tx = 24 + sd*(10.5 + len), ty = y0 - 4.5 - len*.55;
    s += `<path d="M${spF(bx)} ${spF(y0-2.6)}Q${spF(24+sd*(11+len*.45))} ${spF(y0-3.4)} ${spF(tx)} ${spF(ty)}Q${spF(24+sd*(11.5+len*.55))} ${spF(y0+.6)} ${spF(bx+sd*.6)} ${spF(y0+2.8)}Z" fill="${fill}" stroke="${dk}" stroke-width=".45" stroke-linejoin="round" opacity="${spF(.92-i*.18)}"/><path d="M${spF(bx+sd*1.2)} ${spF(y0)}Q${spF(24+sd*(11+len*.4))} ${spF(y0-1.6)} ${spF(tx-sd*1.6)} ${spF(ty+1.2)}" fill="none" stroke="#fff" stroke-width=".45" stroke-linecap="round" opacity=".6"/>`; });
  return `<g class="sp-ext">${s}</g>`;
}
''' + a)
open(W + '/parts/p43.js', 'w').write(s)

# ---------------- p45 白名单 / 签名 ----------------
patch(W + '/parts/p45.js', [
  ("  tail:['名称含尾/龙/蛇/蜥/兽/狼/狮/虎/豹/狐/犬/猫/鲸/鱼','爬行系','海洋系','飞行系'],\n};",
   "  tail:['名称含尾/龙/蛇/蜥/兽/狼/狮/虎/豹/狐/犬/猫/鲸/鱼','爬行系','海洋系','飞行系'],\n"
   "  ext:['元素系：能量形态延伸（焰舌 / 水流 / 风带 / 电弧，不算翅膀也不算尾巴）'],\n};"),
  ("  if(!def) return {wings:false, halo:false, crown:false, tail:false, why:{}};",
   "  if(!def) return {wings:false, halo:false, crown:false, tail:false, ext:false, why:{}};"),
  ("  if(!F.common) return {wings:true, halo:true, crown:true, tail:true, why:{wings:['未启用白名单','Whitelist off','Tắt danh sách trắng']}};",
   "  if(!F.common) return {wings:true, halo:true, crown:true, tail:true, ext:true, why:{wings:['未启用白名单','Whitelist off','Tắt danh sách trắng']}};"),
  ("  return {wings, halo, crown, tail, why};",
   "  /* v2.5 元素系白名单：能量形态延伸（替代原「能量翼 / 能量尾」） */\n"
   "  const ext = ck==='elem'; if(ext) why.ext = [`${spArtCatName(ck)}允许能量形态延伸`, `${spArtCatName(ck)} may have an energy-form extension`, `${spArtCatName(ck)} được có phần kéo dài năng lượng`];\n"
   "  return {wings, halo, crown, tail, ext, why};"),
  ("return [st===1 && spFragOf?.(def.body) ? 'frag' : def.body, M?.sk, M?.sk2||'',",
   "return [st===1 ? (typeof spEggOf==='function' && A ? 'egg:'+spEggOf(def).sub : spFragOf?.(def.body) ? 'frag' : def.body) : def.body, M?.sk, (M ? spSkelSubs(M) : []).join('+'),"),
])

# ---------------- p25 spiritSvg ----------------
B = W + '/base.html'
patch(B, [
  # LV1 蛋形：面部位置跟随蛋形
  ("  const SH = A && typeof spShapeOf==='function' ? spShapeOf(def, st) : null;\n"
   "  const k = SH ? SH.k : (def.k || 1), fy0 = SH ? SH.fy : (def.faceY || 29), hy0 = fy0 - 11*k;",
   "  const SH = A && typeof spShapeOf==='function' ? spShapeOf(def, st) : null;\n"
   "  const EG = A && st===1 && typeof spEggOf==='function' ? spEggOf(def) : null;   /* v2.5 LV1 差异化蛋形 */\n"
   "  const k = SH ? SH.k : EG ? EG.k : (def.k || 1), fy0 = SH ? SH.fy : EG ? EG.fy : (def.faceY || 29), hy0 = fy0 - 11*k;"),
  ("  const bk = SH ? SH.kind : st===1 && typeof spFragOf==='function' && spFragOf(def.body) ? spFragOf(def.body) : def.body;",
   "  const bk = SH ? SH.kind : EG ? EG.kind : st===1 && typeof spFragOf==='function' && spFragOf(def.body) ? spFragOf(def.body) : def.body;"),
  # LV5 去法器：武器 / 提灯方向不再拿在手上，交给领域
  ("  const legsMode = d4.find(r=>r.legs)?.legs || 'bi', armsOn = d4.every(r=>r.arms);",
   "  /* v2.5 LV5 去法器：武器 / 提灯等手持法器从身上拿掉，化入领域（领域里成为可进入世界的一部分） */\n"
   "  let heldEcho = '';\n"
   "  if(A && st>=5 && g){ d4 = d4.map((r,i)=>{ if(!['weapon','lantern'].includes(g.d4[i])) return r; heldEcho += r.front; return {...r, front:'', back:''}; }); }\n"
   "  const legsMode = d4.find(r=>r.legs)?.legs || 'bi', armsOn = d4.every(r=>r.arms);"),
  # S1 拟人副骨架手臂
  ("    if(K.replace){ limbB = ''; limbF = ''; if(st>=5) lower = ''; } if(K.lower!=null) lower = K.lower;",
   "    if(K.replace){ limbB = ''; limbF = K.arms && (st<4 || armsOn) ? spSkelArmsSvg(st, def, c, dk) : ''; if(st>=5) lower = ''; } if(K.lower!=null) lower = K.lower;"),
  ("    if(st>=4 && MD.parts.trail && A.lod) partB += spModelTrail(MD.parts.trail, x); }",
   "    if(st>=4 && MD.parts.trail && A.lod) partB += spModelTrail(MD.parts.trail, x);\n"
   "    if(st>=5 && MD.heldDom && !heldEcho && typeof spModelHeld==='function') heldEcho = spModelHeld(MD.heldDom, x); }\n"
   "  x.heldEcho = heldEcho;\n"
   "  const extB = A && MD && st>=2 && st<=4 && AL.ext && Object.values(MD.parts).includes('能量形态延伸') && typeof spModelExt==='function' ? spModelExt(x, st) : '';   /* v2.5 元素系能量形态延伸 */"),
  # LV1 蛋壳纹 / 主体印记 / 破口（替代旧的半截蛋壳）
  ("  const NE = A && typeof spNameEvoSvg==='function' ? spNameEvoSvg(def, st, x, AL) : {back:'', front:'', lift:0, op:null};",
   "  if(EG){ skelB = ''; skelF = ''; skLift = 0; }   /* LV1 蛋形：不画骨架的脚 / 环 / 符号，保持完整蛋形剪影 */\n  const NE = A && typeof spNameEvoSvg==='function' ? spNameEvoSvg(def, st, x, AL) : {back:'', front:'', lift:0, op:null};"),
  ("  const needMask = L.pat || L.mat || st>=4;",
   "  const needMask = L.pat || L.mat || st>=4 || EG;\n"
   "  const EL = EG && typeof spEggLayer==='function' ? spEggLayer(def, EG, x, c0) : null;"),
  ("  const ovl = inBody(marks + d4.map(r=>r.ovl).join('') + d5.map(r=>r.ovl).join(''));",
   "  const ovl = inBody(marks + d4.map(r=>r.ovl).join('') + d5.map(r=>r.ovl).join('') + (EL ? EL.inner : ''));"),
  ("  const shell = st===1 ? `<path",
   "  const shell = EG ? (EL ? EL.over : '') : st===1 ? `<path"),
  ("${PT.back}${NE.back}${geoM.back}${partB}",
   "${PT.back}${NE.back}${geoM.back}${partB}${extB}"),
])
print('ok')
