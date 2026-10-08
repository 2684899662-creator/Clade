# 拍板 2：书页灵 E2 书海生态 + T5 立体书；拍板 5：LV5 材质最多两种 + 领域；拍板 7：法器化入领域；
# 拍板 8：12 域 + 每只精灵唯一域子名；拍板 1：后台形状卡片显示 12 子类；校验与发布门禁
import sys
W = sys.argv[1]
def patch(path, pairs):
    s = open(path).read()
    for a, b in pairs:
        assert s.count(a) == 1, (path, s.count(a), a[:100])
        s = s.replace(a, b)
    open(path, 'w').write(s)
P = W + '/parts/'

# ---------------- p41：LV5 身体材质最多两种，领域光单独记，不算材质 ----------------
patch(P + 'p41.js', [
  ("  if(st>=5){ mats.splice(2); if(C.flags.matDiff && !mats.includes('light') && lod) mats.push(S.p==='E' ? 'dark' : 'light'); }   /* LV5 做减法：最多两种材质 + 光 */\n"
   "  return {S, M, p:S.p,",
   "  let domLight = null; if(st>=5){ mats.splice(2); if(C.flags.matDiff && lod) domLight = S.p==='E' ? 'dark' : 'light'; }   /* v2.5 LV5：身体最多两种材质；领域光属于领域，不计入材质 */\n"
   "  return {S, M, p:S.p, domLight,"),
  ("mat:['多材质 + 领域','Multiple materials + domain','Nhiều chất liệu + lĩnh vực']",
   "mat:['最多两种材质 + 领域','At most two materials + domain','Tối đa hai chất liệu + lĩnh vực']"),
])
patch(P + 'p42.js', [
  ("  const mats = A.p==='F' && A.st<3 ? '' : A.mats.map(m=>typeof spModelTex==='function' ? spModelTex(m, A, x, I) : spArtMat(m, A, x, I)).join('');",
   "  const tex = m=>typeof spModelTex==='function' ? spModelTex(m, A, x, I) : spArtMat(m, A, x, I);\n"
   "  const mats = A.p==='F' && A.st<3 ? '' : A.mats.map(tex).join('') + (A.domLight ? `<g class=\"dom-light\">${tex(A.domLight)}</g>` : '');   /* 领域光：随领域出现，不算材质 */"),
])

# ---------------- p47：12 域 / 域子名 / 法器入领域 / 书页灵 ----------------
s = open(P + 'p47.js').read()
rep = [
  ("· LV4→LV5 升华（八种领域，可进入）", "· LV4→LV5 升华（十二种领域，可进入；每只精灵的领域有唯一子名）"),
  ("  D8:{n:['道域','Realm of the Way','Cõi Đạo'], dn:['道','the Way','Đạo'], law:['道之法则：万象皆可化一','Law of the Way: all forms can become one','Luật Đạo: vạn tượng quy về một'], c:['#f5f5f4','#1c1917']}};",
   "  D8:{n:['道域','Realm of the Way','Cõi Đạo'], dn:['道','the Way','Đạo'], law:['道之法则：万象皆可化一','Law of the Way: all forms can become one','Luật Đạo: vạn tượng quy về một'], c:['#f5f5f4','#1c1917']},\n"
   "  /* v2.5 新增四域 */\n"
   "  D9:{n:['生域','Realm of life','Cõi sinh trưởng'], dn:['生','life','sinh trưởng'], law:['生之法则：凡有根者，皆会生长','Law of life: whatever has roots will grow','Luật sinh: cái gì có rễ đều sẽ lớn'], c:['#dcfce7','#15803d']},\n"
   "  D10:{n:['律域','Realm of order','Cõi quy luật'], dn:['律','order','quy luật'], law:['律之法则：一切运转皆有规则','Law of order: everything that runs follows a rule','Luật quy củ: mọi vận hành đều có quy tắc'], c:['#e2e8f0','#334155']},\n"
   "  D11:{n:['梦域','Realm of dreams','Cõi mộng'], dn:['梦','dreams','mộng'], law:['梦之法则：所想即所见','Law of dreams: what you imagine is what you see','Luật mộng: nghĩ gì thấy nấy'], c:['#fce7f3','#be185d']},\n"
   "  D12:{n:['韵域','Realm of rhythm','Cõi vận luật'], dn:['韵','rhythm','vận luật'], law:['韵之法则：万物皆有节拍','Law of rhythm: everything keeps a beat','Luật nhịp: vạn vật đều có nhịp'], c:['#ffedd5','#c2410c']}};"),
  ("书页灵|E1|小书签群|T1|D2|知|书页展开形成书海，文字浮空，以书签相连|万卷书聚合为书山，文字化为山纹|",
   "书页灵|E2|小书签群|T5|D2|知|书页如海藻般生长成书海生态，小书签群像鱼群环绕，书虫与之共生|书页从平面立起成立体书，折页层层弹出楼阁|"),
  ("种子灵|E2|芽田群|T2|D2|", "种子灵|E2|芽田群|T2|D9|"),
  ("齿轮卫|E5|小齿轮群|T3|D7|", "齿轮卫|E5|小齿轮群|T3|D10|"),
  ("梦灵|E6|梦泡群|T8|D5|", "梦灵|E6|梦泡群|T8|D11|"),
  ("琴灵|E6|弦音群|T8|D1|", "琴灵|E6|弦音群|T8|D12|"),
  ("鼓灵|E1|小鼓群|T5|D7|", "鼓灵|E1|小鼓群|T5|D12|"),
  ("var SP_DOM_BY_CAT = {obj:'D8', arch:'D7', plant:'D2', mineral:'D4', elem:'D1', time:'D6', mech:'D7', myth:'D8', concept:'D8', text:'D2', light:'D5', fest:'D1', glitch:'D5', food:'D3', music:'D1', weather:'D7', astro:'D4', emotion:'D3', dream:'D5', ocean:'D4', insect:'D2', flying:'D7', reptile:'D8', micro:'D2', collab:'D1', link:'D7', event:'D1', lab:'D2', trial:'D6', ach:'D1', adm:'D8', hidden:'D5'};",
   "var SP_DOM_BY_CAT = {obj:'D8', arch:'D7', plant:'D9', mineral:'D4', elem:'D1', time:'D6', mech:'D10', myth:'D8', concept:'D8', text:'D2', light:'D5', fest:'D12', glitch:'D10', food:'D9', music:'D12', weather:'D12', astro:'D4', emotion:'D11', dream:'D11', ocean:'D9', insect:'D9', flying:'D7', reptile:'D8', micro:'D9', collab:'D1', link:'D10', event:'D12', lab:'D2', trial:'D6', ach:'D1', adm:'D10', hidden:'D5'};"),
  ("  const dom = T?.dom || (/[光灯焰花日阳辉虹耀]/.test(n5) ? 'D1'",
   "  const dom = T?.dom || (/[梦魇]/.test(n5) ? 'D11' : /[生芽根苗孢菌藻]/.test(n5) ? 'D9' : /[律规齿械轨]/.test(n5) ? 'D10' : /[音韵琴鼓笛箫弦歌舞]/.test(n5) ? 'D12' : /[光灯焰花日阳辉虹耀]/.test(n5) ? 'D1'"),
  ("  return {byName, env:doc.env || env,",
   "  byName[5] = byName[5] || /[梦魇生芽根苗孢菌藻律规齿械轨音韵琴鼓笛箫弦歌舞]/.test(n5);\n  return {byName, env:doc.env || env,"),
  # 领域进入弹窗：标题用域子名
  ("<h2 id=\"spDomT\">🌌 ${escapeHtml(trT(D.n))} · ${escapeHtml(trT(d.name))}</h2>",
   "<h2 id=\"spDomT\">🌌 ${escapeHtml(trT(spDomName(d)))} · ${escapeHtml(trT(D.n))}</h2>"),
]
for a, b in rep:
    assert s.count(a) == 1, (s.count(a), a[:100])
    s = s.replace(a, b)

# 领域渲染：新增四域 + 法器化入领域
a = "      case 'D8': s = `<g opacity=\".22\"><circle cx=\"24\" cy=\"22\" r=\"26\" fill=\"${c1}\"/><path d=\"M24 -4a13 13 0 0 1 0 26a13 13 0 0 0 0 26a26 26 0 0 0 0-52Z\" fill=\"${c2}\"/></g>`; break;\n    }\n"
assert s.count(a) == 1
s = s.replace(a, a[:-len("    }\n")] + r'''      case 'D9': s = [[-8,46,1],[56,46,-1]].map(([a,b,sd])=>`<path d="M${a} ${b}Q${a+sd*10} ${b-14} ${a+sd*6} ${b-30}Q${a+sd*3} ${b-40} ${a+sd*12} ${b-50}" fill="none" stroke="${c2}" stroke-width="1.2" opacity=".45" stroke-linecap="round"/>${[14,26,38].map((t,i)=>`<ellipse cx="${spF(a+sd*(8+i*1.5))}" cy="${spF(b-t)}" rx="2.6" ry="1.2" transform="rotate(${sd*(i%2?30:-30)} ${spF(a+sd*(8+i*1.5))} ${spF(b-t)})" fill="${c2}" opacity=".4"/>`).join('')}`).join('') + [[6,-4],[42,-6],[24,-8]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="1.1" fill="#bbf7d0" opacity=".8"/>`).join(''); break;
      case 'D10': s = `<g stroke="${c2}" stroke-width=".35" opacity=".35">${[-4,8,20,32,44].map(v=>`<path d="M${v} -9V51"/><path d="M-9 ${v}H57"/>`).join('')}</g>` + [[-4,-4],[44,-4],[-4,32],[44,32]].map(([a,b])=>`<rect x="${a-2.2}" y="${b-2.2}" width="4.4" height="4.4" fill="none" stroke="${c2}" stroke-width=".6" opacity=".6" transform="rotate(45 ${a} ${b})"/>`).join(''); break;
      case 'D11': s = [[-4,6,4],[50,2,3],[-6,34,3.4],[52,30,4.2],[24,-6,2.4]].map(([a,b,r])=>`<circle cx="${a}" cy="${b}" r="${r}" fill="#fff" opacity=".55" stroke="${c2}" stroke-width=".35"/><circle cx="${spF(a-r*.35)}" cy="${spF(b-r*.35)}" r="${spF(r*.25)}" fill="#fff"/>`).join('') + `<path d="M44 -2a6 6 0 1 0 6 7a4.6 4.6 0 1 1-6-7Z" fill="${c2}" opacity=".35"/>`; break;
      case 'D12': s = `<g fill="none" stroke="${c2}" stroke-width=".4" opacity=".4">${[0,2.4,4.8,7.2,9.6].map(dy=>`<path d="M-9 ${spF(-2+dy)}Q12 ${spF(-8+dy)} 24 ${spF(-2+dy)}T57 ${spF(-2+dy)}"/>`).join('')}</g>` + [[-3,40],[50,38],[46,-1]].map(([a,b])=>`<ellipse cx="${a}" cy="${b}" rx="1.6" ry="1.15" transform="rotate(-20 ${a} ${b})" fill="${c2}" opacity=".55"/><path d="M${a+1.4} ${b}v-6" stroke="${c2}" stroke-width=".5" opacity=".55"/>`).join(''); break;
    }
    /* v2.5 LV5 去法器：手持法器化入领域，成为领域里成群浮现的世界元素 */
    if(x.heldEcho) s += `<g class="pt-held">${[[-2,2,.5,-14],[46,0,.46,12],[-4,34,.42,8],[48,34,.44,-10]].map(([a,b,k,r])=>`<g transform="translate(${a} ${b}) rotate(${r}) scale(${k}) translate(-40 -24)" opacity=".42">${x.heldEcho}</g>`).join('')}</g>`;
''')

# 域子名：「{LV5 名}·{核心字}之域」，全库唯一（管理员可改，校验会查重）
a = "/* ---------- 领域进入（lv5_domain_entries） ---------- */"
assert s.count(a) == 1
s = s.replace(a, r'''/* ---------- v2.5 域子名：「{LV5 名}·{核心字}之域」，例如「灯神觉醒·灯之域」；全库唯一 ---------- */
var spDomNameCache = {ver:-1, map:null};
function spDomNameAll(){
  if(spDomNameCache.ver===spCacheVer && spDomNameCache.map) return spDomNameCache.map;
  const map = new Map(), used = new Set(); spDomNameCache = {ver:spCacheVer, map};
  let L = []; try{ L = [...spLib(), ...Object.keys(SP_EVO_PATH_TV).map(id=>spTvDef(id)).filter(Boolean)]; }catch(_e){}
  const docOf = d=>(typeof gCfg==='function' && gCfg().evoCfg?.paths?.[d.id]?.domName) || '';
  L.filter(d=>docOf(d)).forEach(d=>{ const z = docOf(d); used.add(z); map.set(d.id, z); });   /* 管理员指定的优先占用 */
  /* 占名顺序：示例精灵 → 基础类别 → 名表精灵 → 其余（联名 / 联动 / 试验 / 活动 / 管理员）→ ID */
  const rank = d=>(typeof SP_SHAPE_FIX!=='undefined' && SP_SHAPE_FIX[d.id] ? 0 : 4) + (['collab','link','trial','event','lab','ach','adm','hidden'].includes(spArtCatKey(d)) ? 2 : 0) + (SP_EVO_PATH[d.name?.[0]] ? 0 : 1);
  L.slice().sort((a, b)=>rank(a) - rank(b) || (a.id<b.id ? -1 : 1)).forEach(d=>{ if(map.has(d.id)) return;
    const S = spPathSubj(d)[0], lv5 = String(d.forms?.[0]?.[4] || `${S}觉醒`), P = spPathOf(d), sc = [...S].filter(ch=>!/[灵兽卫犬精]/.test(ch));
    const cores = [...sc, P?.glyph, sc.slice(0, 2).join(''), S].filter((v, i, a)=>v && a.indexOf(v)===i);
    let z = ''; for(const k of cores){ const t = `${lv5}·${k}之域`; if(!used.has(t)){ z = t; break; } }
    for(let i=2; !z; i++){ const t = `${lv5}·${cores[0]||'灵'}之域${i}`; if(!used.has(t)) z = t; }
    used.add(z); map.set(d.id, z); });
  return map;
}
function spDomName(def){
  if(!def) return ['', '', '']; let z = ''; try{ z = spDomNameAll().get(def.id) || ''; }catch(_e){}
  const S = spPathSubj(def); if(!z) z = `${String(def.forms?.[0]?.[4] || S[0]+'觉醒')}·${[...S[0]][0]||'灵'}之域`;
  const en = String(def.forms?.[1]?.[4] || `Awakened ${S[1]}`), vi = String(def.forms?.[2]?.[4] || `${S[2]} thức tỉnh`);
  return [z, `${en} · Realm of ${S[1]}`, `${vi} · Cõi ${S[2]}`];
}
''' + a)
open(P + 'p47.js', 'w').write(s)

# ---------------- p48：后台文案 / 域子名 / 管理员可改域子名 ----------------
patch(P + 'p48.js', [
  ("n===5 ? spArtE(SP_LV5_DOM[P.dom].n) : spArtE(SP_EVO_MECH[0][1])",
   "n===5 ? spArtE(SP_LV5_DOM[P.dom].n) + `<br><small data-i18n-ignore=\"1\">${escapeHtml(trT(spDomName(d)))}</small>` : spArtE(SP_EVO_MECH[0][1])"),
  ("<label>${escapeHtml(tx('概念字','Concept glyph','Chữ khái niệm'))}<input name=\"glyph\" maxlength=\"2\" value=\"${escapeAttr(doc.glyph||'')}\" placeholder=\"${escapeAttr(P.glyph)}\" data-i18n-ignore=\"1\"></label></div>",
   "<label>${escapeHtml(tx('概念字','Concept glyph','Chữ khái niệm'))}<input name=\"glyph\" maxlength=\"2\" value=\"${escapeAttr(doc.glyph||'')}\" placeholder=\"${escapeAttr(P.glyph)}\" data-i18n-ignore=\"1\"></label><label>${escapeHtml(tx('域子名（全库唯一）','Realm sub-name (unique)','Tên cõi (duy nhất)'))}<input name=\"domName\" maxlength=\"24\" value=\"${escapeAttr(doc.domName||'')}\" placeholder=\"${escapeAttr(spDomName(d)[0])}\" data-i18n-ignore=\"1\"></label></div>"),
  ("tx('LV5 八种领域（LV5DomainTypeViewer · LV5DomainEntryViewer）','Eight LV5 realms (enterable)','Tám cõi LV5 (có thể vào)')",
   "tx('LV5 十二种领域（LV5DomainTypeViewer · LV5DomainEntryViewer）','Twelve LV5 realms (enterable)','Mười hai cõi LV5 (có thể vào)')"),
  ("<small>${s0 ? escapeHtml(trT(s0.name)) : ''}</small>",
   "<small>${s0 ? escapeHtml(trT(s0.name)) : ''}${s0 && k==='dom' ? `<br><span data-i18n-ignore=\"1\">${escapeHtml(trT(spDomName(s0)))}</span>` : ''}</small>"),
  (":escapeHtml(trT(SP_LV5_DOM[P.dom].n))}</b>", ":escapeHtml(trT(SP_LV5_DOM[P.dom].n)) + ' · ' + escapeHtml(trT(spDomName(def)))}</b>"),
  ("      ['env','mut','dom','glyph','comp','d3','d4','d5'].forEach(k=>{ const v = String(fd.get(k)||'').trim(); if(v) o[k] = v; });\n",
   "      ['env','mut','dom','glyph','comp','d3','d4','d5','domName'].forEach(k=>{ const v = String(fd.get(k)||'').trim(); if(v) o[k] = v; });\n"
   "      if(o.domName && [...spDomNameAll().entries()].some(([id, z])=>id!==did && z===o.domName)){ toast(tx('域子名已被其他精灵使用','This realm sub-name is already used by another spirit','Tên cõi đã được tinh linh khác dùng'), 'warn'); return false; }\n"),
])

# ---------------- p45 / p46：校验 —— LV5 做减法（≤2 材质 / 无法器）+ 域子名唯一 ----------------
patch(P + 'p45.js', [
  ("['path',['进化路径唯一','Unique evolution path','Lộ trình riêng']]];",
   "['path',['进化路径唯一','Unique evolution path','Lộ trình riêng']],['lv5',['LV5 做减法','LV5 subtraction','LV5 giảm bớt']]];"),
  ("  const res = {ok:L.every(x=>x.ok), list:L}; spEvoCache.map.set(def.id, res); return res;",
   "  /* 12 v2.5 LV5：身体最多两种材质（领域不计入）、不拿法器（法器化入领域）、域子名全库唯一 */\n"
   "  { const A5 = spArtOf(def, 5, {size:120}), M5 = A5?.M, nm = (A5?.mats||[]).length, nn = (M5?.nodes||[]).length, held = !!M5?.parts?.held, dn = typeof spDomName==='function' ? spDomName(def)[0] : '';\n"
   "    const dupDom = dn && typeof spDomNameAll==='function' ? [...spDomNameAll().entries()].filter(([id, z])=>id!==def.id && z===dn).map(([id])=>id) : [];\n"
   "    const ok5 = nm<=2 && nn<=2 && !held && !dupDom.length;\n"
   "    add('lv5', ok5, ok5 ? [`材质 ${nm} 种 + 领域；法器已化入领域；域子名「${dn}」`, `${nm} material(s) + realm; artefact folded into the realm; realm \"${spDomName(def)[1]}\"`, `${nm} chất liệu + cõi; pháp khí đã nhập vào cõi`]\n"
   "      : [[nm>2||nn>2 ? `LV5 材质超过两种` : '', held ? '仍手持法器' : '', dupDom.length ? `域子名与 ${dupDom.slice(0,3).join('、')} 重复` : ''].filter(Boolean).join('；'), 'LV5 has more than two materials, still holds an artefact, or shares a realm sub-name', 'LV5 chưa giảm bớt hoặc trùng tên cõi']); }\n"
   "  const res = {ok:L.every(x=>x.ok), list:L}; spEvoCache.map.set(def.id, res); return res;"),
  ("/* ---------- 十项校验（spirit_evolution_validation） ---------- */", "/* ---------- 进化校验（spirit_evolution_validation，共 12 项） ---------- */"),
  ("   · 十项校验未通过，禁止发布", "   · 进化校验（12 项）未通过，禁止发布"),
])
patch(P + 'p46.js', [
  ("['tail',['尾巴','Tail','Đuôi']]].map(([k,n])=>",
   "['tail',['尾巴','Tail','Đuôi']],['ext',['能量形态延伸','Energy-form extension','Phần kéo dài năng lượng']]].map(([k,n])=>"),
  ("tx('十项校验 + 发布门禁（PublishGate）','Ten checks + publish gate (PublishGate)','Mười kiểm tra + cổng phát hành')",
   "tx('十二项校验 + 发布门禁（PublishGate）','Twelve checks + publish gate (PublishGate)','Mười hai kiểm tra + cổng phát hành')"),
])

# ---------------- p49：LV5 记忆点文案（法器化入领域）----------------
patch(P + 'p49.js', [
  ("['做减法：最多两种材质，去掉法器 / 拖尾 / 叠加几何，胸前核心徽记强化主体符号','Subtraction: at most two materials, no artefact / trail / stacked geometry; a chest emblem strengthens the core symbol','Giảm bớt: tối đa hai chất liệu, huy hiệu ngực làm nổi biểu tượng chính']",
   "['做减法：最多两种材质 + 领域（领域不计入材质）；法器不再拿在手上，化入领域；去掉拖尾 / 叠加几何，胸前核心徽记强化主体符号','Subtraction: at most two materials + the realm (the realm is not a material); the artefact leaves the hands and becomes part of the realm; no trail / stacked geometry; a chest emblem strengthens the core symbol','Giảm bớt: tối đa hai chất liệu + cõi; pháp khí nhập vào cõi; huy hiệu ngực làm nổi biểu tượng chính']"),
  ("['加速人形化：方 / 圆 / 三角 / 长条对比，头身分离，配件不掩盖结构','Faster humanisation: square / round / triangle / long contrast, head and body separate, accessories never hide the structure','Nhân hóa nhanh: tương phản vuông / tròn / tam giác / dài']",
   "['加速人形化：加 S1 拟人副骨架（类人手臂 / 姿态），方 / 圆 / 三角 / 长条对比，头身分离，配件不掩盖结构','Faster humanisation: an S1 humanoid secondary skeleton (humanlike arms and posture), square / round / triangle / long contrast, head and body separate, accessories never hide the structure','Nhân hóa nhanh: thêm khung phụ người S1, tương phản vuông / tròn / tam giác / dài']"),
  ("['慢而萌：剪影识别 + 一个核心记忆点（蛋壳上的主体印记）','Slow and cute: a readable silhouette plus one memory point (the subject stamp on the shell)','Chậm và dễ thương: dáng dễ nhận + một điểm nhớ']",
   "['慢而萌：保留蛋形轮廓，蛋形随子类变化；壳纹 + 蛋壳上的主体印记 + 破口露出的主体碎片','Slow and cute: keep the egg outline, shaped by the sub-type; shell pattern + the subject stamp on the shell + a subject fragment peeking from the crack','Chậm và dễ thương: giữ dáng trứng theo phân loại; vân vỏ + dấu chủ đề + mảnh lộ ra ở vết nứt']"),
])

# ---------------- p44：形状卡片 → 4 大类 × 3 子类 ----------------
s = open(P + 'p44.js').read()
a0 = s.index("    + (typeof SP_SHAPE_LANG!=='undefined' ? spArtCard(")
a1 = s.index("    + spArtCard(`🎞️ ")
new = r'''    + (typeof SP_SHAPE_LANG!=='undefined' ? spArtCard(`🔺 ${escapeHtml(tx('形状语言与骨相（4 大类 × 3 子类 = SH1~SH12）','Shape language & bone structure (4 classes × 3 sub-types = SH1–SH12)','Ngôn ngữ hình khối & cốt tướng (4 loại × 3 phân loại)'))}`, spArtT([tx('子类','Sub-type','Phân loại'), tx('大类','Class','Loại'), tx('设计','Design','Thiết kế'), tx('LV1 蛋形','LV1 egg','Trứng LV1'), tx('精灵数（LV2）','Spirits (LV2)','Số tinh linh (LV2)'), tx('示例','Example','Ví dụ')], Object.keys(SP_SHAPE_SUB).map(k=>{ const T = SP_SHAPE_SUB[k], L = spLib().filter(x=>x.forms && spShapeSub(x, 2)===k), smp = L.find(x=>SP_ROUND_KINDS.includes(x.body)) || L[0]; return [`<b data-i18n-ignore="1">${k}</b> ${spArtE(T.n)}`, spArtE(SP_SHAPE_LANG[T.cls].n), spArtE(T.d), spArtE(T.egg), String(L.length), smp ? spiritView(smp, 56, 1, {nofx:true}) + spiritView(smp, 64, 2, {nofx:true}) + spiritView(smp, 72, 3, {nofx:true}) : '—']; })) + `<p class="hint">${escapeHtml(tx('同一类别、同一大类的精灵轮流分到三个子类；LV2~LV3 用本子类，LV4 / LV5 在同一大类内换子类，剪影逐级质变。通用圆团身体按子类重塑：LV2 单块体，LV3 起头身分离；LV2 起出现眉弓、颧骨、下颌角、鼻骨的结构转折。LV1 保留蛋形轮廓，蛋形随子类变化。','Spirits of the same category and class rotate through the three sub-types; LV2–LV3 use their own sub-type and LV4 / LV5 switch to another sub-type of the same class, so the silhouette changes in kind. Generic round bodies are reshaped by sub-type: one mass at LV2, separate head and torso from LV3; brow ridge, cheekbone, jaw and nose-bridge lines appear from LV2. LV1 keeps an egg outline shaped by the sub-type.','Tinh linh cùng hệ, cùng loại luân phiên ba phân loại; LV4 / LV5 đổi phân loại trong cùng loại. LV1 giữ dáng trứng theo phân loại.'))}</p>`) : '')
'''
s = s[:a0] + new + s[a1:]
open(P + 'p44.js', 'w').write(s)
print('ok')
