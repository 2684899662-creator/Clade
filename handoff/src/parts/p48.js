/* =========================================================
   v2.4 后台「进化四段论」：StageEvolutionMechanismViewer / LV3EnvironmentViewer / LV3CompanionViewer / LV4MutationViewer / LV4MutationTypeViewer /
   LV5DomainViewer / LV5DomainTypeViewer / LV5DomainEntryViewer / SpiritEvolutionPathViewer
========================================================= */
SP_ART_TABS.path = ['进化四段论','Four-stage evolution','Tiến hóa bốn bước'];
function spArtPathHtml(){
  const d = spArtSample(), F = spPathFlags(), P = spPathOf(d), doc = gCfg().evoCfg?.paths?.[d.id] || {};
  const flags = SP_PATH_FLAGS.map(([k, key, n])=>`<label class="chipcheck"><input type="checkbox" name="pf_${k}" ${F[k]?'checked':''}> ${spArtE(n)} <code class="mono" data-i18n-ignore="1">${key}</code></label>`).join('') + ['stage_evolution_no_repeat','stage_evolution_lv3_diff','stage_evolution_lv4_diff','stage_evolution_lv5_diff','stage_evolution_no_wings_default','stage_evolution_no_halo_default','stage_evolution_no_crown_default','stage_evolution_no_ground_aura'].map(k=>`<label class="chipcheck"><input type="checkbox" checked disabled> <code class="mono" data-i18n-ignore="1">${k}</code> 🔒</label>`).join('');
  const mech = spArtT([tx('跃迁','Jump','Bước'), tx('关键词','Keyword','Từ khóa'), tx('机制','Mechanism','Cơ chế'), tx('示例','Example','Ví dụ')], SP_EVO_MECH.map(([j, k, m], i)=>[`<b>${j}</b>`, spArtE(k), spArtE(m), spiritView(d, 64, i+2, {nofx:true})]));
  const path = spArtT(['', tx('名称','Name','Tên'), tx('机制','Mechanism','Cơ chế'), tx('描述','Description','Mô tả'), tx('预览','Preview','Xem trước')], [1,2,3,4,5].map(n=>[`LV${n}`, `<span data-i18n-ignore="1">${escapeHtml(d.forms?.[0]?.[n-1]||'')}</span>`, n===3 ? spArtE(SP_LV3_ENV[P.env].n) : n===4 ? spArtE(SP_LV4_MUT[P.mut].n) : n===5 ? spArtE(SP_LV5_DOM[P.dom].n) + `<br><small data-i18n-ignore="1">${escapeHtml(trT(spDomName(d)))}</small>` : spArtE(SP_EVO_MECH[0][1]), spArtE(spPathText(d, n)), spiritView(d, n>=4?96:80, n, {nofx:true})]), 'sp-art-stage');
  const sel = (name, map, v)=>spSel(name, Object.keys(map).map(k=>[k, `${k} ${trT(map[k].n)}`]), v);
  const ed = `<form id="spPathForm" class="sp-form" onsubmit="return false" data-id="${escapeAttr(d.id)}"><div class="sp-form-row"><label>${escapeHtml(tx('LV3 环境','LV3 environment','Môi trường LV3'))}${sel('env', SP_LV3_ENV, P.env)}</label><label>${escapeHtml(tx('LV4 质变','LV4 transformation','Biến đổi LV4'))}${sel('mut', SP_LV4_MUT, P.mut)}</label><label>${escapeHtml(tx('LV5 领域','LV5 realm','Cõi LV5'))}${sel('dom', SP_LV5_DOM, P.dom)}</label><label>${escapeHtml(tx('概念字','Concept glyph','Chữ khái niệm'))}<input name="glyph" maxlength="2" value="${escapeAttr(doc.glyph||'')}" placeholder="${escapeAttr(P.glyph)}" data-i18n-ignore="1"></label><label>${escapeHtml(tx('域子名（全库唯一）','Realm sub-name (unique)','Tên cõi (duy nhất)'))}<input name="domName" maxlength="24" value="${escapeAttr(doc.domName||'')}" placeholder="${escapeAttr(spDomName(d)[0])}" data-i18n-ignore="1"></label></div>
    <div class="sp-form-row"><label>${escapeHtml(tx('伙伴','Companions','Bạn đồng hành'))}<input name="comp" value="${escapeAttr(doc.comp||'')}" placeholder="${escapeAttr(P.comp||'')}" data-i18n-ignore="1"></label>${[3,4,5].map(n=>`<label>LV${n} ${escapeHtml(tx('描述','description','mô tả'))}<input name="d${n}" value="${escapeAttr(doc['d'+n]||'')}" placeholder="${escapeAttr(spPathText(d, n)[0])}" data-i18n-ignore="1"></label>`).join('')}</div>
    <div class="sp-form-act"><button type="button" class="btn btn-primary btn-sm" data-act="spPathSave">${escapeHtml(tx('保存进化路径','Save the evolution path','Lưu lộ trình'))}</button><button type="button" class="btn btn-ghost btn-sm" data-act="spDomainEnter" data-id="${escapeAttr(d.id)}">🌌 ${escapeHtml(tx('进入领域（预览）','Enter the realm (preview)','Vào cõi (xem trước)'))}</button></div></form>`;
  /* 类型库：每种类型挑一只代表精灵展示 */
  const pick = (k, v)=>[...spLib().filter(x=>x.forms), ...Object.keys(SP_EVO_PATH_TV).map(spTvDef).filter(Boolean)].find(x=>spPathOf(x)[k]===v);
  const types = (map, k, st)=>`<div class="sp-art-grid sm">${Object.keys(map).map(t=>{ const s0 = pick(k, t); return `<article class="sp-art-school"><h4>${t} · ${spArtE(map[t].n)}</h4>${s0 ? spiritView(s0, st>=4?104:92, st, {nofx:true}) : '—'}<small>${s0 ? escapeHtml(trT(s0.name)) : ''}${s0 && k==='dom' ? `<br><span data-i18n-ignore="1">${escapeHtml(trT(spDomName(s0)))}</span>` : ''}</small>${map[t].law ? `<small class="hint">${spArtE(map[t].law)}</small>` : ''}</article>`; }).join('')}</div>`;
  const all = spLib().filter(x=>x.forms && x.enabled!==false), cnt = (k, v)=>all.filter(x=>spPathOf(x)[k]===v).length;
  const dist = spArtT([tx('类型','Type','Loại'), tx('精灵数','Spirits','Số tinh linh')], [...Object.keys(SP_LV3_ENV).map(k=>[`LV3 ${k} ${spArtE(SP_LV3_ENV[k].n)}`, cnt('env',k)]), ...Object.keys(SP_LV4_MUT).map(k=>[`LV4 ${k} ${spArtE(SP_LV4_MUT[k].n)}`, cnt('mut',k)]), ...Object.keys(SP_LV5_DOM).map(k=>[`LV5 ${k} ${spArtE(SP_LV5_DOM[k].n)}`, cnt('dom',k)])]);
  return spArtCard(`🪜 ${escapeHtml(tx('进化四段论 · 全局配置','Four-stage evolution · global configuration','Tiến hóa bốn bước · cấu hình'))}`, `<form id="spPathCfg" class="sp-form" onsubmit="return false"><div class="sp-chipchecks">${flags}</div><div class="sp-form-act"><button type="button" class="btn btn-primary btn-sm" data-act="spPathCfgSave">${escapeHtml(tx('保存','Save','Lưu'))}</button></div></form>` + mech)
    + spArtCard(`🧬 ${escapeHtml(tx('精灵进化路径（SpiritEvolutionPathViewer）','Spirit evolution path (SpiritEvolutionPathViewer)','Lộ trình tiến hóa'))}`, spArtSampleSel() + path + ed)
    + spArtCard(`🏮 ${escapeHtml(tx('LV3 六种环境 + 伙伴（LV3EnvironmentViewer · LV3CompanionViewer）','Six LV3 environments + companions','Sáu môi trường LV3 + bạn đồng hành'))}`, types(SP_LV3_ENV, 'env', 3))
    + spArtCard(`🦋 ${escapeHtml(tx('LV4 八种质变（LV4MutationTypeViewer）','Eight LV4 transformations','Tám biến đổi LV4'))}`, types(SP_LV4_MUT, 'mut', 4))
    + spArtCard(`🌌 ${escapeHtml(tx('LV5 十二种领域（LV5DomainTypeViewer · LV5DomainEntryViewer）','Twelve LV5 realms (enterable)','Mười hai cõi LV5 (có thể vào)'))}`, types(SP_LV5_DOM, 'dom', 5))
    + spArtCard(`📊 ${escapeHtml(tx('类型分布','Type distribution','Phân bố loại'))}`, dist);
}
/* 图鉴详情：进化路径 + 进入领域（拥有 LV5 才可进入；管理员可预览） */
function spCxPathRows(def, on, me){
  if(!on || !def?.forms || !spPathOn()) return ''; let lv = 5; try{ if(me) lv = Math.max(1, ...[1,2,3,4,5].filter(n=>me.codex?.[`sps:${def.id}:${n}`])); }catch(_e){}
  const P = spPathOf(def), rows = [3,4,5].filter(n=>n<=lv).map(n=>`<li><b>LV${n} ${n===3?escapeHtml(trT(SP_LV3_ENV[P.env].n)):n===4?escapeHtml(trT(SP_LV4_MUT[P.mut].n)):escapeHtml(trT(SP_LV5_DOM[P.dom].n)) + ' · ' + escapeHtml(trT(spDomName(def)))}</b> · ${escapeHtml(trT(spPathText(def, n)))}</li>`).join('');
  const canEnter = spPathFlags().entry && (lv>=5 || spIsAdmin());
  return rows ? `<dt>${escapeHtml(tx('进化路径','Evolution path','Lộ trình tiến hóa'))}</dt><dd><ul class="sp-art-cx">${rows}</ul>${canEnter ? `<button type="button" class="btn btn-ghost btn-sm" data-act="spDomainEnter" data-id="${escapeAttr(def.id)}">🌌 ${escapeHtml(tx('进入领域','Enter the realm','Vào cõi'))}</button>` : ''}</dd>` : '';
}
function spAction17(act, el, id){
  const S = spS();
  switch(act){
    case 'spDomainEnter': spDomainEnter(el?.dataset?.id || id); return false;
    case 'spPathCfgSave': { if(!spIsAdmin()) return false; const fd = new FormData(document.getElementById('spPathCfg')), o = {}; SP_PATH_FLAGS.forEach(([k])=>o[k] = fd.get('pf_'+k)==='on');
      const E = gCfg().evoCfg || {}; G().config = {...gCfg(), evoCfg:{...E, path:o}, updatedAt:gNowIso(), updatedBy:spMe()}; spAuditCore('evo-path-config', '', o); spCacheVer++; saveGrowth(true); toast(tx('已保存','Saved','Đã lưu'), 'ok'); return true; }
    case 'spPathSave': { if(!spIsAdmin()) return false; const f = document.getElementById('spPathForm'), fd = new FormData(f), did = f.dataset.id, o = {};
      ['env','mut','dom','glyph','comp','d3','d4','d5','domName'].forEach(k=>{ const v = String(fd.get(k)||'').trim(); if(v) o[k] = v; });
      if(o.domName && [...spDomNameAll().entries()].some(([id, z])=>id!==did && z===o.domName)){ toast(tx('域子名已被其他精灵使用','This realm sub-name is already used by another spirit','Tên cõi đã được tinh linh khác dùng'), 'warn'); return false; }
      const E = gCfg().evoCfg || {}; G().config = {...gCfg(), evoCfg:{...E, paths:{...(E.paths||{}), [did]:o}}, updatedAt:gNowIso(), updatedBy:spMe()}; spAuditCore('evo-path', did, {}); spCacheVer++; saveGrowth(true); toast(tx('已保存','Saved','Đã lưu'), 'ok'); return true; }
  }
  return null;
}
Object.assign(SP_AUDIT_LABEL, {'evo-path-config':['进化四段论配置','Four-stage evolution settings','Cấu hình tiến hóa bốn bước'], 'evo-path':['精灵进化路径','Spirit evolution path','Lộ trình tiến hóa']});
