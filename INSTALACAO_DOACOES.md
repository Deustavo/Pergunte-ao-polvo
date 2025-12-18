# 🚀 Guia Rápido de Instalação - Sistema de Doações

## ✅ O que foi implementado

Sistema completo de doações via PIX para o projeto "Pergunte ao Polvo".

## 📋 Checklist de Configuração

### 1️⃣ Configure sua chave PIX

Edite o arquivo: `composables/useDonation.ts`

```typescript
const pixKey = ref('sua-chave-pix-aqui');
```

**Tipos de chave PIX aceitos:**
- 📧 E-mail
- 📱 Telefone
- 🆔 CPF/CNPJ  
- 🔑 Chave aleatória

### 2️⃣ Teste localmente

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse no navegador
http://localhost:3000
```

### 3️⃣ Como testar

✅ **Botão flutuante:** Clique no coração (❤️) no canto inferior esquerdo

✅ **Modal:** Deve abrir com informações de doação

✅ **Copiar PIX:** Clique no botão "Copiar" e verifique feedback

## 📁 Arquivos criados

```
projeto/
├── components/
│   ├── DonationModal.vue      ✨ Modal de doação
│   └── PixQRCode.vue          🔲 QR Code (opcional)
│
├── composables/
│   └── useDonation.ts         🧩 Lógica centralizada
│
└── DOACAO.md                  📖 Documentação completa
```

## 📝 Arquivos modificados

```
projeto/
├── pages/
│   └── index.vue              🏠 Adicionado botão de doação
│
└── nuxt.config.ts             ⚙️ Estilos dark theme
```

## 🎨 Características

### Modal de Doação
- ✨ Design moderno e responsivo
- 📋 Copiar chave PIX com um clique
- 🎭 Animações suaves
- ⌨️ Fechamento com ESC
- ♿ Acessível (aria-labels)
- 📄 Informações completas sobre doação
- 🎯 Motivos para doar

### Botões Flutuantes
- ❤️ Botão de doação com animação de pulso
- 🌙 Botão de tema (sol/lua)
- 📱 Responsivo mobile e desktop
- 🎨 Suporte a dark theme

## 🔧 Personalização

### Alterar cores

Edite os arquivos `.vue` para mudar as cores:

```scss
// Cor principal de doação
#D63F8C

// Cor secundária
#F093B0

// Cor de sucesso
#28a745
```

### Alterar textos

- **Modal:** `components/DonationModal.vue`

## 🎁 QR Code PIX

O modal de doação já inclui suporte a QR Code para facilitar o pagamento!

### Para habilitar:

```bash
# Instale a biblioteca qrcode
npm install qrcode
```

Após instalar, o QR Code aparecerá automaticamente no modal de doação. O usuário poderá:
- 📱 Escanear o QR Code com o app do banco
- 📋 Ou copiar manualmente a chave PIX

Se a biblioteca não estiver instalada, apenas a opção de copiar a chave ficará disponível.

## 🧪 Testes

### ✓ Checklist de testes

- [ ] Botão de doação aparece na página inicial (canto inferior direito)
- [ ] Botão abre o modal de doação
- [ ] QR Code aparece no modal (se biblioteca instalada)
- [ ] Modal exibe a chave PIX correta
- [ ] Botão "Copiar" funciona e mostra feedback
- [ ] Modal fecha ao clicar fora
- [ ] Modal fecha ao pressionar ESC
- [ ] Design responsivo em mobile
- [ ] Dark theme funciona corretamente

## 🚀 Deploy

Após configurar sua chave PIX:

```bash
# Build de produção
npm run build

# Preview local
npm run preview

# Deploy (Vercel, Netlify, etc)
# Faça commit e push para seu repositório
git add .
git commit -m "feat: adiciona sistema de doações via PIX"
git push
```

## 💡 Dicas

1. **Segurança:** Nunca commit informações sensíveis de pagamento
2. **Teste:** Sempre teste em ambiente local antes do deploy
3. **QR Code:** Valide o QR Code com um app de banco real
4. **Analytics:** Considere adicionar tracking para conversão

## 🐛 Problemas Comuns

### Ícones não aparecem
✅ Solução: Font Awesome já está configurado em `nuxt.config.ts`

### Botão não aparece
✅ Solução: Verifique se importou `DonationModal` em `index.vue`

### Erro ao copiar
✅ Solução: Use HTTPS ou localhost (clipboard requer contexto seguro)

### Dark theme quebrado
✅ Solução: Estilos estão em `nuxt.config.ts` linha 23-40

## 📚 Documentação Completa

Para mais detalhes, consulte: `DOACAO.md`

## 🤝 Contribuindo

Se encontrar bugs ou tiver sugestões:
1. Abra uma issue
2. Descreva o problema/sugestão
3. Inclua prints se possível

---

💜 Feito com carinho para o Pergunte ao Polvo 🐙

**Desenvolvido por:** [Gustavo Andrade](https://github.com/Deustavo)
**Dedicado à:** moonjoume ♡

