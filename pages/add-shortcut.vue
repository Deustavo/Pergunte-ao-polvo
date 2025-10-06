<template>
  <div class="add-shortcut-page">
    <h1>Adicione o Pergunte ao Polvo na sua tela inicial! :o</h1>
    
    <div class="device-instructions">
      <section class="android-instructions">
        <h2>Para Android</h2>
        <ol>
          <li>Abra o Chrome no seu dispositivo Android</li>
          <li>Acesse pergunteaopolvo.com.br</li>
          <li>Toque no menu (três pontos) <span class="icon">⋮</span> no canto superior direito</li>
          <li>Selecione "Adicionar à tela inicial"</li>
          <li>Toque em "Adicionar" para confirmar</li>
        </ol>
        <p class="note">Nota: O processo pode variar ligeiramente dependendo da versão do Android e do Chrome.</p>
      </section>

      <section class="ios-instructions">
        <h2>Para iPhone</h2>
        <ol>
          <li>Abra o Safari no seu iPhone</li>
          <li>Acesse pergunteaopolvo.com.br</li>
          <li>Toque no ícone de compartilhar <span class="icon">⬆️</span> na parte inferior da tela</li>
          <li>Role para baixo e toque em "Adicionar à Tela de Início" <span class="icon">🏠</span></li>
          <li>Confirme tocando em "Adicionar" no canto superior direito</li>
        </ol>
        <p class="note">Nota: Este processo só funciona no navegador Safari.</p>
      </section>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Como Adicionar à Tela Inicial - Pergunte ao Polvo',
  meta: [
    {
      name: 'description',
      content: 'Aprenda como adicionar o Pergunte ao Polvo à tela inicial do seu celular iOS ou Android'
    }
  ]
})
</script>

<style lang="scss" scoped>
.add-shortcut-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #D63F8C !important;
  }

  .device-instructions {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }

    section {
      background: rgba(255, 255, 255, 0.9);
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      h2 {
        color: #D63F8C !important;
        margin:  0rem 0rem 1rem 0rem;
        font-size: 1.5rem;
      }

      ol {
        padding-left: 1.5rem;
        margin-bottom: 1rem;
        color: #222 !important;

        li {
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
      }

      .note {
        font-size: 0.9rem;
        font-style: italic;
        color: #666;
        margin-bottom: 0rem;
      }
    }
  }

  .icon {
    font-size: 1.2em;
  }
}
</style>
