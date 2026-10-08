/* =========================================================
   v2.4 后台「画派与建模」：ArtSchoolProvider / CategoryArtViewer / StageArtMigrationViewer / Material·Lighting·Composition·Line·PaletteArtViewer /
   CollabArtAdapter / AdminArtSchoolProvider / SkinArtSchoolViewer / AwakenArtSchoolViewer / Skeleton·Geometry·PartLibrary·MaterialNode·Rig·AnimationLogic·StageModel·AwakenModelViewer /
   AssetSpecViewer（命名 / 目录 / 版本 / 热更新 / 资源包导出）
   · 只有管理员可改；操作员在图鉴详情里能看到本精灵的画派与建模（访客看不到精灵系统）
========================================================= */
var SP_SKIN_RAR = {common:['普通','Common','Thường'], rare:['稀有','Rare','Hiếm'], epic:['史诗','Epic','Sử thi'], legend:['传说','Legendary','Huyền thoại'], limited:['绝版','Limited','Tuyệt bản'], festival:['节日','Festival','Lễ hội'], collab:['联名','Co-branded','Hợp tác'], admin:['管理员','Admin','Quản trị']};
SP_ADM_TABS.art = ['画派与建模','Art schools & modelling','Trường phái & mô hình'];
var SP_ART_TABS = {over:['总览与开关','Overview & switches','Tổng quan & công tắc'], school:['八大画派','Eight art schools','Tám trường phái'], cat:['类别映射','Category mapping','Ánh xạ theo hệ'], stage:['阶段迁移','Stage migration','Chuyển theo giai đoạn'],
  diff:['材质 · 光影 · 构图 · 线条 · 配色','Materials · light · composition · line · palette','Chất liệu · ánh sáng · bố cục · nét · màu'], model:['六层建模库','Six modelling layers','Sáu lớp mô hình'], collab:['联名画派','Collab schools','Phái hợp tác'],
  admin:['管理员画派','Admin school','Phái quản trị'], skin:['皮肤画派','Skin schools','Phái trang phục'], awaken:['九大觉醒体','Nine awakenings','Chín thể thức tỉnh'], anim:['动画规范','Animation spec','Quy chuẩn hoạt ảnh'], asset:['资源规范与热更新','Asset spec & hot update','Quy chuẩn tài nguyên & cập nhật nóng']};
var SP_ASSET_SPEC = {portrait:2048, card:512, avatar:128, silhouette:512, scales:[1,2,3], fmt:['PNG','WebP'], color:'sRGB', skel:['Spine','DragonBones'], opt:['Live2D','3D'], fps:[24,30],
  naming:'spirit_{id}_{stage}_{variant}.png', dir:'assets/spirits/{category}/{spirit_id}/', files:['lv1.png … lv5.png（512，@2x / @3x 同名后缀）','skins/{skin_id}_lv{n}.png','animations/{state}_lv{n}.json','effects/{fx}.png']};
function spArtCatName(k){ return trT(SP_FAMS[k]?.n || SP_ART_CAT_N[k] || [k,k,k]); }
function spArtCatKeys(){ return Object.keys(SP_ART_CAT); }
function spArtCatSample(k){
  if(k==='trial') return spTvDef('tv_hto_phoenix'); if(k==='ach') return (typeof spAchDefs==='function' && spAchDefs()[2]) || null;
  if(k==='adm') return (typeof spAdmLib==='function' && spAdmLib()[0]) || null; if(k==='hidden') return spLib().find(d=>d.hidden) || null;
  return spLib().find(d=>d.cat===k) || null;
}
function spArtSample(){ const S = spS(); return (S.artSample && (spDef(S.artSample) || spTvDef(S.artSample))) || spDef('sp_flame') || spLib()[0]; }
function spArtSampleSel(){ const cur = spArtSample()?.id, L = [...spLib().filter(d=>d.enabled!==false), ...Object.keys(SP_ART_REF).map(spTvDef).filter(Boolean)];
  return `<label class="sp-art-pick">${escapeHtml(tx('示例精灵','Sample spirit','Tinh linh mẫu'))}<select data-sp-input="artSample" aria-label="${escapeAttr(tx('示例精灵','Sample spirit','Tinh linh mẫu'))}">${L.map(d=>`<option value="${escapeAttr(d.id)}" ${d.id===cur?'selected':''}>${escapeHtml(trT(d.name))} · ${escapeHtml(spArtCatName(spArtCatKey(d)))}</option>`).join('')}</select></label>`; }
const spArtT = (heads, rows, cls='')=>`<div class="table-scroll"><table class="data-table sp-art-tbl ${cls}"><thead><tr>${heads.map(h=>`<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const spArtE = x=>escapeHtml(trT(x));
const spArtSch = k=>k && SP_ART_SCHOOLS[k] ? `<span class="sp-art-chip as-${k}">${k} ${spArtE(SP_ART_SCHOOLS[k].n)}</span>` : '—';
const spArtSk = k=>k && SP_SKEL[k] ? `<span class="sp-art-chip">${k} ${spArtE(SP_SKEL[k].n)}</span>` : '—';
const spArtGe = k=>k && SP_GEO[k] ? `<span class="sp-art-chip">${k} ${spArtE(SP_GEO[k].n)}</span>` : '—';
function spArtCard(title, body, cls=''){ return `<section class="sp-c4 sp-card wide sp-art-card ${cls}"><header class="c4-h"><div class="c4-title"><b class="c4-name">${title}</b></div></header><div class="c4-b">${body}</div></section>`; }
function spAdmArtHtml(){
  if(!spIsAdmin()) return ''; const S = spS(), tab = SP_ART_TABS[S.artTab] ? S.artTab : 'over';
  const nav = `<div class="sp-adm-more sp-art-tabs" role="tablist">${Object.keys(SP_ART_TABS).map(k=>`<button type="button" role="tab" aria-selected="${tab===k}" class="sp-pillbtn ${tab===k?'active':''}" data-act="spArtTab" data-v="${k}">${spArtE(SP_ART_TABS[k])}</button>`).join('')}</div>`;
  const body = {evo:typeof spArtEvoHtml==='function' ? spArtEvoHtml : spArtOverHtml, path:typeof spArtPathHtml==='function' ? spArtPathHtml : spArtOverHtml, over:spArtOverHtml, school:spArtSchoolHtml, cat:spArtCatHtml, stage:spArtStageHtml, diff:spArtDiffHtml, model:spArtModelHtml, collab:spArtCollabHtml, admin:spArtAdminHtml, skin:spArtSkinHtml, awaken:spArtAwakenHtml, anim:spArtAnimHtml, asset:spArtAssetHtml}[tab]();
  return `<div class="sp-art-page"><p class="hint">🎨 ${spArtE(SP_ART_NAME)} · ${escapeHtml(tx('只改变精灵的展示，不影响真实进度、甘特条数据和业务统计；访客看不到精灵系统。','Only changes how spirits look — never real progress, Gantt data or business statistics. Guests cannot see the spirit system.','Chỉ đổi cách hiển thị tinh linh — không ảnh hưởng tiến độ thật, dữ liệu Gantt hay thống kê. Khách không thấy hệ tinh linh.'))}</p>${nav}${body}</div>`;
}
/* ---------- ArtSchoolProvider：全局配置 ---------- */
function spArtOverHtml(){
  const C = spArtCfg(), MF = spModelFlags();
  const flags = SP_ART_FLAGS.map(([k, key, n, lock])=>`<label class="chipcheck"><input type="checkbox" name="af_${k}" ${C.flags[k]?'checked':''} ${lock?'disabled':''}> ${spArtE(n)} <code class="mono" data-i18n-ignore="1">${key}</code>${lock?` 🔒`:''}</label>`).join('');
  const mflags = SP_MODEL_FLAGS.map(([k, key, n])=>`<label class="chipcheck"><input type="checkbox" name="mf_${k}" ${MF[k]?'checked':''}> ${spArtE(n)} <code class="mono" data-i18n-ignore="1">${key}</code></label>`).join('') + `<label class="chipcheck"><input type="checkbox" checked disabled> ${escapeHtml(tx('无脚下光圈','No ground aura','Không vòng sáng dưới chân'))} <code class="mono" data-i18n-ignore="1">model_no_ground_aura</code> 🔒</label><label class="chipcheck"><input type="checkbox" checked disabled> ${escapeHtml(tx('LV4 / LV5 形态质变','LV4 / LV5 true transformation','LV4 / LV5 biến đổi chất'))} <code class="mono" data-i18n-ignore="1">model_lv4_lv5_diff</code> 🔒</label>`;
  const d = spArtSample();
  const demo = `<div class="sp-art-row">${[1,2,3,4,5].map(n=>{ const A = spArtOf(d, n, {size:96}); return `<figure>${spiritView(d, 96, n, {nofx:true})}<figcaption>LV${n} · ${A ? spArtSch(A.p) : '—'}${A?.s?` + ${spArtSch(A.s)}`:''}<br>${A?.M ? spArtSk(A.M.sk) : ''}</figcaption></figure>`; }).join('')}</div>`;
  return spArtCard(`🎛️ ${escapeHtml(tx('全局配置（ArtSchoolProvider）','Global configuration (ArtSchoolProvider)','Cấu hình chung (ArtSchoolProvider)'))}`, `<form id="spArtForm" class="sp-form" onsubmit="return false">
      <p class="mono hint" data-i18n-ignore="1">art_schools = ${escapeHtml(JSON.stringify(SP_ART_ORDER.map(k=>SP_ART_SCHOOLS[k].en)))}</p>
      <fieldset class="sp-step"><legend>${escapeHtml(tx('画派开关','School switches','Công tắc trường phái'))}</legend><div class="sp-chipchecks">${flags}</div></fieldset>
      <fieldset class="sp-step"><legend>${escapeHtml(tx('建模开关','Modelling switches','Công tắc mô hình'))}</legend><div class="sp-chipchecks">${mflags}</div></fieldset>
      <div class="sp-form-act"><button type="button" class="btn btn-primary btn-sm" data-act="spArtSave">${escapeHtml(tx('保存配置','Save configuration','Lưu cấu hình'))}</button><button type="button" class="btn btn-ghost btn-sm" data-act="spArtReset">${escapeHtml(tx('恢复默认','Restore defaults','Khôi phục mặc định'))}</button></div></form>`)
    + spArtCard(`👀 ${escapeHtml(tx('同一只精灵的 LV1 → LV5（画派 + 骨架都在迁移）','One spirit from LV1 to LV5 (school and skeleton both migrate)','Một tinh linh từ LV1 đến LV5 (phái và khung đều chuyển)'))}`, spArtSampleSel() + demo);
}
/* ---------- 八大画派 ---------- */
function spArtSchoolHtml(){
  const d = spArtSample(), F = ['feat','line','shade','light','mat','comp','pal','use'], N = {feat:['特征','Features','Đặc trưng'], line:['线条','Line','Nét'], shade:['着色','Shading','Tô màu'], light:['光影','Lighting','Ánh sáng'], mat:['材质','Materials','Chất liệu'], comp:['构图','Composition','Bố cục'], pal:['配色','Palette','Phối màu'], use:['适用','Used for','Áp dụng']};
  return spArtCard(`🖌️ ${escapeHtml(tx('八大画派 + 管理员专属画派（art_schools）','Eight schools + the admin school (art_schools)','Tám trường phái + phái quản trị (art_schools)'))}`, spArtSampleSel() + `<div class="sp-art-grid">${[...SP_ART_ORDER, 'X'].map(k=>{ const s = SP_ART_SCHOOLS[k];
    return `<article class="sp-art-school as-${k}"><h4>${k} · ${spArtE(s.n)} <small class="mono" data-i18n-ignore="1">${escapeHtml(s.en)}</small></h4><div class="sp-art-row">${spiritView(d, 88, 3, {school:k, nofx:true})}${spiritView(d, 96, 4, {school:k, nofx:true})}</div><dl class="sp-dl">${F.map(f=>`<dt>${spArtE(N[f])}</dt><dd>${spArtE(s[f])}</dd>`).join('')}</dl></article>`; }).join('')}</div>`);
}
/* ---------- CategoryArtViewer + 建模映射 ---------- */
function spArtCatHtml(){
  const C = spArtCfg(), MC = gCfg().modelCfg?.cat || {}, so = [...SP_ART_ORDER, 'X'].map(k=>[k, `${k} ${trT(SP_ART_SCHOOLS[k].n)}`]), ko = Object.keys(SP_SKEL).map(k=>[k, `${k} ${trT(SP_SKEL[k].n)}`]), go = [['', '—'], ...Object.keys(SP_GEO).map(k=>[k, `${k} ${trT(SP_GEO[k].n)}`])];
  const rows = spArtCatKeys().map(k=>{ const b = SP_ART_CAT[k], ov = C.cat?.[k] || {}, m = SP_MODEL_CAT[k], mo = MC[k] || {}, smp = spArtCatSample(k);
    return [`<b>${escapeHtml(spArtCatName(k))}</b><br><small class="hint">${spArtE(b[3])}</small>`, spSel(`cm_${k}`, so, ov.main||b[0]), spSel(`cs_${k}`, so, ov.sub||b[1]), spSel(`k1_${k}`, ko, mo.sk1||m[0]), spSel(`k2_${k}`, ko, mo.sk2||m[1]), spSel(`g1_${k}`, go, mo.g1||m[2]||''), spSel(`g2_${k}`, go, mo.g2||m[3]||''),
      m[5].map(n=>`<span class="sp-art-chip">${n} ${spArtE(SP_MNODE[n].n)}</span>`).join(' '), m[6].map(r=>`<span class="sp-art-chip">${r} ${spArtE(SP_RIG[r])}</span>`).join(' '), m[7].map(a=>`<span class="sp-art-chip">${a} ${spArtE(SP_ANIM[a])}</span>`).join(' '), smp ? spiritView(smp, 56, 3, {nofx:true}) : '—']; });
  return spArtCard(`🗂️ ${escapeHtml(tx('类别 → 画派 / 骨架 / 几何 / 材质节点 / 绑定 / 动画','Category → school / skeleton / geometry / material node / rig / animation','Hệ → phái / khung / hình khối / nút chất liệu / rig / hoạt ảnh'))}`, `<form id="spArtCatForm" class="sp-form" onsubmit="return false">${spArtT([tx('类别','Category','Hệ'), tx('主画派','Main school','Chủ phái'), tx('副画派','Secondary','Phụ phái'), tx('主骨架','Main skeleton','Khung chính'), tx('副骨架','Secondary skeleton','Khung phụ'), tx('主几何','Main geometry','Hình chính'), tx('副几何','Secondary geometry','Hình phụ'), tx('材质节点','Material nodes','Nút chất liệu'), tx('绑定','Rig','Rig'), tx('动画','Animation','Hoạt ảnh'), 'LV3'], rows)}
    <p class="hint">${escapeHtml(tx('联名系按 IP 适配表单独选画派与骨架（见「联名画派」）；管理员专属固定为权限神性派。','Co-branded spirits pick school and skeleton per IP adapter (see "Collab schools"); admin-exclusive spirits always use the Authority Divine school.','Hệ hợp tác chọn phái và khung theo bộ thích ứng IP (xem "Phái hợp tác"); tinh linh riêng quản trị luôn dùng phái Thần tính quyền hạn.'))}</p>
    <div class="sp-form-act"><button type="button" class="btn btn-primary btn-sm" data-act="spArtCatSave">${escapeHtml(tx('保存映射','Save mapping','Lưu ánh xạ'))}</button></div></form>`);
}
/* ---------- StageArtMigrationViewer + StageModelViewer ---------- */
function spArtStageHtml(){
  const d = spArtSample();
  const rows = [1,2,3,4,5].map(n=>{ const T = SP_ART_STAGE[n], Mt = SP_MODEL_STAGE[n], A = spArtOf(d, n, {size:120}), M = A?.M;
    return [`<b>LV${n}</b>${typeof SP_STAGE_FOCUS!=='undefined' ? `<br><span class="sp-art-chip">${spArtE(SP_STAGE_FOCUS[n][0])}</span><br><small class="hint">${spArtE(SP_STAGE_FOCUS[n][1])}</small>` : ''}`, spiritView(d, 84, n, {nofx:true}), `${spArtE(T.school)}<br>${A ? spArtSch(A.p) : ''}${A?.s ? ' + ' + spArtSch(A.s) : ''}${A?.ex ? ` + ${escapeHtml(tx('专属领域光','exclusive domain light','ánh lĩnh vực riêng'))}` : ''}`, spArtE(T.line), spArtE(T.light), spArtE(T.mat) + (A?.mats?.length ? `<br><small class="hint">${A.mats.map(m=>escapeHtml(trT(SP_ART_MAT[m]?.[1] || SP_MNODE_TX_N[m] || [m,m,m]))).join(' · ')}</small>` : ''), spArtE(T.comp), spArtE(T.pal),
      `${spArtE(Mt.sk)}<br>${M ? spArtSk(M.sk) + spSkelSubs(M).map(k=>' + ' + spArtSk(k)).join('') + (M.fx ? ' + ' + escapeHtml(tx('法相','dharma form','pháp tướng')) + '·' + spArtSk(M.fx) : '') : ''}`, `${spArtE(Mt.geo)}<br>${M ? (M.geo.map(spArtGe).join(' ') || '—') : ''}`, `${Mt.parts[0]}~${Mt.parts[1]}${M ? `<br><small class="hint">${Object.entries(M.parts).filter(([,v])=>v && v!=='无').map(([,v])=>escapeHtml(trT(SP_PV[v]||[v,v,v]))).join(' · ')}</small>` : ''}`, `${spArtE(Mt.rig)}<br>${M ? M.rig.join(' + ') : ''}`, `${spArtE(Mt.anim)}<br>${M ? M.anim.join(' + ') : ''}`]; });
  return spArtCard(`📈 ${escapeHtml(tx('阶段画派迁移（stage_art_migration）+ 阶段建模差异（stage_model_diff）','Stage school migration (stage_art_migration) + stage modelling (stage_model_diff)','Chuyển phái theo giai đoạn + khác biệt mô hình theo giai đoạn'))}`, spArtSampleSel() + spArtT(['', tx('预览','Preview','Xem trước'), tx('画派','School','Phái'), tx('线条','Line','Nét'), tx('光影','Light','Ánh sáng'), tx('材质','Material','Chất liệu'), tx('构图','Composition','Bố cục'), tx('配色','Palette','Màu'), tx('骨架','Skeleton','Khung'), tx('几何','Geometry','Hình khối'), tx('部件数','Parts','Bộ phận'), tx('绑定','Rig','Rig'), tx('动画','Animation','Hoạt ảnh')], rows, 'sp-art-stage'));
}
var SP_MNODE_TX_N = {sss:['次表面散射','Subsurface scattering','Tán xạ dưới bề mặt'], glow:['自发光','Emissive','Tự phát sáng'], flow:['流动','Flowing','Dòng chảy'], folk:['民俗纹样','Folk pattern','Hoa văn dân gian']};
/* ---------- 材质 / 光影 / 构图 / 线条 / 配色 ---------- */
function spArtDiffHtml(){
  const sw = k=>`<span class="sp-art-sw" style="background:${k}"></span>`;
  const mat = spArtT([tx('材质','Material','Chất liệu'), tx('画派','School','Phái'), tx('表现','Rendering','Thể hiện')], Object.entries(SP_ART_MAT).map(([k,[s,n,d]])=>[`<b>${spArtE(n)}</b>`, spArtSch(s), spArtE(d)]));
  const light = spArtT([tx('光影语言','Lighting','Ánh sáng'), tx('画派','School','Phái'), tx('特征','Features','Đặc trưng'), tx('适用','Used for','Áp dụng')], Object.entries(SP_ART_LIGHTMAP).map(([k,[n,f,u]])=>[`<b>${spArtE(n)}</b>`, spArtSch(k), spArtE(f), spArtE(u)]));
  const comp = spArtT([tx('画派','School','Phái'), tx('构图','Composition','Bố cục'), tx('线条','Line','Nét'), tx('配色','Palette','Phối màu')], SP_ART_ORDER.map(k=>[spArtSch(k), spArtE(SP_ART_SCHOOLS[k].comp), spArtE(SP_ART_SCHOOLS[k].line), spArtE(SP_ART_SCHOOLS[k].pal) + ` ${k==='D'?SP_ART_PX16.slice(0,8).map(sw).join(''):k==='H'?SP_ART_FOLK.slice(0,6).map(sw).join(''):''}`]));
  const rar = spArtT([tx('稀有度','Rarity','Độ hiếm'), tx('点缀','Accent','Điểm nhấn'), tx('色','Colours','Màu')], Object.keys(SP_ART_RAR_N).map(k=>[sprPill(k), spArtE(SP_ART_RAR_N[k]), (SP_ART_RAR[k]||[]).map(sw).join('') || '—']));
  return spArtCard(`💎 ${escapeHtml(tx('材质 → 画派（material_art_mapping）','Material → school (material_art_mapping)','Chất liệu → phái'))}`, mat) + spArtCard(`💡 ${escapeHtml(tx('光影 → 画派（lighting_art_mapping）','Lighting → school (lighting_art_mapping)','Ánh sáng → phái'))}`, light)
    + spArtCard(`📐 ${escapeHtml(tx('构图 / 线条 / 配色 → 画派','Composition / line / palette → school','Bố cục / nét / màu → phái'))}`, comp) + spArtCard(`🏷️ ${escapeHtml(tx('稀有度点缀色','Rarity accents','Màu nhấn độ hiếm'))}`, rar);
}
/* ---------- 六层建模库：骨架 / 几何 / 部件 / 材质节点 / 绑定 / 动画 ---------- */
function spArtModelHtml(){
  const d = spArtSample(), catsOf = (i, key)=>spArtCatKeys().filter(k=>{ const v = SP_MODEL_CAT[k][i]; return Array.isArray(v) ? v.includes(key) : v===key; }).map(spArtCatName).join('、') || '—';
  const sk = `<div class="sp-art-grid sm">${Object.keys(SP_SKEL).map(k=>`<article class="sp-art-school"><h4>${k} · ${spArtE(SP_SKEL[k].n)}</h4>${spiritView(d, 92, 3, {sk:k, geo:[], nofx:true})}<p class="hint">${spArtE(SP_SKEL[k].st)}</p><small>${escapeHtml(catsOf(0, k))}</small></article>`).join('')}</div>`;
  const ge = `<div class="sp-art-grid sm">${Object.keys(SP_GEO).map(k=>`<article class="sp-art-school"><h4>${k} · ${spArtE(SP_GEO[k].n)}</h4>${spiritView(d, 92, 3, {sk:'S1', geo:[k], nofx:true})}<small>${escapeHtml(catsOf(2, k))}</small></article>`).join('')}</div>`;
  const parts = spArtT([tx('类别','Category','Hệ'), ...SP_PART_SLOTS.map(([,n])=>trT(n))], spArtCatKeys().map(k=>[`<b>${escapeHtml(spArtCatName(k))}</b>`, ...SP_MODEL_CAT[k][4].map(v=>escapeHtml(trT(SP_PV[v]||[v,v,v])))]), 'sp-art-parts');
  const nodes = spArtT([tx('材质节点','Material node','Nút chất liệu'), tx('表现','Rendering','Thể hiện'), tx('适用类别','Categories','Các hệ')], Object.keys(SP_MNODE).map(k=>[`<b>${k} ${spArtE(SP_MNODE[k].n)}</b>`, SP_MNODE[k].tx.map(t=>escapeHtml(trT(SP_ART_MAT[t]?.[1] || SP_MNODE_TX_N[t] || [t,t,t]))).join(' + ') || escapeHtml(tx('画派基础着色','School base shading','Tô nền theo phái')), escapeHtml(catsOf(5, k))]));
  const rig = spArtT([tx('绑定','Rig','Rig'), tx('适用类别','Categories','Các hệ')], Object.keys(SP_RIG).map(k=>[`<b>${k} ${spArtE(SP_RIG[k])}</b>`, escapeHtml(catsOf(6, k))]));
  const an = `<div class="sp-art-grid sm">${Object.keys(SP_ANIM).map(k=>{ const ck = spArtCatKeys().find(c=>SP_MODEL_CAT[c][7].includes(k)), smp = ck ? spArtCatSample(ck) : null; return `<article class="sp-art-school"><h4>${k} · ${spArtE(SP_ANIM[k])}</h4>${smp ? spiritView(smp, 72, 3, {}) : '—'}<small>${escapeHtml(catsOf(7, k))}</small></article>`; }).join('')}</div>`;
  return spArtCard(`🦴 ${escapeHtml(tx('十二种骨架（SkeletonViewer · skeleton_types）','Twelve skeletons (SkeletonViewer)','Mười hai khung (SkeletonViewer)'))}`, spArtSampleSel() + sk)
    + spArtCard(`🔷 ${escapeHtml(tx('十二种几何（GeometryViewer · geometry_types）','Twelve geometries (GeometryViewer)','Mười hai hình khối (GeometryViewer)'))}`, ge)
    + spArtCard(`🧩 ${escapeHtml(tx('部件库 → 类别（PartLibraryViewer · part_category_mapping）','Part library → categories (PartLibraryViewer)','Thư viện bộ phận → hệ (PartLibraryViewer)'))}`, parts + `<p class="hint">${escapeHtml(tx('光环只允许头环 / 环绕 / 领域，绝不出现在脚下。','Auras may only be head rings, orbits or domains — never at the feet.','Vầng chỉ có thể là vòng đầu / bao quanh / lĩnh vực — không bao giờ dưới chân.'))}</p>`)
    + spArtCard(`🧪 ${escapeHtml(tx('十二种材质节点（MaterialNodeViewer）','Twelve material nodes (MaterialNodeViewer)','Mười hai nút chất liệu (MaterialNodeViewer)'))}`, nodes)
    + spArtCard(`🪢 ${escapeHtml(tx('十二种绑定（RigViewer · rig_types）','Twelve rigs (RigViewer)','Mười hai rig (RigViewer)'))}`, rig)
    + (typeof SP_SHAPE_LANG!=='undefined' ? spArtCard(`🔺 ${escapeHtml(tx('形状语言与骨相（4 大类 × 3 子类 = SH1~SH12）','Shape language & bone structure (4 classes × 3 sub-types = SH1–SH12)','Ngôn ngữ hình khối & cốt tướng (4 loại × 3 phân loại)'))}`, spArtT([tx('子类','Sub-type','Phân loại'), tx('大类','Class','Loại'), tx('设计','Design','Thiết kế'), tx('LV1 蛋形','LV1 egg','Trứng LV1'), tx('精灵数（LV2）','Spirits (LV2)','Số tinh linh (LV2)'), tx('示例','Example','Ví dụ')], Object.keys(SP_SHAPE_SUB).map(k=>{ const T = SP_SHAPE_SUB[k], L = spLib().filter(x=>x.forms && spShapeSub(x, 2)===k), smp = L.find(x=>SP_ROUND_KINDS.includes(x.body)) || L[0]; return [`<b data-i18n-ignore="1">${k}</b> ${spArtE(T.n)}`, spArtE(SP_SHAPE_LANG[T.cls].n), spArtE(T.d), spArtE(T.egg), String(L.length), smp ? spiritView(smp, 56, 1, {nofx:true}) + spiritView(smp, 64, 2, {nofx:true}) + spiritView(smp, 72, 3, {nofx:true}) : '—']; })) + `<p class="hint">${escapeHtml(tx('同一类别、同一大类的精灵轮流分到三个子类；LV2~LV3 用本子类，LV4 / LV5 在同一大类内换子类，剪影逐级质变。通用圆团身体按子类重塑：LV2 单块体，LV3 起头身分离；LV2 起出现眉弓、颧骨、下颌角、鼻骨的结构转折。LV1 保留蛋形轮廓，蛋形随子类变化。','Spirits of the same category and class rotate through the three sub-types; LV2–LV3 use their own sub-type and LV4 / LV5 switch to another sub-type of the same class, so the silhouette changes in kind. Generic round bodies are reshaped by sub-type: one mass at LV2, separate head and torso from LV3; brow ridge, cheekbone, jaw and nose-bridge lines appear from LV2. LV1 keeps an egg outline shaped by the sub-type.','Tinh linh cùng hệ, cùng loại luân phiên ba phân loại; LV4 / LV5 đổi phân loại trong cùng loại. LV1 giữ dáng trứng theo phân loại.'))}</p>`) : '')
    + spArtCard(`🎞️ ${escapeHtml(tx('十二种动画逻辑（AnimationLogicViewer）','Twelve animation logics (AnimationLogicViewer)','Mười hai logic hoạt ảnh (AnimationLogicViewer)'))}`, an);
}
/* ---------- CollabArtAdapter ---------- */
function spArtCollabHtml(){
  const C = spArtCfg(), L = spLib().filter(d=>d.cat==='collab'), ao = Object.keys(SP_ART_COLLAB).map(k=>[k, trT(SP_ART_COLLAB[k].n)]);
  const rows = Object.entries(SP_ART_COLLAB).map(([k,a])=>{ const smp = L.find(d=>spArtCollabOf(d)===k), m = SP_MODEL_COLLAB[k] || [];
    return [`<b>${spArtE(a.n)}</b><br><small class="hint">${spArtE(a.d)}</small>`, spArtSch(a.s[0]) + ' + ' + spArtSch(a.s[1]), spArtSk(m[0]) + (m[1] ? ' + ' + spArtSk(m[1]) : ''), spArtGe(m[2]), a.pal.map(c=>`<span class="sp-art-sw" style="background:${c}"></span>`).join(''), smp ? spiritView(smp, 60, 3, {nofx:true}) + spiritView(smp, 64, 5, {nofx:true}) : '—', escapeHtml(String(L.filter(d=>spArtCollabOf(d)===k).length))]; });
  const ov = L.map(d=>`<label class="sp-art-ov">${escapeHtml(trT(d.name))}${spSel(`co_${d.id}`, ao, spArtCollabOf(d))}</label>`).join('');
  return spArtCard(`🤝 ${escapeHtml(tx('联名换画派（collab_art_adapter）','Collabs switch school (collab_art_adapter)','Hợp tác đổi phái (collab_art_adapter)'))}`, `<p class="hint">${escapeHtml(tx('每个联名风格都换画派、骨架与几何，而不只是换色；全部是原创设计，不复刻任何已有角色、标志或名称。','Each collab flavour changes school, skeleton and geometry — not just colours. Every design is original: no existing character, logo or name is reproduced.','Mỗi phong cách hợp tác đổi phái, khung và hình khối — không chỉ đổi màu. Tất cả là thiết kế gốc, không sao chép nhân vật, logo hay tên có sẵn.'))}</p>`
    + spArtT([tx('联名风格','Collab flavour','Phong cách'), tx('画派','School','Phái'), tx('骨架','Skeleton','Khung'), tx('几何','Geometry','Hình khối'), tx('主题色','Theme colours','Màu chủ đề'), 'LV3 / LV5', tx('精灵数','Spirits','Số tinh linh')], rows)
    + `<details class="sp-adv-fold"><summary>${escapeHtml(tx('逐只指定联名风格','Assign a flavour per spirit','Chọn phong cách cho từng tinh linh'))}</summary><form id="spArtCoForm" class="sp-form" onsubmit="return false"><div class="sp-art-ovs">${ov}</div><div class="sp-form-act"><button type="button" class="btn btn-primary btn-sm" data-act="spArtCoSave">${escapeHtml(tx('保存','Save','Lưu'))}</button></div></form></details>`);
}
/* ---------- AdminArtSchoolProvider ---------- */
function spArtAdminHtml(){
  const L = (typeof spAdmLib==='function' ? spAdmLib() : []).slice(0, 4), X = SP_ART_SCHOOLS.X;
  const rows = [[tx('画派','School','Phái'), spArtSch('X')], [tx('线条','Line','Nét'), spArtE(X.line)], [tx('光影','Light','Ánh sáng'), spArtE(X.light)], [tx('材质','Materials','Chất liệu'), spArtE(X.mat) + ` · M12 ${spArtE(SP_MNODE.M12.n)}`], [tx('构图','Composition','Bố cục'), spArtE(X.comp)], [tx('配色','Palette','Màu'), spArtE(X.pal) + SP_ART_ADMIN.pal.map(c=>`<span class="sp-art-sw" style="background:${c}"></span>`).join('')], [tx('纹样','Pattern','Hoa văn'), spArtE(SP_ART_ADMIN.pattern)], [tx('徽记','Emblem','Huy hiệu'), spArtE(SP_ART_ADMIN.emblem)], [tx('骨架','Skeleton','Khung'), spArtSk('S1') + ' / ' + spArtSk('S5')], [tx('绑定 / 动画','Rig / animation','Rig / hoạt ảnh'), `B12 ${spArtE(SP_RIG.B12)} · A12 ${spArtE(SP_ANIM.A12)}`], [tx('阶段','Stages','Giai đoạn'), escapeHtml(tx('LV1 极简 → LV2 赛璐璐 → LV3 权限神性 → LV4 + 3D → LV5 + 厚涂 + 专属领域光；LV4 / LV5 同样质变','LV1 minimal → LV2 cel → LV3 authority → LV4 + 3D → LV5 + painterly + domain light; LV4 / LV5 transform as well','LV1 tối giản → LV2 cel → LV3 quyền hạn → LV4 + 3D → LV5 + sơn dày + ánh lĩnh vực'))], [tx('脚下光圈','Ground aura','Vòng dưới chân'), escapeHtml(tx('无','None','Không'))]];
  return spArtCard(`👑 ${escapeHtml(tx('管理员专属画派（admin_art_school）','Admin-exclusive school (admin_art_school)','Phái riêng quản trị'))}`, spArtT(['', ''], rows) + `<div class="sp-art-row">${L.map(d=>[1,2,3,4,5].map(n=>spiritView(d, n>=4?88:72, n, {nofx:true})).join('')).slice(0,2).join('</div><div class="sp-art-row">')}</div>`);
}
/* ---------- SkinArtSchoolViewer ---------- */
function spArtSkinHtml(){
  const d = spArtSample(), skins = typeof spSkins==='function' ? spSkins() : [];
  const tiers = spArtT([tx('皮肤稀有度','Skin tier','Hạng trang phục'), tx('画派变化','School change','Đổi phái'), tx('说明','Notes','Ghi chú'), tx('至少改变','Must change at least','Ít nhất đổi'), 'LV3', 'LV5'], Object.entries(SP_ART_SKIN).map(([k,[a,b,keys,n]])=>[`<b>${escapeHtml(trT(SP_SKIN_RAR?.[k] || [k,k,k]))}</b>`, spArtE(a), spArtE(b), `${n} · <small class="mono" data-i18n-ignore="1">${keys.join(' / ')}</small>`, spiritView(d, 64, 3, {skinTierForce:k, nofx:true}), spiritView(d, 72, 5, {skinTierForce:k, nofx:true})]));
  const check = skins.map(sk=>{ const L = sk.look || {}, n = SP_LOOK_KEYS.concat(['fx','act']).filter(k=>L[k]!=null && L[k]!=='' && !(Array.isArray(L[k]) && !L[k].length)).length, need = SP_ART_SKIN[sk.rarity]?.[3] || 1, ok = spLookStructural(L) && n>=need;
    return [escapeHtml(trT(sk.name)), escapeHtml(trT(SP_SKIN_RAR?.[sk.rarity] || [sk.rarity,sk.rarity,sk.rarity])), `${n} / ${need}`, ok ? `✅ ${escapeHtml(tx('改变外观','Changes appearance','Đổi ngoại hình'))}` : `⚠️ ${escapeHtml(tx('只加特效，需补充结构','Effects only — add structure','Chỉ thêm hiệu ứng — cần thêm cấu trúc'))}`]; });
  return spArtCard(`👗 ${escapeHtml(tx('皮肤换画派（skin_art_school）','Skins switch school (skin_art_school)','Trang phục đổi phái'))}`, spArtSampleSel() + tiers) + spArtCard(`🔎 ${escapeHtml(tx('现有皮肤检查：必须改变外观，不能只加特效','Existing skins: must change appearance, not just add effects','Kiểm tra trang phục: phải đổi ngoại hình'))}`, spArtT([tx('皮肤','Skin','Trang phục'), tx('稀有度','Tier','Hạng'), tx('结构改动','Structural changes','Thay đổi cấu trúc'), tx('结果','Result','Kết quả')], check));
}
/* ---------- AwakenArtSchoolViewer + AwakenModelViewer ---------- */
function spArtAwakenHtml(){
  const rows = Object.keys(SP_ART_REF).map(id=>{ const d = spTvDef(id); if(!d) return null; const R = SP_ART_REF[id], M = SP_MODEL_REF[id];
    return [`<b>${escapeHtml(trT(d.name))}</b>`, spiritView(d, 80, 4, {nofx:true}), spArtSch(R.l4[0]) + (R.l4[1] ? ' + ' + spArtSch(R.l4[1]) : ''), spArtSk(M.l4[0]) + ' ' + spArtGe(M.l4[1]), spiritView(d, 92, 5, {nofx:true}), spArtSch(R.l5[0]) + ' + ' + spArtSch(R.l5[1]), spArtSk(M.l5[0]) + ' ' + spArtGe(M.l5[1]), `${spArtE(R.d)}<br><small class="hint">${spArtE(M.d)}</small>`]; }).filter(Boolean);
  return spArtCard(`🔥 ${escapeHtml(tx('九大觉醒体画派与建模差异（awaken_art_school · awaken_model_diff）','Nine awakenings: schools and models (awaken_art_school · awaken_model_diff)','Chín thể thức tỉnh: phái và mô hình'))}`, spArtT(['', 'LV4', tx('LV4 画派','LV4 school','Phái LV4'), tx('LV4 骨架 / 几何','LV4 skeleton / geometry','Khung / hình LV4'), 'LV5', tx('LV5 画派','LV5 school','Phái LV5'), tx('LV5 骨架 / 几何','LV5 skeleton / geometry','Khung / hình LV5'), tx('核心差异','Key difference','Khác biệt chính')], rows, 'sp-art-awaken')
    + `<p class="hint">${escapeHtml(tx('LV5 专属背景（日轮、山脉、冰宫、双月、鲸落光、王座、循环、蝶群、星舰）都在身后，不是脚下光圈；觉醒体仍可切回 LV4 外观。','LV5 backdrops (sun disc, ridge, ice palace, twin moons, whale-fall light, throne, loop, swarm, starship) sit behind the body — never a ground aura. Awakened forms can still switch back to the LV4 look.','Phông LV5 nằm phía sau thân — không phải vòng dưới chân. Thể thức tỉnh vẫn có thể đổi về LV4.'))}</p>`);
}
/* ---------- 动画规范 ---------- */
function spArtAnimHtml(){
  const C = spArtCfg(), A = C.anim;
  const rows = [[tx('待机','Idle','Chờ'), escapeHtml(tx('呼吸 / 漂浮 / 眨眼 / 尾巴摆动 / 粒子，按类别动画逻辑 A1~A12','Breathing / floating / blinking / tail sway / particles, per category logic A1–A12','Thở / lơ lửng / chớp mắt / đuôi đung đưa / hạt, theo logic A1–A12'))], [tx('移动','Move','Di chuyển'), escapeHtml(tx('随移动方向翻转（dir-l）','Flips with movement direction (dir-l)','Lật theo hướng di chuyển (dir-l)'))], [tx('技能','Skill','Kỹ năng'), escapeHtml(tx('按 LV4 方向的技能演出','Skill performance per LV4 direction','Biểu diễn kỹ năng theo hướng LV4'))], [tx('出场','Entrance','Xuất hiện'), escapeHtml(tx('令牌展开（ent-token）；LV5 用觉醒出场','Token unfold (ent-token); LV5 uses the awakening entrance','Mở thẻ (ent-token); LV5 dùng xuất hiện thức tỉnh'))], [tx('觉醒','Awakening','Thức tỉnh'), escapeHtml(tx('领域光 + 专属背景（非脚下）','Domain light + exclusive backdrop (never at the feet)','Ánh lĩnh vực + phông riêng (không dưới chân)'))], [tx('帧率','Frame rate','Tốc độ khung'), `${SP_ASSET_SPEC.fps.join(' / ')} fps`], [tx('移动端','Mobile','Di động'), escapeHtml(tx('降级：粒子减半、肢体动画关闭','Downgrade: half particles, limb animation off','Hạ cấp: nửa số hạt, tắt hoạt ảnh chi'))], [tx('减少动态','Reduced motion','Giảm chuyển động'), escapeHtml(tx('关闭粒子与全部待机动画','Particles and all idle animation off','Tắt hạt và mọi hoạt ảnh chờ'))]];
  const d = spArtSample();
  return spArtCard(`🎬 ${escapeHtml(tx('动画规范','Animation spec','Quy chuẩn hoạt ảnh'))}`, `<form id="spArtAnimForm" class="sp-form" onsubmit="return false"><div class="sp-form-row"><label>${escapeHtml(tx('序列帧帧率','Sequence frame rate','Tốc độ khung chuỗi'))}${spSel('fps', [['24','24 fps'],['30','30 fps']], A.fps)}</label><label>${escapeHtml(tx('移动端','Mobile','Di động'))}${spSel('mobile', [['low', tx('降级','Downgrade','Hạ cấp')], ['full', tx('完整','Full','Đầy đủ')]], A.mobile)}</label><label class="chipcheck"><input type="checkbox" name="particles" ${A.particles?'checked':''}> ${escapeHtml(tx('显示粒子','Show particles','Hiện hạt'))}</label></div><div class="sp-form-act"><button type="button" class="btn btn-primary btn-sm" data-act="spArtAnimSave">${escapeHtml(tx('保存','Save','Lưu'))}</button></div></form>`
    + spArtT(['', ''], rows) + `<div class="sp-art-row">${spArtSampleSel()}${spiritView(d, 96, 3, {entrance:true})}${spiritView(d, 96, 3, {dir:'l'})}${spiritView(d, 110, 5, {entrance:true})}</div>`);
}
/* ---------- AssetSpecViewer：命名 / 目录 / 版本 / 热更新 / 导出 ---------- */
function spArtAssetHtml(){ return spArtAssetHtmlCore() + (typeof spAssetKeyHtml==='function' ? spAssetKeyHtml() : '') + (typeof spElLibHtml==='function' ? spElLibHtml() : ''); }   /* v2.7 + 重点 50 只 / 灰度 */
function spArtAssetHtmlCore(){
  const C = spArtCfg(), As = C.assets, list = Object.entries(As.list||{}), d = spArtSample(), ck = spArtCatKey(d);
  const spec = spArtT(['', ''], [[tx('立绘','Portrait','Chân dung'), `${SP_ASSET_SPEC.portrait} PNG`], [tx('卡片','Card','Thẻ'), `${SP_ASSET_SPEC.card}（1x / 2x / 3x）`], [tx('头像','Avatar','Ảnh đại diện'), `${SP_ASSET_SPEC.avatar}`], [tx('剪影','Silhouette','Bóng'), `${SP_ASSET_SPEC.silhouette}`], [tx('色彩 / 格式','Colour / format','Màu / định dạng'), `${SP_ASSET_SPEC.color} · ${SP_ASSET_SPEC.fmt.join(' / ')} · ${escapeHtml(tx('透明背景','transparent background','nền trong suốt'))}`], [tx('骨骼动画','Skeletal animation','Hoạt ảnh xương'), `${SP_ASSET_SPEC.skel.join(' / ')} · ${escapeHtml(tx('可选','optional','tùy chọn'))} ${SP_ASSET_SPEC.opt.join(' / ')}`], [tx('命名','Naming','Đặt tên'), `<code class="mono" data-i18n-ignore="1">${SP_ASSET_SPEC.naming}</code>`], [tx('目录','Directory','Thư mục'), `<code class="mono" data-i18n-ignore="1">${SP_ASSET_SPEC.dir}</code><br><small class="mono" data-i18n-ignore="1">${SP_ASSET_SPEC.files.map(escapeHtml).join('<br>')}</small>`], [tx('深色 / 舒适模式','Dark / comfort mode','Chế độ tối / thoải mái'), escapeHtml(tx('深色模式降亮度、提对比；舒适模式放大 1.3~1.5 倍','Dark mode lowers brightness and raises contrast; comfort mode enlarges 1.3–1.5×','Tối giảm sáng, tăng tương phản; thoải mái phóng 1,3–1,5×'))]]);
  const reg = list.length ? spArtT([tx('资源 ID','Asset ID','Mã tài nguyên'), tx('路径','Path','Đường dẫn'), tx('倍率','Scales','Tỉ lệ')], list.slice(0, 60).map(([k,v])=>[`<code class="mono" data-i18n-ignore="1">${escapeHtml(k)}</code>`, `<code class="mono" data-i18n-ignore="1">${escapeHtml(v.path)}</code>`, escapeHtml((v.scales||[1]).map(s=>s+'x').join(' / '))])) + (list.length>60 ? `<p class="hint">+${list.length-60}</p>` : '') : `<p class="hint">${escapeHtml(tx('还没有登记 PNG 资源：当前全部使用内置矢量绘制。把美术资源放进程序目录的 assets/spirits 后点「扫描资源目录」。','No PNG assets registered yet — everything uses the built-in vector art. Put art into assets/spirits next to the program, then click "Scan asset folder".','Chưa có ảnh PNG — đang dùng hình vector tích hợp. Đặt ảnh vào assets/spirits cạnh chương trình rồi bấm "Quét thư mục".'))}</p>`;
  return spArtCard(`📦 ${escapeHtml(tx('资源规范（asset_specs）','Asset spec (asset_specs)','Quy chuẩn tài nguyên'))}`, spec)
    + spArtCard(`🔄 ${escapeHtml(tx('资源版本与热更新（asset_versions）','Asset version & hot update (asset_versions)','Phiên bản & cập nhật nóng'))}`, `<p>${escapeHtml(tx('当前资源版本','Current asset version','Phiên bản hiện tại'))} <b class="mono">v${As.ver}</b> · ${escapeHtml(tx('已登记','Registered','Đã đăng ký'))} <b>${list.length}</b>${As.scanned ? ` · ${escapeHtml(tx('上次扫描','Last scan','Lần quét cuối'))} ${escapeHtml(localDT(As.scanned))}` : ''}</p>
      <div class="sp-form-act" style="justify-content:flex-start"><button type="button" class="btn btn-primary btn-sm" data-act="spAssetScan">${escapeHtml(tx('扫描资源目录','Scan asset folder','Quét thư mục tài nguyên'))}</button><button type="button" class="btn btn-ghost btn-sm" data-act="spAssetBump">${escapeHtml(tx('版本 +1（热更新，所有人刷新图片缓存）','Version +1 (hot update — everyone refreshes image cache)','Phiên bản +1 (cập nhật nóng)'))}</button><button type="button" class="btn btn-ghost btn-sm" data-act="spAssetClear">${escapeHtml(tx('清空登记','Clear registry','Xóa đăng ký'))}</button></div>${reg}`)
    + spArtCard(`⬇️ ${escapeHtml(tx('导出资源包（按规范命名，供美术替换）','Export an asset pack (spec naming, for artists to replace)','Xuất gói tài nguyên (đặt tên theo chuẩn)'))}`, `${spArtSampleSel()}<p class="hint mono" data-i18n-ignore="1">assets/spirits/${escapeHtml(ck)}/${escapeHtml(d.id)}/lv1.png … lv5.png · lv{n}@2x.png · lv{n}@3x.png · spirit_${escapeHtml(d.id)}_lv{n}_portrait.png · _avatar · _silhouette · manifest.json</p><div class="sp-form-act" style="justify-content:flex-start"><button type="button" class="btn btn-primary btn-sm" data-act="spAssetExport" data-id="${escapeAttr(d.id)}">${escapeHtml(tx('导出本精灵资源包（ZIP）','Export this spirit\'s pack (ZIP)','Xuất gói tinh linh này (ZIP)'))}</button></div>`);
}
/* ---------- 资源登记：命名 / 目录解析，spiritView 优先使用（有就用 PNG，加载失败自动回退矢量） ---------- */
function spAssetKey(id, st, variant='base'){ return `spirit_${id}_lv${st}_${variant}`; }
function spAssetFor(def, st, skinId){
  let C; try{ C = spArtCfg(); }catch(_e){ return null; } if(!C.flags.on || !C.flags.preferAssets) return null;
  const e = (C.assets.list||{})[spAssetKey(def.id, st, skinId || 'base')]; if(!e) return null;
  if(typeof spAssetGrayOk==='function' && !spAssetGrayOk(C)) return null;   /* v2.7 灰度：不在放量范围内的账号继续看矢量图 */
  const base = String(C.assets.base||'assets/spirits').replace(/\/+$/,''), v = (C.assets.ver||1) + (e.v ? '.' + e.v : ''), p = e.path.replace(/\.png$/i,'');   /* 全局版本 + 单图版本 */
  return {src:`${base}/${e.path}?v=${v}`, set:(e.scales||[1]).filter(s=>s>1).map(s=>`${base}/${p}@${s}x.png?v=${v} ${s}x`).join(', ')};
}
function spAssetParse(paths){
  const list = {};
  (paths||[]).forEach(p0=>{ const p = String(p0).replace(/\\/g,'/').replace(/^\/?(assets\/spirits\/)?/,'');
    let m = /^([a-z0-9_-]+)\/([a-z0-9_#-]+)\/lv([1-5])(@([23])x)?\.png$/i.exec(p);
    if(m){ const k = spAssetKey(m[2], +m[3]); const e = list[k] || {cat:m[1], id:m[2], stage:+m[3], variant:'base', path:`${m[1]}/${m[2]}/lv${m[3]}.png`, scales:[1]}; if(m[5]) e.scales = [...new Set([...e.scales, +m[5]])].sort(); list[k] = e; return; }
    m = /^([a-z0-9_-]+)\/([a-z0-9_#-]+)\/skins\/([a-z0-9_-]+)_lv([1-5])(@([23])x)?\.png$/i.exec(p);
    if(m){ const k = spAssetKey(m[2], +m[4], m[3]); const e = list[k] || {cat:m[1], id:m[2], stage:+m[4], variant:m[3], path:`${m[1]}/${m[2]}/skins/${m[3]}_lv${m[4]}.png`, scales:[1]}; if(m[6]) e.scales = [...new Set([...e.scales, +m[6]])].sort(); list[k] = e; } });
  return list;
}
function spArtSaveCfg(patch, act){ const C = gCfg().artCfg || {}; G().config = {...gCfg(), artCfg:{...C, ...patch}, updatedAt:gNowIso(), updatedBy:spMe()}; spAuditCore(act||'art-config', '', {}); spCacheVer++; saveGrowth(true); }
async function spAssetScan(){
  try{ const r = await fetch('api/assets', {cache:'no-store'}); if(!r.ok) throw new Error(r.status); const j = await r.json(); const list = spAssetParse(j.files||[]);
    const C = spArtCfg(); spArtSaveCfg({assets:{...C.assets, list, ver:(C.assets.ver||1)+1, scanned:gNowIso()}}, 'art-asset-scan');
    toast(tx(`已登记 ${Object.keys(list).length} 个资源，版本已更新`, `Registered ${Object.keys(list).length} assets; version bumped`, `Đã đăng ký ${Object.keys(list).length} tài nguyên`), 'ok'); render();
  }catch(_e){ toast(tx('无法读取资源目录：请用 LabScheduler 局域网服务打开（单文件离线版不支持扫描）','Cannot read the asset folder — open via the LabScheduler LAN server (the offline single file cannot scan)','Không đọc được thư mục — hãy mở qua máy chủ LAN LabScheduler'), 'warn'); }
}
/* ---------- 资源包导出：SVG → PNG（2048 / 512 / 1024 / 1536 / 128 / 剪影）+ manifest，打成 ZIP ---------- */
function spCrc32(u8){ let c, crc = 0xFFFFFFFF; if(!spCrc32.t){ spCrc32.t = new Uint32Array(256); for(let n=0;n<256;n++){ c = n; for(let k=0;k<8;k++) c = c&1 ? 0xEDB88320 ^ (c>>>1) : c>>>1; spCrc32.t[n] = c>>>0; } } for(let i=0;i<u8.length;i++) crc = spCrc32.t[(crc ^ u8[i]) & 255] ^ (crc>>>8); return (crc ^ 0xFFFFFFFF)>>>0; }
function spZipStore(files){ /* files: [{name, data:Uint8Array}] → Blob（store，无压缩） */
  const enc = new TextEncoder(), parts = [], cen = []; let off = 0;
  files.forEach(f=>{ const nm = enc.encode(f.name), crc = spCrc32(f.data), h = new DataView(new ArrayBuffer(30));
    h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint32(14, crc, true); h.setUint32(18, f.data.length, true); h.setUint32(22, f.data.length, true); h.setUint16(26, nm.length, true);
    parts.push(new Uint8Array(h.buffer), nm, f.data);
    const c = new DataView(new ArrayBuffer(46)); c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint32(16, crc, true); c.setUint32(20, f.data.length, true); c.setUint32(24, f.data.length, true); c.setUint16(28, nm.length, true); c.setUint32(42, off, true);
    cen.push(new Uint8Array(c.buffer), nm); off += 30 + nm.length + f.data.length; });
  const csz = cen.reduce((a,b)=>a+b.length, 0), e = new DataView(new ArrayBuffer(22)); e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, csz, true); e.setUint32(16, off, true);
  return new Blob([...parts, ...cen, new Uint8Array(e.buffer)], {type:'application/zip'});
}
function spSvgStandalone(svg){
  const defs = document.querySelector('body > svg[aria-hidden="true"]')?.innerHTML || '';
  return svg.replace(/^<svg /, `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" `).replace(/(<svg[^>]*>)/, `$1<defs>${defs}</defs>`);
}
function spSvgToPng(svg, px, sil){
  return new Promise((res, rej)=>{ const img = new Image(), url = URL.createObjectURL(new Blob([spSvgStandalone(svg)], {type:'image/svg+xml'}));
    img.onload = ()=>{ const cv = document.createElement('canvas'); cv.width = cv.height = px; const g2 = cv.getContext('2d'); g2.drawImage(img, 0, 0, px, px); if(sil){ g2.globalCompositeOperation = 'source-in'; g2.fillStyle = '#0f172a'; g2.fillRect(0, 0, px, px); } URL.revokeObjectURL(url);
      cv.toBlob(b=>b ? b.arrayBuffer().then(a=>res(new Uint8Array(a))) : rej(new Error('png')), 'image/png'); };
    img.onerror = e=>{ URL.revokeObjectURL(url); rej(e); }; img.src = url; });
}
async function spAssetExport(id){
  const d = spDef(id) || spTvDef(id); if(!d) return; const ck = spArtCatKey(d), dir = `assets/spirits/${ck}/${d.id}/`, files = [], man = {id:d.id, category:ck, version:spArtCfg().assets.ver, style:'Time Spirit Style', schools:{}, models:{}, files:[]};
  toast(tx('正在生成资源包…','Building the asset pack…','Đang tạo gói…'), 'info');
  try{
    for(let n=1;n<=5;n++){ const svg = spiritSvg(d, n, {size:512, noSafe:false, rar:d.rar, noDomain:true}), A = spArtOf(d, n, {size:512});
      man.schools['lv'+n] = A ? [A.p, A.s].filter(Boolean) : []; man.models['lv'+n] = A?.M ? {skeleton:[A.M.sk, A.M.sk2].filter(Boolean), geometry:A.M.geo, nodes:A.M.nodes, rig:A.M.rig, anim:A.M.anim} : null;
      const add = async(name, px, sil)=>{ files.push({name, data:await spSvgToPng(svg, px, sil)}); man.files.push(name); };
      await add(`${dir}lv${n}.png`, 512); await add(`${dir}lv${n}@2x.png`, 1024); await add(`${dir}lv${n}@3x.png`, 1536);
      await add(`${dir}spirit_${d.id}_lv${n}_portrait.png`, 2048); await add(`${dir}spirit_${d.id}_lv${n}_avatar.png`, 128); await add(`${dir}spirit_${d.id}_lv${n}_silhouette.png`, 512, true); }
    if(typeof spArtBrief==='function'){ man.briefs = {}; const B = [1,2,3,4,5].map(n=>(man.briefs['lv'+n] = spArtBrief(d, n))); files.push({name:`${dir}art_brief.md`, data:new TextEncoder().encode(`# ${trT(d.name)} · ${d.id}\n\n把 lv1.png ~ lv5.png（可加 @2x / @3x）放进 ${dir}，程序自动替换矢量图；缺图自动回退。\n\n` + B.map(b=>`## LV${b.stage}\n\n${b.zh}\n\n${b.en}\n`).join('\n'))}); man.files.push(`${dir}art_brief.md`); }
    files.push({name:`${dir}manifest.json`, data:new TextEncoder().encode(JSON.stringify(man, null, 2))});
    const a = document.createElement('a'); a.href = URL.createObjectURL(spZipStore(files)); a.download = `spirit_${d.id}_assets_v${man.version}.zip`; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    spAuditCore('art-asset-export', d.id, {n:files.length}); toast(tx('资源包已导出','Asset pack exported','Đã xuất gói'), 'ok');
  }catch(_e){ toast(tx('导出失败','Export failed','Xuất thất bại'), 'warn'); }
}
/* ---------- 操作员：图鉴详情里的「画派与建模」 ---------- */
function spCxDetailExtraArtCore(def, on, me){
  let h = typeof spCxDetailExtraCore==='function' ? spCxDetailExtraCore(def, on, me) : '';
  if(!on || !def) return h; let lv = 5; try{ if(me){ lv = Math.max(1, ...[1,2,3,4,5].filter(n=>me.codex?.[`sps:${def.id}:${n}`]), 1); } }catch(_e){}
  const rows = [1,2,3,4,5].filter(n=>n<=lv).map(n=>{ const A = spArtOf(def, n, {size:96}); if(!A) return ''; return `<li><b>LV${n}</b> ${escapeHtml(trT(SP_ART_SCHOOLS[A.p].n))}${A.s?` + ${escapeHtml(trT(SP_ART_SCHOOLS[A.s].n))}`:''} · ${escapeHtml(trT(SP_SKEL[A.M?.sk]?.n||['','','']))}${A.M?.geo?.length?` · ${A.M.geo.map(g=>escapeHtml(trT(SP_GEO[g].n))).join(' / ')}`:''}</li>`; }).join('');
  return rows ? h + `<dt>${escapeHtml(tx('画派与建模','Art school & model','Phái & mô hình'))}</dt><dd><ul class="sp-art-cx">${rows}</ul></dd>` : h;
}
/* ---------- 动作 ---------- */
function spAction16Core(act, el, id){
  const v = el?.dataset?.v, S = spS();
  switch(act){
    case 'spArtTab': S.artTab = v; return true;
    case 'spArtSample': S.artSample = el.value; return true;
    case 'spArtSave': { if(!spIsAdmin()) return false; const f = document.getElementById('spArtForm'); if(!f) return false; const fd = new FormData(f), C = spArtCfg(), flags = {}, mf = {};
      SP_ART_FLAGS.forEach(([k,,,lock])=>flags[k] = lock ? true : fd.get('af_'+k)==='on'); SP_MODEL_FLAGS.forEach(([k])=>mf[k] = fd.get('mf_'+k)==='on');
      G().config = {...gCfg(), modelCfg:{...(gCfg().modelCfg||{}), flags:mf}}; spArtSaveCfg({flags}, 'art-config'); toast(tx('已保存','Saved','Đã lưu'), 'ok'); return true; }
    case 'spArtReset': if(!spIsAdmin()) return false; G().config = {...gCfg(), modelCfg:{}}; spArtSaveCfg({...spArtDefaults(), assets:spArtCfg().assets}, 'art-reset'); toast(tx('已恢复默认','Defaults restored','Đã khôi phục'), 'ok'); return true;
    case 'spArtCatSave': { if(!spIsAdmin()) return false; const fd = new FormData(document.getElementById('spArtCatForm')), cat = {}, mc = {};
      spArtCatKeys().forEach(k=>{ const b = SP_ART_CAT[k], m = SP_MODEL_CAT[k], cm = fd.get('cm_'+k), cs = fd.get('cs_'+k); if(cm!==b[0] || cs!==b[1]) cat[k] = {main:cm, sub:cs};
        const o = {sk1:fd.get('k1_'+k), sk2:fd.get('k2_'+k), g1:fd.get('g1_'+k)||null, g2:fd.get('g2_'+k)||null}; if(o.sk1!==m[0] || o.sk2!==m[1] || (o.g1||null)!==(m[2]||null) || (o.g2||null)!==(m[3]||null)) mc[k] = o; });
      G().config = {...gCfg(), modelCfg:{...(gCfg().modelCfg||{}), cat:mc}}; spArtSaveCfg({cat}, 'art-cat'); toast(tx('已保存','Saved','Đã lưu'), 'ok'); return true; }
    case 'spArtCoSave': { if(!spIsAdmin()) return false; const fd = new FormData(document.getElementById('spArtCoForm')), co = {}; spLib().filter(d=>d.cat==='collab').forEach(d=>{ const k = fd.get('co_'+d.id); if(k && SP_ART_COLLAB[k]) co[d.id] = k; }); spArtSaveCfg({collab:co}, 'art-collab'); toast(tx('已保存','Saved','Đã lưu'), 'ok'); return true; }
    case 'spArtAnimSave': { if(!spIsAdmin()) return false; const fd = new FormData(document.getElementById('spArtAnimForm')); spArtSaveCfg({anim:{fps:+fd.get('fps')||24, mobile:String(fd.get('mobile')||'low'), particles:fd.get('particles')==='on'}}, 'art-anim'); toast(tx('已保存','Saved','Đã lưu'), 'ok'); return true; }
    case 'spAssetScan': if(spIsAdmin()) spAssetScan(); return false;
    case 'spAssetBriefAll': if(spIsAdmin()) spAssetBriefAll(); return false;
    case 'spAssetGraySave': { if(!spIsAdmin()) return false; const fd = new FormData(document.getElementById('spGrayForm')), C = spArtCfg(), gray = {on:fd.get('on')==='on', pct:Math.max(0, Math.min(100, +fd.get('pct')||0)), users:String(fd.get('users')||'').split(/[,，\s]+/).map(s=>s.trim()).filter(Boolean)}; spArtSaveCfg({assets:{...C.assets, gray}}, 'art-asset-gray'); toast(tx('灰度设置已保存','Gray release saved','Đã lưu'), 'ok'); return true; }
    case 'spAssetBump': { if(!spIsAdmin()) return false; const C = spArtCfg(); spArtSaveCfg({assets:{...C.assets, ver:(C.assets.ver||1)+1}}, 'art-asset-bump'); toast(tx('资源版本已 +1','Asset version +1','Phiên bản +1'), 'ok'); return true; }
    case 'spAssetClear': { if(!spIsAdmin() || !confirm(tx('清空资源登记？（文件不会被删除）','Clear the asset registry? (files are not deleted)','Xóa đăng ký? (tệp không bị xóa)'))) return false; const C = spArtCfg(); spArtSaveCfg({assets:{...C.assets, list:{}, ver:(C.assets.ver||1)+1}}, 'art-asset-clear'); return true; }
    case 'spAssetExport': if(spIsAdmin()) spAssetExport(el?.dataset?.id || id); return false;
  }
  return typeof spAction17==='function' ? spAction17(act, el, id) : null;
}
Object.assign(SP_AUDIT_LABEL, {'art-config':['画派配置','Art-school settings','Cấu hình phái'], 'art-reset':['画派恢复默认','Art schools reset','Khôi phục phái'], 'art-cat':['类别画派映射','Category school mapping','Ánh xạ phái theo hệ'], 'art-collab':['联名画派','Collab schools','Phái hợp tác'], 'art-anim':['动画规范','Animation spec','Quy chuẩn hoạt ảnh'], 'art-asset-scan':['资源扫描','Asset scan','Quét tài nguyên'], 'art-asset-bump':['资源热更新','Asset hot update','Cập nhật nóng'], 'art-asset-clear':['清空资源登记','Asset registry cleared','Xóa đăng ký tài nguyên'], 'art-asset-export':['导出资源包','Asset pack exported','Xuất gói tài nguyên']});
