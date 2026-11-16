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
