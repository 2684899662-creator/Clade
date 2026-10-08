/* =========================================================
   v2.4 名称即设定：进化锚定名称 + 通用元素白名单 + 进化校验 + 发布门禁
   · 名称拆分：主体词（核心形态）/ 属性词（材质元素）/ 阶段词（千 / 万 / 市 / 天 / 界 / 神 / 缠 / 幻 / 逆 …）
   · 翅膀 / 光环 / 皇冠 / 尾巴按白名单；脚下光圈、地圈、法阵、地面辉光全局禁止
   · LV4 / LV5 进化方向必须有名称 / 设定 / 功能依据，没有依据的方向自动换成名称主题强化
   · 进化校验（12 项）未通过，禁止发布
========================================================= */
SP_D4.motif = {n:['名称主题强化','Name-motif amplification','Khuếch đại chủ đề tên'], aff:[], nm:true};
SP_D5M.motifm = {n:['名称材质强化','Name-material amplification','Khuếch đại chất liệu theo tên'], nm:true};
SP_D5S.motifs = {n:['名称形态质变','Name-driven transformation','Biến đổi theo tên'], nm:true};
Object.assign(SP_D5, {motifm:SP_D5M.motifm, motifs:SP_D5S.motifs});
Object.assign(SP_ENTRANCE, {motifm:['主体凝形出场','Subject-forming entrance','Xuất hiện ngưng hình chủ đề'], motifs:['领域展开出场','Realm-unfolding entrance','Xuất hiện mở cõi']});
var SP_EVO_FLAGS = [['anchor','evolution_must_anchor_name',['进化必须锚定名称','Evolution must anchor to the name','Tiến hóa phải bám theo tên']],['common','evolution_common_element_restricted',['通用元素白名单','Common-element whitelist','Danh sách trắng yếu tố chung']],['sil','evolution_silhouette_diff',['剪影可辨','Distinct silhouettes','Bóng phân biệt được']],['lv45','evolution_lv4_lv5_diff',['LV4 / LV5 形态质变','LV4 / LV5 true transformation','LV4 / LV5 biến đổi chất']],['cat','evolution_category_diff',['同类差异','Same-category difference','Khác biệt cùng hệ']],['cross','evolution_cross_category_diff',['跨类差异','Cross-category difference','Khác biệt khác hệ']],['skin','evolution_skin_change_appearance',['皮肤改变外观','Skins change appearance','Trang phục đổi ngoại hình']],['gate','evolution_publish_gate',['发布门禁（未通过禁止发布）','Publish gate (blocked until it passes)','Cổng phát hành (chặn khi chưa đạt)']]];
var SP_EVO_WL = {
  wings:['飞行系','昆虫系','龙灵','神话系含翼','联名系','联动系','试验系','管理员专属'],
  halo:['神话系','概念系','星体系','管理员专属','名称含神/圣/辉/光/星/月/日'],
  crown:['名称含王/皇/帝/主/君/神/圣','神话系','管理员专属'],
  tail:['名称含尾/龙/蛇/蜥/兽/狼/狮/虎/豹/狐/犬/猫/鲸/鱼','爬行系','海洋系','飞行系'],
  ext:['元素系：能量形态延伸（焰舌 / 水流 / 风带 / 电弧，不算翅膀也不算尾巴）'],
};
function spEvoFlags(){ const c = (typeof gCfg==='function' && gCfg().evoCfg?.flags) || {}; const o = {}; SP_EVO_FLAGS.forEach(([k])=>o[k] = c[k]!==false); return o; }
/* 名称难以直接拆出形态的精灵：内置进化设计文档（管理员可覆盖） */
var SP_EVO_DOC_DEF = {
  sp_obj_scissors:{form3:'裁灵：剪刀开合裁出纸片，裁片浮空', form4:'断空灵：刃口裁开空间裂缝', form5:'斩界觉醒：一剪分开两界'},
  sp_arch_pavilion:{form3:'飞檐灵：亭顶长出层层飞檐', form4:'天亭灵：亭子浮上天空', form5:'云亭觉醒：亭立云海之上'},
  sp_arch_rampart:{form3:'雄关灵：城墙连成关隘', form4:'天关灵：关楼升起天门', form5:'铁壁觉醒：城墙化为铁壁之界'},
  sp_plant_cactus:{form3:'沙漠灵：仙人掌在沙丘上成片生长', form4:'天刺灵：尖刺化为星芒', form5:'荒神觉醒：荒漠之维度'},
  sp_elem_mist:{form3:'迷霭灵：雾气弥漫成霭', form4:'天雾灵：雾化为概念', form5:'雾神觉醒：雾之维度'},
  sp_elem_rainbow:{form3:'七色灵：虹分七色彩带', form4:'天虹灵：彩虹化为光桥', form5:'虹神觉醒：虹之维度'},
  sp_time_stasis:{form3:'凝时灵：停滞的时间凝成晶体', form4:'天停灵：时间静止为概念', form5:'静界觉醒：静止之维度'},
  sp_time_parallel:{form3:'分时灵：平行线分出两条时间', form4:'天行灵：平行时间并行', form5:'平行觉醒：平行之维度'},
  sp_time_cycle:{form3:'轮回灵：循环成轮', form4:'天环灵：轮化为天环', form5:'循界觉醒：循环之维度'},
  sp_origin:{form3:'时代灵：纪元铺成时代长卷', form4:'天纪灵：纪元化为时间', form5:'纪神觉醒：纪元之维度'},
  sp_code:{form3:'程序灵：代码组成程序', form4:'编译灵：程序编译为新的形态', form5:'协议觉醒：协议之维度'},
  sp_collab_boe_car_display:{form3:'模组灵：车载屏组成模组阵', form4:'天显灵：屏幕显化为光面', form5:'BOE 觉醒：显示之维度'},
  sp_collab_magical_girl:{form3:'变身灵：魔杖点亮变身', form4:'天法灵：魔法化为浮空法纹', form5:'魔女觉醒：魔法之维度'},
  sp_collab_mecha_pilot:{form3:'合体灵：机甲模块合体', form4:'天机甲灵：合体结构重组', form5:'机甲觉醒：机甲之维度'},
  sp_collab_hero_squad:{form3:'联盟灵：英雄组成联盟', form4:'天英灵：联盟聚合为一', form5:'英雄觉醒：英雄之维度'},
  sp_collab_designer_toy:{form3:'盲盒灵：潮玩从盲盒里出现', form4:'天潮灵：潮玩化为立体收藏', form5:'潮玩觉醒：潮玩之维度'},
};
function spEvoDoc(id){ return {...(SP_EVO_DOC_DEF[id]||{}), ...((typeof gCfg==='function' && gCfg().evoCfg?.docs?.[id]) || {})}; }
/* 名称文本（全部阶段名 + 主名，中文为锚点，英文作补充） */
function spEvoNames(def){ const zh = def?.forms?.[0] || [], en = def?.forms?.[1] || []; return {zh:[def?.name?.[0]||'', ...zh].join('|'), en:[def?.name?.[1]||'', ...en].join('|'), st:zh}; }
function spEvoSubject(def){ const n = String(def?.name?.[0] || def?.forms?.[0]?.[1] || ''); return n.replace(/(觉醒|灵|兽|卫|犬|精)$/,'') || n; }
/* ---------- 通用元素白名单 ---------- */
function spEvoAllow(def){
  if(!def) return {wings:false, halo:false, crown:false, tail:false, ext:false, why:{}};
  const F = spEvoFlags(), ck = spArtCatKey(def), N = spEvoNames(def), z = N.zh, why = {}, doc = spEvoDoc(def.id);
  if(!F.common) return {wings:true, halo:true, crown:true, tail:true, ext:true, why:{wings:['未启用白名单','Whitelist off','Tắt danh sách trắng']}};
  const set = (k, ok, w)=>{ if(ok && !why[k]) why[k] = w; return ok; };
  let wings = set('wings', ['flying','insect'].includes(ck), [`${spArtCatName(ck)}允许翅膀`, `${spArtCatName(ck)} may have wings`, `${spArtCatName(ck)} được có cánh`])
    || set('wings', /[翼羽翅凤蝶鸟鹤鹰燕]/.test(z), ['名称含翼 / 羽 / 翅 / 凤 / 蝶 / 鸟 / 鹤 / 鹰 / 燕','Name contains a wing word','Tên có từ chỉ cánh'])
    || set('wings', ck==='reptile' && /龙/.test(z) && !/蛟|东方/.test(z), ['爬行系龙灵（西方龙有翼）','Reptile dragon (western dragons have wings)','Rồng hệ bò sát (rồng phương Tây có cánh)'])
    || set('wings', ['collab','link','trial','adm'].includes(ck) && (def.fly || def.design?.fly), ['按设定（会飞）','By design (it flies)','Theo thiết lập (biết bay)']);
  let halo = set('halo', ['myth','concept','astro','adm'].includes(ck), [`${spArtCatName(ck)}允许光环`, `${spArtCatName(ck)} may have an aura`, `${spArtCatName(ck)} được có vầng`])
    || set('halo', /[神圣辉光星月日]/.test(z), ['名称含神 / 圣 / 辉 / 光 / 星 / 月 / 日','Name contains a divine / light word','Tên có từ thần / ánh sáng'])
    || set('halo', ck==='insect' && /萤/.test(z), ['萤火','Firefly','Đom đóm']);
  let crown = set('crown', /[王皇帝主君神圣]/.test(z), ['名称含王 / 皇 / 帝 / 主 / 君 / 神 / 圣','Name contains a royal / divine word','Tên có từ vương / thần'])
    || set('crown', ['myth','adm'].includes(ck), [`${spArtCatName(ck)}允许皇冠`, `${spArtCatName(ck)} may have a crown`, `${spArtCatName(ck)} được có vương miện`]);
  let tail = set('tail', /[尾龙蛇蜥兽狼狮虎豹狐犬猫鲸鱼]/.test(z), ['名称含尾 / 龙 / 蛇 / 兽 / 狼 / 狮 / 鲸 / 鱼…','Name contains a tailed-creature word','Tên có sinh vật có đuôi'])
    || set('tail', ['reptile','ocean','flying'].includes(ck), [`${spArtCatName(ck)}允许尾巴`, `${spArtCatName(ck)} may have a tail`, `${spArtCatName(ck)} được có đuôi`]);
  ['wings','halo','crown','tail'].forEach(k=>{ const o = doc[k]; if(o==='allow' && doc[k+'Why']){ if(k==='wings') wings = true; if(k==='halo') halo = true; if(k==='crown') crown = true; if(k==='tail') tail = true; why[k] = [doc[k+'Why'], doc[k+'Why'], doc[k+'Why']]; } else if(o==='deny'){ if(k==='wings') wings = false; if(k==='halo') halo = false; if(k==='crown') crown = false; if(k==='tail') tail = false; delete why[k]; } });
  /* v2.5 元素系白名单：能量形态延伸（替代原「能量翼 / 能量尾」） */
  const ext = ck==='elem'; if(ext) why.ext = [`${spArtCatName(ck)}允许能量形态延伸`, `${spArtCatName(ck)} may have an energy-form extension`, `${spArtCatName(ck)} được có phần kéo dài năng lượng`];
  return {wings, halo, crown, tail, ext, why};
}
function spEvoPartOk(def, p, AL){ const s = String(p); AL = AL || spEvoAllow(def);
  if(s.startsWith('wings:')) return AL.wings; if(s==='halo' || s==='ring') return AL.halo; if(s==='crown' || s==='tiara') return AL.crown; if(s.startsWith('tail:')) return AL.tail; return true; }
/* ---------- 进化方向依据：类别 / 名称关键词 ---------- */
var SP_DIR_BASIS = {
  armor:[['mech','trial','link','adm','myth','arch'], /[卫铠甲盾骑武]/], mechfuse:[['mech','trial','link','lab'], /[机械甲]/], crystal:[['mineral'], /[晶冰霜钻玉石琥珀]/], elemental:[['elem','weather'], /[焰火雷风水冰电]/],
  symbiosis:[['plant'], /[藤叶花树竹苔森林]/], multitail:[[], /[尾狐]/], quadruped:[[], /[兽犬狼狮虎豹狐猫马鹿]/], float:[['elem','concept','light','dream','weather','astro','emotion'], /[浮飘云空]/],
  weapon:[['adm'], /[剑刃斩卫武枪弓斧锤矛战]/], runes:[['text','myth','time','adm'], /[符咒印篆]/], star:[['astro','myth'], /[星辰宿斗枢]/], gears:[['mech','time','lab'], /[齿钟表轮]/],
  rift:[['time','concept'], /[裂隙]/], fluid:[['ocean','weather'], /[水海浪潮泉雨]/], ghost:[['dream','hidden'], /[影魇幽魂鬼]/], glitch:[['glitch'], /[障故噪乱]/], code:[['text','link','glitch'], /[码程字节代数据]/],
  spines:[['reptile','insect'], /[刺棘针]/], tentacle:[['ocean','micro'], /[章触菌]/], origami:[[], /[纸鸢书页卷折]/], ink:[['text'], /[墨笔书画诗篆]/], lantern:[[], /灯/], mirror:[['light'], /[镜像映]/],
  energy:[['elem','concept','mech','trial','adm','emotion'], /[能电雷焰]/], pixel:[['glitch','text','link'], /[像素码字节屏]/], aurora:[['weather','light','astro'], /[极光虹霞彩]/], translucent:[['ocean','dream','light','concept','mineral'], /[幻镜冰水晶玻虚]/],
  astral:[['astro','myth'], /[星月辰宇宙]/], phase:[['concept','dream','emotion'], /[幻变化转]/], domain:[[], /[界境域]/], clone:[[], /[千万分群双]/], chrono:[['time'], /[时钟沙漏历纪秒]/], mythic:[['myth'], /[龙麒麟]/],
  colossus:[['mech','arch','trial'], /[巨塔城]/], familiar:[[], /[伴使]/], blades:[['adm'], /[剑刃斩锋]/],
};
function spDirBasis(def, key){
  if(SP_D4[key]?.nm || SP_D5[key]?.nm) return ['名称主题强化（本身即名称依据）','Name-motif amplification (anchored to the name itself)','Khuếch đại chủ đề tên'];
  const b = SP_DIR_BASIS[key]; if(!b) return null; const ck = spArtCatKey(def), z = spEvoNames(def).zh;
  if(b[0].includes(ck)) return [`${spArtCatName(ck)}设定`, `${spArtCatName(ck)} setting`, `Thiết lập ${spArtCatName(ck)}`];
  const m = b[1].exec(z); if(m) return [`名称含「${m[0]}」`, `Name contains "${m[0]}"`, `Tên có "${m[0]}"`];
  if(key==='quadruped' || key==='multitail'){ const AL = spEvoAllow(def); if(key==='multitail' && AL.tail && /狐/.test(z)) return ['狐','Fox','Cáo']; }
  return null;
}
function spEvoFixDirs(def, g){
  if(!def || !g || !spEvoFlags().anchor) return g;
  const d4 = (g.d4||[]).filter(k=>spDirBasis(def, k)), pool4 = Object.keys(SP_D4).filter(k=>!SP_D4[k].nm && spDirBasis(def, k) && !d4.includes(k)), R = spRng(((g.seed||1) ^ 0x1f3a)>>>0);
  while(d4.length<2 && pool4.length){ const k = pool4.splice(Math.floor(R()*pool4.length), 1)[0]; if(d4.some(x=>SP_D4[x].g) && SP_D4[k].g) continue; d4.push(k); }
  if(d4.length<2) d4.push('motif');
  const m5 = spDirBasis(def, g.d5?.[0]) ? g.d5[0] : (Object.keys(SP_D5M).filter(k=>!SP_D5M[k].nm && spDirBasis(def, k))[0] || 'motifm');
  const s5 = spDirBasis(def, g.d5?.[1]) ? g.d5[1] : (Object.keys(SP_D5S).filter(k=>!SP_D5S[k].nm && spDirBasis(def, k)).sort((a,b)=>(spEvoNames(def).zh.search(SP_DIR_BASIS[b]?.[1])>=0) - (spEvoNames(def).zh.search(SP_DIR_BASIS[a]?.[1])>=0))[0] || 'motifs');
  g.dirLimited = pool4.length<3; g.d4 = d4.slice(0,2); g.d5 = [m5, s5]; return g;
}
/* ---------- 名称阶段词 → 形态（spirit_name_anchor） ---------- */
var SP_NAME_KW = [
  ['swarm', /[千万百群]/, ['群化：主题物成群环绕','Multitude: the motif gathers around','Bầy: chủ đề vây quanh']],
  ['cluster', /[市林簇丛卷阵集坊藏]/, ['聚集：主题物成组','Cluster: the motif forms a group','Cụm: chủ đề thành nhóm']],
  ['tall', /[高长通巨古层]/, ['增高：主题物向上叠起','Height: the motif stacks upward','Cao: chủ đề chồng lên']],
  ['sky', /^天|[空云霄]/, ['升空：浮上天穹','Ascent: rises into the sky','Bay lên trời']],
  ['realm', /[界境域渊]/, ['领域：身后展开主题领域（非脚下）','Realm: a motif realm unfolds behind (never at the feet)','Lĩnh vực: mở ra phía sau (không dưới chân)']],
  ['deity', /[神圣主王皇帝君尊]/, ['神格：按白名单的头顶光环 / 冠','Divinity: head aura / crown per whitelist','Thần cách: vầng / vương miện theo danh sách trắng']],
  ['entangle', /[缠绕织]/, ['缠绕：藤蔓环身','Entwine: vines wrap the body','Quấn: dây leo quấn thân']],
  ['illusion', /[幻虚影]/, ['幻化：半透明','Illusion: translucent','Ảo: bán trong suốt']],
  ['reverse', /[逆反倒]/, ['逆转：颗粒逆流上升','Reversal: grains flow upward','Đảo: hạt bay ngược lên']],
  ['bloom', /[盛花华开]/, ['盛放：花瓣绽开','Bloom: petals open','Nở: cánh hoa bung']],
  ['sound', /[音籁鸣声乐]/, ['声域：声波扩散','Sound: waves spread out','Âm: sóng lan ra']],
  ['light', /[光辉芒明耀]/, ['光芒：背后光芒','Radiance: rays behind','Hào quang: tia phía sau']],
  ['storm', /[烈惊疾狂暴怒]/, ['加剧：锐化与火花','Intensify: sharper with sparks','Mãnh liệt: sắc và tia lửa']],
  ['star', /[星辰枢]/, ['星象：点点星辰','Stars: scattered stars','Tinh tú: sao lấp lánh']],
];
function spNameMods(def, st){ const n = String(def?.forms?.[0]?.[st-1] || ''); if(st<3 || !n) return []; const out = []; SP_NAME_KW.forEach(([k, re])=>{ if(re.test(n.replace(/觉醒$/,''))) out.push(k); }); return out; }
function spNameEvoSvg(def, st, x, AL){
  const mods = spNameMods(def, st), o = {back:'', front:'', lift:0, op:null, mods}; if(!mods.length) return o;
  if(typeof spPathOn==='function' && spPathOn()){ o.mods = mods.filter(m=>!['swarm','cluster','realm','tall'].includes(m)); }
  if(st>=5) o.mods = o.mods.filter(m=>m==='deity' || m==='illusion');   /* LV5 做减法 */
  const {c, ac, dk, belly, fy, hy} = x, mini = (px, py, s, op=1, rot=0)=>`<g class="nm-motif" transform="translate(${spF(px)} ${spF(py)}) rotate(${rot}) scale(${s}) translate(-24 -30)" opacity="${op}">${spBody(def.body, c, dk, belly)}</g>`;
  o.mods.forEach(m=>{ switch(m){
    case 'swarm': { const P = st>=5 ? [[-3,6],[51,4],[-6,28],[54,30],[0,47],[48,48]] : [[2,10],[46,9],[-1,30],[49,31]]; o.back += `<g class="nm-swarm">${P.map(([a,b],i)=>mini(a, b, st>=5 ? .22 : .2, .95, (i%2?8:-8))).join('')}</g>`; break; }
    case 'cluster': o.back += `<g class="nm-cluster">${mini(7.5, 39, .34, 1, -6)}${mini(40.5, 39.5, .32, 1, 6)}</g>`; break;
    case 'tall': o.back += `<g class="nm-tall">${mini(24, hy-5.5, .3)}</g>`; break;
    case 'sky': o.lift -= 2; o.back += `<g class="nm-sky" fill="#fff" stroke="${spMixC(dk,'#94a3b8',.6)}" stroke-width=".5">${[[5,35],[43,37]].map(([a,b])=>`<path d="M${a-4} ${b}a2 2 0 0 1 1.2-3.6a2.8 2.8 0 0 1 5.2-.4a2 2 0 0 1 1.6 4Z"/>`).join('')}</g>`; break;
    case 'realm': { let t = ''; for(let i=0;i<4;i++) for(let j=0;j<3;j++) t += mini(6+i*12, 8+j*11, .12, .55); o.back = `<g class="nm-realm"><rect x="0" y="2" width="48" height="38" rx="9" fill="${spMixC(ac,'#fff',.7)}" opacity=".35" stroke="${spMixC(ac,'#fff',.3)}" stroke-width=".6"/>${t}</g>` + o.back; break; }
    case 'deity': if(AL.halo) o.back += `<g class="nm-halo"><ellipse cx="24" cy="${spF(hy-5)}" rx="7.5" ry="1.9" fill="none" stroke="#fbbf24" stroke-width="1.1"/><ellipse cx="24" cy="${spF(hy-5)}" rx="7.5" ry="1.9" fill="none" stroke="#fff7d6" stroke-width=".35"/></g>`;
      else if(AL.crown) o.front += `<g class="nm-crown"><path d="M19 ${spF(hy+1.5)}l1-4 2.5 2.6 1.5-3.6 1.5 3.6 2.5-2.6 1 4Z" fill="#fbbf24" stroke="${dk}" stroke-width=".5"/></g>`;
      break;
    case 'entangle': o.front += `<g class="nm-vine" fill="none" stroke="#16a34a" stroke-width=".9" stroke-linecap="round"><path d="M10 ${spF(fy+12)}Q18 ${spF(fy+6)} 26 ${spF(fy+13)}T40 ${spF(fy+8)}"/>${[[15,fy+9],[31,fy+11]].map(([a,b])=>`<ellipse cx="${a}" cy="${spF(b)}" rx="1.4" ry=".7" fill="#4ade80" stroke="none" transform="rotate(-30 ${a} ${spF(b)})"/>`).join('')}</g>`; break;
    case 'illusion': o.op = .84; break;
    case 'reverse': o.back += `<g class="nm-rev">${[[10,40],[14,32],[36,38],[33,28],[39,22],[8,24]].map(([a,b],i)=>`<circle class="geo-pt" style="animation-delay:${i*.3}s" cx="${a}" cy="${b}" r=".7" fill="${ac}"/>`).join('')}<path d="M7 44v-8m-1.6 1.6L7 36l1.6 1.6M41 44v-8m-1.6 1.6L41 36l1.6 1.6" stroke="${ac}" stroke-width=".6" fill="none" opacity=".7"/></g>`; break;
    case 'bloom': o.back += `<g class="nm-bloom">${[[8,22,-40],[40,22,40],[6,34,-80],[42,34,80]].map(([a,b,r])=>`<ellipse cx="${a}" cy="${b}" rx="1.6" ry="3.2" transform="rotate(${r} ${a} ${b})" fill="${spMixC(ac,'#fff',.4)}" stroke="${dk}" stroke-width=".35"/>`).join('')}</g>`; break;
    case 'sound': o.back += `<g class="nm-sound" fill="none" stroke="${ac}" stroke-linecap="round">${[3,5.5,8].map((r,i)=>`<path d="M${spF(9-r)} ${spF(fy-r)}a${r} ${r} 0 0 0 0 ${spF(r*2)}M${spF(39+r)} ${spF(fy-r)}a${r} ${r} 0 0 1 0 ${spF(r*2)}" stroke-width="${spF(.8-i*.15)}" opacity="${spF(.8-i*.2)}"/>`).join('')}</g>`; break;
    case 'light': o.back += `<g class="nm-rays" stroke="${spMixC(ac,'#fff',.5)}" stroke-width=".8" stroke-linecap="round" opacity=".7">${[200,225,250,290,315,340].map(a=>{ const t = a*Math.PI/180; return `<path d="M${spF(24+15*Math.cos(t))} ${spF(30+15*Math.sin(t))}L${spF(24+20*Math.cos(t))} ${spF(30+20*Math.sin(t))}"/>`; }).join('')}</g>`; break;
    case 'storm': o.back += `<g class="nm-storm" fill="none" stroke="#fde047" stroke-width=".8" stroke-linejoin="round">${[[7,26,1],[41,28,-1]].map(([a,b,s])=>`<path d="M${a} ${b}l${2*s} 3 ${-1.6*s} .6 ${2.2*s} 3.4"/>`).join('')}</g>`; break;
    case 'star': o.back += `<g class="nm-star">${[[6,14],[42,18],[4,38]].map(([a,b])=>`<path d="M${a} ${b-1.6}l.45 1.15 1.15.45-1.15.45-.45 1.15-.45-1.15-1.15-.45 1.15-.45Z" fill="#fde68a"/>`).join('')}</g>`; break;
  } });
  return o;
}
/* ---------- 进化设计文档（spirit_evolution_design，自动推导 + 管理员可补充） ---------- */
function spEvoDesign(def){
  const N = spEvoNames(def), AL = spEvoAllow(def), doc = spEvoDoc(def.id), g = spGene(def), out = {subject:doc.subject || spEvoSubject(def), dir:N.st.join(' → '), stages:[], allow:AL};
  for(let st=1; st<=5; st++){ const A = spArtOf(def, st, {size:120}), M = A?.M, mods = spNameMods(def, st);
    const parts = []; if(M){ parts.push(trT(SP_SKEL[M.sk].n)); if(M.sk2) parts.push(trT(SP_SKEL[M.sk2].n)); M.geo.forEach(k=>parts.push(trT(SP_GEO[k].n))); }
    if(st>=4) g.d4.forEach(k=>parts.push(trT(SP_D4[k].n))); if(st>=5) g.d5.forEach(k=>parts.push(trT(SP_D5[k].n)));
    mods.forEach(m=>parts.push(trT(SP_NAME_KW.find(r=>r[0]===m)[2])));
    out.stages.push({st, name:N.st[st-1]||'', school:A ? [A.p, A.s].filter(Boolean) : [], parts, mats:A?.mats||[], mods, form:doc['form'+st] || '', sil:doc['sil'+st] || spEvoSilText(def, st, A)}); }
  out.mut = doc.mut || [`LV4：${out.stages[3].parts.slice(0,4).join(' + ')}`, `LV5：${out.stages[4].parts.slice(0,5).join(' + ')}`].join('；');
  return out;
}
function spEvoSilText(def, st, A){ const M = A?.M; if(!M) return ''; return `${trT(SP_SKEL[M.sk].n)}${M.geo.length?' · '+M.geo.map(k=>trT(SP_GEO[k].n)).join(' / '):''}${spNameMods(def, st).length?' · '+spNameMods(def, st).map(m=>trT(SP_NAME_KW.find(r=>r[0]===m)[2]).split('：')[0].split(':')[0]).join(' / '):''}`; }
/* ---------- 剪影签名（不看颜色、不看大小） ---------- */
function spEvoSig(def, st){ const A = spArtOf(def, st, {size:120}), M = A?.M, g = st>=4 ? spGene(def) : null;
  return [st===1 ? (typeof spEggOf==='function' && A ? 'egg:'+spEggOf(def).sub : spFragOf?.(def.body) ? 'frag' : def.body) : def.body, M?.sk, (M ? spSkelSubs(M) : []).join('+') + (M?.fx ? '|fx:' + M.fx : ''), (M?.geo||[]).join(','), g ? g.d4.join(',') : '', st>=5 && g ? g.d5.join(',') : '', spNameMods(def, st).join(','), M?.lv, typeof spPathOf==='function' && spPathOn() ? (st===3 ? spPathOf(def).env : st===4 ? spPathOf(def).mut + (spPathOf(def).mut==='T8' ? spPathOf(def).glyph : '') : st>=5 ? spPathOf(def).dom : '') : ''].join('|'); }
/* ---------- 进化校验（spirit_evolution_validation，共 12 项） ---------- */
var SP_EVO_CHECKS = [['anchor',['名称锚定','Name anchor','Bám tên']],['basis',['部件依据','Part basis','Căn cứ bộ phận']],['common',['通用元素','Common elements','Yếu tố chung']],['sil',['剪影差异','Silhouette difference','Khác biệt bóng']],['mut',['阶段质变','Stage transformation','Biến đổi giai đoạn']],['cat',['同类差异','Same-category difference','Khác biệt cùng hệ']],['cross',['跨类差异','Cross-category difference','Khác biệt khác hệ']],['ground',['无脚下光圈','No ground aura','Không vòng dưới chân']],['skin',['皮肤改外观','Skins change appearance','Trang phục đổi ngoại hình']],['logic',['进化逻辑','Evolution logic','Logic tiến hóa']],['path',['进化路径唯一','Unique evolution path','Lộ trình riêng']],['lv5',['LV5 做减法','LV5 subtraction','LV5 giảm bớt']]];
var spEvoCache = {ver:-1, map:new Map(), sigs:null};
function spEvoAllSigs(){ if(spEvoCache.sigs && spEvoCache.ver===spCacheVer) return spEvoCache.sigs; const m = new Map(); spLib().forEach(d=>m.set(d.id, {ck:spArtCatKey(d), body:d.body, s3:spEvoSig(d, 3)+'#'+[3,4,5].map(n=>spArtOf(d, n, {size:120})?.p).join(''), s4:spEvoSig(d, 4), s5:spEvoSig(d, 5), sk:spArtOf(d, 3, {size:120})?.M?.sk, sch:spArtOf(d, 3, {size:120})?.p})); spEvoCache.sigs = m; return m; }
function spEvoValidate(def){
  if(!def) return {ok:false, list:[]}; if(spEvoCache.ver!==spCacheVer){ spEvoCache = {ver:spCacheVer, map:new Map(), sigs:null}; }
  if(spEvoCache.map.has(def.id)) return spEvoCache.map.get(def.id);
  const F = spEvoFlags(), N = spEvoNames(def), AL = spEvoAllow(def), g = spGene(def), subj = spEvoSubject(def), doc = spEvoDoc(def.id), L = [];
  const add = (k, ok, msg)=>L.push({k, ok:!!ok, msg});
  /* 1 名称锚定 */
  const bad = [3,4,5].filter(st=>{ const n = N.st[st-1] || ''; const others = N.st.filter((x2,i)=>i!==st-1).join('').replace(/[灵觉醒]/g,''); return !([...n.replace(/[灵觉醒]/g,'')].some(ch=>others.includes(ch)) || spNameMods(def, st).length || [...subj].some(ch=>n.includes(ch)) || doc['form'+st] || (typeof spPathOf==='function' && spPathOn() && (spPathOf(def).byName?.[st] || (gCfg().evoCfg?.paths?.[def.id]?.['d'+st])))); });
  add('anchor', !F.anchor || !bad.length, bad.length ? [`LV${bad.join('/')} 的名称无法推导形态，请在进化设计文档里补写形态`, `LV${bad.join('/')} names give no form — describe it in the evolution design`, `Tên LV${bad.join('/')} chưa suy ra hình dạng`] : (S0=>[`主体词「${subj}」贯穿各阶段`, `Subject "${S0[1]}" runs through every stage`, `Chủ đề "${S0[2]}" xuyên suốt`])(typeof spPathSubj==='function' ? spPathSubj(def) : [subj,subj,subj]));
  /* 2 部件依据 */
  const nob = [...(g.d4||[]), ...(g.d5||[])].filter(k=>!spDirBasis(def, k));
  add('basis', !nob.length, nob.length ? [`无依据的方向：${nob.join('、')}`, `Directions without basis: ${nob.join(', ')}`, `Hướng không căn cứ: ${nob.join(', ')}`] : ['每个进化方向都有名称 / 设定依据','Every direction has a name / setting basis','Mọi hướng đều có căn cứ']);
  /* 3 通用元素 */
  const raw = [1,2,3,4,5].flatMap(s=>def.parts?.[s]||[]), cut = raw.filter(p=>!spEvoPartOk(def, p, AL)), flyCut = spCanFly(def) && !AL.wings;
  add('common', true, cut.length || flyCut ? [`已按白名单自动去掉：${[...new Set(cut.map(p=>String(p).split(':')[0]))].join('、')}${flyCut?' 翅膀':''}`, `Removed by the whitelist: ${[...new Set(cut.map(p=>String(p).split(':')[0]))].join(', ')}${flyCut?' wings':''}`, `Đã gỡ theo danh sách trắng`] : ['翅膀 / 光环 / 皇冠 / 尾巴均符合白名单','Wings / aura / crown / tail all follow the whitelist','Cánh / vầng / vương miện / đuôi đúng danh sách trắng']);
  /* 4 剪影差异 */
  const sigs = [1,2,3,4,5].map(s=>spEvoSig(def, s)), dup = sigs.some((s,i)=>sigs.indexOf(s)!==i);
  add('sil', !F.sil || !dup, dup ? ['有两个阶段剪影相同','Two stages share a silhouette','Hai giai đoạn trùng bóng'] : ['LV1~LV5 剪影各不相同','LV1–LV5 silhouettes all differ','Bóng LV1–LV5 đều khác']);
  /* 5 阶段质变 */
  const strip = s=>s.split('|').slice(0,7).join('|'), m4 = strip(sigs[3])!==strip(sigs[2]), m5 = strip(sigs[4])!==strip(sigs[3]);
  add('mut', !F.lv45 || (m4 && m5), m4 && m5 ? ['LV4 换骨架 / 方向，LV5 换副骨架 + 专属，不只是放大','LV4 changes skeleton / directions and LV5 changes to the secondary skeleton + exclusive — not just bigger','LV4 đổi khung, LV5 đổi khung phụ + riêng'] : ['LV4 / LV5 只是放大','LV4 / LV5 only grow bigger','LV4 / LV5 chỉ to hơn']);
  /* 6 同类差异 / 7 跨类差异 */
  const all = spEvoAllSigs(), me = all.get(def.id) || {ck:spArtCatKey(def), s3:spEvoSig(def,3)+'#'+[3,4,5].map(n=>spArtOf(def, n, {size:120})?.p).join(''), s4:spEvoSig(def,4), s5:spEvoSig(def,5), sk:spArtOf(def,3,{size:120})?.M?.sk, sch:spArtOf(def,3,{size:120})?.p, body:def.body};
  const same = [...all.entries()].filter(([id,v])=>id!==def.id && v.ck===me.ck && v.s4===me.s4 && v.s5===me.s5).map(([id])=>id);
  add('cat', !F.cat || !same.length, same.length ? [`与同类 ${same.slice(0,3).join('、')} 形态相同`, `Same form as ${same.slice(0,3).join(', ')}`, `Trùng hình với ${same.slice(0,3).join(', ')}`] : ['与同类精灵的 LV4 / LV5 形态都不同','Its LV4 / LV5 forms differ from every same-category spirit','LV4 / LV5 khác mọi tinh linh cùng hệ']);
  const cross = [...all.entries()].filter(([id,v])=>id!==def.id && v.ck!==me.ck && v.s3===me.s3 && v.s4===me.s4 && v.s5===me.s5).map(([id])=>id);
  add('cross', !F.cross || !cross.length, cross.length ? [`与其他类别 ${cross.slice(0,3).join('、')} 外形雷同`, `Looks like ${cross.slice(0,3).join(', ')} from another category`, `Giống ${cross.slice(0,3).join(', ')} khác hệ`] : ['与其他类别的骨架 / 画派组合不同','Skeleton / school combination differs from other categories','Tổ hợp khung / phái khác các hệ khác']);
  /* 8 脚下光圈 */
  const svg5 = spiritSvg(def, 5, {size:96}), ground = /class="[^"]*(ground|floor|foot-ring|sp-shadow)[^"]*"/.test(svg5);
  add('ground', !ground, ground ? ['检测到脚下光圈 / 地圈','Ground aura detected','Phát hiện vòng dưới chân'] : ['无脚下光圈、地圈、法阵、地面辉光','No ground aura, ring, circle or floor glow','Không vòng, trận hay ánh sáng dưới chân']);
  /* 9 皮肤外观 */
  const sk = (typeof spSkins==='function' ? spSkins() : []).filter(s=>s.forSp===def.id), flat = sk.filter(s=>!spLookStructural(s.look||{}));
  add('skin', !F.skin || !flat.length, flat.length ? [`皮肤只改特效：${flat.map(s=>trT(s.name)).join('、')}`, `Skins that only add effects: ${flat.map(s=>trT(s.name)).join(', ')}`, `Trang phục chỉ thêm hiệu ứng`] : ['专属皮肤都改变外形','Its skins all change the shape','Trang phục đều đổi hình']);
  /* 10 进化逻辑 */
  const wrong = (spArtCatKey(def)!=='myth' && spArtCatKey(def)!=='reptile' && /dragon/.test(def.body) && !/龙/.test(N.zh)) || (g.d5||[]).includes('mythic') && !spDirBasis(def, 'mythic');
  add('logic', !wrong, wrong ? ['进化方向偏离名称（如沙漏变龙）','Direction drifts from the name (e.g. hourglass → dragon)','Hướng lệch khỏi tên'] : [`${N.st.join(' → ')}`, `${(def.forms?.[1]||[]).join(' → ')}`, `${(def.forms?.[2]||[]).join(' → ')}`]);
  /* 11 四段论路径：LV3 环境 + 伙伴 / LV4 质变 / LV5 领域，且与其他精灵不重复 */
  if(typeof spPathOf==='function'){ const P = spPathOf(def), key = d=>{ const q = spPathOf(d); return [q.env, q.mut, q.dom, q.glyph, d.body].join('|'); }, k0 = key(def), twin = spLib().filter(o=>o.id!==def.id && key(o)===k0).map(o=>o.id);
    add('path', !twin.length || !spPathFlags().uniq, twin.length ? [`与 ${twin.slice(0,3).join('、')} 的进化路径相同`, `Same evolution path as ${twin.slice(0,3).join(', ')}`, `Trùng lộ trình với ${twin.slice(0,3).join(', ')}`] : [0,1,2].map(i=>`LV3 ${SP_LV3_ENV[P.env].n[i]} · LV4 ${SP_LV4_MUT[P.mut].n[i]} · LV5 ${SP_LV5_DOM[P.dom].n[i]}`)); }
  /* 12 v2.5 LV5：身体最多两种材质（领域不计入）、不拿法器（法器化入领域）、域子名全库唯一 */
  { const A5 = spArtOf(def, 5, {size:120}), M5 = A5?.M, nm = (A5?.mats||[]).length, nn = (M5?.nodes||[]).length, held = !!M5?.parts?.held, dn = typeof spDomName==='function' ? spDomName(def)[0] : '';
    const dupDom = dn && typeof spDomNameAll==='function' ? [...spDomNameAll().entries()].filter(([id, z])=>id!==def.id && z===dn).map(([id])=>id) : [];
    const ok5 = nm<=2 && nn<=2 && !held && !dupDom.length;
    add('lv5', ok5, ok5 ? [`材质 ${nm} 种 + 领域；法器已化入领域；域子名「${dn}」`, `${nm} material(s) + realm; artefact folded into the realm; realm "${spDomName(def)[1]}"`, `${nm} chất liệu + cõi; pháp khí đã nhập vào cõi`]
      : [[nm>2||nn>2 ? `LV5 材质超过两种` : '', held ? '仍手持法器' : '', dupDom.length ? `域子名与 ${dupDom.slice(0,3).join('、')} 重复` : ''].filter(Boolean).join('；'), 'LV5 has more than two materials, still holds an artefact, or shares a realm sub-name', 'LV5 chưa giảm bớt hoặc trùng tên cõi']); }
  const res = {ok:L.every(x=>x.ok), list:L}; spEvoCache.map.set(def.id, res); return res;
}
function spEvoGateOk(def){ if(!spEvoFlags().gate) return true; const r = spEvoValidate(def); if(!r.ok){ spEvoGateMsg(def, r); } return r.ok; }
var spEvoGateT = 0;
function spEvoGateMsg(def, r){ const now = Date.now(); if(now - spEvoGateT < 800) return; spEvoGateT = now; const bad = r.list.filter(x=>!x.ok).map(x=>trT(SP_EVO_CHECKS.find(c=>c[0]===x.k)[1])).join('、');
  try{ toast(tx(`「${trT(def.name)}」未通过进化校验（${bad}），已禁止发布`, `"${trT(def.name)}" failed evolution checks (${bad}) — publishing blocked`, `"${trT(def.name)}" chưa đạt kiểm tra (${bad}) — chặn phát hành`), 'warn'); }catch(_e){} }
