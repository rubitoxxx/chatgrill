# Central de Suporte Agrosys — chatbot estático

Chat de suporte que responde com base nas 52 soluções da aba
**"SOLUÇÃO DE CHAMADOS"** da planilha. Não usa backend nem IA externa: a busca
é por palavras-chave, toda no navegador (`script.js`).

## Arquivos
- `index.html` — estrutura da página
- `style.css` — visual
- `script.js` — dados da base + lógica de busca/chat

## Como publicar no GitHub Pages
1. Crie um repositório novo no GitHub e suba estes 3 arquivos (`index.html`,
   `style.css`, `script.js`) na raiz.
2. Vá em **Settings → Pages**.
3. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
4. Salve. Em alguns minutos o site fica disponível em
   `https://<seu-usuario>.github.io/<repositorio>/`.

## ⚠️ Importante sobre os dados
Usei apenas a aba **"SOLUÇÃO DE CHAMADOS"** (perguntas, erros e soluções) —
é o conteúdo certo para um chat de suporte. As abas **"PERFIL"** e
**"PLANILHA DE PERFIL"** não foram incluídas porque contêm códigos internos
de permissão e, em uma delas, **uma senha em texto puro**. Como o GitHub
Pages é público por padrão, não coloquei nada disso no chatbot. Se quiser
publicar algo com base nessas abas, recomendo primeiro remover a senha da
planilha e usar um repositório **privado**.

## Atualizando a base depois
A base fica no topo do `script.js`, na constante `KB` (lista de objetos com
`pergunta`, `erro`, `solucao`, `palavra_chave`). Para adicionar ou editar uma
solução, basta editar esse array diretamente — não precisa mexer no HTML/CSS.
