export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === '/' || url.pathname === '/index.html') {
        return new Response(INDEX_HTML, { headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'no-store' } });
      }
      if (url.pathname === '/api/create-order') return await createOrder(request, env);
      if (url.pathname === '/api/submit-result') return await submitResult(request, env);
      if (url.pathname === '/api/check-order') return await checkOrder(request, env);
      if (url.pathname === '/api/webhook') return json(200, { received: true });
      return new Response('Not found', { status: 404 });
    } catch (e) {
      return json(500, { error: e?.message || 'Erro interno.' });
    }
  }
};

const INDEX_HTML = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Desafio Cerebral</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f4f6fb;color:#172033;font-family:Arial,sans-serif}.wrap{max-width:620px;margin:auto;padding:18px}.card{background:#fff;border-radius:22px;padding:24px;box-shadow:0 8px 30px rgba(20,30,60,.09)}.brand{font-weight:900;color:#5b4bdb}h1{font-size:30px}p{line-height:1.55;color:#536074}.badges{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}.badge{background:#eef0ff;padding:8px 11px;border-radius:999px;font-size:13px;font-weight:700}button{width:100%;border:0;border-radius:14px;padding:15px;font-size:16px;font-weight:800;cursor:pointer;background:#5b4bdb;color:#fff;margin-top:12px}button.secondary{background:#eef0ff;color:#4235a8}button:disabled{opacity:.5}.progress{height:9px;background:#e7e9f2;border-radius:20px;overflow:hidden;margin:12px 0 20px}.progress div{height:100%;background:#5b4bdb}.top{display:flex;justify-content:space-between;font-size:13px;font-weight:800;color:#687389}.diff{display:inline-block;padding:6px 10px;border-radius:999px;background:#f0f1f6;font-size:12px;font-weight:800}.question{font-size:21px;line-height:1.35;font-weight:800;margin:12px 0 18px}.option{background:#f7f8fc;color:#1e2738;border:2px solid transparent;text-align:left}.option.selected{border-color:#5b4bdb;background:#eeecff}.input{width:100%;padding:15px;border:1px solid #d9ddea;border-radius:12px;font-size:16px}.blur{filter:blur(8px);font-size:42px;font-weight:900;margin:20px 0}.score{font-size:54px;font-weight:900;color:#5b4bdb;text-align:center}.stat{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #edf0f5}.note{background:#f7f8fc;border-radius:14px;padding:14px;font-size:13px;color:#59657a;margin-top:16px}.small{font-size:12px;color:#788297}footer{text-align:center;color:#8b94a6;font-size:12px;padding:18px}

.pix-qr-placeholder{width:280px;max-width:100%;min-height:180px;margin:16px auto;padding:24px;box-sizing:border-box;border:1px dashed #cfc8f5;border-radius:16px;background:#faf9ff;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;color:#59657a;line-height:1.5}.pix-qr-placeholder a{display:inline-block;margin-top:12px;color:#5b4bdb;font-weight:900}
</style>
<style>
.result-preview{background:linear-gradient(135deg,#f2efff,#faf9ff);border:1px solid #e4defd;border-radius:20px;padding:20px;text-align:center;margin:20px 0}
.preview-title{font-size:19px;font-weight:800;margin-bottom:10px}
.locked-score{font-size:34px;font-weight:900;letter-spacing:4px;filter:blur(7px);user-select:none}
.locked-note{display:inline-block;margin-top:12px;padding:9px 14px;border-radius:999px;background:#e9e4ff;color:#5140c9;font-weight:700;font-size:13px}
.preview-heading,.email-heading{font-size:19px;margin:20px 0 12px}
.preview-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}
.preview-card{padding:14px;border:1px solid #e4e7ef;border-radius:15px;background:#fff}
.preview-card b{display:block;font-size:14px;margin-bottom:5px}
.preview-card span{display:block;color:#687086;font-size:12px;line-height:1.35}
@media(max-width:520px){.preview-grid{grid-template-columns:1fr}}
.result-card{background:linear-gradient(180deg,#ffffff 0%,#fbfaff 100%);border:1px solid #e7e2fb;border-radius:24px;padding:24px 20px;box-shadow:0 14px 40px rgba(50,40,120,.10)}
.result-hero{text-align:center;padding:8px 4px 20px}
.result-kicker{font-size:13px;font-weight:900;letter-spacing:.08em;color:#5b4bdb;text-transform:uppercase}
.result-title{font-size:28px;line-height:1.15;margin:8px 0 16px;color:#172033}
.accuracy{font-size:46px;font-weight:900;color:#5b4bdb;line-height:1}
.accuracy-label{font-size:15px;font-weight:800;color:#59657a;margin-top:8px}
.points-pill{display:inline-block;margin-top:14px;padding:9px 14px;border-radius:999px;background:#eeeaff;color:#4b3dc0;font-weight:800;font-size:14px}
.percent-track{height:12px;background:#e9e8f2;border-radius:999px;overflow:hidden;margin:18px 0 8px}
.percent-fill{height:100%;background:linear-gradient(90deg,#5b4bdb,#806ee8);border-radius:999px}
.percent-label{text-align:center;font-size:13px;font-weight:800;color:#687389}
.profile-card{margin-top:18px;background:#f6f3ff;border:1px solid #e5defd;border-radius:18px;padding:18px}
.section-label{font-size:13px;font-weight:900;letter-spacing:.06em;color:#687389;text-transform:uppercase;margin-bottom:8px}
.profile-name{font-size:22px;font-weight:900;color:#2f276f;margin-bottom:8px}
.profile-text{margin:0;color:#536074;line-height:1.55;font-size:14px}
.performance{margin-top:20px}
.performance-row{margin:14px 0}
.performance-head{display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:800;color:#30394b;margin-bottom:7px}
.bar-track{height:10px;background:#ececf3;border-radius:999px;overflow:hidden}
.bar-fill{height:100%;border-radius:999px}
.easy-fill{background:#48b77a}.medium-fill{background:#e5b83f}.hard-fill{background:#e45f67}
.email-confirm{display:flex;gap:10px;align-items:flex-start;margin-top:18px;background:#f7f8fc;border-radius:14px;padding:13px;color:#59657a;font-size:13px;line-height:1.45}
.share-main{background:linear-gradient(135deg,#5b4bdb,#725fe4);box-shadow:0 8px 18px rgba(91,75,219,.24)}
.share-main:hover{transform:translateY(-1px)}
.disclaimer{font-size:11px;color:#7b8495;line-height:1.45;text-align:center;margin:18px 4px 0}
@media(max-width:520px){.result-title{font-size:25px}.accuracy{font-size:42px}}
</style>

<style>
.pix-box{background:#f8f7ff;border:1px solid #e4defd;border-radius:20px;padding:20px;text-align:center;margin:20px 0}
.pix-qr{width:min(280px,100%);height:auto;background:#fff;border-radius:14px;padding:10px;border:1px solid #e5e7ef}
.pix-code{width:100%;padding:12px;border:1px solid #d9ddea;border-radius:12px;font-size:12px;background:#fff;margin-top:12px}
.pix-status{font-weight:800;color:#5b4bdb;margin-top:14px}
.pix-price{font-size:26px;font-weight:900;color:#2f276f}
.sequence{display:block;text-align:center;font-size:1.25em;letter-spacing:.18em;margin-top:12px}
</style>
<style>
.home-card{padding:0;overflow:hidden;background:linear-gradient(145deg,#fff 0%,#fbfaff 100%)}
.home-hero{padding:30px 26px 24px;position:relative;overflow:hidden;background:radial-gradient(circle at 90% 5%,rgba(91,75,219,.15),transparent 35%),linear-gradient(145deg,#fff,#f8f6ff)}
.home-hero:after{content:"";position:absolute;width:180px;height:180px;border-radius:50%;right:-85px;top:-85px;background:rgba(91,75,219,.07)}
.home-brand{display:inline-flex;align-items:center;gap:8px;font-weight:900;color:#5142c6;letter-spacing:.02em;font-size:14px;margin-bottom:20px}.home-brand-dot{width:12px;height:12px;border-radius:50%;background:#ff6b8a;box-shadow:0 0 0 5px rgba(255,107,138,.12)}
.home-kicker{font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#6c62b7;margin-bottom:8px}.home-title{font-size:36px;line-height:1.06;letter-spacing:-.03em;margin:0 0 14px;color:#171b2d}.home-title span{color:#5b4bdb}.home-subtitle{font-size:16px;line-height:1.55;color:#586277;margin:0;max-width:520px}
.home-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:18px 26px 8px}.home-stat{padding:12px 8px;text-align:center;border:1px solid #e9e6f5;border-radius:14px;background:#fff}.home-stat strong{display:block;font-size:16px;color:#2e285f}.home-stat span{display:block;font-size:11px;color:#737b8d;margin-top:3px}.home-cta{padding:10px 26px 24px}.home-cta button{margin-top:0;padding:17px;border-radius:15px;font-size:16px;box-shadow:0 10px 22px rgba(91,75,219,.22);background:linear-gradient(135deg,#5b4bdb,#7664e8)}.home-trust{text-align:center;font-size:12px;color:#70798b;padding:0 26px 25px}.home-trust b{color:#5142c6}
@media(max-width:520px){.home-hero{padding:26px 20px 20px}.home-title{font-size:31px}.home-stats{padding-left:20px;padding-right:20px}.home-cta{padding-left:20px;padding-right:20px}.home-trust{padding-left:20px;padding-right:20px}.home-stat{padding:10px 5px}.home-stat strong{font-size:14px}.home-stat span{font-size:10px}}
</style></head><body><div class="wrap"><div class="card" id="app"></div><footer>Desafio Cerebral • experiência recreativa de raciocínio</footer></div>
<script>
const questions=[
{"d":"Fácil","q":"Qual palavra não pertence ao mesmo grupo?","o":["Cachorro","Gato","Cavalo","Mesa"],"a":3},
{"d":"Fácil","q":"Qual símbolo completa a sequência?<br><span class='sequence'>▲ ● ▲ ● ▲ ?</span>","o":["▲","●","■","◆"],"a":1},
{"d":"Fácil","q":"Ana é mais velha que Bruno. Bruno é mais velho que Carlos. Quem é o mais novo?","o":["Ana","Bruno","Carlos","Não é possível determinar"],"a":2},
{"d":"Fácil","q":"Qual número completa corretamente a sequência? 5 → 10 → 15 → 20 → ?","o":["22","24","25","30"],"a":2},
{"d":"Fácil","q":"Você está olhando para o Norte. Depois vira 90° para a direita e, em seguida, 90° para a esquerda. Para qual direção você está olhando agora?","o":["Norte","Sul","Leste","Oeste"],"a":0},
{"d":"Médio","q":"LIVRO está para LER assim como GARFO está para:","o":["Cortar","Comer","Escrever","Desenhar"],"a":1},
{"d":"Médio","q":"Em uma corrida, Lucas chegou antes de Bruno. Bruno chegou antes de Carlos. Daniel chegou depois de Carlos. Quem chegou em segundo lugar?","o":["Lucas","Bruno","Carlos","Daniel"],"a":1},
{"d":"Médio","q":"Observe as figuras: ● ▲ ■ / ● ▲ ■ / ● ▲ ■ / ● ▲ ◆. Qual figura está diferente das demais?","o":["●","▲","■","◆"],"a":3},
{"d":"Médio","q":"Todos os músicos estudam música. Rafael não estuda música. O que podemos concluir com certeza?","o":["Rafael é músico","Rafael não é músico","Rafael pode ou não ser músico","Todos os músicos são Rafael"],"a":1},
{"d":"Médio","q":"Qual número completa a sequência? 2 → 5 → 11 → 23 → 47 → ?","o":["71","95","96","97"],"a":1},
{"d":"Difícil","q":"Você tem 3 caixas: uma contém somente maçãs, uma somente laranjas e uma contém maçãs e laranjas. Todas as etiquetas estão erradas. De qual caixa você deve retirar uma fruta para identificar corretamente as três?","o":["Da caixa etiquetada 'Maçãs'","Da caixa etiquetada 'Laranjas'","Da caixa etiquetada 'Maçãs e Laranjas'","Não é possível determinar"],"a":2},
{"d":"Difícil","q":"Quatro pessoas — Ana, Bia, Caio e Davi — estão em uma fila. Ana está antes de Bia. Caio está depois de Davi. Bia está antes de Davi. Quem está necessariamente em primeiro lugar?","o":["Ana","Bia","Caio","Davi"],"a":0},
{"d":"Difícil","q":"Qual número completa a sequência? 5 → 9 → 16 → 26 → 39 → ?","o":["52","54","55","58"],"a":2},
{"d":"Difícil","q":"Qual par completa a sequência? AB → DE → GH → JK → ?","o":["LM","MN","NO","OP"],"a":1},
{"d":"Difícil","q":"Em uma fotografia, um homem aparece ao lado de um menino. O homem diz: 'O pai deste menino é filho do meu pai'. O homem não tem irmãos. Quem é o menino?","o":["Seu irmão","Seu sobrinho","Seu filho","Seu primo"],"a":2}
];;let idx=0,score=0,sel=null,answers=[],seconds=600,timer=null;
function home(){document.getElementById("app").className="card home-card";document.getElementById("app").innerHTML='<div class="home-hero"><div class="home-brand"><span class="home-brand-dot"></span> DESAFIO CEREBRAL</div><div class="home-kicker">Teste seu raciocínio</div><h1 class="home-title">Você consegue chegar até o fim sem <span>errar?</span></h1><p class="home-subtitle">15 desafios de lógica, padrões, atenção, dedução e orientação espacial. Comece sem saber o que vem pela frente.</p></div><div class="home-stats"><div class="home-stat"><strong>15</strong><span>perguntas</span></div><div class="home-stat"><strong>5</strong><span>fáceis</span></div><div class="home-stat"><strong>5</strong><span>médias</span></div><div class="home-stat"><strong>5</strong><span>difíceis</span></div></div><div class="home-cta"><button onclick="start()">🧠 COMEÇAR O DESAFIO</button></div><div class="home-trust">⏱️ Aproximadamente <b>10 minutos</b> • experiência recreativa de raciocínio</div>'}

function fmt(){return String(Math.floor(seconds/60)).padStart(2,"0")+":"+String(seconds%60).padStart(2,"0")}
function start(){idx=0;score=0;answers=[];seconds=600;clearInterval(timer);show();timer=setInterval(()=>{seconds--;let t=document.getElementById("timer");if(t)t.textContent=fmt();if(seconds<=0){clearInterval(timer);finish()}},1000)}
function show(){sel=null;let q=questions[idx],app=document.getElementById("app");app.className="card";app.innerHTML='<div class="top"><span>Pergunta '+(idx+1)+' de 15</span><span id="timer">'+fmt()+'</span></div><div class="progress"><div style="width:'+(idx/15*100)+'%"></div></div><span class="diff">'+q.d+'</span><div class="question">'+q.q+'</div><div id="opts"></div><button id="next" disabled>'+(idx===14?"FINALIZAR DESAFIO":"PRÓXIMA PERGUNTA")+'</button><button class="secondary" onclick="home()">REINICIAR</button>';q.o.forEach((x,i)=>{let b=document.createElement("button");b.className="option";b.textContent=String.fromCharCode(65+i)+") "+x;b.onclick=()=>{document.querySelectorAll(".option").forEach(z=>z.classList.remove("selected"));b.classList.add("selected");sel=i;document.getElementById("next").disabled=false};document.getElementById("opts").appendChild(b)});document.getElementById("next").onclick=()=>{answers.push(sel);if(sel===q.a)score+=q.d==="Fácil"?5:q.d==="Médio"?10:20;if(idx<14){idx++;show()}else finish()}}

async function finish(){
  clearInterval(timer);
  document.getElementById("app").innerHTML='<div style="text-align:center"><div class="brand">🧠 DESAFIO CEREBRAL</div><h2>Calculando seu resultado...</h2><p>Aguarde um instante.</p></div>';
  try{
    const r=await fetch('/api/submit-result',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({answers})
    });
    const data=await r.json();
    if(!r.ok) throw new Error(data.error||'Não foi possível calcular o resultado.');
    localStorage.setItem('dc_result_token',data.resultToken);
    showUnlock();
  }catch(err){
    document.getElementById("app").innerHTML='<div style="text-align:center"><div class="brand">🧠 DESAFIO CEREBRAL</div><h2>Não foi possível finalizar</h2><p>'+escapeHtml(err.message)+'</p><button onclick="finish()">TENTAR NOVAMENTE</button></div>';
  }
}
function showUnlock(){
  document.getElementById("app").innerHTML=\`<div style="text-align:center"><div class="brand">🧠 DESAFIO CEREBRAL</div><h2>Seu resultado já foi calculado!</h2><p>Você concluiu as 15 perguntas. <strong>O resultado detalhado está pronto.</strong></p><div class="result-preview"><div class="preview-title">Sua pontuação geral 🔒</div><div class="locked-score">000 / 175</div><div class="locked-note">🔒 Resultado completo liberado após o pagamento</div></div><h2 class="preview-heading">Veja uma prévia do que você vai receber:</h2><div class="preview-grid"><div class="preview-card"><b>📊 Desempenho geral</b><span>Sua pontuação total e classificação</span></div><div class="preview-card"><b>◔ Resultados por dificuldade</b><span>Seu desempenho em fáceis, médias e difíceis</span></div><div class="preview-card"><b>🧠 Perfil de raciocínio</b><span>Seus pontos fortes e áreas para melhorar</span></div><div class="preview-card"><b>☑ Gabarito completo</b><span>Todas as questões, respostas e explicações</span></div></div><h2 class="email-heading">Insira seu e-mail para desbloquear seu relatório:</h2><input class="input" id="email" type="email" placeholder="Seu melhor e-mail" autocomplete="email"><button onclick="checkout()">🔒 VER MEU RESULTADO — R$ 1,99 →</button><p class="trust">✓ Pagamento seguro pelo Mercado Pago &nbsp;&nbsp; ⚡ Pix &nbsp;&nbsp; 💳 Cartão &nbsp;&nbsp; ✉ Resultado por e-mail</p><p class="small">Na próxima tela, escolha <strong>Pix ou cartão</strong>. O pagamento é único de R$ 1,99, sem mensalidade.</p></div>\`;
}
async function checkout(){
  const e=document.getElementById("email").value.trim();
  if(!/^\\S+@\\S+\\.\\S+$/.test(e)){alert("Digite um e-mail válido.");return}
  const token=localStorage.getItem('dc_result_token');
  if(!token){alert("Seu resultado expirou. Faça o desafio novamente.");return}
  const btn=document.querySelector('#app button');
  if(btn){btn.disabled=true;btn.textContent='ABRINDO PAGAMENTO SEGURO...'}
  try{
    const r=await fetch('/api/create-order',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:e,resultToken:token})
    });
    const data=await r.json();
    if(!r.ok){
      let msg=data.error||'Não foi possível abrir o pagamento.';
      if(data.mp_error) msg += '\\nCódigo: '+data.mp_error;
      if(data.mp_message) msg += '\\nMensagem: '+data.mp_message;
      if(Array.isArray(data.mp_cause) && data.mp_cause.length){
        msg += '\\nDetalhe: '+data.mp_cause.map(c=>c.description||c.code).filter(Boolean).join(' | ');
      }
      throw new Error(msg);
    }
    localStorage.setItem('dc_email',e);
    localStorage.setItem('dc_order_id',data.orderId);
    if(!data.qrCode){ throw new Error('O Mercado Pago não retornou o código Pix.'); }
    showPixPayment(data);
    pollPixStatus();
  }catch(err){
    alert(err.message);
    if(btn){btn.disabled=false;btn.textContent='🔒 VER MEU RESULTADO — R$ 1,99 →'}
  }
}

function showPixPayment(data){
  const isTestMode = data.testMode === true;
  const qr=data.qrCodeBase64 ? \`data:image/png;base64,\${data.qrCodeBase64}\` : '';
  const qrVisual=qr
    ? \`<img class="pix-qr" src="\${qr}" alt="QR Code PIX">\`
    : \`<div class="pix-qr-placeholder">QR Code disponível na página segura do Mercado Pago.<br><a href="\${escapeHtml(data.ticketUrl||'#')}" target="_blank" rel="noopener">ABRIR QR CODE NO MERCADO PAGO</a></div>\`;
  document.getElementById("app").innerHTML=\`<div>
    <div class="brand">🧠 DESAFIO CEREBRAL</div>
    <h2 style="margin-bottom:8px">Pagamento via PIX</h2>
    <p>\${isTestMode ? "🧪 <strong>Teste do Mercado Pago:</strong> R$ 50,00 (valor exigido pelo ambiente de teste). Em produção será R$ 1,99." : "Faça um <strong>pagamento único de R$ 1,99</strong> para liberar seu resultado."}</p>
    <div class="pix-box">
      <div class="pix-price">\${isTestMode ? "R$ 50,00" : "R$ 1,99"}</div>
      \${qrVisual}
      <p><strong>1.</strong> Abra o aplicativo do seu banco.<br><strong>2.</strong> Escaneie o QR Code acima ou abra a página segura do Mercado Pago.</p>
      <input class="pix-code" id="pixCode" value="\${escapeHtml(data.qrCode)}" readonly>
      <button class="secondary" onclick="copyPix()">📋 COPIAR PIX COPIA E COLA</button>
      \${data.ticketUrl ? \`<a href="\${escapeHtml(data.ticketUrl)}" target="_blank" rel="noopener" style="display:block;margin-top:12px;color:#5b4bdb;font-weight:800">Abrir página do PIX no Mercado Pago</a>\` : ''}
      <div class="pix-status" id="pixStatus">⏳ Aguardando confirmação do pagamento...</div>
    </div>
    <div class="note"><strong>Pagamento único:</strong> não é mensalidade e não haverá cobrança recorrente.</div>
    <button class="secondary" onclick="checkPixNow()">🔄 JÁ PAGUEI — VERIFICAR</button>
  </div>\`;
}

async function copyPix(){
  const input=document.getElementById('pixCode');
  if(!input) return;
  try{
    await navigator.clipboard.writeText(input.value);
    alert('Código PIX copiado!');
  }catch(_){
    input.select();
    document.execCommand('copy');
    alert('Código PIX copiado!');
  }
}

let pixPolling=null;
let pixPollCount=0;

function pollPixStatus(){
  clearInterval(pixPolling);
  pixPollCount=0;
  pixPolling=setInterval(()=>{
    pixPollCount++;
    checkPixNow(true);
    if(pixPollCount>=120) clearInterval(pixPolling);
  },5000);
}

async function checkPixNow(silent=false){
  const orderId=localStorage.getItem('dc_order_id');
  const token=localStorage.getItem('dc_result_token');
  const email=localStorage.getItem('dc_email')||'';
  if(!orderId||!token) return;
  const statusEl=document.getElementById('pixStatus');
  if(statusEl && !silent) statusEl.textContent='🔎 Verificando pagamento...';
  try{
    const r=await fetch('/api/check-order',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({orderId,resultToken:token,email})
    });
    const data=await r.json();
    if(!r.ok) throw new Error(data.error||'Não foi possível verificar o pagamento.');
    if(data.status==='approved'){
      clearInterval(pixPolling);
      history.replaceState({},document.title,'/');
      renderResult(data.result,Boolean(data.emailSent),Boolean(data.emailError));
      return;
    }
    if(data.status==='pending'){
      if(statusEl) statusEl.textContent='⏳ PIX gerado. Aguardando a confirmação do pagamento...';
      return;
    }
    clearInterval(pixPolling);
    if(statusEl) statusEl.textContent='❌ O pagamento não foi aprovado. Você pode gerar um novo PIX.';
  }catch(err){
    if(!silent) alert(err.message);
    if(statusEl && !silent) statusEl.textContent='⚠️ Não foi possível verificar agora. Tente novamente.';
  }
}

function renderResult(r,emailSent=true,emailError=false){
  const totalCorrect=r.easy+r.medium+r.hard;
  const pct=Math.round((totalCorrect/15)*1000)/10;
  const easyPct=r.easy*20, mediumPct=r.medium*20, hardPct=r.hard*20;
  const profile=String(r.classification||'').replace(/^\\S+\\s/,'');
  let profileText='Seu resultado mostra como você se saiu neste desafio e quais níveis de dificuldade foram mais confortáveis ou mais desafiadores.';
  if(r.hard>=3) profileText='Você teve bom desempenho nas questões mais complexas, mostrando consistência quando o desafio aumentou.';
  else if(r.medium>=4) profileText='Você mostrou boa consistência nas questões intermediárias, equilibrando atenção e raciocínio ao longo do desafio.';
  else if(r.easy>=4) profileText='Você teve melhor desempenho nas questões mais diretas. As etapas intermediárias e difíceis foram o principal desafio desta rodada.';
  else if(r.hard===0) profileText='As questões mais complexas foram o principal desafio nesta rodada. Use o resultado como referência para tentar superar sua marca em uma próxima tentativa.';
  const bar=(label,count,pct,cls,icon)=>\`<div class="performance-row"><div class="performance-head"><span>\${icon} \${label}</span><b>\${count}/5</b></div><div class="bar-track"><div class="bar-fill \${cls}" style="width:\${pct}%"></div></div></div>\`;
  document.getElementById("app").innerHTML=\`<div class="result-card">
    <div class="result-hero">
      <div class="result-kicker">🏆 SEU RESULTADO ESTÁ PRONTO!</div>
      <div class="accuracy">\${totalCorrect} / 15</div>
      <div class="accuracy-label">acertos</div>
      <div class="points-pill">Pontuação: \${r.score} pontos · máximo 175</div>
      <div class="percent-track"><div class="percent-fill" style="width:\${pct}%"></div></div>
      <div class="percent-label">\${pct.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})}% de aproveitamento</div>
    </div>
    <div class="profile-card">
      <div class="section-label">🧩 SEU PERFIL</div>
      <div class="profile-name">\${escapeHtml(profile)}</div>
      <p class="profile-text">\${escapeHtml(profileText)}</p>
    </div>
    <div class="performance">
      <div class="section-label">📊 SEU DESEMPENHO</div>
      \${bar('Fáceis',r.easy,easyPct,'easy-fill','🟢')}
      \${bar('Médias',r.medium,mediumPct,'medium-fill','🟡')}
      \${bar('Difíceis',r.hard,hardPct,'hard-fill','🔴')}
    </div>
    <div class="email-confirm">📧 <span><b>\${emailSent ? 'Seu relatório completo foi enviado para seu e-mail.' : 'Seu resultado está liberado nesta página.'}</b><br>\${emailSent ? 'Confira sua caixa de entrada.' : 'O envio por e-mail não foi concluído agora; você pode tentar novamente mais tarde.'}</span></div>
    <button class="share-main" onclick="share(\${totalCorrect},\${r.score})">🧠 DESAFIE UM AMIGO</button>
    <button class="secondary" onclick="home()">↻ FAZER NOVAMENTE</button>
    <div class="disclaimer">Este é um desafio recreativo de raciocínio e não corresponde a um teste clínico ou oficial de QI.</div>
  </div>\`;
}
async function handlePaymentReturn(){
  const p=new URLSearchParams(location.search);
  const returned = p.has('payment') || p.has('order_id');
  if(!returned) return;
  const orderId=p.get('order_id')||localStorage.getItem('dc_order_id');
  if(!orderId) return;
  const token=localStorage.getItem('dc_result_token');
  if(!token) return;
  document.getElementById("app").innerHTML='<div style="text-align:center"><div class="brand">🔎 DESAFIO CEREBRAL</div><h2>Confirmando seu pagamento...</h2><p>Estamos verificando a confirmação diretamente no Mercado Pago.</p></div>';
  try{
    const r=await fetch('/api/check-order',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({orderId,resultToken:token,email:localStorage.getItem('dc_email')||''})
    });
    const data=await r.json();
    if(!r.ok) throw new Error(data.error||'Não foi possível confirmar o pagamento.');
    if(data.status==='approved'){
      history.replaceState({},document.title,'/');
      renderResult(data.result,Boolean(data.emailSent),Boolean(data.emailError));
    }else if(data.status==='pending'){
      document.getElementById("app").innerHTML='<div style="text-align:center"><div class="brand">⏳ PAGAMENTO PENDENTE</div><h2>Aguardando confirmação</h2><p>O Mercado Pago ainda não confirmou o pagamento. Quando ele for aprovado, volte a esta página para liberar seu resultado.</p><button onclick="handlePaymentReturn()">VERIFICAR NOVAMENTE</button></div>';
    }else{
      history.replaceState({},document.title,'/');
      showUnlock();
      alert('O pagamento não foi aprovado. Você pode tentar novamente.');
    }
  }catch(err){
    document.getElementById("app").innerHTML='<div style="text-align:center"><div class="brand">⚠️</div><h2>Não foi possível confirmar</h2><p>'+escapeHtml(err.message)+'</p><button onclick="handlePaymentReturn()">TENTAR NOVAMENTE</button></div>';
  }
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function share(correct,points){let t=\`Eu fiz o Desafio Cerebral! 🧠
Acertei \${correct} de 15 e marquei \${points} pontos.
Será que você consegue fazer melhor? 😏
\${location.origin}/\`;if(navigator.share)navigator.share({title:"Desafio Cerebral",text:t});else if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>alert("Mensagem copiada para compartilhar!"))}
home();
handlePaymentReturn();
</script></body></html>`;

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}

function validEmail(email) { return /^\S+@\S+\.\S+$/.test(String(email || '')); }
function b64url(bytes) {
  let s = ''; for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function b64urlDecode(s) {
  s = String(s).replace(/-/g,'+').replace(/_/g,'/');
  while (s.length % 4) s += '=';
  const bin = atob(s); const out = new Uint8Array(bin.length);
  for (let i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i);
  return out;
}
async function hmacSign(text, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name:'HMAC', hash:'SHA-256'}, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(text)));
}
async function sha256Hex(text) {
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
  return [...bytes].map(b=>b.toString(16).padStart(2,'0')).join('');
}
async function makeToken(data, secret) {
  const p = b64url(new TextEncoder().encode(JSON.stringify(data)));
  const sig = b64url(await hmacSign(p, secret));
  return `${p}.${sig}`;
}
async function verifyToken(token, secret) {
  try {
    const [p, sig] = String(token || '').split('.');
    if (!p || !sig || !secret) return null;
    const expected = b64url(await hmacSign(p, secret));
    if (sig !== expected) return null;
    const data = JSON.parse(new TextDecoder().decode(b64urlDecode(p)));
    if (!data.exp || data.exp < Date.now()) return null;
    return data;
  } catch (_) { return null; }
}

async function createOrder(request, env) {
  if (request.method !== 'POST') return json(405, { error: 'Método não permitido.' });
  const { email, resultToken } = await request.json().catch(()=>({}));
  const payerEmail = String(email || '').trim();
  if (!validEmail(payerEmail)) return json(400, { error: 'E-mail inválido.' });
  if (!env.MP_ACCESS_TOKEN) return json(500, { error: 'MP_ACCESS_TOKEN não configurado.' });
  const result = await verifyToken(resultToken, env.MP_ACCESS_TOKEN);
  if (!result) return json(400, { error: 'Resultado inválido ou expirado.' });
  const externalReference = await sha256Hex(resultToken);
  const isTest = String(env.MP_TEST_MODE || '').toLowerCase() === 'true';
  const amount = isTest ? '50.00' : '1.99';
  const payload = {
    type: 'online', processing_mode: 'automatic', total_amount: amount,
    external_reference: externalReference,
    payer: isTest ? { email: 'test_user_br@testuser.com', first_name: 'APRO' } : { email: payerEmail },
    transactions: { payments: [{ amount, payment_method: { id: 'pix', type: 'bank_transfer' } }] }
  };
  const mp = await fetch('https://api.mercadopago.com/v1/orders', {
    method:'POST', headers:{'Accept':'application/json','Content-Type':'application/json','Authorization':`Bearer ${env.MP_ACCESS_TOKEN}`,'X-Idempotency-Key':crypto.randomUUID()}, body:JSON.stringify(payload)
  });
  const responseText = await mp.text(); let data=null; try{data=JSON.parse(responseText)}catch(_){ }
  if (!mp.ok) return json(mp.status, { error:`Mercado Pago recusou a criação do checkout. HTTP ${mp.status}.`, mp_status:mp.status, mp_error:data?.error||null, mp_message:data?.message||null, mp_cause:data?.cause||null });
  const method = data?.transactions?.payments?.[0]?.payment_method || {};
  if (!data?.id || (!method.qr_code && !method.ticket_url)) return json(502,{error:'O Mercado Pago criou a order, mas não retornou os dados do Pix.',orderId:data?.id||null,status:data?.status||null,status_detail:data?.status_detail||null});
  return json(200,{orderId:data.id,status:data.status||'action_required',statusDetail:data.status_detail||'waiting_transfer',qrCode:method.qr_code||'',qrCodeBase64:method.qr_code_base64||'',ticketUrl:method.ticket_url||'',testMode:isTest});
}

const answersKey = [3,1,2,2,0,1,1,3,1,1,2,0,2,1,2];
const difficulties = ['easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard'];

async function submitResult(request, env) {
  if (request.method !== 'POST') return json(405,{error:'Método não permitido.'});
  if (!env.MP_ACCESS_TOKEN) return json(500,{error:'MP_ACCESS_TOKEN não configurado.'});
  const body = await request.json().catch(()=>({}));
  const answers = body.answers;
  if (!Array.isArray(answers)||answers.length!==15||answers.some(a=>!Number.isInteger(a)||a<0||a>3)) return json(400,{error:'Respostas inválidas.'});
  let score=0,easy=0,medium=0,hard=0;
  answers.forEach((a,i)=>{ if(a===answersKey[i]) { const d=difficulties[i]; if(d==='easy'){score+=5;easy++} else if(d==='medium'){score+=10;medium++} else {score+=20;hard++} } });
  const classification=score<=35?'🧩 DESAFIO EM CONSTRUÇÃO':score<=70?'🧠 MENTE EM DESENVOLVIMENTO':score<=105?'🔎 RACIOCÍNIO EM DESTAQUE':score<=140?'⚡ MENTE ÁGIL':'🏆 RACIOCÍNIO EXCEPCIONAL';
  const token=await makeToken({score,easy,medium,hard,classification,answers,exp:Date.now()+24*60*60*1000}, env.MP_ACCESS_TOKEN);
  return json(200,{resultToken:token});
}

const reportQuestions = [{"q":"Qual palavra não pertence ao mesmo grupo?","o":["Cachorro","Gato","Cavalo","Mesa"],"e":"Cachorro, gato e cavalo são animais; mesa não é um animal."},{"q":"Qual símbolo completa a sequência? ▲ ● ▲ ● ▲ ?","o":["▲","●","■","◆"],"e":"Os símbolos alternam entre triângulo e círculo; depois de ▲ vem ●."},{"q":"Ana é mais velha que Bruno. Bruno é mais velho que Carlos. Quem é o mais novo?","o":["Ana","Bruno","Carlos","Não é possível determinar"],"e":"A ordem de idade é Ana, Bruno e Carlos; portanto, Carlos é o mais novo."},{"q":"Qual número completa corretamente a sequência? 5 → 10 → 15 → 20 → ?","o":["22","24","25","30"],"e":"A sequência aumenta sempre 5: 5, 10, 15, 20, 25."},{"q":"Você está olhando para o Norte. Depois vira 90° para a direita e, em seguida, 90° para a esquerda. Para qual direção você está olhando agora?","o":["Norte","Sul","Leste","Oeste"],"e":"Do Norte, 90° à direita leva ao Leste; 90° à esquerda retorna ao Norte."},{"q":"LIVRO está para LER assim como GARFO está para:","o":["Cortar","Comer","Escrever","Desenhar"],"e":"A relação é objeto e sua principal função: livro/ler e garfo/comer."},{"q":"Em uma corrida, Lucas chegou antes de Bruno. Bruno chegou antes de Carlos. Daniel chegou depois de Carlos. Quem chegou em segundo lugar?","o":["Lucas","Bruno","Carlos","Daniel"],"e":"A ordem é Lucas, Bruno, Carlos e Daniel. Portanto, Bruno ficou em segundo."},{"q":"Observe as figuras: ● ▲ ■ / ● ▲ ■ / ● ▲ ■ / ● ▲ ◆. Qual figura está diferente das demais?","o":["●","▲","■","◆"],"e":"Nas três primeiras linhas, o terceiro símbolo é ■; na última, ele é ◆."},{"q":"Todos os músicos estudam música. Rafael não estuda música. O que podemos concluir com certeza?","o":["Rafael é músico","Rafael não é músico","Rafael pode ou não ser músico","Todos os músicos são Rafael"],"e":"Se todo músico estuda música e Rafael não estuda música, Rafael não pode ser músico."},{"q":"Qual número completa a sequência? 2 → 5 → 11 → 23 → 47 → ?","o":["71","95","96","97"],"e":"Cada termo é o dobro do anterior mais 1: 47 × 2 + 1 = 95."},{"q":"Você tem 3 caixas: uma contém somente maçãs, uma somente laranjas e uma contém maçãs e laranjas. Todas as etiquetas estão erradas. De qual caixa você deve retirar uma fruta para identificar corretamente as três?","o":["Da caixa etiquetada 'Maçãs'","Da caixa etiquetada 'Laranjas'","Da caixa etiquetada 'Maçãs e Laranjas'","Não é possível determinar"],"e":"A caixa rotulada como mista não pode ser mista, pois todas as etiquetas estão erradas. Uma fruta retirada dela revela seu conteúdo real e permite identificar as outras duas caixas."},{"q":"Quatro pessoas — Ana, Bia, Caio e Davi — estão em uma fila. Ana está antes de Bia. Caio está depois de Davi. Bia está antes de Davi. Quem está necessariamente em primeiro lugar?","o":["Ana","Bia","Caio","Davi"],"e":"Ana está antes de Bia, que está antes de Davi, e Davi está antes de Caio. Logo, Ana é necessariamente a primeira."},{"q":"Qual número completa a sequência? 5 → 9 → 16 → 26 → 39 → ?","o":["52","54","55","58"],"e":"As diferenças são 4, 7, 10 e 13, aumentando de 3 em 3. A próxima diferença é 16; portanto, 39 + 16 = 55."},{"q":"Qual par completa a sequência? AB → DE → GH → JK → ?","o":["LM","MN","NO","OP"],"e":"Cada par começa três letras depois do anterior: AB, DE, GH, JK, MN."},{"q":"Em uma fotografia, um homem aparece ao lado de um menino. O homem diz: 'O pai deste menino é filho do meu pai'. O homem não tem irmãos. Quem é o menino?","o":["Seu irmão","Seu sobrinho","Seu filho","Seu primo"],"e":"Como o homem não tem irmãos, o único filho do pai dele é o próprio homem. Logo, ele é o pai do menino."}];

function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}

async function sendResultEmail({email,result}, env){
  const apiKey=env.RESEND_API_KEY;
  if(!apiKey) throw new Error('RESEND_API_KEY não configurado.');
  const totalCorrect=result.easy+result.medium+result.hard;
  const pct=Math.round((totalCorrect/15)*1000)/10;
  const subject='Seu resultado do Desafio Cerebral está pronto!';
  const profile=String(result.classification||'').replace(/^\S+\s/,'');
  const html=`<!doctype html><html lang="pt-BR"><body style="margin:0;background:#f4f6fb;font-family:Arial,sans-serif;color:#172033"><div style="max-width:620px;margin:30px auto;padding:18px"><div style="background:#fff;border-radius:24px;padding:28px;box-shadow:0 12px 36px rgba(20,30,60,.08)"><div style="font-size:18px;font-weight:900;color:#5b4bdb">🧠 DESAFIO CEREBRAL</div><h1 style="font-size:28px;margin:18px 0 8px">Seu resultado está pronto!</h1><p style="color:#536074;line-height:1.55">Confira o desempenho da sua rodada de 15 questões.</p><div style="text-align:center;background:#f6f3ff;border:1px solid #e4defd;border-radius:18px;padding:24px;margin:22px 0"><div style="font-size:44px;font-weight:900;color:#5b4bdb">${totalCorrect} / 15</div><div style="font-size:15px;font-weight:800;color:#59657a;margin-top:6px">acertos</div><div style="display:inline-block;margin-top:14px;padding:9px 14px;border-radius:999px;background:#eeeaff;color:#4b3dc0;font-weight:800;font-size:14px">${result.score} pontos · máximo 175</div><div style="margin-top:16px;font-size:14px;font-weight:800;color:#687389">${pct.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})}% de aproveitamento</div></div><div style="background:#f6f3ff;border:1px solid #e5defd;border-radius:16px;padding:18px;margin:18px 0"><div style="font-size:12px;font-weight:900;letter-spacing:.06em;color:#687389;text-transform:uppercase">🧩 Seu perfil</div><div style="font-size:21px;font-weight:900;color:#2f276f;margin-top:7px">${esc(profile)}</div><p style="color:#536074;line-height:1.55;font-size:14px">Este perfil representa apenas o seu desempenho neste desafio recreativo.</p></div><h2 style="font-size:19px;margin:24px 0 12px">📊 Seu desempenho</h2><p><strong>🟢 Fáceis:</strong> ${result.easy}/5</p><p><strong>🟡 Médias:</strong> ${result.medium}/5</p><p><strong>🔴 Difíceis:</strong> ${result.hard}/5</p><div style="background:#f7f8fc;border-radius:14px;padding:14px;margin-top:20px;color:#59657a;font-size:13px;line-height:1.5"><strong>Importante:</strong> este é um desafio recreativo de raciocínio. Não corresponde a um teste clínico ou oficial de QI e não substitui avaliação profissional.</div><h2 style="font-size:19px;margin:26px 0 12px">📝 Gabarito do seu desafio</h2><p style="color:#536074;line-height:1.5;font-size:14px">Confira suas respostas, o gabarito e uma explicação breve de cada questão.</p>${reportQuestions.map((item,i)=>{const user=Number.isInteger(result.answers?.[i])?result.answers[i]:-1;const correct=answersKey[i];const ok=user===correct;return `<div style="border:1px solid #e8ebf2;border-radius:14px;padding:14px;margin:10px 0;background:#fff"><div style="font-weight:900;color:#2f276f">${i+1}. ${esc(item.q)}</div><div style="margin-top:8px;font-size:13px;color:${ok?'#16834b':'#b42318'}"><strong>Sua resposta:</strong> ${esc(item.o[user]||'Não respondida')} ${ok?'✓':'✗'}</div><div style="margin-top:5px;font-size:13px;color:#536074"><strong>Correta:</strong> ${esc(item.o[correct])}</div><div style="margin-top:7px;font-size:13px;color:#687389;line-height:1.45">${esc(item.e)}</div></div>`}).join('')}<p style="margin-top:24px;color:#59657a;line-height:1.5">🧠 Desafie um amigo e veja quem consegue fazer mais pontos.</p><p style="margin-top:24px;color:#788297;font-size:12px">Obrigado por participar do Desafio Cerebral.</p></div></div></body></html>`;
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({from:'Desafio Cerebral <resultados@desafiocerebral.com.br>',to:[email],subject,html})});
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.message||data.name||`Resend recusou o envio. HTTP ${response.status}.`);
  return data;
}

async function checkOrder(request, env){
  if(request.method!=='POST') return json(405,{error:'Método não permitido.'});
  if(!env.MP_ACCESS_TOKEN) return json(500,{error:'MP_ACCESS_TOKEN não configurado.'});
  const {orderId,resultToken,email}=await request.json().catch(()=>({}));
  const result=await verifyToken(resultToken,env.MP_ACCESS_TOKEN);
  if(!result) return json(400,{error:'Resultado inválido ou expirado.'});
  if(!orderId) return json(400,{error:'Order ID ausente.'});
  if(!validEmail(email)) return json(400,{error:'E-mail inválido.'});
  const expectedRef=await sha256Hex(resultToken);
  const mp=await fetch(`https://api.mercadopago.com/v1/orders/${encodeURIComponent(orderId)}`,{headers:{'Accept':'application/json','Authorization':`Bearer ${env.MP_ACCESS_TOKEN}`}});
  const data=await mp.json().catch(()=>({}));
  if(!mp.ok) return json(mp.status,{error:data.message||'Não foi possível consultar a order.',details:data});
  if(data.external_reference!==expectedRef) return json(403,{error:'A order não corresponde a este resultado.'});
  const status=String(data.status||'').toLowerCase();
  const approved=status==='processed'||status==='approved';
  const pending=['created','action_required','in_process','pending','waiting_transfer'].includes(status);
  if(!approved) return json(200,{status:pending?'pending':'rejected',result:null,orderStatus:status});
  let emailSent=false,emailId=null,emailError=null;
  try{const sent=await sendResultEmail({email,result},env);emailSent=true;emailId=sent.id||null;}catch(e){emailError=e.message||'Não foi possível enviar o e-mail.';}
  return json(200,{status:'approved',result,orderStatus:status,emailSent,emailId,emailError});
}
