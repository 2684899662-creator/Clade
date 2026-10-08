# 拍板 1：形状语言 4 大类 × 3 子类 = 12 子类（SH1~SH12）；拍板 3：LV1 差异化蛋形 + 蛋壳主体印记
import sys
p = sys.argv[1] + '/parts/p49.js'; s = open(p).read()

# 1) 头部注释
a = "   · 名称暗示圆的（珠 / 球 / 圆 / 星 / 日 / 月 / 包 / 丸…）保持圆形\n"
assert a in s
s = s.replace(a, a + "   · v2.5 四大类各分三子类（SH1~SH12）：LV2~LV3 用本子类，LV4 / LV5 在同一大类内换子类，剪影逐级质变；同类精灵错开子类\n"
  "   · v2.5 LV1 保留蛋形轮廓：蛋形随子类变化，壳纹 / 主体印记 / 破壳露出的部件逐只错开（同类至少两项不同）\n")

# 2) spShapeClass：修复负数下标（h>>3 在 h ≥ 2^31 时为负，返回 undefined）；管理员可直接指定子类
a = "  if(SP_SHAPE_LANG[ov]) return ov;\n"
assert a in s
s = s.replace(a, "  if(SP_SHAPE_LANG[ov]) return ov; if(SP_SHAPE_SUB[ov]) return SP_SHAPE_SUB[ov].cls;\n")
a = "return h % 4 === 0 ? ['S','T','L','O'][(['S','T','L','O'].indexOf(base) + 1 + (h>>3)%3) % 4] : base;"
assert a in s
s = s.replace(a, "return h % 4 === 0 ? ['S','T','L','O'][(['S','T','L','O'].indexOf(base) + 1 + (h>>>3)%3) % 4] : base;")

# 3) 子类表 + 分配 + spShapeOf（替换 spShapeTri2 与旧 spShapeOf）
a0 = s.index("function spShapeTri2(def)")
a1 = s.index("Object.assign(SP_SHAPES, {")
new = r'''/* v2.5 十二子类：方（SH1~3）/ 圆（SH4~6）/ 三角（SH7~9）/ 长条（SH10~12）。kind = 身体形，egg = LV1 蛋形 */
var SP_SHAPE_SUB = {
  SH1:{cls:'S', n:['平顶方','Flat-top square','Vuông đỉnh phẳng'], d:['平顶、方肩、方下颌，四角收圆','Flat top, square shoulders and jaw, softened corners','Đỉnh phẳng, vai và cằm vuông, góc bo'], kind:'shp_sq', fy:26, k:1, h:{fy:20, k:.9}, egg:['圆角方蛋','Rounded-square egg','Trứng vuông bo góc']},
  SH2:{cls:'S', n:['方肩梯形','Square-shoulder trapezoid','Hình thang vai vuông'], d:['方肩收腰再放宽成稳底，像立起的书','Square shoulders, a pinched waist and a wide steady base, like a standing book','Vai vuông, eo thắt, đế rộng như cuốn sách dựng'], kind:'shp_trap', fy:25.5, k:.95, h:{fy:19.5, k:.88}, egg:['上宽下窄梯形蛋','Top-wide trapezoid egg','Trứng hình thang trên rộng']},
  SH3:{cls:'S', n:['阶梯块','Stepped blocks','Khối bậc thang'], d:['自下而上逐级收窄的方块，阶梯轮廓','Blocks narrowing step by step from bottom to top','Các khối thu hẹp dần từ dưới lên'], kind:'shp_step', fy:26, k:.9, h:{fy:20, k:.86}, egg:['双层阶梯蛋','Two-tier stepped egg','Trứng hai bậc']},
  SH4:{cls:'O', n:['宽距软圆','Wide soft round','Tròn mềm rộng'], d:['矮宽的软方圆：大眼宽距、圆下巴窝','A low, wide soft round: big wide-set eyes, a rounded chin','Tròn mềm thấp rộng: mắt to cách xa, cằm tròn'], kind:'shp_wide', fy:28.5, k:1, h:{fy:19, k:.92}, egg:['矮宽软圆蛋','Squat soft egg','Trứng tròn thấp']},
  SH5:{cls:'O', n:['水滴圆','Teardrop round','Tròn giọt nước'], d:['上尖下圆的水滴，重心在下','A teardrop: pointed top, heavy round bottom','Giọt nước: đỉnh nhọn, đáy tròn'], kind:'shp_drop', fy:30, k:.95, h:{fy:20.5, k:.86}, egg:['水滴蛋','Teardrop egg','Trứng giọt nước']},
  SH6:{cls:'O', n:['双团叠圆','Stacked rounds','Hai khối tròn chồng'], d:['小团叠在大团上，团与团有接缝','A small round stacked on a big one, with a seam between','Khối nhỏ chồng lên khối lớn, có đường nối'], kind:'shp_twin', fy:21.5, k:.86, h:{fy:18.5, k:.88}, egg:['双团叠蛋','Stacked twin egg','Trứng hai khối']},
  SH7:{cls:'T', n:['倒三角宽肩','Inverted triangle','Tam giác ngược vai rộng'], d:['宽肩窄腰，下颌收成 V 形','Broad shoulders, narrow waist, V-shaped jaw','Vai rộng, eo hẹp, cằm chữ V'], kind:'shp_tri', fy:25, k:.95, h:{fy:18.5, k:.9}, egg:['上宽下尖蛋','Top-heavy pointed egg','Trứng trên rộng dưới nhọn']},
  SH8:{cls:'T', n:['正三角稳底','Upright triangle','Tam giác đế vững'], d:['尖顶宽底，重心稳','A pointed top and wide, steady base','Đỉnh nhọn, đế rộng vững'], kind:'shp_tri2', fy:24.5, k:.86, h:{fy:20, k:.82}, egg:['尖顶蛋','Pointed-top egg','Trứng đỉnh nhọn']},
  SH9:{cls:'T', n:['菱形','Diamond','Hình thoi'], d:['上下两端尖、中段最宽的菱形','A diamond: pointed at both ends, widest in the middle','Hình thoi: nhọn hai đầu, rộng ở giữa'], kind:'shp_dia', fy:26.5, k:.88, h:{fy:18, k:.8}, egg:['菱形蛋','Diamond egg','Trứng hình thoi']},
  SH10:{cls:'L', n:['竖柱','Upright column','Cột đứng'], d:['修长竖柱：长脸长颈','A slender column: long face and neck','Cột thon: mặt và cổ dài'], kind:'shp_long', fy:22, k:.82, h:{fy:17.5, k:.78}, egg:['竖柱长蛋','Column egg','Trứng cột dài']},
  SH11:{cls:'L', n:['S 曲长','S-curve','Đường cong chữ S'], d:['S 形侧线的修长身段，自带动势','A slender body with S-curved sides, always in motion','Thân thon cong chữ S, luôn có động thế'], kind:'shp_scurve', fy:22, k:.8, h:{fy:17, k:.76}, egg:['S 曲斜长蛋','Leaning S egg','Trứng nghiêng chữ S']},
  SH12:{cls:'L', n:['弧月','Crescent','Trăng khuyết'], d:['两角上扬的弧月，面部落在弧心','A crescent with both horns raised; the face sits in the curve','Trăng khuyết hai sừng hướng lên; mặt ở lòng cung'], kind:'shp_moon', fy:33.5, k:.8, h:{fy:22.5, k:.72}, egg:['弧月缺口蛋','Crescent-notch egg','Trứng khuyết trăng']},
};
var SP_SHAPE_SUBS = {S:['SH1','SH2','SH3'], O:['SH4','SH5','SH6'], T:['SH7','SH8','SH9'], L:['SH10','SH11','SH12']};
/* 示例精灵逐阶段子类（LV1 蛋形 / LV2 / LV3 / LV4 / LV5），其余按规则自动分配；管理员可用 evoCfg.shapeSt[id] 覆盖 */
var SP_SHAPE_FIX = {sp_obj_lantern:['SH1','SH1','SH1','SH2','SH3'], sp_obj_book:['SH2','SH2','SH2','SH3','SH1'], sp_flame:['SH8','SH8','SH7','SH7','SH9'], sp_hour:['SH10','SH11','SH10','SH10','SH12'], sp_starbeast:['SH9','SH7','SH7','SH8','SH9']};
function spShapeTri2(def){ return spShapeSub(def, 2)==='SH8'; }   /* 兼容旧调用：正三角 = SH8 */
/* 同类错开：同一类别、同一大类的精灵按 ID 顺序轮流分到三个子类，管理员指定的不动 */
var spShapeCache = {ver:-1, map:null};
function spShapeBaseAll(){
  if(spShapeCache.ver===spCacheVer && spShapeCache.map) return spShapeCache.map;
  const map = new Map(), grp = {}; spShapeCache = {ver:spCacheVer, map};
  let L = []; try{ L = [...spLib(), ...(typeof SP_EVO_PATH_TV!=='undefined' && typeof spTvDef==='function' ? Object.keys(SP_EVO_PATH_TV).map(id=>spTvDef(id)).filter(Boolean) : [])]; }catch(_e){}
  L.forEach(d=>{ const k = (typeof spArtCatKey==='function' ? spArtCatKey(d) : d.cat) + '|' + spShapeClass(d); (grp[k] = grp[k] || []).push(d); });
  Object.values(grp).forEach(arr=>{ arr.sort((a, b)=>a.id<b.id ? -1 : 1); const cls = spShapeClass(arr[0]), subs = SP_SHAPE_SUBS[cls] || SP_SHAPE_SUBS.O, off = spHash('sub|'+cls+'|'+arr.length) % 3;
    arr.forEach((d, i)=>map.set(d.id, subs[(i + off) % 3])); });
  return map;
}
function spShapeSub(def, st){
  if(!def) return 'SH4'; const cfg = (typeof gCfg==='function' && gCfg().evoCfg) || {}, ov = cfg.shape?.[def.id], fix = cfg.shapeSt?.[def.id] || SP_SHAPE_FIX[def.id];
  const n = Math.max(1, Math.min(5, st||2));
  if(Array.isArray(fix) && SP_SHAPE_SUB[fix[n-1]]) return fix[n-1];
  const cls = spShapeClass(def), subs = SP_SHAPE_SUBS[cls] || SP_SHAPE_SUBS.O;
  let base = SP_SHAPE_SUB[ov] && SP_SHAPE_SUB[ov].cls===cls ? ov : null;
  if(!base){ try{ base = spShapeBaseAll().get(def.id); }catch(_e){} }
  if(!base || !subs.includes(base)) base = subs[spHash('sub|'+def.id) % 3];
  const i = subs.indexOf(base); return subs[(i + (n>=5 ? 2 : n===4 ? 1 : 0)) % 3];   /* LV4 / LV5 在同一大类内换子类 = 剪影质变 */
}
/* 重塑后的身体：LV2 单块体；LV3 起头身分离（_h） */
function spShapeOf(def, st){
  if(!def || st<2 || !SP_ROUND_KINDS.includes(def.body)) return null;
  const sub = spShapeSub(def, st), S = SP_SHAPE_SUB[sub]; if(!S) return null;
  return st>=3 ? {kind:S.kind+'_h', fy:S.h.fy, k:S.h.k, cls:S.cls, sub} : {kind:S.kind, fy:S.fy, k:S.k, cls:S.cls, sub};
}
/* ---------- LV1 蛋形：蛋轮廓（子类）/ 壳纹 / 主体印记 / 破壳露出的部件 ---------- */
var SP_EGG_PAT = {vert:['竖向接缝','Vertical seams','Đường nối dọc'], band:['横向腰带','Horizontal bands','Đai ngang'], dots:['星点','Speckles','Chấm'], crackle:['冰裂纹','Crackle','Vân rạn'], scale:['鳞片纹','Scales','Vảy'], ring:['刻度环','Tick rings','Vòng vạch']};
var SP_EGG_PEEK = {top:['顶部破口','Top crack','Nứt đỉnh'], left:['左肩破口','Left crack','Nứt bên trái'], right:['右肩破口','Right crack','Nứt bên phải']};
var spEggCache = {ver:-1, map:null};
function spEggAll(){
  if(spEggCache.ver===spCacheVer && spEggCache.map) return spEggCache.map;
  const map = new Map(), grp = {}, P = Object.keys(SP_EGG_PAT), K = Object.keys(SP_EGG_PEEK); spEggCache = {ver:spCacheVer, map};
  let L = []; try{ L = [...spLib(), ...(typeof SP_EVO_PATH_TV!=='undefined' && typeof spTvDef==='function' ? Object.keys(SP_EVO_PATH_TV).map(id=>spTvDef(id)).filter(Boolean) : [])]; }catch(_e){}
  L.forEach(d=>{ const k = (typeof spArtCatKey==='function' ? spArtCatKey(d) : d.cat) + '|' + spShapeSub(d, 1); (grp[k] = grp[k] || []).push(d); });
  /* 同类同蛋形：壳纹轮换（6 种），破口位置错位轮换 → 同类精灵四项里至少两项不同 */
  Object.values(grp).forEach(arr=>{ arr.sort((a, b)=>a.id<b.id ? -1 : 1); const o = spHash('egg|'+arr[0].id) % 6;
    arr.forEach((d, i)=>map.set(d.id, {pat:P[(i + o) % P.length], peek:K[(i + (i/P.length|0) + o) % K.length]})); });
  return map;
}
function spEggOf(def){
  if(!def) return null; const sub = spShapeSub(def, 1), S = SP_SHAPE_SUB[sub], ov = (typeof gCfg==='function' && gCfg().evoCfg?.egg?.[def.id]) || {};
  let a = null; try{ a = spEggAll().get(def.id); }catch(_e){}
  a = a || {pat:Object.keys(SP_EGG_PAT)[spHash('pat|'+def.id) % 6], peek:Object.keys(SP_EGG_PEEK)[spHash('peek|'+def.id) % 3]};
  const E = SP_EGG_FORM[sub] || SP_EGG_FORM.SH4;
  return {sub, kind:'egg_'+sub, n:S.egg, fy:E.fy, k:E.k, pat:SP_EGG_PAT[ov.pat] ? ov.pat : a.pat, peek:SP_EGG_PEEK[ov.peek] ? ov.peek : a.peek, stamp:def.body, E};
}
/* 蛋形几何：fy / k = 面部；top = 顶点；sh = 左右肩（破口位置）；sy = 印记纵向位置 */
var SP_EGG_FORM = {
  SH1:{fy:30, k:.78, top:[24,15], sh:[[15.5,19],[32.5,19]], sy:37.5, d:'M14 23Q14 15 24 15Q34 15 34 23V36Q34 43 24 43Q14 43 14 36Z'},
  SH2:{fy:29.5, k:.78, top:[24,15], sh:[[15.5,17],[32.5,17]], sy:37, d:'M14.5 17.5Q14.5 15 17.2 15H30.8Q33.5 15 33.5 17.5L32 36Q31 43 24 43Q17 43 16 36Z'},
  SH3:{fy:30.5, k:.76, top:[24,14], sh:[[17,17],[31,17]], sy:38, d:'M18 16Q24 13 30 16Q32 17.5 32 22H33.5Q35 22 35 23.5V36Q35 43 24 43Q13 43 13 36V23.5Q13 22 14.5 22H16Q16 17.5 18 16Z'},
  SH4:{fy:31.5, k:.82, top:[24,18], sh:[[15,22],[33,22]], sy:38, d:'M24 18Q36.5 18 36.5 31Q36.5 43 24 43Q11.5 43 11.5 31Q11.5 18 24 18Z'},
  SH5:{fy:32, k:.76, top:[24,13], sh:[[18.5,20],[29.5,20]], sy:38.5, d:'M24 13Q27 19 31.5 25Q34.5 29.5 34 34Q33 43 24 43Q15 43 14 34Q13.5 29.5 16.5 25Q21 19 24 13Z'},
  SH6:{fy:34.5, k:.72, top:[24,15], sh:[[19,18],[29,18]], sy:40, d:'M24 25.5A9 9 0 1 1 24 43.5A9 9 0 1 1 24 25.5Z', d2:'M24 15A6.2 6.2 0 1 1 24 27.4A6.2 6.2 0 1 1 24 15Z'},
  SH7:{fy:27.5, k:.8, top:[24,15], sh:[[16,18],[32,18]], sy:35.5, d:'M24 43Q16 39 14 30Q12.5 21 17 17.5Q20.5 15 24 15Q27.5 15 31 17.5Q35.5 21 34 30Q32 39 24 43Z'},
  SH8:{fy:33, k:.74, top:[24,13], sh:[[20,19],[28,19]], sy:39, d:'M24 13Q30 22 33.5 30Q36 37 32 41Q29 43.5 24 43.5Q19 43.5 16 41Q12 37 14.5 30Q18 22 24 13Z'},
  SH9:{fy:29, k:.74, top:[24,13.5], sh:[[18.5,20.5],[29.5,20.5]], sy:35.5, d:'M24 13.5L33.5 27Q35 29 33.5 31.5L26.5 41.5Q24 44.5 21.5 41.5L14.5 31.5Q13 29 14.5 27Z'},
  SH10:{fy:28, k:.68, top:[24,11], sh:[[18.5,15],[29.5,15]], sy:37, d:'M24 11Q30.5 11 30.5 19V36Q30.5 43 24 43Q17.5 43 17.5 36V19Q17.5 11 24 11Z'},
  SH11:{fy:29, k:.68, top:[23.5,11.5], sh:[[18.5,14],[29.5,15]], sy:37.5, d:'M23 11.5Q30 11 30.5 18Q31 24 33 30Q35 38 29 42Q26.5 43.5 23 43.2Q16 43 15.5 37Q15 31 17 25Q18.5 20 18 16.5Q18 12 23 11.5Z'},
  SH12:{fy:31, k:.78, top:[21,15.5], sh:[[15,21],[31,20]], sy:38, d:'M24 15Q12 15.5 12.5 29Q13 43 24 43Q35 43 35.5 29Q35.7 24 33.5 20.5Q30 23.5 27 21.5Q24.5 19.5 26 15.3Q25 15 24 15Z'},
};
/* 蛋壳上的壳纹 + 主体印记 + 破口露出的部件（全部在蛋体内或蛋的轮廓上，不画脚下光圈） */
function spEggLayer(def, E, x, c0){
  const F = E.E, ln = spShade(c0, -.38), lt = spMixC(c0, '#fff', .55), o = `fill="none" stroke="${ln}" stroke-linecap="round"`;
  let pat = '';
  switch(E.pat){
    case 'vert': pat = [17.5, 21, 27, 30.5].map(a=>`<path d="M${a} 14V44" ${o} stroke-width=".45" opacity=".45"/>`).join(''); break;
    case 'band': pat = [F.fy - 7.5, F.fy + 5.6].map(b=>`<path d="M8 ${spF(b)}H40M8 ${spF(b+1.2)}H40" ${o} stroke-width=".4" opacity=".5"/>`).join(''); break;
    case 'dots': pat = [[17,20],[30,19],[15,28],[33,27],[19,40],[29.5,40.5],[24,17],[35,34],[13,35]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r=".55" fill="${ln}" opacity=".45"/>`).join(''); break;
    case 'crackle': pat = `<path d="M13 24l4 2 1.5 4 4-1M35 22l-3.5 3-.5 4.5-3.5 1M16 38l3-2.5 3.5 1.5M33 39l-3-2" ${o} stroke-width=".4" opacity=".5"/>`; break;
    case 'scale': pat = [[16,20],[24,19],[32,20],[20,24.5],[28,24.5]].map(([a,b])=>`<path d="M${a-2.4} ${b}q2.4 2.6 4.8 0" ${o} stroke-width=".45" opacity=".45"/>`).join(''); break;
    case 'ring': pat = Array.from({length:12}, (_, i)=>{ const t = i*Math.PI/6, r1 = 9.2, r2 = 10.4; return `<path d="M${spF(24+r1*Math.cos(t))} ${spF(F.fy+1+r1*Math.sin(t))}L${spF(24+r2*Math.cos(t))} ${spF(F.fy+1+r2*Math.sin(t))}" ${o} stroke-width=".4" opacity=".5"/>`; }).join(''); break;
  }
  /* 主体印记：主体词剪影盖在蛋壳正面（面部下方） */
  const stamp = `<g class="egg-stamp" transform="translate(24 ${spF(F.sy)}) scale(.11) translate(-24 -30)" opacity=".9">${spBody(E.stamp, spMixC(c0,'#fff',.15), ln, spMixC(c0,'#fff',.5))}</g>`;
  /* 破口：锯齿裂口 + 露出的主体碎片（主体词的局部，不是通用小芽） */
  const [px, py] = E.peek==='left' ? F.sh[0] : E.peek==='right' ? F.sh[1] : F.top, rot = E.peek==='left' ? -28 : E.peek==='right' ? 28 : 0;
  const crack = `<path d="M${spF(px-3.4)} ${spF(py+1.2)}l1.1-1.4 1.1 1.2 1.2-1.6 1.2 1.6 1.1-1.2 1.1 1.4" ${o} stroke-width=".55" transform="rotate(${rot} ${spF(px)} ${spF(py)})"/>`;
  const frag = typeof spFragOf==='function' && spFragOf(E.stamp) || E.stamp;
  const peek = `<g class="egg-peek" transform="translate(${spF(px)} ${spF(py-1.2)}) rotate(${rot}) scale(.21) translate(-24 -30)">${spBody(frag, spMixC(c0,'#fff',.2), ln, spMixC(c0,'#fff',.55))}</g>`;
  return {inner:`<g class="egg-pat egg-${E.pat}">${pat}</g>${stamp}`, over:`<g class="egg-crack egg-${E.peek}">${peek}${crack}</g>`, lt};
}
'''
s = s[:a0] + new + s[a1:]

# 4) 新增身体形（SH2 / SH3 / SH4 / SH5 / SH6 / SH9 / SH11 / SH12）与 12 种蛋形
a = "  shp_long_h:(c,d,b,S,F,Lc,D)=>"
assert a in s
shapes = r'''  shp_trap:(c,d,b,S,F)=>`<path d="M15 13.5H33L35 16L38.5 40Q38.5 43 35.5 43H12.5Q9.5 43 9.5 40L13 16Z" fill="${F(c)}" ${S}/><rect x="16.5" y="32.5" width="15" height="7.5" rx="2" fill="${F(b)}" opacity=".7"/>`,
  shp_trap_h:(c,d,b,S,F,Lc,D)=>`<path d="M15.5 29H32.5L37.5 41Q38 43.5 35.5 43.5H12.5Q10 43.5 10.5 41Z" fill="${F(D)}" ${S}/><rect x="18" y="33.5" width="12" height="7" rx="2" fill="${F(b)}" opacity=".7"/><rect x="20.5" y="26.5" width="7" height="3.6" fill="${F(D)}" ${S}/><path d="M14 11.5H34V22L31.5 27.5Q31 28.2 30 28.2H18Q17 28.2 16.5 27.5L14 22Z" fill="${F(c)}" ${S}/>`,
  shp_step:(c,d,b,S,F)=>`<path d="M18 13.5H30Q31.5 13.5 31.5 15V21H34Q35.5 21 35.5 22.5V31H37Q38.5 31 38.5 32.5V41.5Q38.5 43 37 43H11Q9.5 43 9.5 41.5V32.5Q9.5 31 11 31H12.5V22.5Q12.5 21 14 21H16.5V15Q16.5 13.5 18 13.5Z" fill="${F(c)}" ${S}/><rect x="16" y="33.5" width="16" height="6.5" rx="1.6" fill="${F(b)}" opacity=".7"/>`,
  shp_step_h:(c,d,b,S,F,Lc,D)=>`<path d="M14 29H34V33H37Q38 33 38 34V42Q38 43.5 36.5 43.5H11.5Q10 43.5 10 42V34Q10 33 11 33H14Z" fill="${F(D)}" ${S}/><rect x="17.5" y="34.5" width="13" height="6.5" rx="1.6" fill="${F(b)}" opacity=".7"/><rect x="20.5" y="26.5" width="7" height="3.6" fill="${F(D)}" ${S}/><path d="M17.5 9.5H30.5V12H33Q34.5 12 34.5 13.5V26Q34.5 28 32.5 28H15.5Q13.5 28 13.5 26V13.5Q13.5 12 15 12H17.5Z" fill="${F(c)}" ${S}/>`,
  shp_wide:(c,d,b,S,F)=>`<path d="M10.5 29Q10.5 15 24 15Q37.5 15 37.5 29Q37.5 43 24 43Q10.5 43 10.5 29Z" fill="${F(c)}" ${S}/><ellipse cx="24" cy="37" rx="7.5" ry="4" fill="${F(b)}" opacity=".7"/><path d="M22.4 40.6q1.6 .9 3.2 0" fill="none" stroke="${d}" stroke-width=".5" stroke-linecap="round" opacity=".5"/>`,
  shp_wide_h:(c,d,b,S,F,Lc,D)=>`<path d="M15 30Q24 27.5 33 30Q37.5 36 36 41Q35 43.5 31 43.5H17Q13 43.5 12 41Q10.5 36 15 30Z" fill="${F(D)}" ${S}/><ellipse cx="24" cy="37.5" rx="6" ry="3.6" fill="${F(b)}" opacity=".7"/><path d="M24 9.5Q36.5 9.5 36.5 19Q36.5 28 24 28Q11.5 28 11.5 19Q11.5 9.5 24 9.5Z" fill="${F(c)}" ${S}/>`,
  shp_drop:(c,d,b,S,F)=>`<path d="M24 10Q27 15.5 33 22Q37.5 27.5 37 33Q36 43 24 43Q12 43 11 33Q10.5 27.5 15 22Q21 15.5 24 10Z" fill="${F(c)}" ${S}/><ellipse cx="24" cy="37.5" rx="7" ry="3.8" fill="${F(b)}" opacity=".7"/>`,
  shp_drop_h:(c,d,b,S,F,Lc,D)=>`<path d="M17 29.5H31Q36 32 36 38Q36 43.5 30.5 43.5H17.5Q12 43.5 12 38Q12 32 17 29.5Z" fill="${F(D)}" ${S}/><ellipse cx="24" cy="38" rx="6" ry="3.4" fill="${F(b)}" opacity=".7"/><path d="M24 6.5Q27 10.5 31.5 15Q34.5 18.5 34 21.5Q33 28 24 28Q15 28 14 21.5Q13.5 18.5 16.5 15Q21 10.5 24 6.5Z" fill="${F(c)}" ${S}/>`,
  shp_twin:(c,d,b,S,F)=>`<circle cx="24" cy="33.5" r="10" fill="${F(c)}" ${S}/><ellipse cx="24" cy="37.5" rx="6.5" ry="3.6" fill="${F(b)}" opacity=".7"/><circle cx="24" cy="21" r="8.6" fill="${F(c)}" ${S}/>`,
  shp_twin_h:(c,d,b,S,F,Lc,D)=>`<circle cx="24" cy="37" r="6.8" fill="${F(D)}" ${S}/><ellipse cx="24" cy="39" rx="4.4" ry="2.6" fill="${F(b)}" opacity=".7"/><circle cx="24" cy="18.5" r="9.6" fill="${F(c)}" ${S}/>`,
  shp_dia:(c,d,b,S,F)=>`<path d="M24 10L37 26.5Q38 28 37 29.5L26 42Q24 44 22 42L11 29.5Q10 28 11 26.5L22 11.4Q24 9 24 10Z" fill="${F(c)}" ${S}/><path d="M18.5 34H29.5L25.5 39Q24 40.6 22.5 39Z" fill="${F(b)}" opacity=".7"/>`,
  shp_dia_h:(c,d,b,S,F,Lc,D)=>`<path d="M24 28.5L35 36Q36 37 35 38L26 43.5Q24 44.6 22 43.5L13 38Q12 37 13 36Z" fill="${F(D)}" ${S}/><path d="M19.5 36.5H28.5L25.2 40Q24 41 22.8 40Z" fill="${F(b)}" opacity=".7"/><path d="M24 7.5L33.5 17Q34.5 18 33.5 19L25.5 27.5Q24 29 22.5 27.5L14.5 19Q13.5 18 14.5 17Z" fill="${F(c)}" ${S}/>`,
  shp_scurve:(c,d,b,S,F)=>`<path d="M19 10Q29 9 29.5 15Q30 20 33 25Q36 31 33 38Q30.5 43 23 43Q15.5 43 15 37Q14.5 31 17 25Q18.5 20 17 15Q16.5 10.5 19 10Z" fill="${F(c)}" ${S}/><path d="M18.5 33Q24 31.5 30.5 33Q31 39.5 24 40Q18.5 40 18.5 33Z" fill="${F(b)}" opacity=".7"/>`,
  shp_scurve_h:(c,d,b,S,F,Lc,D)=>`<path d="M20 28.5H28Q31.5 30 33 34.5Q34.5 39.5 31 42.5Q29.5 43.5 27 43.5H19Q15.5 43.5 15.8 40Q16.2 36.5 18 33Q19.5 30 20 28.5Z" fill="${F(D)}" ${S}/><path d="M19.5 34.5Q24.5 33 30 34.5Q30.5 40 24.5 40.5Q19.5 40.5 19.5 34.5Z" fill="${F(b)}" opacity=".7"/><rect x="21.6" y="25" width="4.8" height="4.6" fill="${F(D)}" ${S}/><path d="M22.5 7.5Q30 7 30.5 14V20Q30.5 26.5 23.5 26.5Q17 26.5 17 20.5V14Q17 8 22.5 7.5Z" fill="${F(c)}" ${S}/>`,
  shp_moon:(c,d,b,S,F)=>`<path d="M10 18Q12 42.5 24 43Q36 42.5 38 18Q34 26.5 24 27Q14 26.5 10 18Z" fill="${F(c)}" ${S}/><path d="M18.5 39.5Q24 41.6 29.5 39.5" fill="none" stroke="${F(b)}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`,
  shp_moon_h:(c,d,b,S,F,Lc,D)=>`<path d="M17 29.5H31Q34.5 33 34 38.5Q33.5 43.5 29 43.5H19Q14.5 43.5 14 38.5Q13.5 33 17 29.5Z" fill="${F(D)}" ${S}/><ellipse cx="24" cy="38" rx="5.6" ry="3.4" fill="${F(b)}" opacity=".7"/><rect x="21.4" y="26.5" width="5.2" height="3.6" fill="${F(D)}" ${S}/><path d="M12 9Q13.5 27.5 24 28Q34.5 27.5 36 9Q32 17 24 17.5Q16 17 12 9Z" fill="${F(c)}" ${S}/>`,
'''
s = s.replace(a, shapes + a)
# 蛋形体：在 SP_SHAPES 里注册 egg_SH1~12（d2 = 双团蛋的上团）
a = "});\n/* ---------- 骨相 + 五官（按形状语言） ---------- */"
assert a in s
s = s.replace(a, "});\nObject.keys(SP_EGG_FORM).forEach(k=>{ const E = SP_EGG_FORM[k]; SP_SHAPES['egg_'+k] = (c,d,b,S,F)=>`<path d=\"${E.d}\" fill=\"${F(c)}\" ${S}/>${E.d2 ? `<path d=\"${E.d2}\" fill=\"${F(c)}\" ${S}/>` : ''}<path d=\"${E.d}\" fill=\"${F(b)}\" opacity=\".28\" transform=\"translate(24 43) scale(.62 .34) translate(-24 -43)\"/>`; });\n/* ---------- 骨相 + 五官（按形状语言） ---------- */")
open(p, 'w').write(s)
print('ok')
