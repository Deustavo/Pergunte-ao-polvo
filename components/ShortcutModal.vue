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

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">×</button>
        
        <h2>Adicione o Polvo na sua tela inicial! 🐙</h2>
        
        <div class="device-instructions">
          <section class="android-instructions">
            <h3>Para Android</h3>
            <ol>
              <li>Toque no menu (três pontos) <span class="icon">⋮</span> no canto superior direito</li>
              <li>Selecione "Adicionar à tela inicial"</li>
            </ol>
          </section>

          <section class="ios-instructions">
            <h3>Para iPhone</h3>
            <ol>
              <li>Toque no ícone de compartilhar <span class="icon">⬆️</span> na parte inferior da tela</li>
              <li>Role para baixo e toque em "Adicionar à Tela de Início" <span class="icon">🏠</span></li>
            </ol>
          </section>
        </div>

        <div class="modal-actions">
          <button class="close-modal-button" @click="closeModal">
            Entendi!
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ShortcutModal.scss';
</style>
