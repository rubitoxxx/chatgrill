/* ==========================================================
   Assistente Agrosys - Copagril
   Chatbot 100% estático (HTML/CSS/JS) baseado na base de
   conhecimento exportada da planilha de perfis e chamados.
   ========================================================== */

const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const suggestionsBar = document.getElementById("suggestions");

const STOPWORDS = new Set([
  "a","o","as","os","de","da","do","das","dos","um","uma","uns","umas",
  "e","ou","é","em","no","na","nos","nas","para","por","com","sem",
  "que","qual","quais","como","onde","quando","porque","por que",
  "meu","minha","seu","sua","esse","essa","este","esta","isso",
  "não","nao","tem","ter","está","esta","estou","preciso","favor",
  "gostaria","pode","poderia","ajuda","ajudar","erro","problema"
]);

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove acentos
}

function tokenize(str) {
  return normalize(str)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOPWORDS.has(t));
}

// Pré-normaliza a base para busca (uma vez)
KB_DATA.forEach(rec => {
  rec._buscaNorm = normalize(rec.busca);
});

function scoreRecord(rec, queryTokens, rawQueryNorm) {
  let score = 0;

  // Match exato da frase inteira dentro do texto de busca
  if (rawQueryNorm.length > 3 && rec._buscaNorm.includes(rawQueryNorm)) {
    score += 8;
  }

  queryTokens.forEach(tok => {
    if (rec._buscaNorm.includes(tok)) {
      score += 2;
    }
  });

  // Bônus se bater no código de perfil exato (número)
  if (rec.codigo_perfil && queryTokens.includes(normalize(rec.codigo_perfil))) {
    score += 6;
  }

  return score;
}

function search(query) {
  const qNorm = normalize(query);
  const tokens = tokenize(query);
  if (tokens.length === 0 && qNorm.trim().length === 0) return [];

  const results = KB_DATA
    .map(rec => ({ rec, score: scoreRecord(rec, tokens, qNorm) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(r => r.rec);

  return results;
}

function escapeHTML(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildResultCardHTML(rec) {
  const titulo = rec.pergunta || rec.contexto || rec.nome_perfil || "Registro";
  let html = `<div class="result-card">`;
  html += `<span class="result-title">${escapeHTML(titulo)}</span>`;

  if (rec.tipo === "Perfil" || rec.tipo === "Perfil por categoria" || rec.tipo === "Perfil por cargo") {
    if (rec.nome_perfil) {
      html += `<div>Perfil: <strong>${escapeHTML(rec.nome_perfil)}</strong>`;
      if (rec.codigo_perfil) html += ` (código ${escapeHTML(rec.codigo_perfil)})`;
      html += `</div>`;
    }
    if (rec.categoria) html += `<div>Categoria: ${escapeHTML(rec.categoria)}</div>`;
    if (rec.parametros) html += `<div>Parâmetros: ${escapeHTML(rec.parametros)}</div>`;
    if (rec.solucao && rec.solucao !== rec.pergunta) {
      html += `<div style="margin-top:6px;">${escapeHTML(rec.solucao)}</div>`;
    }
  } else {
    // Solução de chamado / erro de sistema
    if (rec.erro && rec.erro !== rec.pergunta) {
      html += `<div style="margin-top:4px;"><strong>Mensagem/erro:</strong> ${escapeHTML(rec.erro)}</div>`;
    }
    if (rec.solucao) {
      html += `<div style="margin-top:6px;"><strong>Solução:</strong> ${escapeHTML(rec.solucao)}</div>`;
    } else {
      html += `<div style="margin-top:6px; color:var(--text-light);">Sem solução registrada para este item (marcado como incompleto na base).</div>`;
    }
  }

  html += `<div>`;
  if (rec.categoria) html += `<span class="result-meta">${escapeHTML(rec.categoria)}</span>`;
  if (rec.tipo) html += `<span class="result-meta">${escapeHTML(rec.tipo)}</span>`;
  if (rec.status) html += `<span class="result-meta">${escapeHTML(rec.status)}</span>`;
  html += `</div></div>`;

  return html;
}

function addMessage(text, sender = "bot", isHTML = false) {
  const div = document.createElement("div");
  div.className = `msg ${sender}`;
  if (isHTML) {
    div.innerHTML = text;
  } else {
    div.textContent = text;
  }
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return div;
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "msg bot typing-wrapper";
  div.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return div;
}

function handleQuery(rawText) {
  const text = rawText.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const typingEl = showTyping();

  setTimeout(() => {
    typingEl.remove();
    const results = search(text);

    if (results.length === 0) {
      addMessage(
        "Não encontrei nada exatamente sobre isso na base do Agrosys. Tente descrever o erro com outras palavras, informar o nome ou código do perfil, ou o nome da tela do Sênior envolvida.",
        "bot"
      );
      return;
    }

    let html = "";
    results.forEach((rec, i) => {
      html += buildResultCardHTML(rec);
    });
    addMessage(html, "bot", true);
  }, 350);
}

// Sugestões iniciais (chips) com base nas categorias mais comuns da base
function buildSuggestions() {
  const chips = [
    "erro ao salvar NFe",
    "erro ao faturar pedido",
    "perfil financeiro",
    "perfil de compras",
    "erro nota fiscal",
    "credenciais inválidas"
  ];
  suggestionsBar.innerHTML = "";
  chips.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.textContent = c;
    btn.addEventListener("click", () => handleQuery(c));
    suggestionsBar.appendChild(btn);
  });
}

sendBtn.addEventListener("click", () => handleQuery(userInput.value));
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") handleQuery(userInput.value);
});

// Mensagem de boas-vindas
window.addEventListener("DOMContentLoaded", () => {
  addMessage(
    "Olá! Sou o assistente do Agrosys 🌱\nPergunte sobre erros do sistema, soluções de chamados já resolvidos ou perfis de acesso (ex.: \"perfil financeiro\", \"erro ao faturar pedido\", \"contasreceber\").",
    "bot"
  );
  buildSuggestions();
});
