(function(){
  "use strict";
  const KEY="centralVagasDemo2026";
  const demo={protocol:"CV-2026-0042",status:"Em análise",unit:"EMEI Jardim das Flores",updated:"10/11/2026 • 14h30",responsavel:"",crianca:"",faixa:"",turno:""};
  let state={selectedUnit:"",applications:[]};
  try{const saved=JSON.parse(localStorage.getItem(KEY)||"null");if(saved&&typeof saved==="object"){state=Object.assign(state,saved)}}catch(e){}
  const $=id=>document.getElementById(id);
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){toast("O navegador não permitiu salvar os dados localmente.")}}
  function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2800)}
  function showPage(name){const valid=["inicio","inscricao","unidades","acompanhamento","prioridade","ajuda"];if(!valid.includes(name))name="inicio";document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+name));document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===name));window.scrollTo({top:0,behavior:"smooth"});if(name==="inscricao")updateUnitField()}
  document.querySelectorAll("[data-page]").forEach(el=>el.addEventListener("click",()=>showPage(el.dataset.page)));
  function updateUnitField(){$("unidade-escolhida").value=state.selectedUnit||"Nenhuma unidade selecionada"}
  function renderUnits(){document.querySelectorAll("[data-unit]").forEach(btn=>{const card=btn.closest(".unit-card");const chosen=state.selectedUnit===btn.dataset.unit;card.classList.toggle("selected",chosen);btn.textContent=chosen?"✓ Unidade selecionada":"Selecionar unidade";btn.classList.toggle("btn-outline",chosen);btn.classList.toggle("btn-primary",!chosen)});if(state.selectedUnit){$("unidade-confirmada").hidden=false;$("unidade-confirmada-nome").textContent=state.selectedUnit+" foi definida como preferência nesta demonstração."}else{$("unidade-confirmada").hidden=true}updateUnitField()}
  document.querySelectorAll("[data-unit]").forEach(btn=>btn.addEventListener("click",()=>{state.selectedUnit=btn.dataset.unit;save();renderUnits();toast("Unidade selecionada para a demonstração.")}));
  function makeProtocol(){const n=String(Math.floor(1000+Math.random()*9000));return "CV-2026-"+n}
  function clearErrors(){document.querySelectorAll(".field").forEach(f=>f.classList.remove("invalid"));$("erro-check").style.display="none"}
  $("form-inscricao").addEventListener("reset",()=>{setTimeout(()=>{clearErrors();$("resultado-inscricao").hidden=true;updateUnitField()},0)});
  $("form-inscricao").addEventListener("submit",e=>{
    e.preventDefault();clearErrors();let ok=true;
    [["responsavel","f-responsavel"],["crianca","f-crianca"],["faixa","f-faixa"],["turno","f-turno"]].forEach(pair=>{const value=$(pair[0]).value.trim();if(!value){$(pair[1]).classList.add("invalid");ok=false}});
    if(!$("dados-ficticios").checked){$("erro-check").style.display="block";ok=false}
    if(!ok){toast("Confira os campos obrigatórios antes de continuar.");return}
    const app={protocol:makeProtocol(),responsavel:$("responsavel").value.trim(),crianca:$("crianca").value.trim(),faixa:$("faixa").value,turno:$("turno").value,unit:state.selectedUnit||"Unidade não selecionada",created:new Date().toLocaleDateString("pt-BR"),status:"Recebida — demonstração"};
    state.applications.unshift(app);save();$("novo-protocolo").textContent=app.protocol;$("resultado-inscricao").hidden=false;$("resultado-inscricao").scrollIntoView({behavior:"smooth",block:"nearest"});toast("Protocolo demonstrativo criado neste navegador.");
  });
  $("ver-novo-protocolo").addEventListener("click",()=>{const p=$("novo-protocolo").textContent;$("protocolo").value=p;showPage("acompanhamento");consultar(p)});
  function consultar(value){const protocol=(value||"").trim().toUpperCase();const app=state.applications.find(a=>a.protocol.toUpperCase()===protocol);const isDemo=protocol===demo.protocol;const box=$("resultado-consulta");if(!app&&!isDemo){box.innerHTML='<div class="disclaimer">Não encontramos esse protocolo nesta demonstração. Confira a sequência digitada ou utilize o protocolo de exemplo <strong>CV-2026-0042</strong>.</div>';return}
    const data=app||demo;const status=app?"Recebida — demonstração":demo.status;const unit=data.unit||demo.unit;const date=data.created||"10/11/2026";
    box.innerHTML='<div class="result"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap"><div><div class="eyebrow" style="margin:0 0 4px">PROTOCOLO CONSULTADO</div><div class="protocol">'+escapeHtml(data.protocol)+'</div></div><span class="status">'+escapeHtml(status)+'</span></div><p style="font-size:13px;color:#52657b;margin-top:10px">'+(app?"Cadastro fictício criado neste navegador. Nenhuma solicitação foi enviada.":"Solicitação demonstrativa recebida e aguardando conferência de informações.")+'</p><div class="grid grid-2" style="margin-top:15px"><div><small class="muted">Unidade de referência</small><b style="display:block;color:var(--navy);font-size:13px">'+escapeHtml(unit)+'</b></div><div><small class="muted">Data de registro</small><b style="display:block;color:var(--navy);font-size:13px">'+escapeHtml(date)+'</b></div></div></div><div class="timeline"><div class="timeline-item done"><span class="dot">✓</span><div><b>Solicitação registrada</b><small>'+escapeHtml(date)+' • Protocolo demonstrativo criado.</small></div></div><div class="timeline-item"><span class="dot">2</span><div><b>Conferência das informações</b><small>Próxima etapa ilustrativa. Aguardando análise.</small></div></div><div class="timeline-item"><span class="dot">3</span><div><b>Resultado da solicitação</b><small>Ainda não há resultado neste protocolo demonstrativo.</small></div></div></div>';
  }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  $("form-consulta").addEventListener("submit",e=>{e.preventDefault();consultar($("protocolo").value)});
  $("usar-exemplo").addEventListener("click",()=>{$("protocolo").value=demo.protocol;consultar(demo.protocol)});
  $("copiar-mensagem").addEventListener("click",async()=>{const text=$("mensagem-exemplo").textContent;try{await navigator.clipboard.writeText(text);toast("Exemplo copiado.")}catch(e){const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");toast("Exemplo copiado.")}catch(err){toast("Não foi possível copiar automaticamente.")}ta.remove()}});
  renderUnits();updateUnitField();
  if("serviceWorker" in navigator){/* Este protótipo não registra serviços em segundo plano. */}
})();

(function(){
  "use strict";
  const KEY = "centralVagasHF2026";
  const demos = {
    "2026.000123": {
      protocol: "2026.000123",
      status: "Em análise",
      queuePos: "7ª posição na fila",
      points: "11 pontos (Mãe solo + Renda + Proximidade)",
      units: ["EMEI Jardim das Flores", "CEI Pequeno Horizonte"],
      updated: "12/11/2026 • 14h30",
      docsOk: true
    },
    "CV-2026-0042": {
      protocol: "CV-2026-0042",
      status: "Em análise",
      queuePos: "7ª posição na fila",
      points: "8 pontos (Renda + Proximidade)",
      units: ["EMEI Jardim das Flores"],
      updated: "10/11/2026 • 14h30",
      docsOk: true
    }
  };

  let state = { selectedUnits: [], applications: [], draft: null, uploadedDocs: false };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved && typeof saved === "object") state = Object.assign(state, saved);
  } catch (e) {}

  const $ = id => document.getElementById(id);
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { toast("O navegador não permitiu salvar localmente."); }
  }
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 3000);
  }

  function showPage(name) {
    const valid = ["inicio", "inscricao", "unidades", "acompanhamento", "prioridade", "ajuda"];
    if (!valid.includes(name)) name = "inicio";
    document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === "page-" + name));
    document.querySelectorAll(".nav button").forEach(b => b.classList.toggle("active", b.dataset.page === name));
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (name === "inscricao") updateUnitField();
  }
  document.querySelectorAll("[data-page]").forEach(el => el.addEventListener("click", () => showPage(el.dataset.page)));

  function updateUnitField() {
    const box = $("unidades-resumo-lista");
    const badge = $("badge-unidades");
    const counter = $("contador-unidades");
    const count = state.selectedUnits.length;
    if (badge) badge.textContent = count + "/3";
    if (counter) counter.textContent = count + " de 3 selecionadas";
    if (!box) return;
    if (count === 0) {
      box.innerHTML = "Nenhuma unidade selecionada ainda (você pode escolher até 3 opções).";
    } else {
      box.innerHTML = state.selectedUnits.map((u, i) => `<div><strong>${i + 1}ª opção:</strong> ${escapeHtml(u)}</div>`).join("");
    }
  }

  function renderUnits() {
    document.querySelectorAll("[data-unit]").forEach(btn => {
      const card = btn.closest(".unit-card");
      const idx = state.selectedUnits.indexOf(btn.dataset.unit);
      const chosen = idx !== -1;
      card.classList.toggle("selected", chosen);
      btn.textContent = chosen ? `✓ ${idx + 1}ª preferência (Remover)` : "Selecionar unidade";
      btn.classList.toggle("btn-outline", chosen);
      btn.classList.toggle("btn-primary", !chosen);
    });
    if (state.selectedUnits.length > 0) {
      $("unidade-confirmada").hidden = false;
      $("qtd-pref").textContent = state.selectedUnits.length;
      $("unidade-confirmada-nome").textContent = "Ordem escolhida: " + state.selectedUnits.map((u, i) => `${i + 1}ª ${u}`).join(" • ");
    } else {
      $("unidade-confirmada").hidden = true;
    }
    updateUnitField();
  }

  document.querySelectorAll("[data-unit]").forEach(btn => btn.addEventListener("click", () => {
    const unit = btn.dataset.unit;
    const idx = state.selectedUnits.indexOf(unit);
    if (idx !== -1) {
      state.selectedUnits.splice(idx, 1);
      toast("Unidade removida da lista de preferência.");
    } else {
      if (state.selectedUnits.length >= 3) {
        toast("Limite de 3 unidades atingido. Remova uma opção para trocar.");
        return;
      }
      state.selectedUnits.push(unit);
      toast(`${state.selectedUnits.length}ª unidade adicionada.`);
    }
    save();
    renderUnits();
  }));

  $("btn-simular-upload").addEventListener("click", () => {
    state.uploadedDocs = true;
    $("status-upload").textContent = "✓ certidao_ficticia.pdf, comprovante_ficticio.pdf anexados";
    toast("Documentos demonstrativos anexados.");
  });

  $("btn-salvar-rascunho").addEventListener("click", () => {
    state.draft = {
      crianca: $("crianca").value,
      faixa: $("faixa").value,
      responsavel: $("responsavel").value,
      parentesco: $("parentesco").value,
      turno: $("turno").value,
      bairro: $("bairro").value
    };
    save();
    toast("Rascunho salvo neste navegador. Você pode continuar depois.");
  });

  function loadDraft() {
    if (!state.draft) return;
    $("crianca").value = state.draft.crianca || "";
    $("faixa").value = state.draft.faixa || "";
    $("responsavel").value = state.draft.responsavel || "";
    $("parentesco").value = state.draft.parentesco || "";
    $("turno").value = state.draft.turno || "";
    $("bairro").value = state.draft.bairro || "Centro";
  }

  function makeProtocol() {
    const n = String(Math.floor(100000 + Math.random() * 899999));
    return "2026." + n;
  }

  function clearErrors() {
    document.querySelectorAll(".field").forEach(f => f.classList.remove("invalid"));
    $("erro-check").style.display = "none";
  }

  $("form-inscricao").addEventListener("reset", () => {
    setTimeout(() => {
      clearErrors();
      state.draft = null;
      state.uploadedDocs = false;
      $("status-upload").textContent = "Nenhum arquivo simulado";
      $("resultado-inscricao").hidden = true;
      save();
      updateUnitField();
    }, 0);
  });

  $("form-inscricao").addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();
    let ok = true;
    [["crianca", "f-crianca"], ["faixa", "f-faixa"], ["responsavel", "f-responsavel"], ["parentesco", "f-parentesco"], ["turno", "f-turno"]].forEach(pair => {
      if (!$(pair[0]).value.trim()) {
        $(pair[1]).classList.add("invalid");
        ok = false;
      }
    });
    if (!$("dados-ficticios").checked) {
      $("erro-check").style.display = "block";
      ok = false;
    }
    if (!ok) {
      toast("Confira os campos obrigatórios antes de continuar.");
      return;
    }

    let pts = 0;
    const labels = [];
    document.querySelectorAll(".crit-check:checked").forEach(c => {
      pts += Number(c.value);
      labels.push(c.dataset.label);
    });

    const app = {
      protocol: makeProtocol(),
      responsavel: $("responsavel").value.trim(),
      crianca: $("crianca").value.trim(),
      faixa: $("faixa").value,
      turno: $("turno").value,
      units: state.selectedUnits.length ? [...state.selectedUnits] : ["EMEI Jardim das Flores (Padrão)"],
      points: pts > 0 ? `${pts} pontos (${labels.join(", ")})` : "0 pontos (Critérios gerais)",
      queuePos: pts >= 8 ? "4ª posição na fila" : "9ª posição na fila",
      created: new Date().toLocaleDateString("pt-BR"),
      status: "Em análise",
      docsOk: state.uploadedDocs
    };

    state.applications.unshift(app);
    state.draft = null;
    save();
    $("novo-protocolo").textContent = app.protocol;
    $("novo-resumo-pontos").textContent = `Pontuação calculada: ${app.points} • Estimativa: ${app.queuePos}`;
    $("resultado-inscricao").hidden = false;
    $("resultado-inscricao").scrollIntoView({ behavior: "smooth", block: "nearest" });
    toast("Protocolo demonstrativo criado com sucesso.");
  });

  $("ver-novo-protocolo").addEventListener("click", () => {
    const p = $("novo-protocolo").textContent;
    $("protocolo").value = p;
    showPage("acompanhamento");
    consultar(p);
  });

  function consultar(value) {
    const protocol = (value || "").trim().toUpperCase();
    const app = state.applications.find(a => a.protocol.toUpperCase() === protocol);
    const demoItem = demos[protocol];
    const box = $("resultado-consulta");

    if (!app && !demoItem) {
      box.innerHTML = '<div class="disclaimer">Protocolo não encontrado nesta demonstração. Utilize o exemplo <strong>2026.000123</strong> ou gere uma nova inscrição.</div>';
      return;
    }

    const data = app || demoItem;
    const unitsText = (data.units || []).map((u, i) => `${i + 1}ª: ${u}`).join(" | ");
    const date = data.created || "12/11/2026";

    box.innerHTML = `
      <div class="result">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap">
          <div>
            <div class="eyebrow" style="margin:0 0 4px">PROTOCOLO CONSULTADO</div>
            <div class="protocol">${escapeHtml(data.protocol)}</div>
          </div>
          <span class="status">${escapeHtml(data.status)}</span>
        </div>
        <div class="queue-highlight">📊 Posição atual: ${escapeHtml(data.queuePos)}</div>
        <p style="font-size:13px;color:#52657b;margin-top:10px">Solicitação validada e aguardando disponibilidade de vaga na rede municipal. Você será notificado via <strong>WhatsApp</strong> quando houver atualização.</p>
        <div class="grid grid-2" style="margin-top:15px">
          <div><small class="muted">Unidades de preferência</small><b style="display:block;color:var(--navy);font-size:13px">${escapeHtml(unitsText)}</b></div>
          <div><small class="muted">Critérios e Pontuação</small><b style="display:block;color:var(--navy);font-size:13px">${escapeHtml(data.points)}</b></div>
        </div>
      </div>
      <div class="timeline">
        <div class="timeline-item done"><span class="dot">✓</span><div><b>1. Solicitação registrada</b><small>${escapeHtml(date)} • Protocolo gerado no portal.</small></div></div>
        <div class="timeline-item done"><span class="dot">✓</span><div><b>2. Validação dos documentos concluída</b><small>${escapeHtml(date)} • Comprovantes conferidos na triagem.</small></div></div>
        <div class="timeline-item"><span class="dot">3</span><div><b>3. Em análise / Aguardando vaga (${escapeHtml(data.queuePos)})</b><small>Etapa atual. Classificação ordenada pelos critérios públicos.</small></div></div>
        <div class="timeline-item"><span class="dot">4</span><div><b>4. Liberação de vaga e aviso no WhatsApp</b><small>Quando a vaga surgir, o responsável receberá alerta automático pelo WhatsApp.</small></div></div>
      </div>`;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  $("form-consulta").addEventListener("submit", e => { e.preventDefault(); consultar($("protocolo").value); });
  $("usar-exemplo").addEventListener("click", () => { $("protocolo").value = "2026.000123"; consultar("2026.000123"); });

  // Simulador de pontuação na tela Critérios
  document.querySelectorAll("#simulador-criterios input").forEach(chk => {
    chk.addEventListener("change", () => {
      let sum = 0;
      document.querySelectorAll("#simulador-criterios input:checked").forEach(c => sum += Number(c.value));
      $("total-pontos-sim").textContent = sum + (sum === 1 ? " ponto" : " pontos");
    });
  });

  $("copiar-mensagem").addEventListener("click", async () => {
    const text = $("mensagem-exemplo").textContent;
    try { await navigator.clipboard.writeText(text); toast("Exemplo copiado."); }
    catch (e) { toast("Não foi possível copiar automaticamente."); }
  });

  loadDraft();
  renderUnits();
  updateUnitField();
  consultar("2026.000123");
})();
