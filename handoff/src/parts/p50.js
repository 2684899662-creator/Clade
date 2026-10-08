/* =========================================================
   v2.9 方案 A（在 v2.5 立绘形态上修改）：名称锚定元素表 + 赛尔号式粗描边赛璐璐，Q 版精灵、不拟人
   · 每只精灵一张元素表（3~5 个核心元素）：造型 / 配色 / 配件 / 特效 / 动作 / 背景都围绕元素
   · 阶段：LV1 蛋形（v2.5 差异化蛋形，破口露出单一元素）/ LV2 元素组合（本体 + 元素部件）/ LV3 元素环境 + 元素伙伴 / LV4 元素质变 / LV5 元素升华（领域 + 元素法相）
   · 画风：剪影粗黑描边 3~5px（按显示尺寸换算）、大色块主色 ≤ 3、两阶硬阴影、无渐变、高饱和；保留 v2.5 的 Q 版构图与眼型
   · 不拟人：去掉 S1 拟人副骨架、人类骨相线（鼻梁 / 颧骨 / 下颌 / 眉弓）；翅膀 / 光环 / 皇冠不默认添加；不画脚下光圈
========================================================= */
function spHuOn(A, st){ return !!A && A.C?.flags?.qstyle!==false; }
/* 只保留符合元素定义的骨架：有肢 / 兽足 / 蛇尾 / 叶 / 器物肢 / 机械肢；多头、环带、符号、基座这类与元素无关的类别装饰去掉 */
function spQSkel(M){ const keep = ['S1','S2','S3','S4','S6','S7','S9','S12'], to = k=>keep.includes(k) ? k : k==='S5' ? 'S1' : 'S3';
  return {...M, sk:to(M.sk), sk2:M.sk2 && keep.includes(M.sk2) ? M.sk2 : null, subs:(M.subs||[]).filter(k=>keep.includes(k) && k!=='S1')}; }
function spQLineW(size){ return Math.max(1.2, Math.min(5, (+size || 48)*.02)); }   /* 卡片 150~250px → 3~5px */
/* 粗描边：剪影描边改成屏幕像素宽度（不随缩放变细） */
function spQThick(svg, W, col){ return svg.replace(/stroke="[^"]*"/g, `stroke="${col}"`).replace(/stroke-width="[\d.]+"/g, `stroke-width="${W}"`).replace(/<(path|ellipse|circle|rect|polygon)\b/g, '<$1 vector-effect="non-scaling-stroke"').replace(/fill="none"/g, `fill="${col}"`); }
/* ---------- v2.7 按名称元素构成：主体词 = 本体；其余字 = 部件（后缀定四肢 / 悬浮，属性字加元素部件）；眼睛 = 名称元素印记（不是卡通眼） ---------- */
var SP_NE = [['beast',/[兽狼狮虎豹狐猫麟]/,['兽','beast','thú']],['hound',/[犬]/,['犬','hound','chó']],['guard',/[卫甲盾]/,['卫','guard','vệ']],['dragon',/[龙蛟]/,['龙','dragon','rồng']],
  ['bird',/[凤鸟鹤鹰燕隼羽翼]/,['羽','wing','lông vũ']],['fish',/[鱼鲸鲨]/,['鳞鳍','fin','vây']],['envoy',/[使]/,['使','envoy','sứ']],['crown',/[王皇帝君主]/,['王','sovereign','vương']],
  ['divine',/[神圣]/,['神','divine','thần']],['radiance',/[辉耀光]/,['辉','radiance','huy']],['star',/[星]/,['星','star','sao']],['moon',/[月]/,['月','moon','trăng']],['sun',/[日阳]/,['日','sun','mặt trời']],
  ['flame',/[焰火炎熔烈]/,['焰','flame','lửa']],['ice',/[冰霜雪寒]/,['冰','ice','băng']],['thunder',/[雷电]/,['雷','thunder','sấm']],['water',/[水海波潮雨]/,['水','water','nước']],['wind',/[风]/,['风','wind','gió']],
  ['time',/[时钟针秒历纪]/,['时','time','thời']],['gear',/[齿轮机械汽芯]/,['机','gear','bánh răng']],['plant',/[花叶藤树苔草竹莲松梅兰菊]/,['植','plant','cây']],['page',/[书页纸诗字]/,['书','page','trang']],
  ['crystal',/[晶石玉钻宝]/,['晶','crystal','tinh thể']],['dream',/[梦幻]/,['梦','dream','mộng']],['shadow',/[影暗]/,['影','shadow','bóng']],['light',/[灯烛]/,['灯','lamp','đèn']],['sound',/[铃琴鼓笛音]/,['音','sound','âm']],['spirit',/[灵精]/,['灵','spirit','linh']]];
var SP_NE_LIMB = ['beast','hound','guard','dragon'];
var SP_NE_EYE = ['flame','star','time','gear','light','water','plant','crystal','ice','thunder','moon','sun','page','dream','shadow','sound'];
function spNameElems(def, st){
  const base = String(def?.name?.[0] || ''), stage = String(def?.forms?.[0]?.[(st||2)-1] || ''), out = [];
  const scan = s=>[...s].forEach(ch=>{ const e = SP_NE.find(([, re])=>re.test(ch)); if(e && !out.includes(e[0])) out.push(e[0]); });
  scan(base); if(st>=3) scan(stage.replace(/觉醒$/, ''));
  const body = String(def?.body || ''), eye = SP_NE_EYE.find(k=>out.includes(k)) || (/flame|fire|spark|ember/.test(body) ? 'flame' : /star/.test(body) ? 'star' : /gear|cog|robot|mech/.test(body) ? 'gear' : /clock|hour/.test(body) ? 'time' : /lantern|lamp|candle/.test(body) ? 'light' : /drop|water|wave/.test(body) ? 'water' : /leaf|flower|plant|vine/.test(body) ? 'plant' : /crystal|gem/.test(body) ? 'crystal' : 'lens');
  return {list:out, limbs:out.some(k=>SP_NE_LIMB.includes(k)), float:!out.some(k=>SP_NE_LIMB.includes(k)), eye};
}
/* 名称元素印记眼：形状取自名称元素；无瞳孔 / 高光 / 嘴；LV5 加额心元素印 */
var SP_NE_EYE_D = {flame:'M0-1.6Q1.1-.2.8.7Q.4 1.4 0 1.4Q-.4 1.4-.8.7Q-1.1-.2 0-1.6Z', star:'M0-1.6L.45-.45L1.6 0L.45.45L0 1.6L-.45.45L-1.6 0L-.45-.45Z', time:'M-1.3-.32H1.3V.32H-1.3Z',
  light:'M-.9-1.25H.9V1.25H-.9Z', water:'M0-1.6Q1 0 .9.6A.9.9 0 0 1-.9.6Q-1 0 0-1.6Z', plant:'M-1.3.6Q-.6-1.4 1.3-.6Q.6 1.4-1.3.6Z', crystal:'M0-1.5L1 0L0 1.5L-1 0Z', ice:'M0-1.5L1 0L0 1.5L-1 0Z',
  thunder:'M.3-1.6L-.7.2H.1L-.3 1.6L.8-.3H0Z', moon:'M.5-1.4A1.5 1.5 0 1 0 .5 1.4A1.1 1.1 0 1 1 .5-1.4Z', sun:'M1 0A1 1 0 1 1-1 0A1 1 0 1 1 1 0Z', page:'M-.9-1.2H.9V1.2H-.9Z', dream:'M1.1 0A1.1 1.1 0 1 1-1.1 0A1.1 1.1 0 1 1 1.1 0Z',
  shadow:'M-1.3.2Q0-1.2 1.3.2Q0-.4-1.3.2Z', sound:'M-.2-1.5V.7A.7.6 0 1 1-.7.3V-1.5H.9V-.9H-.2Z', gear:'M1.2 0L.6 1.04H-.6L-1.2 0L-.6-1.04H.6Z', lens:'M-1.2 0Q0-.85 1.2 0Q0 .85-1.2 0Z'};
function spNameEyes(E, st, fy, k, ac, OL){
  if(st<2) return ''; const d = SP_NE_EYE_D[E.eye] || SP_NE_EYE_D.lens, sz = [0, 0, .78, 1, 1.05, 1.1][st]*k, ex = 3.7*k, fill = st===2 ? spMixC(ac, '#fff', .25) : spMixC(ac, '#fff', .6), mirror = ['plant','thunder','moon','shadow','sound'].includes(E.eye);
  const tilt = E.eye==='time' ? 20 : st===4 ? 8 : 0, one = s=>`<g transform="translate(${spF(24 + s*ex)} ${spF(fy)}) rotate(${s*tilt}) scale(${spF(sz*(mirror && s>0 ? -1 : 1))} ${spF(sz)})">${st>=3 ? `<path d="${d}" fill="${spMixC(ac, '#fff', .25)}" transform="scale(1.45)" opacity=".55"/>` : ''}<path d="${d}" fill="${fill}" stroke="${OL}" stroke-width="${spF(.32/sz)}" stroke-linejoin="round"/>${E.eye==='light' ? `<path d="M0-1.25V1.25M-.9 0H.9" stroke="${OL}" stroke-width="${spF(.22/sz)}"/>` : E.eye==='gear' ? `<circle r=".42" fill="${OL}"/>` : ''}</g>`;
  return `<g class="sv-face ne-eyes ne-${E.eye}">${one(-1)}${one(1)}${st===5 ? `<g transform="translate(24 ${spF(fy - 6*k)}) scale(${spF(.7*k)})"><path d="${d}" fill="${fill}" stroke="${OL}" stroke-width=".4"/></g>` : ''}</g>`;
}
/* 名称元素部件（Q 版身体坐标：身体约 x10~38、y10~44）：LV2 只出主元素、小；LV3 全部元素；LV4 元素聚合放大；LV5 元素做成神饰 */
function spNameElemSvg(def, st, x, E, OL){
  if(st<2 || !E) return {back:'', front:''};
  const {c, ac, belly} = x, AL = x.AL || {}, s = [0, 0, .8, 1, 1.18, 1.3][st], n = st>=4 ? 2 : 1, top = Math.min(14, (x.hy||18) - 5), lt = spMixC(ac, '#fff', .5);
  const S = `stroke="${OL}" stroke-width=".9" stroke-linejoin="round" stroke-linecap="round"`, list = st===2 ? E.list.filter(k=>k!=='spirit').slice(0, 1) : E.list.slice(0, 4);
  const mir = g=>g + `<g transform="translate(48 0) scale(-1 1)">${g}</g>`, T = (cx, cy, k, g)=>`<g transform="translate(${spF(cx)} ${spF(cy)}) scale(${spF(k*s)})">${g}</g>`;
  let b = '', f = '';
  list.forEach(key=>{ switch(key){
    case 'beast': f += mir(T(15.5, top + 1, 1, `<path d="M-3 3L-1.6-4L2.6 1.6Z" fill="${c}" ${S}/><path d="M-1.8 1.8L-1.1-1.8L1.2 .9Z" fill="${ac}"/>`)); if(AL.tail!==false) b += T(37, 38, 1, `<path d="M0 0C5 1 7-3 5-7C3.6-9.6.4-8.4 1.4-6" fill="none" stroke="${OL}" stroke-width="3.4" stroke-linecap="round"/><path d="M0 0C5 1 7-3 5-7C3.6-9.6.4-8.4 1.4-6" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"/><circle cx="1.4" cy="-6" r="1.4" fill="${ac}" ${S}/>`); break;
    case 'hound': b += mir(T(13.5, top + 4, 1, `<path d="M1 -2Q-3 -2 -2.6 4Q-1.6 6.4 .6 4.6Z" fill="${spShade(c, -.2)}" ${S}/>`)); b += T(37.5, 37, 1, `<path d="M0 0Q4-1 4.4-5" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round"/><path d="M0 0Q4-1 4.4-5" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round"/>`); break;
    case 'guard': f += T(11.5, 33, 1, `<path d="M-3.4-4H3.4V.4Q3.4 3.6 0 5.4Q-3.4 3.6-3.4.4Z" fill="${ac}" ${S}/><path d="M-1.9-2.4H1.9V.2Q1.9 2.2 0 3.3Q-1.9 2.2-1.9.2Z" fill="${lt}"/>`) + T(24, top - .5, 1, `<path d="M-1.2 2L0-3.6L1.2 2Z" fill="${ac}" ${S}/>`); if(st>=4) f += mir(T(13, 25, 1, `<path d="M-2.4-1.6Q0-3 2.4-1.6V1.4Q0 .2-2.4 1.4Z" fill="${ac}" ${S}/>`)); break;
    case 'dragon': f += mir(T(17, top, 1, `<path d="M0 2Q-1.4-1.6-.4-4.6Q.6-2 1.6 1.6Z" fill="${lt}" ${S}/>`)); b += T(36, 39, 1, `<path d="M0 0C6 0 6-6 2-6S-1-10 3-11" fill="none" stroke="${OL}" stroke-width="3.6" stroke-linecap="round"/><path d="M0 0C6 0 6-6 2-6S-1-10 3-11" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>`); break;
    case 'bird': b += mir(T(10.5, 28, 1, `<path d="M2 -2L-4-4L-2-1L-5 0L-1.6 1.2L-3.4 3.4L2 2Z" fill="${lt}" ${S}/>`)) + T(24, top - .5, 1, `<path d="M-1.6 2Q-2.4-2 0-4Q-.4-1 1.6 2Z" fill="${ac}" ${S}/>`); break;
    case 'fish': b += mir(T(10.5, 31, 1, `<path d="M2-2Q-3-3-3.4 1Q-1 1.6 2 2Z" fill="${lt}" ${S}/>`)) + T(38, 40, 1, `<path d="M0 0L4-3V3Z" fill="${ac}" ${S}/>`); break;
    case 'envoy': f += `<path d="M14 22Q24 30 34 38" fill="none" stroke="${OL}" stroke-width="${spF(2.6*s)}"/><path d="M14 22Q24 30 34 38" fill="none" stroke="${ac}" stroke-width="${spF(1.4*s)}"/>` + T(39, 20, 1, `<rect x="-1.6" y="-1.6" width="3.2" height="3.2" rx=".4" fill="${ac}" ${S}/>`); break;
    case 'crown': if(AL.crown!==false) f += T(24, top - 1.2, 1, `<path d="M-4 1.6L-3.4-2L-1.6 0L0-3L1.6 0L3.4-2L4 1.6Z" fill="#facc15" ${S}/>`); break;
    case 'divine': b += T(24, 22, 1, [-60, -30, 0, 30, 60].map(a=>`<path d="M0 0L-.9-13L0-15L.9-13Z" fill="${lt}" stroke="${OL}" stroke-width=".5" transform="rotate(${a})"/>`).join('')); break;
    case 'radiance': b += T(24, 28, 1, Array.from({length:8}, (_, i)=>`<path d="M0-15L1.2-19L0-22L-1.2-19Z" fill="${lt}" stroke="${OL}" stroke-width=".5" transform="rotate(${i*45 + 22.5})"/>`).join('')); break;
    case 'star': for(let i=0;i<n+1;i++) b += T([8, 40, 6][i], [16, 14, 34][i], .8, `<path d="${SP_NE_EYE_D.star}" transform="scale(1.6)" fill="#fde047" ${S}/>`); break;
    case 'moon': f += T(36, top + 1, 1, `<path d="${SP_NE_EYE_D.moon}" transform="scale(1.8)" fill="#fef3c7" ${S}/>`); break;
    case 'sun': b += T(24, top - 1, 1, `${Array.from({length:8}, (_, i)=>`<path d="M0-3.2L.6-5L0-6L-.6-5Z" fill="#fbbf24" transform="rotate(${i*45})"/>`).join('')}<circle r="3" fill="#fbbf24" ${S}/>`); break;
    case 'flame': f += [[19, top + 1, -18], [24, top - 1, 0], [29, top + 1, 18]].slice(0, st===2 ? 1 : 3).map(([a, y2, r])=>T(a, y2, 1, `<path d="M0-4Q2-1 1.4 1.2Q.8 2.4 0 2.4Q-.8 2.4-1.4 1.2Q-2-1 0-4Z" fill="#fb923c" ${S} transform="rotate(${r})"/><path d="M0-1.6Q.8-.2.5.9Q0 1.5-.5.9Q-.8-.2 0-1.6Z" fill="#fde047" transform="rotate(${r})"/>`)).join(''); break;
    case 'ice': b += mir(T(10, 26, 1, `<path d="M0-4L1.6 0L0 4L-1.6 0Z" fill="#bae6fd" ${S}/><path d="M2-2L3 0L2 2L1 0Z" fill="#e0f2fe" ${S}/>`)); break;
    case 'thunder': b += mir(T(9.5, 24, 1, `<path d="${SP_NE_EYE_D.thunder}" transform="scale(2.4)" fill="#facc15" ${S}/>`)); break;
    case 'water': b += [[9, 22], [39, 26], [11, 38]].slice(0, n+1).map(([a, y2])=>T(a, y2, 1, `<path d="${SP_NE_EYE_D.water}" transform="scale(1.6)" fill="#7dd3fc" ${S}/>`)).join(''); break;
    case 'wind': b += mir(T(9, 27, 1, `<path d="M3-3Q-3-3-2 0Q-1 2 1 1" fill="none" stroke="${OL}" stroke-width="1.8" stroke-linecap="round"/><path d="M3-3Q-3-3-2 0Q-1 2 1 1" fill="none" stroke="#e0f2fe" stroke-width=".8" stroke-linecap="round"/>`)); break;
    case 'time': f += T(24, top - .5, 1, `<path d="M0 2V-5" ${S} stroke-width="1.6"/><path d="M0 2V-5" stroke="${lt}" stroke-width=".7" stroke-linecap="round"/><path d="M0 2L4-1" ${S} stroke-width="1.6"/><path d="M0 2L4-1" stroke="${ac}" stroke-width=".7" stroke-linecap="round"/><circle cy="2" r="1" fill="${ac}" ${S}/>`); break;
    case 'gear': { const gear = (r)=>`<path d="${Array.from({length:8}, (_, i)=>{ const a = i*Math.PI/4, a2 = a + Math.PI/8; return `${i ? 'L' : 'M'}${spF(Math.cos(a)*r*1.25)} ${spF(Math.sin(a)*r*1.25)}L${spF(Math.cos(a2)*r)} ${spF(Math.sin(a2)*r)}`; }).join('')}Z" fill="#94a3b8" ${S}/><circle r="${spF(r*.4)}" fill="${OL}"/>`; b += `<g class="sv-gear">${T(9, 20, 1, gear(2.6))}</g>` + (n>1 ? `<g class="sv-gear">${T(39.5, 36, 1, gear(2.2))}</g>` : ''); break; }
    case 'plant': f += T(24, top - .5, 1, `<path d="M0 2Q-4-1-3.4-4Q-.6-3.4 0 2Z" fill="#4ade80" ${S}/><path d="M0 2Q4-1 3.4-4Q.6-3.4 0 2Z" fill="#22c55e" ${S}/>`); break;
    case 'page': b += mir(T(8.5, 26, 1, `<rect x="-2.4" y="-3.2" width="4.8" height="6.4" rx=".4" fill="#fffbeb" ${S} transform="rotate(-12)"/><path d="M-1.4-1.4H1.2M-1.4 0H1.2M-1.4 1.4H.4" stroke="${OL}" stroke-width=".4" transform="rotate(-12)"/>`)); break;
    case 'crystal': f += mir(T(13, 21, 1, `<path d="M0-3.4L1.6-.6L0 2.6L-1.6-.6Z" fill="${lt}" ${S}/>`)); break;
    case 'dream': b += [[9, 18, 2.2], [39, 16, 1.6], [7, 34, 1.4]].slice(0, n+1).map(([a, y2, r])=>T(a, y2, 1, `<circle r="${r}" fill="#fce7f3" ${S}/><circle cx="${-r*.35}" cy="${-r*.35}" r="${r*.25}" fill="#fff"/>`)).join(''); break;
    case 'shadow': b += mir(T(10, 30, 1, `<path d="M3-4Q-3-2-2 4Q0 1 3 2Z" fill="#334155" opacity=".85" ${S}/>`)); break;
    case 'light': f += T(24, 33, 1, `<circle r="2.2" fill="#fde68a" ${S}/><circle r="1" fill="#fff"/>`); break;
    case 'sound': b += [[9, 20], [39, 24]].slice(0, n).map(([a, y2])=>T(a, y2, 1, `<path d="${SP_NE_EYE_D.sound}" transform="scale(1.8)" fill="${ac}" ${S}/>`)).join(''); break;
    case 'spirit': b += [[8.5, 34, -20], [39.5, 30, 20], [24, 47, 180]].slice(0, n+1).map(([a, y2, r])=>T(a, y2, 1, `<path d="M0-3.6Q1.8-1 1.2 1Q.6 2 0 2Q-.6 2-1.2 1Q-1.8-1 0-3.6Z" fill="${lt}" ${S} transform="rotate(${r})"/>`)).join(''); break;
  } });
  return {back:`<g class="ne-parts">${b}</g>`, front:`<g class="ne-parts">${f}</g>`};
}
var SP_KIT = {
  sp_obj_lantern:{skel:false, limbs:false, els:[['灯芯','wick'],['灯罩','lantern shade'],['灯光','lamplight'],['提手','handle'],['烛火','candle flame']], cols:['#e7b53c','#c2272d','#fff3c4'], eye:'pane', lv1:'candle', head:'lantern', seg:'lanternSeg', top:'handle', feet:'tassel', core:'wick', comp:'candle', mut:'lanternTree', fx:'thousand', act:['原地轻晃','sways gently']},
  sp_flame:{env:false, core4:'coldCore', els:[['火苗','flame'],['火舌','fire tongue'],['火星','spark'],['热浪','heat wave'],['火芯','fire core']], cols:['#ff6a13','#ffd23f','#7a1d0b'], eye:'ember', lv1:'spark', head:'flame', seg:'tongue', top:'', feet:'tongueFeet', core:'ember', comp:'spark', mut:'coldCore', fx:'bigFlame', act:['跳动摇曳','flickers and dances']},
  sp_hour:{env:false, els:[['指针','clock hand'],['表盘','dial'],['刻度','tick marks'],['齿轮','gears'],['秒针','second hand']], cols:['#1aa7ec','#0f2a4a','#f2f7fb'], eye:'tick', lv1:'needle', head:'dial', seg:'gearSeg', top:'tickEars', feet:'tickFeet', tail:'handTail', core:'hands', comp:'tick', mut:'reverse', fx:'corridor', act:['滴答摆尾','ticks and wags its tail']},
  sp_starbeast:{skel:false, limbs:false, els:[['星光','starlight'],['星核','star core'],['星轨','star orbit'],['星座','constellation'],['星尘','stardust']], cols:['#7c6cf6','#ffd84a','#e8e6ff'], eye:'star', lv1:'dust', head:'star', seg:'constSeg', top:'', feet:'pawFeet', tail:'dustTail', core:'starCore', comp:'dust', mut:'orbitGate', fx:'constBeast', act:['蹦跳闪烁','hops and twinkles']},
  sp_gear:{env:false, els:[['齿轮','gear'],['齿牙','gear teeth'],['轴心','axle'],['咬合','meshing'],['机械','machinery']], cols:['#9aa7b8','#e07b2b','#2c3442'], eye:'axle', lv1:'bolt', head:'gear', seg:'toothSeg', top:'', feet:'mechFeet', side:'toothShield', core:'axle', comp:'gearMini', mut:'restructure', fx:'meshing', act:['站岗转动','stands guard, turning']},
};
/* 自动元素表（未手写的精灵）：主体词 + 名称字元素推导，之后按类别分批人工编写替换 */
function spKitOf(def){
  const ov = (typeof gCfg==='function' && gCfg().evoCfg?.kits?.[def?.id]) || null; if(ov) return {...ov, auto:false};
  if(SP_KIT[def?.id]) return {...SP_KIT[def.id], auto:false};
  const G = typeof spKitGenAll==='function' ? spKitGenAll().get(def?.id) : null;   /* v3.0 全量元素表 */
  if(G){ if(!G.brief) G.brief = spKitGenBrief(def, G); return G; }
  const E = typeof spNameElems==='function' ? spNameElems(def, 3) : {list:[], eye:'lens', limbs:false}, S = spPathSubj(def);
  const els = [[S[0], S[1]], ...E.list.filter(k=>k!=='spirit').map(k=>{ const r = SP_NE.find(q=>q[0]===k); return [r[2][0], r[2][1]]; })].slice(0, 5);
  const col = def.col || ['#94a3b8','#475569','#e2e8f0'];
  return {els, cols:[col[0], col[1], col[2] || '#ffffff'], eye:E.eye==='lens' ? 'lens' : E.eye, lv1:'subjectMini', head:'subject', seg:'pod', feet:E.limbs ? 'nubFeet' : 'wisp', comp:'subjectMini', mut:'', fx:'ghost', ne:E, auto:true, act:['原地轻晃','sways gently']};
}
/* ---------- 图元库（局部坐标；返回 svg）---------- */
function spKitPrim(name, P){
  const {x0=0, y, w, h, c, a, l, OL, W, st} = P, cel = P.cel || ((d, col)=>`<path d="${d}" fill="${col}" stroke="${OL}" stroke-width="${W}" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>`), dk = spShade(c, -.38), OLW = `stroke="${OL}" stroke-width="${W}" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"`, thin = `stroke="${OL}" stroke-width=".35" stroke-linecap="round"`;
  const X = v=>spF(x0 + v), Y = v=>spF(y + v), sym = d=>d;
  switch(name){
    /* 灯笼灵 */
    case 'lantern': { const t = h*.12, b = h*.12, d = `M${X(-w*.36)} ${Y(t)}Q${X(-w*.56)} ${Y(h*.5)} ${X(-w*.36)} ${Y(h - b)}H${X(w*.36)}Q${X(w*.56)} ${Y(h*.5)} ${X(w*.36)} ${Y(t)}Z`;
      return `<rect x="${X(-w*.24)}" y="${Y(0)}" width="${spF(w*.48)}" height="${spF(t + .4)}" rx=".6" fill="${a}" ${OLW}/>` + cel(d, c, 1.2) + [-.2, 0, .2].map(k=>`<path d="M${X(w*k)} ${Y(t)}Q${X(w*k*1.8)} ${Y(h*.5)} ${X(w*k)} ${Y(h - b)}" fill="none" ${thin}/>`).join('') + `<rect x="${X(-w*.24)}" y="${Y(h - b - .3)}" width="${spF(w*.48)}" height="${spF(b + .3)}" rx=".6" fill="${a}" ${OLW}/>`; }
    case 'lanternSeg': { const d = `M${X(-w*.3)} ${Y(h*.08)}Q${X(-w*.5)} ${Y(h*.5)} ${X(-w*.3)} ${Y(h*.92)}H${X(w*.3)}Q${X(w*.5)} ${Y(h*.5)} ${X(w*.3)} ${Y(h*.08)}Z`;
      return cel(d, c, 1) + `<path d="M${X(-w*.47)} ${Y(h*.44)}H${X(w*.47)}V${Y(h*.58)}H${X(-w*.47)}Z" fill="${a}" ${OLW}/>` + [-.16, .16].map(k=>`<path d="M${X(w*k)} ${Y(h*.1)}Q${X(w*k*1.6)} ${Y(h*.5)} ${X(w*k)} ${Y(h*.9)}" fill="none" ${thin}/>`).join(''); }
    case 'candle': { const d = `M${X(0)} ${Y(0)}Q${X(w*.5)} ${Y(h*.45)} ${X(w*.36)} ${Y(h*.72)}Q${X(w*.2)} ${Y(h)} ${X(0)} ${Y(h)}Q${X(-w*.2)} ${Y(h)} ${X(-w*.36)} ${Y(h*.72)}Q${X(-w*.5)} ${Y(h*.45)} ${X(0)} ${Y(0)}Z`;
      return cel(d, l, .8) + `<path d="M${X(0)} ${Y(h*.36)}Q${X(w*.22)} ${Y(h*.62)} ${X(0)} ${Y(h*.86)}Q${X(-w*.22)} ${Y(h*.62)} ${X(0)} ${Y(h*.36)}Z" fill="${c}"/>`; }
    case 'handle': return `<path d="M${X(-w*.22)} ${Y(h)}Q${X(-w*.26)} ${Y(0)} ${X(0)} ${Y(0)}Q${X(w*.26)} ${Y(0)} ${X(w*.22)} ${Y(h)}" fill="none" stroke="${OL}" stroke-width="${spF(W*2.2)}" vector-effect="non-scaling-stroke" stroke-linecap="round"/><path d="M${X(-w*.22)} ${Y(h)}Q${X(-w*.26)} ${Y(0)} ${X(0)} ${Y(0)}Q${X(w*.26)} ${Y(0)} ${X(w*.22)} ${Y(h)}" fill="none" stroke="${a}" stroke-width="${spF(W*.9)}" vector-effect="non-scaling-stroke" stroke-linecap="round"/>`;
    case 'tassel': return [-.22, 0, .22].map(k=>`<path d="M${X(w*k)} ${Y(0)}V${Y(h*.78)}" stroke="${OL}" stroke-width="${spF(W*1.6)}" vector-effect="non-scaling-stroke" stroke-linecap="round"/><path d="M${X(w*k)} ${Y(0)}V${Y(h*.78)}" stroke="${a}" stroke-width="${spF(W*.6)}" vector-effect="non-scaling-stroke" stroke-linecap="round"/><circle cx="${X(w*k)}" cy="${Y(h*.86)}" r="${spF(w*.07)}" fill="${c}" ${OLW}/>`).join('');
    case 'wick': return `<circle cx="${X(0)}" cy="${Y(h/2)}" r="${spF(w/2)}" fill="${a}" ${OLW}/>` + spKitPrim('candle', {...P, x0:x0, y:y + h*.14, w:w*.5, h:h*.62});
    /* 焰灵 */
    case 'flame': { const d = `M${X(0)} ${Y(0)}Q${X(w*.16)} ${Y(h*.22)} ${X(w*.3)} ${Y(h*.1)}Q${X(w*.62)} ${Y(h*.5)} ${X(w*.44)} ${Y(h*.8)}Q${X(w*.3)} ${Y(h)} ${X(0)} ${Y(h)}Q${X(-w*.3)} ${Y(h)} ${X(-w*.44)} ${Y(h*.8)}Q${X(-w*.62)} ${Y(h*.5)} ${X(-w*.32)} ${Y(h*.14)}Q${X(-w*.16)} ${Y(h*.3)} ${X(0)} ${Y(0)}Z`;
      return cel(d, c, 1.2) + `<path d="M${X(0)} ${Y(h*.34)}Q${X(w*.3)} ${Y(h*.62)} ${X(w*.2)} ${Y(h*.84)}Q${X(0)} ${Y(h*.96)} ${X(-w*.2)} ${Y(h*.84)}Q${X(-w*.3)} ${Y(h*.62)} ${X(0)} ${Y(h*.34)}Z" fill="${a}"/>`; }
    case 'coldCore': { const d = `M${X(0)} ${Y(0)}L${X(w*.34)} ${Y(h*.22)}L${X(w*.46)} ${Y(h*.62)}L${X(0)} ${Y(h)}L${X(-w*.46)} ${Y(h*.62)}L${X(-w*.34)} ${Y(h*.22)}Z`;
      return cel(d, l, 1.1) + `<path d="M${X(0)} ${Y(0)}V${Y(h)}M${X(-w*.46)} ${Y(h*.62)}L${X(w*.46)} ${Y(h*.62)}M${X(-w*.34)} ${Y(h*.22)}L${X(0)} ${Y(h*.62)}L${X(w*.34)} ${Y(h*.22)}" fill="none" stroke="${c}" stroke-width=".45"/>`; }
    case 'tongue': { const d = `M${X(-w*.36)} ${Y(0)}Q${X(-w*.52)} ${Y(h*.5)} ${X(-w*.2)} ${Y(h)}Q${X(w*.1)} ${Y(h*.78)} ${X(w*.34)} ${Y(h*.96)}Q${X(w*.5)} ${Y(h*.44)} ${X(w*.36)} ${Y(0)}Z`;
      return cel(d, c, 1) + `<path d="M${X(-w*.2)} ${Y(h*.12)}Q${X(w*.18)} ${Y(h*.4)} ${X(-w*.06)} ${Y(h*.82)}" fill="none" stroke="${a}" stroke-width="${spF(w*.12)}" stroke-linecap="round"/>`; }
    case 'tongueFeet': return [-1, 1].map(s=>{ const d = `M${X(s*w*.12)} ${Y(0)}Q${X(s*w*.36)} ${Y(h*.5)} ${X(s*w*.28)} ${Y(h)}Q${X(s*w*.08)} ${Y(h*.7)} ${X(s*w*.02)} ${Y(h*.2)}Z`; return cel(d, c, .5); }).join('');
    case 'spark': { const d = `M${X(0)} ${Y(0)}L${X(w*.16)} ${Y(h*.34)}L${X(w*.5)} ${Y(h*.5)}L${X(w*.16)} ${Y(h*.66)}L${X(0)} ${Y(h)}L${X(-w*.16)} ${Y(h*.66)}L${X(-w*.5)} ${Y(h*.5)}L${X(-w*.16)} ${Y(h*.34)}Z`; return cel(d, a, .7) + `<circle cx="${X(0)}" cy="${Y(h*.5)}" r="${spF(w*.14)}" fill="${l === '#7a1d0b' ? '#fff' : '#fff'}"/>`; }
    case 'ember': return `<path d="M${X(0)} ${Y(0)}L${X(w*.5)} ${Y(h*.36)}L${X(w*.3)} ${Y(h)}H${X(-w*.3)}L${X(-w*.5)} ${Y(h*.36)}Z" fill="${l}" ${OLW}/><path d="M${X(0)} ${Y(h*.3)}L${X(w*.2)} ${Y(h*.5)}L${X(w*.1)} ${Y(h*.8)}H${X(-w*.1)}L${X(-w*.2)} ${Y(h*.5)}Z" fill="${a}"/>`;
    /* 时针兽 */
    case 'dial': { const r = Math.min(w*.42, h*.6), cx = x0, cy = y + h*.5;
      return `<circle cx="${spF(cx)}" cy="${spF(cy)}" r="${spF(r)}" fill="${c}" ${OLW}/><circle cx="${spF(cx)}" cy="${spF(cy)}" r="${spF(r*.78)}" fill="${l}" ${OLW}/>` + Array.from({length:12}, (_, i)=>{ const t = i*Math.PI/6, r1 = r*.66, r2 = r*(i%3 ? .72 : .76); return `<path d="M${spF(cx + Math.cos(t)*r1)} ${spF(cy + Math.sin(t)*r1)}L${spF(cx + Math.cos(t)*r2)} ${spF(cy + Math.sin(t)*r2)}" stroke="${a}" stroke-width="${i%3 ? .35 : .6}" stroke-linecap="round"/>`; }).join('')
        + `<path d="M${spF(cx - r*.78)} ${spF(cy)}A${spF(r*.78)} ${spF(r*.78)} 0 0 0 ${spF(cx + r*.78)} ${spF(cy)}Z" fill="${OL}" opacity=".12"/>`; }
    case 'gearSeg': case 'gear': { const r = name==='gear' && w>h*1.2 ? Math.min(w*.42, h*.6) : Math.min(w, h)*.5, cx = x0, cy = y + h*.5, n = name==='gear' ? 10 : 9;
      const d = Array.from({length:n*2}, (_, i)=>{ const t = i*Math.PI/n, rr = i%2 ? r*.84 : r; const t1 = t - Math.PI/n*.32, t2 = t + Math.PI/n*.32; return `${i ? 'L' : 'M'}${spF(cx + Math.cos(t1)*rr)} ${spF(cy + Math.sin(t1)*rr)}L${spF(cx + Math.cos(t2)*rr)} ${spF(cy + Math.sin(t2)*rr)}`; }).join('') + 'Z';
      return cel(d, c, 1) + `<circle cx="${spF(cx)}" cy="${spF(cy)}" r="${spF(r*.58)}" fill="${name==='gear' ? spMixC(c, '#fff', .2) : spShade(c, -.12)}" ${OLW}/>` + (name==='gearSeg' ? `<circle cx="${spF(cx)}" cy="${spF(cy)}" r="${spF(r*.22)}" fill="${a}" ${OLW}/>` : ''); }
    case 'needle': return `<path d="M${X(0)} ${Y(0)}L${X(w*.14)} ${Y(h*.7)}L${X(0)} ${Y(h*.82)}L${X(-w*.14)} ${Y(h*.7)}Z" fill="${c}" ${OLW}/><circle cx="${X(0)}" cy="${Y(h*.78)}" r="${spF(w*.22)}" fill="${a}" ${OLW}/>`;
    case 'tickEars': return [-1, 1].map(s=>`<path d="M${X(s*w*.22)} ${Y(h)}L${X(s*w*.36)} ${Y(0)}L${X(s*w*.08)} ${Y(h*.7)}Z" fill="${a}" ${OLW}/>`).join('');
    case 'tickFeet': return [-.36, -.12, .12, .36].map(k=>`<rect x="${X(w*k - w*.07)}" y="${Y(0)}" width="${spF(w*.14)}" height="${spF(h)}" rx="${spF(w*.05)}" fill="${a}" ${OLW}/>`).join('');
    case 'handTail': return `<path d="M${X(0)} ${Y(h)}L${X(w)} ${Y(0)}" stroke="${OL}" stroke-width="${spF(W*2)}" vector-effect="non-scaling-stroke" stroke-linecap="round"/><path d="M${X(0)} ${Y(h)}L${X(w)} ${Y(0)}" stroke="${a}" stroke-width="${spF(W*.8)}" vector-effect="non-scaling-stroke" stroke-linecap="round"/><path d="M${X(w)} ${Y(0)}l${spF(-w*.28)} ${spF(h*.06)} ${spF(w*.14)} ${spF(h*.2)}Z" fill="${a}" ${OLW}/>`;
    case 'hands': return `<circle cx="${X(0)}" cy="${Y(h/2)}" r="${spF(w/2)}" fill="${l}" ${OLW}/><path d="M${X(0)} ${Y(h/2)}V${Y(h*.14)}M${X(0)} ${Y(h/2)}L${X(w*.3)} ${Y(h*.62)}" stroke="${a}" stroke-width=".55" stroke-linecap="round"/>`;
    /* 星辉兽 */
    case 'star': { const cx = x0, cy = y + h*.56, R = Math.min(w*.5, h*.68); let d = ''; for(let i=0;i<10;i++){ const t = -Math.PI/2 + i*Math.PI/5, r = i%2 ? R*.5 : R; d += `${i ? 'L' : 'M'}${spF(cx + r*Math.cos(t))} ${spF(cy + r*Math.sin(t))}`; }
      return cel(d + 'Z', c, 1.1) + `<circle cx="${spF(cx)}" cy="${spF(cy)}" r="${spF(R*.3)}" fill="${l}" opacity=".9"/>`; }
    case 'constSeg': { const d = `M${X(-w*.34)} ${Y(h*.06)}Q${X(-w*.5)} ${Y(h*.5)} ${X(-w*.3)} ${Y(h*.94)}H${X(w*.3)}Q${X(w*.5)} ${Y(h*.5)} ${X(w*.34)} ${Y(h*.06)}Z`, pts = [[-.26, .2], [.18, .3], [-.1, .6], [.28, .78], [-.3, .84]];
      return cel(d, c, 1) + `<path d="M${pts.map(([u, v])=>`${X(w*u)} ${Y(h*v)}`).join('L')}" fill="none" stroke="${l}" stroke-width=".5" stroke-dasharray="1 .7"/>` + pts.map(([u, v])=>`<circle cx="${X(w*u)}" cy="${Y(h*v)}" r=".7" fill="${a}" ${thin}/>`).join(''); }
    case 'dust': return `<circle cx="${X(0)}" cy="${Y(h*.5)}" r="${spF(w*.42)}" fill="${c}" ${OLW}/>` + [[.5, .1], [-.5, .2], [.4, .9]].map(([u, v])=>`<path d="M${X(w*u)} ${Y(h*v - 1)}l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4Z" fill="${a}"/>`).join('');
    case 'dustTail': return [0, 1, 2, 3].map(i=>`<circle cx="${X(w*(.2 + i*.24))}" cy="${Y(h*(1 - i*.24))}" r="${spF(1.1 - i*.18)}" fill="${i%2 ? a : l}" ${OLW}/>`).join('');
    case 'pawFeet': case 'nubFeet': return [-1, 1].map(s=>`<ellipse cx="${X(s*w*.24)}" cy="${Y(h*.55)}" rx="${spF(w*.17)}" ry="${spF(h*.42)}" fill="${c}" ${OLW}/><path d="M${X(s*w*.24 - w*.06)} ${Y(h*.86)}v-.6M${X(s*w*.24 + w*.06)} ${Y(h*.86)}v-.6" ${thin}/>`).join('');
    case 'starCore': return spKitPrim('star', {...P, c:a}) ;
    /* 齿轮卫 */
    case 'toothSeg': { const d = `M${X(-w*.36)} ${Y(0)}H${X(w*.36)}L${X(w*.4)} ${Y(h*.9)}Q${X(0)} ${Y(h*1.02)} ${X(-w*.4)} ${Y(h*.9)}Z`;
      return [-1, 1].map(s=>[.2, .5, .8].map(v=>`<path d="M${X(s*w*.38)} ${Y(h*v - h*.08)}h${spF(s*w*.1)}v${spF(h*.16)}h${spF(-s*w*.1)}Z" fill="${spShade(c, -.15)}" ${OLW}/>`).join('')).join('') + cel(d, c, 1) + `<path d="M${X(-w*.22)} ${Y(h*.2)}H${X(w*.22)}V${Y(h*.62)}Q${X(0)} ${Y(h*.76)} ${X(-w*.22)} ${Y(h*.62)}Z" fill="${a}" ${OLW}/>`; }
    case 'bolt': { const r = Math.min(w, h)*.5, cx = x0, cy = y + h*.5; const d = Array.from({length:6}, (_, i)=>{ const t = i*Math.PI/3; return `${i ? 'L' : 'M'}${spF(cx + Math.cos(t)*r)} ${spF(cy + Math.sin(t)*r)}`; }).join('') + 'Z'; return cel(d, c, .8); }
    case 'mechFeet': return [-1, 1].map(s=>`<path d="M${X(s*w*.3 - w*.14)} ${Y(0)}H${X(s*w*.3 + w*.14)}V${Y(h*.7)}H${X(s*w*.3 + w*.2)}V${Y(h)}H${X(s*w*.3 - w*.2)}V${Y(h*.7)}H${X(s*w*.3 - w*.14)}Z" fill="${spShade(c, -.1)}" ${OLW}/>`).join('');
    case 'toothShield': { const r = Math.min(w, h)*.5, cx = x0, cy = y + h*.5; const d = Array.from({length:16}, (_, i)=>{ const t = i*Math.PI/8, rr = i%2 ? r*.86 : r; return `${i ? 'L' : 'M'}${spF(cx + Math.cos(t)*rr)} ${spF(cy + Math.sin(t)*rr)}`; }).join('') + 'Z';
      return cel(d, a, .8) + `<circle cx="${spF(cx)}" cy="${spF(cy)}" r="${spF(r*.42)}" fill="${c}" ${OLW}/>`; }
    case 'axle': return `<circle cx="${X(0)}" cy="${Y(h/2)}" r="${spF(w/2)}" fill="${a}" ${OLW}/><circle cx="${X(0)}" cy="${Y(h/2)}" r="${spF(w*.2)}" fill="${l}" ${OLW}/>`;
    case 'gearMini': return spKitPrim('gear', P);
    /* 通用（自动元素表） */
    case 'subject': return `<g transform="translate(${X(0)} ${Y(0)}) scale(${spF(w/28)} ${spF(h/34)}) translate(-24 -9.5)">${P.subjectSvg||''}</g>`;
    case 'subjectMini': return `<g transform="translate(${X(0)} ${Y(0)}) scale(${spF(Math.min(w/28, h/34))}) translate(-24 -9.5)">${P.subjectSvg||''}</g>`;
    case 'pod': { const d = `M${X(-w*.34)} ${Y(h*.04)}Q${X(-w*.52)} ${Y(h*.5)} ${X(-w*.32)} ${Y(h*.96)}H${X(w*.32)}Q${X(w*.52)} ${Y(h*.5)} ${X(w*.34)} ${Y(h*.04)}Z`; return cel(d, c, 1) + `<path d="M${X(-w*.46)} ${Y(h*.42)}H${X(w*.46)}V${Y(h*.56)}H${X(-w*.46)}Z" fill="${a}" ${OLW}/><ellipse cx="${X(0)}" cy="${Y(h*.72)}" rx="${spF(w*.2)}" ry="${spF(h*.14)}" fill="${l}"/>`; }
    case 'wisp': return [-1, 1].map(s=>`<path d="M${X(s*w*.16)} ${Y(0)}Q${X(s*w*.34)} ${Y(h*.5)} ${X(s*w*.12)} ${Y(h)}Q${X(s*w*.04)} ${Y(h*.5)} ${X(s*w*.04)} ${Y(0)}Z" fill="${spMixC(a, '#fff', .45)}" ${OLW}/>`).join('');
  }
  return typeof spElDraw==='function' ? spElDraw(name, P) : '';   /* v3.0 元素素材库 */
}
/* 伙伴（LV3）：LV1 那个单一元素的小号，围在身边 */
function spKitComp(kit, P, pts){ return pts.map(([x0, y0, s])=>spKitPrim(kit.comp || kit.lv1, {...P, x0, y:y0, w:5*s, h:6*s})).join(''); }
/* LV4 元素质变 / LV5 法相（按元素表） */
function spKitMut(kit, P, R, side){
  const {c, a, l, OL} = P;
  if(side==='f'){ if(kit.mut!=='orbitGate') return ''; const cy = spF(R*7 + 1), arc = `M-21 ${cy}A21 6.5 0 0 0 21 ${cy}`;   /* 星轨前半圈压在身体前面，环才像套在星体上的门 */
    return `<g transform="rotate(-14 0 ${cy})"><path d="${arc}" fill="none" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/><path d="${arc}" fill="none" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>${[[-12, 5.3], [9, 5.9]].map(([u, v])=>spKitPrim('dust', {...P, x0:u, y:+cy + v - 2, w:3.6, h:3.6})).join('')}</g>`; }
  switch(kit.mut){
    case 'lanternTree': return [-1, 1].map(s=>`<path d="M${spF(s*4)} 14Q${spF(s*12)} 10 ${spF(s*14)} 4M${spF(s*4)} 24Q${spF(s*13)} 22 ${spF(s*15)} 15" fill="none" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/><path d="M${spF(s*4)} 14Q${spF(s*12)} 10 ${spF(s*14)} 4M${spF(s*4)} 24Q${spF(s*13)} 22 ${spF(s*15)} 15" fill="none" stroke="${P.a}" stroke-width="1.1" stroke-linecap="round"/>` + [[14, 4], [15, 15]].map(([u, v])=>spKitPrim('lanternSeg', {...P, x0:s*u, y:v, w:5.6, h:6})).join('')).join('');
    case 'coldCore': return [-21, -17, 17, 21].map(u=>`<path d="M${u} ${spF(R*9)}q2-3 0-6t0-6 0-6" fill="none" stroke="${OL}" stroke-width="2" stroke-linecap="round"/><path d="M${u} ${spF(R*9)}q2-3 0-6t0-6 0-6" fill="none" stroke="${spMixC(a, '#fff', .2)}" stroke-width=".9" stroke-linecap="round"/>`).join('');   /* 热浪：身侧扭动的气流线；火芯变冷晶见 core4 */
    case 'reverse': return `<path d="M-13 12A14 14 0 0 1 13 12" fill="none" stroke="${OL}" stroke-width="2.2" stroke-linecap="round"/><path d="M-13 12A14 14 0 0 1 13 12" fill="none" stroke="${l}" stroke-width="1"/><path d="M-13 12l-1.6-2.6 3.2-.2Z" fill="${l}" stroke="${OL}" stroke-width=".4"/>`;
    case 'orbitGate': { const cy = spF(R*7 + 1); return `<g transform="rotate(-14 0 ${cy})"><ellipse cx="0" cy="${cy}" rx="21" ry="6.5" fill="none" stroke="${OL}" stroke-width="2.4"/><ellipse cx="0" cy="${cy}" rx="21" ry="6.5" fill="none" stroke="${a}" stroke-width="1.1"/>${spKitPrim('dust', {...P, x0:4, y:+cy - 8.3, w:3.2, h:3.2})}</g>`; }
    case 'restructure': return [[-11, 14], [11, 20], [-10, 30]].map(([u, v])=>spKitPrim('gearMini', {...P, x0:u, y:v, w:5, h:5})).join('');
  }
  return '';
}
function spKitFx(kit, P, R, ghost){
  const {OL} = P, c2 = P.dom || P.a, lt = spMixC(c2, '#fff', .6), g = s=>`<g class="hu-faxiang" opacity=".26">${s}</g>`;
  switch(kit.fx){
    case 'thousand': return g(spKitPrim('lantern', {...P, c:lt, a:c2, l:lt, x0:0, y:-6, w:34, h:R*10 + 8}) + [[-17, 6], [17, 4], [-19, 26], [19, 28], [-15, 44], [15, 46]].map(([u, v])=>spKitPrim('lanternSeg', {...P, c:lt, a:c2, x0:u, y:v, w:6, h:7})).join(''));
    case 'bigFlame': return g(spKitPrim('flame', {...P, c:lt, a:spMixC(c2, '#fff', .3), x0:0, y:-8, w:40, h:R*10 + 10}));
    case 'corridor': return g([16, 22, 28].map(r=>`<circle cx="0" cy="${spF(R*4)}" r="${r}" fill="none" stroke="${c2}" stroke-width="1.6" stroke-dasharray="${r/4} ${r/6}"/>`).join('') + `<path d="M0 ${spF(R*4)}V${spF(R*4 - 26)}M0 ${spF(R*4)}L18 ${spF(R*4 + 10)}" stroke="${c2}" stroke-width="3" stroke-linecap="round"/>`);
    case 'constBeast': { const pts = [[-18, 2], [-8, -4], [6, -2], [16, 6], [18, 22], [8, 30], [-10, 32], [-20, 20]]; return g(`<path d="M${pts.map(p=>p.join(' ')).join('L')}Z" fill="none" stroke="${c2}" stroke-width="1" stroke-dasharray="2 1.4"/>` + pts.map(([u, v])=>`<circle cx="${u}" cy="${v}" r="1.6" fill="${lt}" stroke="${c2}" stroke-width=".5"/>`).join('')); }
    case 'meshing': return g([[-14, 10, 12], [14, 20, 10], [-6, 38, 9]].map(([u, v, r])=>spKitPrim('gear', {...P, c:lt, a:c2, l:lt, x0:u, y:v - r, w:r*2, h:r*2})).join(''));
    default: return g(ghost);
  }
}

/* 元素部件（Q 版身体坐标：身体约 x10~38、y10~44），按元素表逐阶段挂到本体上 */
var SP_KIT_ACC = {
  sp_obj_lantern:{2:[['handle',24,1,15,7,'b'],['tassel',24,43.6,12,5,'b']], 3:[['handle',24,1,16,7,'b'],['tassel',24,43.6,13,5.4,'b']], 4:[['handle',24,1,16,7,'b'],['tassel',24,43.6,14,5.6,'b']], 5:[['tassel',24,43.6,14,5.6,'b']]},
  sp_flame:{2:[['spark',11,20,5,6,'f'],['spark',38,26,4,5,'f']], 3:[['spark',9,16,5,6,'f'],['spark',40,22,5,6,'f'],['tongueFeet',24,40,16,6,'b']], 4:[['spark',8,14,5,6,'f'],['spark',41,18,5,6,'f']], 5:[]},
  sp_hour:{2:[['handTail',33,30,10,10,'b']], 3:[['handTail',33,29,11,11,'b'],['gearSeg',10,34,8,8,'b']], 4:[['handTail',33,29,11,11,'b'],['gearSeg',9,33,8,8,'b'],['gearSeg',39,36,7,7,'b']], 5:[['handTail',33,29,11,11,'b']]},
  sp_starbeast:{2:[['dustTail',33,30,10,10,'b']], 3:[['dustTail',33,29,11,11,'b'],['dust',10,18,4,4,'f']], 4:[['dustTail',33,29,11,11,'b']], 5:[['dustTail',33,29,11,11,'b']]},
  sp_gear:{2:[['gearMini',10,30,7,7,'b']], 3:[['toothShield',11,30,9,9,'f'],['gearMini',38,20,6,6,'b']], 4:[['toothShield',11,30,10,10,'f']], 5:[['toothShield',11,30,10,10,'f']]},
};
function spKitAccSvg(kit, def, st, P){
  const L = SP_KIT_ACC[def.id]?.[st] || []; let b = '', f = '';
  L.forEach(([n, cx, y, w, h, lay])=>{ const s = spKitPrim(n, {...P, x0:cx, y, w, h}); if(lay==='f') f += s; else b += s; });
  return {back:b, front:f};
}
/* 元素法相（LV5，身后独立成层，可收起，不遮挡本体；Q 版坐标） */
function spKitFxQ(kit, P, ghost){ return `<g transform="translate(24 -2) scale(.95)">${spKitFx(kit, P, 4.2, ghost)}</g>`; }
/* 主组装：v2.5 Q 版构图层次 + 赛尔号式画法 + 元素部件 */
function spHuInner(C){
  const {def, st, A, x, id, d5, PT, NE, bk} = C, kit = spKitOf(def), OL = C.dk, W = spQLineW(C.opts.size);
  let mi = 0, mdefs = '';
  const cel = (d, col, off=.9)=>{ const k = `kc${id}_${mi++}`; mdefs += `<mask id="${k}" maskUnits="userSpaceOnUse" x="-40" y="-40" width="130" height="130"><path d="${d}" fill="#fff"/><path d="${d}" fill="#000" transform="translate(${spF(-off)} ${spF(-off*.85)})"/></mask>`;
    return `<path d="${d}" fill="${col}" stroke="${OL}" stroke-width="${W}" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><path d="${d}" fill="${OL}" opacity=".22" mask="url(#${k})"/>`; };
  const dom = (()=>{ try{ return SP_LV5_DOM[spPathOf(def).dom].c[1]; }catch(_e){ return C.ac; } })(), KC = kit.auto ? [C.c, C.ac, C.belly] : kit.cols.map(h=>spSatC(h, 1.3)), P = {c:KC[0], a:KC[1], l:KC[2], OL, W, cel, st, dom};
  const m = `qm${id}`, sil = spBody(bk, '#fff', '#fff', '#fff');
  mdefs += `<mask id="${m}s" maskUnits="userSpaceOnUse" x="-20" y="-20" width="88" height="88">${sil}<g transform="translate(-3 -2.4)">${spBody(bk, '#000', '#000', '#000')}</g></mask><mask id="${m}k" maskUnits="userSpaceOnUse" x="-20" y="-20" width="88" height="88">${sil}</mask>`;
  const outline = `<g class="q-outline">${spQThick(spBody(bk, OL, OL, OL), W*2, OL)}</g>`;
  const shadow = `<g mask="url(#${m}s)"><rect x="-20" y="-20" width="88" height="88" fill="${OL}" opacity=".22"/></g>`;
  const glint = `<g mask="url(#${m}k)"><ellipse cx="17.5" cy="18" rx="2.6" ry="1.4" transform="rotate(-35 17.5 18)" fill="#fff" opacity=".9"/><circle cx="21.4" cy="15.2" r=".8" fill="#fff" opacity=".9"/></g>`;
  const sc = [0, .78, .9, 1, 1.1, 1.22][st], ty = C.ty;
  /* LV1：维持 v2.5 蛋形（蛋形 / 壳纹 / 印记 / 破口）；有元素表的精灵，破口露出的是它的单一元素 */
  let shell = C.shell || '';
  if(st===1 && !kit.auto && typeof spEggOf==='function'){ const E1 = spEggOf(def), F1 = E1.E, [px, py] = E1.peek==='left' ? F1.sh[0] : E1.peek==='right' ? F1.sh[1] : F1.top;
    shell = shell.replace(/<g class="egg-peek"[\s\S]*?<\/g>/, '') + `<g class="egg-peek kit-peek">${spKitPrim(kit.lv1, {...P, x0:px, y:py - 5.2, w:4.4, h:5.4})}</g>`; }
  const E = kit.auto && typeof spNameElems==='function' && st>=2 ? spNameElems(def, st) : null;
  /* v3.0 全量元素表：部件按本体实际外框挂；LV3 队形 / LV4 质变变体 / LV5 法相 / 本体纹样 */
  let GB = null, GM = null; if(kit.gen){ const b0 = spBodyBox(bk), sm = /scale\(([-\d.]+) ([-\d.]+)\)/.exec(C.bodyTf || ''), sx = sm ? +sm[1] : 1, sy = sm ? +sm[2] : 1;
    GB = {x0:24 + (b0.x0 - 24)*sx, x1:24 + (b0.x1 - 24)*sx, y0:43 + (b0.y0 - 43)*sy, y1:43 + (b0.y1 - 43)*sy}; P.u = (C.opts.size || 96)/48; if(st===4) GM = spGenMut(kit, def, P, GB, bk, W); }
  const ACC = st===1 ? {back:'', front:''} : kit.gen ? spGenAcc(kit, st, P, GB, C.fy) : kit.auto ? spNameElemSvg(def, st, {...x, c:C.c, ac:C.ac}, E, OL) : spKitAccSvg(kit, def, st, P);
  const mut = GM ? GM.back : st===4 && !kit.auto ? `<g class="kit-mut" transform="translate(24 6) scale(.9)">${spKitMut(kit, P, 4)}</g>` : '', mutF = GM ? GM.front : st===4 && !kit.auto ? `<g class="kit-mut" transform="translate(24 6) scale(.9)">${spKitMut(kit, P, 4, 'f')}</g>` : '';
  const comp = st===3 && kit.gen ? spGenComp(kit, P, GB) : st===3 && !kit.auto ? spKitComp(kit, P, [[7, 14, .8], [41, 12, .75], [6, 34, .7], [42, 36, .7]]) : '';
  const core = st>=4 && !kit.auto && kit.core ? spKitPrim(st===4 && kit.core4 || kit.core, {...P, ...(kit.gen ? {x0:(GB.x0 + GB.x1)/2} : {}), ...(st===4 && kit.core4==='coldCore' ? {c:'#2b9fd6', a:'#8fe3ff', l:'#c9f5ff'} : {}), x0:24, y:C.cy - 2.6, w:st===5 ? 5.4 : 4.4, h:st===5 ? 5.4 : 4.4}) : C.core;
  const fx = st===5 && !C.opts.noFaxiang && A.C?.flags?.faxiang!==false ? (kit.gen ? spGenFx(kit, P, bk, dom) : kit.auto ? `<g class="hu-faxiang" transform="translate(24 22) scale(1.45) translate(-24 -27)" opacity=".22">${spBody(bk, spMixC(dom, '#fff', .6), dom, spMixC(dom, '#fff', .85))}</g>` : spKitFxQ(kit, P, '')) : '';
  const ne = s=>(s||'').replace(/<g class="nm-(halo|crown)[\s\S]*?<\/g>/g, '');   /* 光环 / 皇冠不默认添加 */
  return (`<g class="sv-all q q-l${st} ${st>=5 ? 'sv-float' : ''}" transform="${C.comp}">${C.opts.noDomain ? '' : kit.gen && PT.dom ? spGenDom(kit, def, P) : PT.dom}${C.backdrop}<defs>${mdefs}</defs>
    <g transform="translate(24 ${ty}) scale(${sc}) translate(-24 ${-ty}) translate(0 ${C.lift})">${fx}${(d5||[]).map(r=>r.aura).join('')}<g class="sv-back">${PT.back}${comp}${mut}${ne(NE.back)}${ACC.back}${C.backS}</g>
    ${outline}<g class="sv-body"${C.op!=null ? ` opacity="${C.op}"` : ''}><g ${C.bodyTf}>${C.bodyS}${kit.gen ? `<g mask="url(#${m}k)">${spGenPat(kit.pat, P, GB)}${GM ? GM.ovl : ''}</g>` : ''}${C.ovl}${C.pat}${C.mat}${C.neon}${shadow}${glint}</g></g>${C.bodyMask}
    <g class="sv-face">${C.face}</g><g class="sv-front">${C.frontS}${ne(NE.front)}${ACC.front}</g>${core}${mutF}<g class="sv-fx">${(d5||[]).map(r=>r.front).join('')}</g>${shell}</g></g>`).replace(/<text\b[\s\S]*?<\/text>/g, '');   /* 精灵画面不出现文字 */
}
/* ---------- 重点 50 只（换图片素材）+ 灰度发布 ---------- */
function spAssetKey50(){
  let C = null; try{ C = spArtCfg(); }catch(_e){} if(Array.isArray(C?.assets?.key) && C.assets.key.length) return C.assets.key.slice(0, 50);
  const L = spLib(), out = [];
  SP_EVO_PATH_SRC.trim().split('\n').forEach(l=>{ const n = l.split('|')[0], P = SP_EVO_PATH[n], d = L.find(o=>o.name?.[0]===n && (!P?.cat || o.cat===P.cat)); if(d && !out.includes(d.id) && out.length<50) out.push(d.id); });
  L.forEach(d=>{ if(out.length<50 && d.forms && !/^sp_slot/.test(d.id) && !out.includes(d.id)) out.push(d.id); });
  return out;
}
/* 灰度：开启后只有白名单账号或按账号哈希落在比例内的人看到图片素材，其余人继续看矢量图 */
function spAssetGrayOk(C){ const G = C?.assets?.gray; if(!G?.on) return true; let me = ''; try{ me = spMe(); }catch(_e){}
  if((G.users||[]).includes(me)) return true; return spHash('gray|' + me + '|' + (C.assets.ver||1)) % 100 < Math.max(0, Math.min(100, +G.pct||0)); }
/* 后台：重点 50 只的出图进度 + 灰度设置 */
function spAssetKeyHtml(){
  const C = spArtCfg(), list = C.assets.list || {}, G = C.assets.gray || {}, ids = spAssetKey50();
  const rows = ids.map(id=>{ const d = spDef(id) || spTvDef(id); if(!d) return null; const n = [1,2,3,4,5].filter(s=>list[spAssetKey(id, s)]).length;
    return [spiritView(d, 48, 3, {nofx:true}), `<b>${escapeHtml(trT(d.name))}</b><br><code class="mono" data-i18n-ignore="1">${escapeHtml(spArtCatKey(d))}/${escapeHtml(id)}</code>`, `${n}/5 ${n===5 ? '✅' : n ? '🟡' : '⬜'}`]; }).filter(Boolean);
  const done = rows.filter(r=>r[2].startsWith('5/')).length;
  return spArtCard(`⭐ ${escapeHtml(tx(`重点 50 只 · 图片素材进度（${done}/${ids.length} 全套）`, `Key 50 · image progress (${done}/${ids.length} complete)`, `50 tinh linh trọng điểm (${done}/${ids.length})`))}`, `<p class="hint">${escapeHtml(tx('这 50 只换成图片素材，其余精灵保持矢量；缺哪张图就自动用矢量顶上。导出设定卡后按卡出图，放进对应目录并点「扫描资源目录」。','These 50 switch to image assets and the rest stay vector; any missing image falls back to vector automatically. Export the briefs, draw from them, drop the PNGs into the folders and click "Scan asset folder".','50 tinh linh này dùng ảnh, phần còn lại vẫn là vector; thiếu ảnh tự quay về vector.'))}</p><div class="sp-form-act" style="justify-content:flex-start"><button type="button" class="btn btn-primary btn-sm" data-act="spAssetBriefAll">${escapeHtml(tx('导出 50 只出图设定卡','Export briefs for the 50','Xuất thẻ thiết kế 50 tinh linh'))}</button></div>${spArtT(['', tx('精灵','Spirit','Tinh linh'), tx('已有图片','Images','Ảnh')], rows)}`)
    + spArtCard(`🧪 ${escapeHtml(tx('灰度发布（asset_gray_release）','Gray release (asset_gray_release)','Phát hành dần'))}`, `<form id="spGrayForm" class="sp-form" onsubmit="return false"><label class="chipcheck"><input type="checkbox" name="on" ${G.on ? 'checked' : ''}> ${escapeHtml(tx('开启灰度：只有部分账号看到图片素材','Gray release on: only some accounts see image assets','Bật phát hành dần'))}</label>
      <div class="sp-form-row"><label>${escapeHtml(tx('放量比例 %','Rollout %','Tỉ lệ %'))}<input name="pct" type="number" min="0" max="100" value="${+G.pct||0}"></label><label>${escapeHtml(tx('白名单账号（逗号分隔）','Allow-list accounts (comma-separated)','Tài khoản ưu tiên'))}<input name="users" value="${escapeAttr((G.users||[]).join(', '))}" data-i18n-ignore="1"></label></div>
      <p class="hint">${escapeHtml(tx('按「账号 + 资源版本」哈希分桶，同一账号结果稳定；版本 +1 会重新分桶。关闭灰度 = 全量。','Buckets are hashed from account + asset version, so each account stays stable; bumping the version reshuffles. Turning it off releases to everyone.','Chia nhóm theo tài khoản + phiên bản.'))}</p>
      <div class="sp-form-act"><button type="button" class="btn btn-primary btn-sm" data-act="spAssetGraySave">${escapeHtml(tx('保存灰度设置','Save gray release','Lưu'))}</button></div></form>`);
}

/* ---------- 出图设定卡（资源包附带）：按元素表写，画师 / AI 生图按卡出 lv1~lv5.png，放进 assets/spirits/{类别}/{id}/ 即自动替换矢量图 ---------- */
var SP_KIT_BRIEF = {
  sp_obj_lantern:[['一点烛火','a single candle flame'],['灯罩本体 + 头顶提手 + 下垂流苏（灯芯）','the lantern shade with a handle on top and tassels (the wick) below'],['夜市长街，小烛火伙伴围着飘','a night-market street with little candle-flame companions floating around'],['聚合：灯树，枝杈挂满小灯笼','aggregation: a lantern tree hung with little lanterns'],['灯之域 + 千灯法相；灯芯成核心徽记','the realm of lanterns with a thousand-lantern dharma form; the wick becomes the core emblem']],
  sp_flame:[['一粒火星','a single spark'],['火苗本体 + 迸出的火星','the flame body with sparks flying off'],['余烬生态，火舌化成短足，小火星伙伴','an ember ecosystem; fire tongues become stubby feet; little spark companions'],['概念：火芯化为冷晶，热浪扭曲空气','concept: the fire core turns to cold crystal, heat waves bend the air'],['焰之域 + 巨焰法相；火芯成核心徽记','the realm of flame with a giant-flame dharma form; the fire core becomes the core emblem']],
  sp_hour:[['一根秒针','a single second hand'],['表盘本体 + 刻度耳 + 指针尾','the dial body with tick-mark ears and a clock-hand tail'],['星象盘，齿轮在身侧，小秒针伙伴','a star-chart dial with gears at its side and little second-hand companions'],['时间：表盘逆转，齿轮反向','time: the dial runs backwards, gears turn the other way'],['时之域 + 时针回廊法相；双针成核心徽记','the realm of time with a clock-hand corridor dharma form; the two hands become the core emblem']],
  sp_starbeast:[['一粒星尘','a single speck of stardust'],['星核本体 + 星尘尾','the star-core body with a stardust tail'],['星图，小星尘伙伴连成星座','a star map; little stardust companions join into constellations'],['空间：星轨环成门','space: star orbits ring into a gate'],['星之域 + 星座兽法相；星核成核心徽记','the realm of stars with a constellation-beast dharma form; the star core becomes the core emblem']],
  sp_gear:[['一颗轴心螺栓','a single axle bolt'],['齿轮本体 + 身侧小齿轮','the gear body with a small gear at its side'],['网络节点，齿牙盾，小齿轮伙伴','network nodes, a toothed shield, little gear companions'],['结构：拆开重组，咬合齿轮浮在身边','structure: taken apart and rebuilt, meshing gears floating around'],['律之域 + 咬合齿轮阵法相；轴心成核心徽记','the realm of order with a meshing-gear dharma form; the axle becomes the core emblem']]};
function spArtBrief(def, st){
  const kit = spKitOf(def), S = spPathSubj(def), N = def.forms?.[0]?.[st-1] || def.name?.[0] || '', Ne = def.forms?.[1]?.[st-1] || def.name?.[1] || '', P = spPathOf(def), col = kit.cols.join(' / ');
  const els = [kit.els.map(e=>e[0]).join('、'), kit.els.map(e=>e[1]).join(', ')], step = [['单一元素','a single element'],['元素组合','element combination'],['元素环境 / 伙伴','element setting / companions'],[`元素质变（${SP_LV4_MUT[P.mut].n[0]}）`, `element transformation (${SP_LV4_MUT[P.mut].n[1]})`],['元素升华（领域 + 法相）','element sublimation (realm + dharma form)']][st-1];
  const des = st===1 ? (E1=>[`${E1.n[0]}，壳纹：${SP_EGG_PAT[E1.pat][0]}，蛋壳正面印有「${S[0]}」剪影，${SP_EGG_PEEK[E1.peek][0]}露出${(SP_KIT_BRIEF[def.id] || kit.brief)?.[0]?.[0] || `「${S[0]}」碎片`}`, `${E1.n[1]}, shell pattern: ${SP_EGG_PAT[E1.pat][1]}, a ${S[1]} silhouette stamped on the front, the ${SP_EGG_PEEK[E1.peek][1].toLowerCase()} reveals ${(SP_KIT_BRIEF[def.id] || kit.brief)?.[0]?.[1] || `a ${S[1]} fragment`}`])(spEggOf(def)) : (SP_KIT_BRIEF[def.id] || kit.brief)?.[st-1] || [st===1 ? `「${S[0]}」的一个碎片` : st===3 ? spPathText(def, 3)[0] : st===4 ? spPathText(def, 4)[0] : st===5 ? `${spDomName(def)[0]} + 「${S[0]}」法相` : `「${S[0]}」本体 + 名称元素部件`, st===1 ? `a fragment of the ${S[1]}` : st===3 ? spPathText(def, 3)[1] : st===4 ? spPathText(def, 4)[1] : st===5 ? `${spDomName(def)[1]} with a ${S[1]} dharma form` : `the ${S[1]} body with name-element parts`];
  const style = [`赛尔号式粗描边赛璐璐：粗黑描边 3~5px，大色块，主色 ≤ 3 色（${col}），两阶硬阴影，无渐变，高饱和，头大身小、造型夸张；Q 版精灵，不拟人；透明背景，512×512 起；脚下不画光圈 / 地圈 / 法阵；翅膀 / 光环 / 皇冠不默认添加`, `Seer-style thick-outline cel: bold black outlines 3–5px, big flat colour blocks, at most 3 main colours (${col}), two-step hard shadows, no gradients, saturated, big head and small body, exaggerated; chibi spirit, never humanoid; transparent background, 512×512 or larger; no ground ring, floor glow or magic circle; no wings, halo or crown unless they are core elements`];
  return {stage:st, name:[N, Ne], zh:`【LV${st} ${N}】核心元素：${els[0]}。${step[0]}：${des[0]}。\n画风：${style[0]}\n禁止：拟人化、脚下光圈、脱离名称、与同类 / 跨类雷同、套模板`, en:`[LV${st} ${Ne}] Core elements: ${els[1]}. ${step[1]}: ${des[1]}.\nStyle: ${style[1]}\nAvoid: anything humanoid, ground rings, anything unrelated to the name, looking like other spirits, templated designs`};
}
async function spAssetBriefAll(){
  const files = [], ids = spAssetKey50();
  ids.forEach(id=>{ const d = spDef(id) || spTvDef(id); if(!d) return; const dir = `assets/spirits/${spArtCatKey(d)}/${d.id}/`, B = [1,2,3,4,5].map(n=>spArtBrief(d, n));
    files.push({name:`${dir}art_brief.md`, data:new TextEncoder().encode(`# ${trT(d.name)} · ${d.id}\n\n` + B.map(b=>`## LV${b.stage}\n\n${b.zh}\n\n${b.en}\n`).join('\n'))}); });
  files.push({name:'assets/spirits/KEY50.txt', data:new TextEncoder().encode(ids.join('\n'))});
  const a = document.createElement('a'); a.href = URL.createObjectURL(spZipStore(files)); a.download = `spirit_key50_briefs.zip`; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  toast(tx('已导出 50 只出图设定卡','Exported briefs for the 50','Đã xuất'), 'ok');
}
function spKitText(def){ const k = spKitOf(def); return {zh:k.els.map(e=>e[0]).join('、'), en:k.els.map(e=>e[1]).join(', '), auto:k.auto}; }
