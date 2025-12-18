<script setup lang="ts">
/**
 * Modal component for displaying donation information via PIX
 */
interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { pixKey, pixCopied, copyPixKey } = useDonation();

/**
 * Closes the modal when clicking outside
 */
const handleOverlayClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close');
  }
};

/**
 * Closes modal when ESC key is pressed
 */
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close');
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Transition name="modal">
    <div 
      v-if="isOpen" 
      class="modal-overlay"
      @click="handleOverlayClick"
    >
      <div class="modal-content">
        <button 
          class="close-button"
          @click="emit('close')"
          aria-label="Fechar"
        >
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-header">
          <i class="fas fa-heart donation-icon"></i>
          <h2>Apoie o Pergunte ao Polvo!</h2>
        </div>

        <div class="modal-body">
          <p class="donation-text">
            Se você gosta do Pergunte ao Polvo e quer ajudar a mantê-lo no ar, 
            considere fazer uma doação via PIX! 🐙
          </p>

          <div class="qr-code-section">
            <PixQRCode :pix-key="pixKey" :size="200" />
            <p class="qr-or-divider">ou</p>
          
          
            <div class="pix-container">
            <label class="pix-label">Chave PIX:</label>
            <div class="pix-key-box">
              <code class="pix-key">{{ pixKey }}</code>
              <button 
                class="copy-button"
                @click="copyPixKey"
                :class="{ copied: pixCopied }"
              >
                <i :class="pixCopied ? 'fas fa-check' : 'fas fa-copy'"></i>
                {{ pixCopied ? 'Copiado!' : 'Copiar' }}
              </button>
            </div>
          </div></div>

          <div class="appreciation-message">
            <i class="fas fa-star"></i>
            <p>Muito obrigado pelo seu apoio! ❤️</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use "sass:color";

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  padding: 32px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 24px;
    max-width: 90%;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
}

.modal-header {
  text-align: center;
  margin-bottom: 24px;

  .donation-icon {
    font-size: 48px;
    color: #D63F8C;
    margin-bottom: 16px;
  }

  h2 {
    color: #D63F8C;
    font-size: 28px;
    margin: 0;
  }
}

.modal-body {
  .donation-text {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 16px;
    text-align: center;
  }

  .donation-description {
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 24px;
    text-align: center;
  }
}

.pix-container {
  border-radius: 12px;
  width: 100%;
}

.pix-label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  font-size: 14px;
}

.pix-key-box {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.pix-key {
  flex: 1;
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #ddd;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #333;
  min-width: 0;
  width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-button {
  background: linear-gradient(135deg, #D63F8C 0%, #F093B0 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, color.scale(#D63F8C, $lightness: -10%) 0%, color.scale(#F093B0, $lightness: -10%) 100%);
  }

  &:active {
    transform: scale(0.95);
  }

  &.copied {
    background: linear-gradient(135deg, #28a745 0%, #5cb85c 100%);
  }
}

.qr-code-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 0;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 12px;
}

.qr-or-divider {
  margin: 16px 0 8px 0;
  color: #999;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40px;
    height: 1px;
    background-color: #ddd;
  }
  
  &::before {
    right: calc(100% + 12px);
  }
  
  &::after {
    left: calc(100% + 12px);
  }
}

.appreciation-message {
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;

  i {
    color: #FFD700;
    font-size: 24px;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    font-size: 14px;
    margin: 0;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

