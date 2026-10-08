/* =========================================================
   v2.4 多画派渲染层：每个画派有自己的着色 / 光影 / 线条；材质按「材质 → 画派」表现；LV5 专属领域光 + 觉醒背景
   · 全部画在身体遮罩内（脸部区域另有挖空遮罩），不遮挡脸 / 核心 / 剪影；无脚下光圈
========================================================= */
function spArtRng(def, k){ return spRng(spHash(String(def?.id||'x') + '|' + k)); }
function spArtDefs(A, x, bk){
  const id = x.id, fs = A.prop.fs, rx = spF(9*x.k*fs), ry = spF(6*x.k*fs);
  const box = 'maskUnits="userSpaceOnUse" x="-14" y="-14" width="76" height="76"';
  const cres = (n, dx, dy)=>`<mask id="${n}_${id}" ${box}><use href="#aw_${id}"/><use href="#ak_${id}" transform="translate(${dx} ${dy})"/></mask>`;
  return `<defs><g id="aw_${id}">${spBody(bk,'#fff','#fff','#fff')}</g><g id="ak_${id}">${spBody(bk,'#000','#000','#000')}</g></defs>
    <mask id="am_${id}" ${box}><use href="#aw_${id}"/></mask><mask id="mm_${id}" ${box}><use href="#aw_${id}"/><ellipse cx="24" cy="${spF(x.fy+.4)}" rx="${rx}" ry="${ry}" fill="#000"/></mask>
    ${cres('c1',-2.4,-2.8)}${cres('c2',-4.4,-5)}${cres('c3',1.25,1.45)}${cres('c4',-1.1,.5)}${cres('c5',.6,.7)}${cres('c6',0,1.3)}${cres('c7',2.6,2.4)}`;
}
const spArtRect = (fill, op)=>`<rect x="-14" y="-14" width="76" height="76" fill="${fill}" opacity="${spF(op)}"/>`;
/* ---------- 画派着色（I = 强度，副画派叠加时 < 1） ---------- */
function spArtShade(P, A, x, bk, I=1){
  const id = x.id, c = x.c, sh = spMixC(spShade(c,-.42), '#312e81', .18), R = spArtRng(x.def, 'sh'+P), fy = x.fy;
  switch(P){
    case 'A': return `<g mask="url(#c1_${id})">${spArtRect(sh, .36*I)}</g><g mask="url(#c2_${id})">${spArtRect(sh, .22*I)}</g>
      <ellipse cx="18" cy="${spF(fy-7)}" rx="3.3" ry="1.6" transform="rotate(-35 18 ${spF(fy-7)})" fill="#fff" opacity="${spF(.6*I)}"/><circle cx="21.6" cy="${spF(fy-9.2)}" r=".7" fill="#fff" opacity="${spF(.7*I)}"/>`;
    case 'B': { let s = ''; for(let i=0;i<7;i++){ const lt = i<4, x0 = lt ? 11+R()*13 : 23+R()*13, y0 = lt ? 15+R()*13 : 31+R()*12;
        s += `<path d="M${spF(x0)} ${spF(y0)}q${spF(2+R()*3)} ${spF(-1-R()*2)} ${spF(5+R()*4)} ${spF(R()*2-1)}" stroke="${lt ? spMixC(c,'#fff8e7',.45) : spShade(c,-.4)}" stroke-width="${spF(1.4+R()*1.6)}" stroke-linecap="round" fill="none" opacity="${spF((.2+R()*.16)*I)}"/>`; }
      return `<radialGradient id="pb_${id}" cx=".32" cy=".22" r=".85"><stop offset="0" stop-color="#fff6e0" stop-opacity="${spF(.42*I)}"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="${sh}" stop-opacity="${spF(.55*I)}"/></radialGradient>
        <linearGradient id="pt_${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbeb" stop-opacity="${spF(.35*I)}"/><stop offset=".38" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <rect x="6" y="8" width="36" height="40" fill="url(#pb_${id})"/><rect x="6" y="6" width="36" height="42" fill="url(#pt_${id})"/>${s}`; }
    case 'C': { let s = ''; [[c,.45],[x.ac,.32],[x.belly,.5]].forEach(([col,o],i)=>{ s += `<radialGradient id="wc${i}_${id}"><stop offset="0" stop-color="${spMixC(col,'#fff',.15)}" stop-opacity="${spF(o*I)}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient><circle cx="${spF(15+R()*18)}" cy="${spF(18+R()*22)}" r="${spF(6+R()*5)}" fill="url(#wc${i}_${id})"/>`; });
      const pool = spArtLine(spBody(bk,'none', spShade(c,-.3),'none'), {C:{flags:{lineDiff:true}}, p:'C'}).replace(/stroke-width="([\d.]+)"/g, (m,v)=>`stroke-width="${spF(+v*4.5)}"`);
      return `${s}<g opacity="${spF(.3*I)}">${pool}</g><radialGradient id="wb_${id}" cx=".3" cy=".25" r=".5"><stop offset="0" stop-color="#fff" stop-opacity="${spF(.5*I)}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><rect x="6" y="8" width="36" height="40" fill="url(#wb_${id})"/>`; }
    case 'D': return `<pattern id="dp_${id}" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="${sh}"/><rect x="1" y="1" width="1" height="1" fill="${sh}"/></pattern><pattern id="sl_${id}" width="2" height="1.5" patternUnits="userSpaceOnUse"><rect width="2" height=".45" fill="#000" opacity=".2"/></pattern>
      <g mask="url(#c1_${id})">${spArtRect(`url(#dp_${id})`, .6*I)}</g>${spArtRect(`url(#sl_${id})`, I)}<rect x="15" y="${spF(Math.round(fy-9))}" width="3" height="2" fill="#fff" opacity="${spF(.75*I)}"/><rect x="18" y="${spF(Math.round(fy-10))}" width="2" height="1" fill="#fff" opacity="${spF(.6*I)}"/>`;
    case 'E': { const rc = x.rimC; return `<radialGradient id="eb_${id}" cx=".5" cy="0" r=".9"><stop offset="0" stop-color="${rc}" stop-opacity="${spF(.3*I)}"/><stop offset="1" stop-color="${rc}" stop-opacity="0"/></radialGradient>${I>=1 ? spArtRect(spMixC(spShade(c,-.3),'#0b1020',.3), .5) : ''}<rect x="6" y="6" width="36" height="42" fill="url(#eb_${id})"/>
      <g mask="url(#c3_${id})">${spArtRect(rc, .95*I)}</g><g mask="url(#c7_${id})">${spArtRect(rc, .45*I)}</g><g mask="url(#c4_${id})">${spArtRect(rc, .6*I)}</g><g mask="url(#c6_${id})">${spArtRect('#fff', .4*I)}</g>`; }
    case 'F': return I<1 ? `<g transform="translate(24 32) scale(.86) translate(-24 -32)" opacity="${spF(.7*I)}">${spArtLine(spBody(bk,'none', x.dk,'none'), {C:{flags:{lineDiff:true}}, p:'F'})}</g>` : '';
    case 'G': return `<radialGradient id="gr_${id}" cx=".36" cy=".28" r=".78"><stop offset="0" stop-color="#fff" stop-opacity="${spF(.55*I)}"/><stop offset=".26" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#020617" stop-opacity="${spF(.42*I)}"/></radialGradient>
      <rect x="8" y="10" width="32" height="38" fill="url(#gr_${id})"/><ellipse cx="24" cy="${spF(fy+10)}" rx="14" ry="2.4" fill="#bfdbfe" opacity="${spF(.26*I)}"/>
      <g opacity="${spF(.3*I)}">${spArtLine(spBody(bk,'none','#ffffff','none'), {C:{flags:{lineDiff:true}}, p:'G'}).replace(/stroke-width="([\d.]+)"/g, 'stroke-width="1.6"')}</g>
      <ellipse cx="18.6" cy="${spF(fy-7.5)}" rx="2.2" ry="1.1" transform="rotate(-30 18.6 ${spF(fy-7.5)})" fill="#fff" opacity="${spF(.95*I)}"/><circle cx="21.4" cy="${spF(fy-9)}" r=".45" fill="#fff" opacity="${spF(.9*I)}"/>`;
    case 'H': return `<g transform="translate(24 32) scale(.86) translate(-24 -32)" opacity="${spF(.85*I)}">${spBody(bk,'none','#e2a72e','none').replace(/stroke-width="([\d.]+)"/g, 'stroke-width=".55"')}</g>
      <pattern id="fp_${id}" width="6" height="4" patternUnits="userSpaceOnUse"><path d="M0 4a3 3 0 0 1 6 0" fill="none" stroke="${x.ac}" stroke-width=".55"/><circle cx="3" cy="3.1" r=".45" fill="#e2a72e"/></pattern>
      <rect x="-14" y="${spF(fy+5.8)}" width="76" height="40" fill="url(#fp_${id})" opacity="${spF(.6*I)}"/>`;
    case 'X': return spArtShade('B', A, x, bk, .8*I) + spArtShade('G', A, x, bk, .55*I) + spArtAuthority(A, x, I);
  }
  return '';
}
/* 管理员权限纹样（身上的金色纹带 + 徽记；不是脚下光圈） */
function spArtAuthority(A, x, I=1){
  const y = x.fy + 8.2; let s = `<path d="M8 ${spF(y)}Q24 ${spF(y+4.2)} 40 ${spF(y)}" fill="none" stroke="#fbbf24" stroke-width=".8" opacity="${spF(.95*I)}"/><path d="M8 ${spF(y+1.4)}Q24 ${spF(y+5.6)} 40 ${spF(y+1.4)}" fill="none" stroke="#a78bfa" stroke-width=".45" opacity="${spF(.8*I)}"/>`;
  [[14,y+2.1],[24,y+3.2],[34,y+2.1]].forEach(([a,b])=>{ s += `<path d="M${a} ${spF(b-1)}l1 1-1 1-1-1Z" fill="#fde68a" stroke="#8a5a00" stroke-width=".25"/>`; });
  if(A.st>=3) s += `<path d="M14.2 ${spF(x.fy+3)}h3.4v2.2q0 2.1-1.7 2.9q-1.7-.8-1.7-2.9Z" fill="#6d28d9" stroke="#fbbf24" stroke-width=".45"/><path d="M15.9 ${spF(x.fy+4)}l.5 1h1l-.8.6.3 1-.9-.6-.9.6.3-1-.8-.6h1Z" fill="#fde68a"/>`;
  return s;
}
/* ---------- 材质（按「材质 → 画派」表现，非统一自发光 + 粒子） ---------- */
function spArtMat(m, A, x, I=1){
  const R = spArtRng(x.def, 'm'+m), c = x.c, ac = x.ac, fy = x.fy, id = x.id; let s = '';
  const P = (d, col, w, o, ex='')=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="${spF(w)}" stroke-linecap="round" stroke-linejoin="round" opacity="${spF(o*I)}" ${ex}/>`;
  switch(m){
    case 'fire': { const g = `<linearGradient id="fi_${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f97316" stop-opacity="${spF(.7*I)}"/><stop offset=".6" stop-color="#fde047" stop-opacity="${spF(.55*I)}"/><stop offset="1" stop-color="#fff7d6" stop-opacity="0"/></linearGradient>`;
      for(let i=0;i<4;i++){ const x0 = 12+i*7+R()*2, h = 9+R()*8, w = 2.6+R()*1.6; s += `<path d="M${spF(x0-w)} 48C${spF(x0-w)} ${spF(48-h*.5)} ${spF(x0-.5)} ${spF(48-h*.7)} ${spF(x0+R()*1.4-.7)} ${spF(48-h)}C${spF(x0+.6)} ${spF(48-h*.6)} ${spF(x0+w)} ${spF(48-h*.45)} ${spF(x0+w)} 48Z" fill="url(#fi_${id})"/>`; }
      return g + `<g class="am-fire">${s}</g>` + P(`M${spF(16+R()*4)} ${spF(fy+7)}q2-3 1-6`, '#fff7d6', .9, .5); }
    case 'ice': return `<path d="M24 ${spF(fy+4)}L33 ${spF(fy+10)}L27 ${spF(fy+17)}Z" fill="#fff" opacity="${spF(.22*I)}"/><path d="M24 ${spF(fy+4)}L15 ${spF(fy+11)}L22 ${spF(fy+17)}Z" fill="#0c4a6e" opacity="${spF(.12*I)}"/>${P(`M24 ${spF(fy+4)}L33 ${spF(fy+10)}L27 ${spF(fy+17)}L22 ${spF(fy+17)}L15 ${spF(fy+11)}Z`, '#f0f9ff', .35, .7)}${P(`M10 ${spF(fy-2)}L38 ${spF(fy+12)}`, '#a5f3fc', 1.4, .3)}`;
    case 'light': return `<g mask="url(#c6_${id})">${spArtRect('#fffbeb', .55*I)}</g>`;
    case 'dark': return `<g opacity="${spF(.45*I)}">${spBody(x.bk,'none','#020617','none').replace(/stroke-width="([\d.]+)"/g,'stroke-width="3.2"')}</g><linearGradient id="dk_${id}" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="#020617" stop-opacity="0"/><stop offset="1" stop-color="#020617" stop-opacity="${spF(.4*I)}"/></linearGradient><rect x="6" y="8" width="36" height="42" fill="url(#dk_${id})"/>`;
    case 'thunder': return P(`M${spF(13+R()*3)} ${spF(fy+3)}l3 3-2 1 4 4-2 1 4 4`, '#fef08a', .9, .85) + P(`M${spF(31+R()*3)} ${spF(fy+4)}l-2.5 3 2 .8-3 3.5`, '#fff', .55, .7);
    case 'wind': return P(`M10 ${spF(fy+6)}q6-3 11 0t9-1q3-1 3-4`, '#ffffff', 1.4, .4) + P(`M13 ${spF(fy+11)}q7-2 12 1t8 0`, '#ffffff', 1, .3);
    case 'water': return P(`M8 ${spF(fy+8)}q3-1.6 6 0t6 0t6 0t6 0t6 0`, spMixC(x.belly,'#fff',.4), 1.2, .45) + P(`M8 ${spF(fy+12.5)}q3-1.6 6 0t6 0t6 0t6 0t6 0`, '#e0f2fe', .9, .32);
    case 'wood': for(let i=0;i<3;i++) s += P(`M${spF(12+i*1.5)} ${spF(fy+6+i*3.2)}q6 -2 12 0t12 0`, spShade(c,-.3), .5, .55); return s + `<circle cx="${spF(30+R()*3)}" cy="${spF(fy+9)}" r="1.4" fill="none" stroke="${spShade(c,-.3)}" stroke-width=".45" opacity="${spF(.5*I)}"/>`;
    case 'stone': for(let i=0;i<12;i++) s += `<circle cx="${spF(10+R()*28)}" cy="${spF(14+R()*32)}" r="${spF(.25+R()*.35)}" fill="${i%3 ? spShade(c,-.45) : '#fff'}" opacity="${spF(.55*I)}"/>`; return s + P(`M${spF(31+R()*3)} ${spF(fy+3)}l-1.6 2.6 1.2 1.4-1.8 2.8`, spShade(c,-.5), .45, .7);
    case 'metal': return P(`M6 ${spF(fy-12)}L42 ${spF(fy+6)}`, '#ffffff', 2.4, .32) + P(`M6 ${spF(fy-7)}L42 ${spF(fy+11)}`, '#ffffff', .7, .5) + P(`M6 ${spF(fy)}L42 ${spF(fy+18)}`, spShade(c,-.4), 2.6, .22);
    case 'gem': return `<radialGradient id="gm_${id}"><stop offset="0" stop-color="${spMixC(ac,'#fff',.5)}" stop-opacity="${spF(.55*I)}"/><stop offset="1" stop-color="${ac}" stop-opacity="0"/></radialGradient><circle cx="24" cy="${spF(fy+10)}" r="8" fill="url(#gm_${id})"/>`
      + `<path d="M24 ${spF(fy+5)}L30 ${spF(fy+10)}L24 ${spF(fy+16)}L18 ${spF(fy+10)}Z M18 ${spF(fy+10)}H30 M24 ${spF(fy+5)}V${spF(fy+16)}" fill="none" stroke="#fff" stroke-width=".35" opacity="${spF(.65*I)}"/><path d="M24 ${spF(fy+5)}L30 ${spF(fy+10)}H24Z" fill="#fff" opacity="${spF(.25*I)}"/>`;
    case 'cloth': return P(`M14 ${spF(fy+6)}q2 5 0 10`, spShade(c,-.28), .6, .55) + P(`M33 ${spF(fy+6)}q-2 5 0 10`, spShade(c,-.28), .6, .55) + P(`M19 ${spF(fy+8)}q1 4 0 7`, '#fff', .5, .35)
      + Array.from({length:6},(_,i)=>`<circle cx="${spF(13+i*4.4)}" cy="${spF(fy+14.6)}" r=".55" fill="${ac}" opacity="${spF(.7*I)}"/>`).join('');
    case 'leather': return `<ellipse cx="${spF(15+R()*3)}" cy="${spF(fy+10)}" rx="3.2" ry="2.2" fill="${spShade(c,-.25)}" opacity="${spF(.4*I)}"/><ellipse cx="${spF(32-R()*3)}" cy="${spF(fy+12)}" rx="2.6" ry="1.8" fill="${spShade(c,-.25)}" opacity="${spF(.4*I)}"/>` + P(`M10 ${spF(fy+7)}Q24 ${spF(fy+12)} 38 ${spF(fy+7)}`, spMixC(c,'#fff',.55), .45, .7, 'stroke-dasharray="1 .8"');
    case 'energy': { const cx = 24, cy = fy+11; let h = ''; for(let i=0;i<6;i++){ const a = Math.PI/3*i; h += `${i?'L':'M'}${spF(cx+4.2*Math.cos(a))} ${spF(cy+4.2*Math.sin(a))}`; } return P(h+'Z', ac, .5, .85) + P(`M10 ${spF(cy)}H${spF(cx-4.2)}M${spF(cx+4.2)} ${spF(cy)}H38`, ac, .4, .7) + P(`M${cx} ${spF(cy-4.2)}V${spF(cy-7.5)}`, ac, .4, .6); }
    case 'code': for(let i=0;i<9;i++) s += `<rect x="${spF(Math.round(10+R()*26))}" y="${spF(Math.round(fy+5+R()*11))}" width="1.2" height="1.2" fill="${i%3 ? ac : '#fff'}" opacity="${spF(.75*I)}"/>`; return s + `<pattern id="cs_${id}" width="2" height="1.2" patternUnits="userSpaceOnUse"><rect width="2" height=".35" fill="${ac}" opacity=".25"/></pattern><rect x="6" y="${spF(fy+4)}" width="36" height="20" fill="url(#cs_${id})" opacity="${spF(I)}"/>`;
    case 'rune': return P(`M13 ${spF(fy+12)}l2-3.4 2 3.4Z`, ac, .5, .85) + `<circle cx="24" cy="${spF(fy+13)}" r="1.6" fill="none" stroke="${ac}" stroke-width=".5" opacity="${spF(.85*I)}"/><circle cx="24" cy="${spF(fy+13)}" r=".4" fill="${ac}" opacity="${spF(.9*I)}"/>` + P(`M33 ${spF(fy+9)}v3.6m-1.6-1.8h3.2`, ac, .5, .85);
    case 'spore': for(let r=0;r<4;r++) for(let q=0;q<9;q++) if((r+q)%2===0) s += `<rect x="${spF(8+q*3.6)}" y="${spF(fy+6+r*3)}" width=".8" height=".8" fill="${ac}" opacity="${spF(.55*I)}"/>`; return s;
    case 'cloud': return `<radialGradient id="cl_${id}"><stop offset="0" stop-color="#fff" stop-opacity="${spF(.55*I)}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><circle cx="15" cy="${spF(fy+12)}" r="6" fill="url(#cl_${id})"/><circle cx="33" cy="${spF(fy+11)}" r="5" fill="url(#cl_${id})"/><circle cx="24" cy="${spF(fy-9)}" r="5" fill="url(#cl_${id})"/>`;
    case 'star': return P(`M9 ${spF(fy+9)}q8-4 15 0t15-1`, '#7c3aed', 3.2, .22) + P(`M10 ${spF(fy+13)}q8-3 14 1t14 0`, '#38bdf8', 2.2, .2)
      + [[14,fy+8],[30,fy+12],[35,fy+6]].map(([a,b])=>`<path d="M${spF(a)} ${spF(b-1.1)}l.3.8.8.3-.8.3-.3.8-.3-.8-.8-.3.8-.3Z" fill="#fff" opacity="${spF(.9*I)}"/>`).join('');
    case 'dream': return P(`M8 ${spF(fy+9)}q4-3 8 0t8 0t8 0t8 0`, '#c4b5fd', 1.6, .35) + `<path d="M33 ${spF(fy+4)}a2.6 2.6 0 1 0 2.2 3.9a2 2 0 1 1-2.2-3.9Z" fill="#ede9fe" opacity="${spF(.6*I)}"/>`;
  }
  return '';
}
/* ---------- 稀有度点缀（左上边缘细光；剪影画派改为染色边缘光） ---------- */
function spArtRarity(A, x){
  if(!A.C.flags.rarAccent || A.st<2) return ''; const R = SP_ART_RAR[A.rar]; if(!R) return '';
  const id = x.id, f = R.length>1 ? `url(#ra_${id})` : R[0];
  const g = R.length>1 ? `<linearGradient id="ra_${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${R[0]}"/><stop offset="1" stop-color="${R[1]}"/></linearGradient>` : '';
  return `${g}<g mask="url(#c5_${id})">${spArtRect(f, A.p==='E' ? .9 : .8)}</g>`;
}
/* ---------- LV5 专属：领域光（身体内的光柱 + 核心光） ---------- */
function spArtDomain(A, x){
  const id = x.id, col = A.admin ? '#fde68a' : spMixC(x.ac,'#fff',.35);
  return `<linearGradient id="dl_${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".6"/><stop offset=".7" stop-color="${col}" stop-opacity="0"/></linearGradient><path d="M19 4L29 4L32 48L16 48Z" fill="url(#dl_${id})" opacity=".55"/>`;
}
/* ---------- 九大觉醒体 LV5 专属背景（身后，不是脚下光圈） ---------- */
function spArtBackdrop(A, x){
  const R = A.ref; if(!R || A.st<5) return ''; const id = x.id, c0 = x.def.col?.[0] || '#f97316';
  switch(R.bd){
    case 'sun': return `<g class="ab-sun"><radialGradient id="bs_${id}"><stop offset="0" stop-color="#fffbeb" stop-opacity=".95"/><stop offset=".55" stop-color="#fde68a" stop-opacity=".75"/><stop offset="1" stop-color="#f97316" stop-opacity="0"/></radialGradient><circle cx="24" cy="18" r="17" fill="url(#bs_${id})"/>${Array.from({length:12},(_,i)=>{ const a = i*Math.PI/6; return `<path d="M${spF(24+13*Math.cos(a))} ${spF(18+13*Math.sin(a))}L${spF(24+20*Math.cos(a))} ${spF(18+20*Math.sin(a))}" stroke="#fdba74" stroke-width="1.1" stroke-linecap="round" opacity=".55"/>`; }).join('')}</g>`;
    case 'ridge': return `<g class="ab-ridge"><path d="M-8 40L2 22L9 30L18 12L26 26L33 10L43 28L50 18L58 40Z" fill="#7c2d12" opacity=".8"/><path d="M2 22L9 30L5 40Z M18 12L26 26L20 40Z M33 10L43 28L36 40Z M50 18L58 40L46 40Z" fill="#fb923c" opacity=".55"/><path d="M18 12L13 40H20Z M33 10L28 40H36Z" fill="#431407" opacity=".45"/></g>`;
    case 'palace': return `<g class="ab-palace" fill="#e0f2fe" stroke="#38bdf8" stroke-width=".5" opacity=".85"><path d="M2 40V20l3-5 3 5v20Z"/><path d="M40 40V20l3-5 3 5v20Z"/><path d="M8 40V12l4-7 4 7v28Z"/><path d="M32 40V12l4-7 4 7v28Z"/><path d="M5 26h38M5 31h38" fill="none" stroke="#7dd3fc" stroke-dasharray="1.4 1"/></g>`;
    case 'moons': return `<g class="ab-moons"><radialGradient id="bm_${id}"><stop offset="0" stop-color="#e0f2fe" stop-opacity=".7"/><stop offset="1" stop-color="#e0f2fe" stop-opacity="0"/></radialGradient><circle cx="9" cy="9" r="11" fill="url(#bm_${id})"/><circle cx="39" cy="5" r="8" fill="url(#bm_${id})"/><path d="M9 2a7 7 0 1 0 6 10.5a5.6 5.6 0 1 1-6-10.5Z" fill="#f0f9ff"/><path d="M39 0a5 5 0 1 0 4.2 7.6a4 4 0 1 1-4.2-7.6Z" fill="#bae6fd"/></g>`;
    case 'fall': return `<g class="ab-fall">${[[10,4],[22,7],[34,5]].map(([a,w])=>`<path d="M${a} -8h${w}l${w*1.4} 52h${-w*3.2}Z" fill="#e0f2fe" opacity=".28"/>`).join('')}${[[6,30],[42,26],[12,44],[38,42],[24,-4]].map(([a,b],i)=>`<circle cx="${a}" cy="${b}" r="${.7+i%2*.5}" fill="#f8fafc" opacity=".8"/>`).join('')}</g>`;
    case 'throne': return `<g class="ab-throne"><path d="M8 46V14L14 4L24 9L34 4L40 14V46Z" fill="#b45309"/><path d="M8 14L14 4L17 12V46H8Z" fill="#fbbf24" opacity=".75"/><path d="M40 14L34 4L31 12V46H40Z" fill="#78350f" opacity=".7"/><path d="M14 4L24 9L34 4" fill="none" stroke="#fde68a" stroke-width=".8"/><circle cx="24" cy="9" r="1.6" fill="#38bdf8" stroke="#fde68a" stroke-width=".5"/></g>`;
    case 'loop': return `<g class="ab-loop" fill="none" stroke-linecap="round"><path d="M24 22c-6-9-20-9-20 0s14 9 20 0s20-9 20 0s-14 9-20 0Z" stroke="#052e16" stroke-width="3.2" opacity=".75"/><path d="M24 22c-6-9-20-9-20 0s14 9 20 0s20-9 20 0s-14 9-20 0Z" stroke="#bef264" stroke-width=".6" opacity=".9"/><path d="M41 18.2l3 3.6-4.4.6" stroke="#bef264" stroke-width=".7"/></g>`;
    case 'swarm': return `<g class="ab-swarm">${[[5,10,1],[42,8,.8],[2,30,.7],[45,30,.9],[12,-2,.6],[36,-4,.7]].map(([a,b,s])=>`<g transform="translate(${a} ${b}) scale(${s})"><path d="M0 0c-3-4-7-3-6 1c1 3 4 3 6-1Zm0 0c3-4 7-3 6 1c-1 3-4 3-6-1Zm0 0c-2 2-4 5-2 6c1 0 2-3 2-6Zm0 0c2 2 4 5 2 6c-1 0-2-3-2-6Z" fill="#1e1b4b" stroke="#f0abfc" stroke-width=".45"/></g>`).join('')}</g>`;
    case 'ship': return `<g class="ab-ship"><path d="M-4 10L10 2H38L52 10L38 16H10Z" fill="#475569"/><path d="M-4 10L10 2H24V16H10Z" fill="#94a3b8"/><path d="M24 2H38L52 10L38 16H24Z" fill="#334155"/><path d="M14 2l4-5h12l4 5Z" fill="#a5b4fc" opacity=".85"/>${[14,20,26,32].map(a=>`<rect x="${a}" y="8" width="2.4" height="1.4" fill="#86efac"/>`).join('')}</g>`;
  }
  return '';
}
/* ---------- 联名装饰（右上肩部，受安全区保护） ---------- */
function spArtDeco(A, x){
  if(!A.ad || A.st<2 || !A.lod) return ''; const K = SP_ART_COLLAB[A.ad]; if(!K) return ''; const [p0, p1] = K.pal, X = 35.2, Y = x.fy - 8.5, dk = x.dk;
  const T = s=>`<g class="ad-deco" transform="translate(${spF(X)} ${spF(Y)})">${s}</g>`;
  switch(K.deco){
    case 'bow': return T(`<path d="M0 0l-3.2-2v4Z M0 0l3.2-2v4Z" fill="${p0}" stroke="${dk}" stroke-width=".35"/><circle r="1" fill="${p1}"/>`);
    case 'heart': return T(`<path d="M0 2.2c-3-2-3.6-3.8-2.2-4.6c1-.6 1.8 0 2.2.8c.4-.8 1.2-1.4 2.2-.8c1.4.8.8 2.6-2.2 4.6Z" fill="${p0}" stroke="${dk}" stroke-width=".3"/>`);
    case 'star': case 'sparkle': return T(`<path d="M0-2.8l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" fill="${p1}" stroke="${dk}" stroke-width=".25"/>`);
    case 'bowtie': return T(`<path d="M0 0l-2.6-1.6v3.2Z M0 0l2.6-1.6v3.2Z" fill="${p1}" stroke="${dk}" stroke-width=".3"/><rect x="-.6" y="-.6" width="1.2" height="1.2" fill="${p0}"/>`);
    case 'bell': return T(`<circle r="1.7" fill="#fde047" stroke="${dk}" stroke-width=".3"/><path d="M-1.7 0h3.4" stroke="${dk}" stroke-width=".3"/><circle cy=".9" r=".3" fill="${dk}"/>`);
    case 'card': return T(`<rect x="-1.6" y="-2.2" width="3.2" height="4.4" rx=".5" fill="#fff" stroke="${p0}" stroke-width=".4"/><path d="M0-1.1l.9 1.1-.9 1.1-.9-1.1Z" fill="${p0}"/>`);
    case 'vfin': return T(`<path d="M-3-2.4L0 .8 3-2.4L0-.4Z" fill="#fbbf24" stroke="${dk}" stroke-width=".3"/>`);
    case 'emblem': return T(`<circle r="2" fill="${p0}" stroke="${dk}" stroke-width=".3"/><path d="M0-1.2l.35.9.95.05-.75.6.27.92L0 .75l-.82.52.27-.92-.75-.6.95-.05Z" fill="#fff"/>`);
    case 'stitch': return T(`<path d="M-1.6-1.6l3.2 3.2M1.6-1.6l-3.2 3.2M-1.6 2.6l3.2 0" stroke="${dk}" stroke-width=".45" stroke-linecap="round"/>`);
    case 'spark': return T(`<path d="M-.4-2.6L1 -.2-.4 0 .6 2.6" fill="none" stroke="${p0}" stroke-width=".7" stroke-linecap="round" stroke-linejoin="round"/>`);
    case 'doodle': return T(`<path d="M0 0a.8.8 0 1 1 1 .8a1.6 1.6 0 1 1-2.2-1.4a2.4 2.4 0 1 1 3.2 2.4" fill="none" stroke="${p0}" stroke-width=".45" stroke-linecap="round"/>`);
    case 'swoosh': return `<g class="ad-deco" fill="none" stroke="${p1}" stroke-width=".6" stroke-linecap="round" opacity=".85"><path d="M7 ${spF(x.fy+2)}h-4M8 ${spF(x.fy+5)}h-5M7 ${spF(x.fy+8)}h-3"/></g>`;
    case 'gear': return T(`<circle r="1.8" fill="none" stroke="${p1}" stroke-width=".9" stroke-dasharray=".9 .6"/><circle r=".6" fill="${p0}"/>`);
    case 'note': return T(`<path d="M.8-2.6v3.6a1 .8 0 1 1-.6-.7V-2.6l1.8.6v1" fill="${dk}" stroke="${dk}" stroke-width=".25"/>`);
    case 'pixel': return T(`<rect x="-2" y="-2" width="1.8" height="1.8" fill="${p0}"/><rect x=".2" y="-2" width="1.8" height="1.8" fill="${p1}"/><rect x="-2" y=".2" width="1.8" height="1.8" fill="${p1}"/><rect x=".2" y=".2" width="1.8" height="1.8" fill="#e0f2fe"/>`);
    case 'wave': return T(`<path d="M-2.6 0q1.3-1.4 2.6 0t2.6 0M-2.6 1.6q1.3-1.4 2.6 0t2.6 0" fill="none" stroke="${p1}" stroke-width=".5" stroke-linecap="round"/>`);
    case 'steam': return T(`<path d="M-1.4 2q-1-1.2 0-2.4t0-2.4M.4 2q-1-1.2 0-2.4t0-2.4M2.2 2q-1-1.2 0-2.4t0-2.4" fill="none" stroke="#fff" stroke-width=".5" stroke-linecap="round" opacity=".9"/>`);
    case 'lotus': return T(`<path d="M0 1.6C-1-.4-.6-2 0-2.8C.6-2 1-.4 0 1.6Z M0 1.6C-2 1.4-2.8 0-2.6-1C-1.6-.8-.6 0 0 1.6Z M0 1.6C2 1.4 2.8 0 2.6-1C1.6-.8.6 0 0 1.6Z" fill="${p0}" stroke="${dk}" stroke-width=".25"/>`);
  }
  return '';
}
/* ---------- 汇总：身体层（spiritSvg 在身体组内调用） ---------- */
function spArtBodyLayers(A, x, bk){
  if(!A) return ''; const L = A.C.flags.lightDiff, id = x.id; x.bk = bk;
  let s = spArtDefs(A, x, bk);
  let shade = L || ['E'].includes(A.p) ? spArtShade(A.p, A, x, bk, 1) : spArtShade('A', A, x, bk, .7);
  if(A.s && L) shade += spArtShade(A.s, A, x, bk, A.st>=5 ? .5 : .45);
  if(A.admin && A.C.flags.admin && A.p!=='X' && A.st>=2) shade += spArtAuthority(A, x, .8);
  const I = A.st>=3 ? 1 : .6;
  const tex = m=>typeof spModelTex==='function' ? spModelTex(m, A, x, I) : spArtMat(m, A, x, I);
  const mats = A.p==='F' && A.st<3 ? '' : A.mats.map(tex).join('') + (A.domLight ? `<g class="dom-light">${tex(A.domLight)}</g>` : '');   /* 领域光：随领域出现，不算材质 */
  s += `<g mask="url(#am_${id})">${x.geoOvl||''}${shade}${A.ex ? spArtDomain(A, x) : ''}</g><g mask="url(#mm_${id})">${mats}</g>${spArtRarity(A, x)}`;
  return `<g class="art-layers">${s}</g>`;
}
/* 身体组滤镜（水彩边缘 / 厚涂笔触），小尺寸不加 */
function spArtBodyFilter(A){ if(!A || !A.lod || !A.C.flags.lineDiff) return ''; return A.p==='C' ? 'url(#spWcF)' : A.p==='B' || A.p==='X' ? 'url(#spPaintF)' : ''; }
function spArtSvgStyle(A, x, hue){
  const f = []; if(A && A.p==='D' && A.lod) f.push('url(#spPixelF)'); if(hue) f.push(`hue-rotate(${hue}deg)`);
  if(A && A.ex && A.lod) f.push(`drop-shadow(0 0 ${A.lod>1?3:2}px ${A.admin ? '#fbbf24' : spMixC(x.ac,'#fff',.3)})`);
  return f.length ? `filter:${f.join(' ')}` : '';
}
