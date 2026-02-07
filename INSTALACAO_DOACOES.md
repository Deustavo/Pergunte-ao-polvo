# 🚀 Guia Rápido de Instalação - Sistema de Doações

## ✅ O que foi implementado

Sistema de doações via **LivePix** para o projeto "Pergunte ao Polvo". O botão de doação redireciona o usuário para a página do LivePix, onde as doações são gerenciadas.

## 📋 Checklist de Configuração

### 1️⃣ Página LivePix

As doações são realizadas em: **https://livepix.gg/pergunteaopolvo**

O botão flutuante na aplicação abre esse link em uma nova aba.

### 2️⃣ Teste localmente

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse no navegador
http://localhost:3000
```

### 3️⃣ Como testar

✅ **Botão flutuante:** Clique no coração (❤️) no canto inferior direito

✅ **Redirecionamento:** Deve abrir a página do LivePix em nova aba

✅ **Tooltip:** Após alguns segundos, um tooltip "Apoie o Pergunte ao Polvo! ❤️🐙" pode aparecer próximo ao botão

## 📁 Estrutura relacionada

```
projeto/
├── pages/
│   └── index.vue              🏠 Botão de doação (link para LivePix)
│
└── INSTALACAO_DOACOES.md      📖 Esta documentação
```

O link de doação está definido em `pages/index.vue` na constante `LIVEPIX_DONATE_URL`.

## 🎨 Características

### Botão de Doação
- ❤️ Botão flutuante com animação de pulso (coração)
- 🔗 Abre o LivePix em nova aba (`target="_blank"`)
- ♿ Acessível (aria-label "Doar")
- 📱 Responsivo mobile e desktop
- 🎨 Estilo alinhado ao tema do projeto (gradiente rosa)

### Outros botões flutuantes
- 🌙 Botão de tema (sol/lua)
- 📱 Botão "Adicionar à tela inicial" (mobile)

## 🔧 Personalização

### Alterar a URL de doação

Edite em `pages/index.vue`:

```typescript
const LIVEPIX_DONATE_URL = 'https://livepix.gg/pergunteaopolvo';
```

Substitua pela URL da sua página no LivePix (ou outro serviço de doação).

### Alterar cores do botão

No mesmo arquivo, na seção `<style>`:

```scss
// Cor principal de doação
#D63F8C

// Cor secundária (gradiente)
#F093B0
```

## 🧪 Testes

### ✓ Checklist de testes

- [ ] Botão de doação aparece na página inicial (canto inferior direito)
- [ ] Clique no botão abre a página do LivePix em nova aba
- [ ] URL aberta é https://livepix.gg/pergunteaopolvo
- [ ] Design responsivo em mobile
- [ ] Tema claro/escuro funciona corretamente

## 🚀 Deploy

Não é necessária configuração extra de chave PIX ou backend. Após publicar a aplicação:

```bash
npm run build
npm run preview

# Deploy (Vercel, Netlify, etc)
git add .
git commit -m "feat: doações via LivePix"
git push
```

Certifique-se de que a página no LivePix está ativa e com a URL correta.

## 💡 Dicas

1. **LivePix:** Mantenha a página do LivePix configurada e publicada
2. **Teste:** Confira o link em produção após o deploy
3. **Acessibilidade:** O link usa `rel="noopener noreferrer"` por segurança

## 🐛 Problemas Comuns

### Ícones não aparecem
✅ Solução: Font Awesome já está configurado em `nuxt.config.ts`

### Link não abre em nova aba
✅ Solução: Verifique se o elemento é um `<a>` com `target="_blank"` em `pages/index.vue`

### Dark theme quebrado
✅ Solução: Estilos estão em `nuxt.config.ts` (linhas de dark theme)

## 🤝 Contribuindo

Se encontrar bugs ou tiver sugestões:
1. Abra uma issue
2. Descreva o problema/sugestão
3. Inclua prints se possível

---

💜 Feito com carinho para o Pergunte ao Polvo 🐙

**Desenvolvido por:** [Gustavo Andrade](https://github.com/Deustavo)  
**Dedicado à:** moonjoume ♡
