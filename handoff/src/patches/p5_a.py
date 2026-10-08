# v2.9 方案 A（基于 v2.5 立绘形态）：名称锚定元素表 + 赛尔号式粗描边赛璐璐；不拟人；重点 50 只图片素材 + 灰度发布
import sys, shutil
W = sys.argv[1]
def patch(path, pairs):
    s = open(path).read()
    for a, b in pairs:
        assert s.count(a) == 1, (path, s.count(a), a[:100])
        s = s.replace(a, b)
    open(path, 'w').write(s)
P = W + '/parts/'
shutil.copy(W + '/../patches/p50.js', P + 'p50.js')
shutil.copy(W + '/../patches/p51.js', P + 'p51.js')
shutil.copy(W + '/../patches/p52.js', P + 'p52.js')

# ---------------- p43：不拟人（去掉 S1 拟人副骨架）；LV5 专属法相骨架 ----------------
patch(P + 'p43.js', [
  ("  const subs = [sk2].filter(v=>v && v!==sk); if(st>=3 && F.skel && sk!=='S1' && !subs.includes('S1')) subs.push('S1');\n",
   "  const subs = [sk2].filter(v=>v && v!==sk);   /* v2.7 Q 版精灵、不拟人：不再加 S1 拟人副骨架 */\n"
   "  const fx = F.skel && !opts.sk && st>=5 ? (R ? R.l5[0] : (m1 && m1!==sk ? m1 : m2 && m2!==sk ? m2 : 'S11')) : null;   /* LV5 专属法相骨架（身后独立成层，不占骨架） */\n"),
  ("  return {ck, sk, sk2, subs, heldDom, lv, geo,", "  return {ck, sk, sk2, subs, fx, heldDom, lv, geo,"),
  ("  2:{sk:['基础骨架','Basic skeleton','Khung cơ bản'],", "  2:{sk:['主骨架（元素组合）','Main skeleton (element combination)','Khung chính (tổ hợp nguyên tố)'],"),
  ("  3:{sk:['主骨架 + S1 拟人副骨架','Main skeleton + S1 humanoid secondary','Khung chính + khung phụ người S1'],", "  3:{sk:['主骨架（元素环境 / 伙伴）','Main skeleton (element setting / companions)','Khung chính (môi trường nguyên tố)'],"),
  ("  4:{sk:['主骨架 + 副骨架 + S1','Main + secondary skeleton + S1','Khung chính + phụ + S1'],", "  4:{sk:['主骨架 + 副骨架（元素质变）','Main + secondary skeleton (element transformation)','Khung chính + phụ (biến đổi nguyên tố)'],"),
  ("  5:{sk:['副骨架 + 专属 + S1','Secondary skeleton + exclusive + S1','Khung phụ + riêng + S1'],", "  5:{sk:['副骨架 + 元素法相（元素升华，法相独立成层）','Secondary skeleton + element dharma form (sublimation; the dharma form is its own layer)','Khung phụ + pháp tướng nguyên tố'],"),
])

# ---------------- p45：签名带上法相骨架 ----------------
patch(P + 'p45.js', [
  ("M?.sk, (M ? spSkelSubs(M) : []).join('+'),", "M?.sk, (M ? spSkelSubs(M) : []).join('+') + (M?.fx ? '|fx:' + M.fx : ''),"),
])

# ---------------- p49：圆团身体不再头身分离（不拟人）；阶段要点（方案 A） ----------------
patch(P + 'p49.js', [
  ("  return st>=3 ? {kind:S.kind+'_h', fy:S.h.fy, k:S.h.k, cls:S.cls, sub} : {kind:S.kind, fy:S.fy, k:S.k, cls:S.cls, sub};",
   "  return {kind:S.kind, fy:S.fy, k:S.k, cls:S.cls, sub};   /* v2.9 不拟人：各阶段保持整块本体，不做头身分离 */"),
  ("var SP_STAGE_FOCUS = {1:[['定剪影','Set the silhouette','Định dáng'],['慢而萌：保留蛋形轮廓，蛋形随子类变化；壳纹 + 蛋壳上的主体印记 + 破口露出的主体碎片','Slow and cute: keep the egg outline, shaped by the sub-type; shell pattern + the subject stamp on the shell + a subject fragment peeking from the crack','Chậm và dễ thương: giữ dáng trứng theo phân loại; vân vỏ + dấu chủ đề + mảnh lộ ra ở vết nứt']],",
   "var SP_STAGE_FOCUS = {1:[['蛋形 · 单一元素','Egg · a single element','Trứng · một nguyên tố'],['维持蛋形：蛋形随子类变化，壳纹 + 主体印记；破口露出元素表里最小的那个元素（如一点烛火、一粒火星、一根秒针）','Stays an egg: shaped by the sub-type with a shell pattern and the subject stamp; the crack reveals the smallest element of the kit (a candle flame, a spark, a second hand)','Giữ dạng trứng; vết nứt lộ nguyên tố nhỏ nhất']],"),
  ("  2:[['定骨相','Set the bone structure','Định cốt tướng'],['稳而长：眉弓、颧骨、下颌、鼻骨的结构转折','Steady growth: brow ridge, cheekbones, jaw and nose bridge','Ổn định: cung mày, gò má, cằm, sống mũi']],",
   "  2:[['元素组合','Element combination','Tổ hợp nguyên tố'],['本体 + 元素部件（如灯罩 + 提手 + 流苏）','The body plus element parts (lantern shade + handle + tassels)','Bản thể + bộ phận nguyên tố']],"),
  ("  3:[['定比例','Set the proportions','Định tỉ lệ'],['加速人形化：加 S1 拟人副骨架（类人手臂 / 姿态），方 / 圆 / 三角 / 长条对比，头身分离，配件不掩盖结构','Faster humanisation: an S1 humanoid secondary skeleton (humanlike arms and posture), square / round / triangle / long contrast, head and body separate, accessories never hide the structure','Nhân hóa nhanh: thêm khung phụ người S1, tương phản vuông / tròn / tam giác / dài']],",
   "  3:[['元素环境 / 伙伴','Element setting / companions','Môi trường / bạn nguyên tố'],['元素组成的环境出现，伙伴是元素小件（如小烛火、小火星、小秒针）','A setting made of the elements appears; companions are small elements (little candle flames, sparks, second hands)','Môi trường từ nguyên tố; bạn đồng hành là nguyên tố nhỏ']],"),
  ("  4:[['定配件','Set the accessories','Định phụ kiện'],['配件服务角色设定，不抢主体：去掉拖尾，几何只做点缀','Accessories serve the character and never steal focus: no trails, geometry only as accents','Phụ kiện phục vụ nhân vật, không lấn át']],",
   "  4:[['元素质变','Element transformation','Biến đổi nguyên tố'],['元素按聚合 / 分化 / 结构 / 材质 / 维度 / 时间 / 空间 / 概念质变（如灯树、冷晶火芯、逆转表盘、星轨门、重组齿轮）','The elements transform by aggregation / differentiation / structure / material / dimension / time / space / concept (lantern tree, cold-crystal core, reversed dial, orbit gate, rebuilt gears)','Nguyên tố biến đổi']],"),
  ("  5:[['定记忆点','Set the memory point','Định điểm nhớ'],['做减法：最多两种材质 + 领域（领域不计入材质）；法器不再拿在手上，化入领域；去掉拖尾 / 叠加几何，胸前核心徽记强化主体符号',",
   "  5:[['元素升华','Element sublimation','Thăng hoa nguyên tố'],['领域 + 元素法相（身后独立成层，可收起，不遮挡本体）；最多两种材质 + 领域；法器化入领域；元素核心徽记',"),
])

# ---------------- p47：伙伴换成元素小件；手写元素表的精灵用元素质变图层 ----------------
patch(P + 'p47.js', [
  ("function spPathMini(def, x, px, py, s, op=1, rot=0){ return ", "function spPathMini(def, x, px, py, s, op=1, rot=0){ if(x.kitMini) return x.kitMini(px, py, s, op, rot); return "),
  ("  if(st===4 && F.mut){", "  if(st===4 && F.mut && !x.kitMut){"),
  ("  if(st===3 && F.env){", "  if(st===3 && F.env && !x.kitNoEnv){"),
])

# ---------------- p44：资源包附带出图设定卡 ----------------
patch(P + 'p44.js', [
  ("    files.push({name:`${dir}manifest.json`, data:new TextEncoder().encode(JSON.stringify(man, null, 2))});",
   "    if(typeof spArtBrief==='function'){ man.briefs = {}; const B = [1,2,3,4,5].map(n=>(man.briefs['lv'+n] = spArtBrief(d, n))); files.push({name:`${dir}art_brief.md`, data:new TextEncoder().encode(`# ${trT(d.name)} · ${d.id}\\n\\n把 lv1.png ~ lv5.png（可加 @2x / @3x）放进 ${dir}，程序自动替换矢量图；缺图自动回退。\\n\\n` + B.map(b=>`## LV${b.stage}\\n\\n${b.zh}\\n\\n${b.en}\\n`).join('\\n'))}); man.files.push(`${dir}art_brief.md`); }\n"
   "    files.push({name:`${dir}manifest.json`, data:new TextEncoder().encode(JSON.stringify(man, null, 2))});"),
])

# ---------------- p44：阶段表显示骨架组合 ----------------
patch(P + 'p44.js', [
  ("${M ? spArtSk(M.sk) + (M.sk2 ? ' + ' + spArtSk(M.sk2) : '') : ''}",
   "${M ? spArtSk(M.sk) + spSkelSubs(M).map(k=>' + ' + spArtSk(k)).join('') + (M.fx ? ' + ' + escapeHtml(tx('法相','dharma form','pháp tướng')) + '·' + spArtSk(M.fx) : '') : ''}"),
])

# ---------------- p44：重点 50 只 + 灰度发布 + 单图版本 ----------------
patch(P + 'p44.js', [
  ("  const e = (C.assets.list||{})[spAssetKey(def.id, st, skinId || 'base')]; if(!e) return null;",
   "  const e = (C.assets.list||{})[spAssetKey(def.id, st, skinId || 'base')]; if(!e) return null;\n  if(typeof spAssetGrayOk==='function' && !spAssetGrayOk(C)) return null;   /* v2.7 灰度：不在放量范围内的账号继续看矢量图 */"),
  ("  const base = String(C.assets.base||'assets/spirits').replace(/\\/+$/,''), v = C.assets.ver||1, p = e.path.replace(/\\.png$/i,'');",
   "  const base = String(C.assets.base||'assets/spirits').replace(/\\/+$/,''), v = (C.assets.ver||1) + (e.v ? '.' + e.v : ''), p = e.path.replace(/\\.png$/i,'');   /* 全局版本 + 单图版本 */"),
  ("    case 'spAssetScan': if(spIsAdmin()) spAssetScan(); return false;",
   "    case 'spAssetScan': if(spIsAdmin()) spAssetScan(); return false;\n"
   "    case 'spAssetBriefAll': if(spIsAdmin()) spAssetBriefAll(); return false;\n"
   "    case 'spAssetGraySave': { if(!spIsAdmin()) return false; const fd = new FormData(document.getElementById('spGrayForm')), C = spArtCfg(), gray = {on:fd.get('on')==='on', pct:Math.max(0, Math.min(100, +fd.get('pct')||0)), users:String(fd.get('users')||'').split(/[,，\\s]+/).map(s=>s.trim()).filter(Boolean)}; spArtSaveCfg({assets:{...C.assets, gray}}, 'art-asset-gray'); toast(tx('灰度设置已保存','Gray release saved','Đã lưu'), 'ok'); return true; }"),
])
patch(P + 'p44.js', [
  ("function spArtAssetHtml(){\n", "function spArtAssetHtml(){ return spArtAssetHtmlCore() + (typeof spAssetKeyHtml==='function' ? spAssetKeyHtml() : '') + (typeof spElLibHtml==='function' ? spElLibHtml() : ''); }   /* v2.7 + 重点 50 只 / 灰度 */\nfunction spArtAssetHtmlCore(){\n"),
])

# ---------------- p43：能量形态延伸可指定颜色 ----------------
patch(P + 'p43.js', [
  ("  const {c, ac, dk} = x, fill = spMixC(spMixC(c, ac, .5), '#fff', .25), n = st>=4 ? 3 : 2; let s = '';",
   "  const {c, ac, dk} = x, fill = x.extFill || spMixC(spMixC(c, ac, .5), '#fff', .25), n = st>=4 ? 3 : 2; let s = '';"),
])

# ---------------- p25 spiritSvg ----------------
patch(W + '/base.html', [
  ("  if(A){ const K = spArtColors(A, c, ac, belly); c = K.c; ac = K.ac; belly = K.belly; dk = K.dk; ink = K.ink; rimC = K.rimC; }",
   "  if(A){ const K = spArtColors(A, c, ac, belly); c = K.c; ac = K.ac; belly = K.belly; dk = K.dk; ink = K.ink; rimC = K.rimC; }\n"
   "  /* v2.9 赛尔号式：高饱和大色块，主色 ≤ 3（取元素表配色），深色描边 */\n"
   "  const QS = typeof spHuOn==='function' && spHuOn(A, st), KT = QS && typeof spKitOf==='function' ? spKitOf(def) : null;\n"
   "  if(QS){ const K3 = KT.auto ? [c0, a0, b0] : KT.cols; c = spSatC(K3[0], 1.3); ac = spSatC(K3[1], 1.3); belly = spMixC(spSatC(K3[2], 1.2), '#fff', .3); dk = '#18121f'; ink = null; if(st===1){ c = spMixC(c, '#fff', .55); belly = '#ffffff'; } }   /* LV1 蛋壳用浅色 */"),
  ("  let d4 = g ? g.d4.map(key=>spD4Render(key, x)) : []; const d5 = st>=5 && g ? g.d5.map(key=>spD5Render(key, x)) : [];",
   "  let d4 = g && !QS ? g.d4.map(key=>spD4Render(key, x)) : []; const d5 = st>=5 && g && !QS ? g.d5.map(key=>spD5Render(key, x)) : [];   /* v2.9 随机进化方向的装饰不符合元素定义，赛尔号式不画 */"),
  ("  if(st>=5 && legsMode==='bi'){ limbB = ''; lower = spLowerForm(g.d5[0], x); }",
   "  if(st>=5 && legsMode==='bi' && !QS){ limbB = ''; lower = spLowerForm(g.d5[0], x); }"),
  ("  if(MD){ const K = spSkelRender(MD, x, st);",
   "  if(MD){ const K = spSkelRender(QS && typeof spQSkel==='function' ? spQSkel(MD) : MD, x, st);   /* v2.9 只留符合元素定义的骨架部件 */"),
  ("&& (typeof spEvoPartOk!=='function' || spEvoPartOk(def, p, AL)));\n  const extra",
   "&& (typeof spEvoPartOk!=='function' || spEvoPartOk(def, p, AL)) && !(QS && /^(halo|ring|crown|tiara|wings:)/.test(String(p))) && !(KT && !KT.auto && /^motif/.test(String(p))));   /* 有元素表的精灵不加系列点缀 */   /* v2.9 翅膀 / 光环 / 皇冠不默认添加 */\n  const extra"),
  ("  const x = {def, g, c, ac, dk, belly, fy, k, hy, cy, metal, id, rimC, AL, lod:A ? A.lod : 2};",
   "  const x = {def, g, c, ac, dk, belly, fy, k, hy, cy, metal, id, rimC, AL, lod:A ? A.lod : 2};\n"
   "  if(QS) x.extFill = spMixC(c, ac, .3);   /* 元素系能量形态延伸用元素本色，不像翅膀 */\n"
   "  if(KT && !KT.auto){ x.kitMut = true; x.kitNoEnv = KT.env===false; const KP = {c, a:ac, l:belly, OL:dk, W:.6, st, cel:(d, col)=>`<path d=\"${d}\" fill=\"${col}\" stroke=\"${dk}\" stroke-width=\".6\" stroke-linejoin=\"round\"/>`};   /* LV3 伙伴 = 元素小件 */\n"
   "    x.kitMini = (px, py, s, op, rot)=>`<g class=\"pt-mini\" transform=\"translate(${spF(px)} ${spF(py)}) rotate(${rot})\" opacity=\"${op}\">${spKitPrim(KT.comp || KT.lv1, {...KP, x0:0, y:-15*s, w:24*s, h:30*s})}</g>`; }"),
  ("  let [limbB, limbF] = st>=4 && legsMode!=='bi' ? ['', ''] : spLimbs(st, def, c, dk);",
   "  let [limbB, limbF] = st>=4 && legsMode!=='bi' ? ['', ''] : spLimbs(QS ? Math.min(st, 3) : st, def, c, dk);   /* v2.9 不拟人：各阶段都是小短肢 */"),
  ("  if(st>=4 && legsMode!=='bi'){ const [, f] = spLimbs(st, def, c, dk); if(armsOn) limbF = f; }",
   "  if(st>=4 && legsMode!=='bi'){ const [, f] = spLimbs(QS ? 3 : st, def, c, dk); if(armsOn) limbF = f; }"),
  ("  const MD = A ? A.M : null;",
   "  const KX = KT && !KT.auto;   /* v2.9 有元素表的精灵：只画元素表里的部件，不叠加名称字元 / 系列点缀 / 能量延伸 / 法器 */\n  const MD = A && !(KX && KT.skel===false) ? A.M : null;"),
  ("  let lower = '';\n  if(st>=5 && legsMode",
   "  if(KX && KT.limbs===false){ limbB = ''; limbF = ''; }   /* 灯笼 / 星体这类无肢元素不长腿脚 */\n  let lower = '';\n  if(st>=5 && legsMode"),
  ("  x.heldEcho = heldEcho;", "  x.heldEcho = KX ? '' : heldEcho;"),
  ("  const extB = A && MD && st>=2", "  const extB = A && MD && !KX && st>=2"),
  ("  const NE = A && typeof spNameEvoSvg", "  const NE = A && !KX && typeof spNameEvoSvg"),
  ("  const SH = A && typeof spShapeOf==='function' ? spShapeOf(def, st) : null;",
   "  const BO = KT && !KT.auto && KT.body && st>=2 ? KT.body : null, BOD = BO && typeof spBodyRef==='function' ? spBodyRef(BO) : null;   /* v3.0 元素表指定本体（名不副实的本体按元素改：雷 → 闪电） */\n  const SH = A && !BO && typeof spShapeOf==='function' ? spShapeOf(def, st) : null;"),
  ("const k = SH ? SH.k : EG ? EG.k : (def.k || 1), fy0 = SH ? SH.fy : EG ? EG.fy : (def.faceY || 29)",
   "const k = BO ? BOD.k : SH ? SH.k : EG ? EG.k : (def.k || 1), fy0 = BO ? BOD.faceY : SH ? SH.fy : EG ? EG.fy : (def.faceY || 29)"),
  ("  const bk = SH ? SH.kind : EG ? EG.kind :", "  const bk = BO ? BO : SH ? SH.kind : EG ? EG.kind :"),
  ("  if(ink) face = face.replace(/#1f2937/g, ink);",
   "  if(ink) face = face.replace(/#1f2937/g, ink);\n  if(QS) face = face.replace(/<path class=\"fb-[^\"]*\"[^>]*\\/>/g, '');   /* 不拟人：去掉鼻梁 / 颧骨 / 下颌 / 眉弓等人类骨相线 */"),
  ("  const fly = spCanFly(def) && AL.wings;", "  const fly = spCanFly(def) && AL.wings && !QS;   /* v2.9 翅膀不默认添加 */"),
  ("  const artL = A ? spArtBodyLayers(A, x, bk) : '', bf = spArtBodyFilter(A),", "  const artL = A && !QS ? spArtBodyLayers(A, x, bk) : '', bf = QS ? '' : spArtBodyFilter(A),   /* v2.9 无渐变 */"),
  ("  const inner = `<g class=\"sv-all ${st>=5?'sv-float':''}\"",
   "  const inner = QS ? spHuInner({def, st, A, L, x, id, c, ac, belly, dk, bk, frag:typeof spFragOf==='function' ? spFragOf(def.body) : null, d5, PT, NE, fy, k, cy, opts, comp, ty, lift, backdrop, op:null, bodyTf, bodyS, ovl:inBody(EL ? EL.inner : ''), pat, mat, neon, face, core, shell,\n"
   "    bodyMask:bodyMask || `<mask id=\"bm${id}\" maskUnits=\"userSpaceOnUse\" x=\"-10\" y=\"-10\" width=\"68\" height=\"68\"><g>${spBody(bk, '#fff', '#fff', '#fff')}</g></mask>`,\n"
   "    backS:`${extB}${skB}${outB}${hairBack}${back}${skelB}${limbB}${lower}`,\n"
   "    frontS:`${skelF}${limbF}${front}${PT.front}<g class=\"sk-front\">${outF}${skF}${hairFront}${head}${held}</g>${deco}`}) : `<g class=\"sv-all ${st>=5?'sv-float':''}\""),
])
print('ok')
