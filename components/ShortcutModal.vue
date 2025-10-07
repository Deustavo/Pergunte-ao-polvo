<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">×</button>
        
        <h2>Adicione o Pergunte ao Polvo na sua tela inicial! :o</h2>
        
        <div class="device-instructions">
          <section class="android-instructions">
            <h3>Para Android</h3>
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
            <h3>Para iPhone</h3>
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
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  margin: 8vw;
  border-radius: 12px;
  max-width: 90%;
  width: 680px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  h2 {
    margin: 0rem 0rem 1.6rem 0rem;
    color: #D63F8C !important;
    font-size: 1.5rem;
  }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  line-height: 1;
  
  &:hover {
    color: #D63F8C;
  }
}

.device-instructions {
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  section {

    h3 {
      color: #D63F8C !important;
      margin: 0rem 0rem 1rem 0rem;
      font-size: 1.25rem;
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
</style>
