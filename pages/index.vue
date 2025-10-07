<script setup>
import Settings from '@/settings';
import Teia from '@/assets/img/teia.png';

const { getTheme, toggleTheme } = Settings();
const isShortcutModalOpen = ref(false);
const isMobileDevice = ref(false);
const showTooltip = ref(false);

const themeIcon = computed(() => {
  return getTheme.value === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

const checkAndShowTooltip = () => {
  if (process.client) {
    const hasSeenTooltip = localStorage.getItem('hasSeenInstallTooltip');
    if (!hasSeenTooltip && isMobileDevice.value) {
      showTooltip.value = true;
      localStorage.setItem('hasSeenInstallTooltip', 'true');
      // Auto-hide tooltip after 3 seconds
      setTimeout(() => {
        showTooltip.value = false;
      }, 3000);
    }
  }
};

onMounted(() => {
  const checkMobile = () => {
    isMobileDevice.value = window.innerWidth <= 768;
    checkAndShowTooltip();
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });
});

const openShortcutModal = () => {
  isShortcutModalOpen.value = true;
};

const closeShortcutModal = () => {
  isShortcutModalOpen.value = false;
};

watchEffect(() => {
  if (process.client) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${getTheme.value}-theme`);
  }
});
</script>

<template>
  <div>
    <header class="app-header">
      <img
        class="teia-img"
        :src="Teia"
        alt="Teia"
      />

      <ImagePolvo />

      <h1>Pergunte ao Polvo!</h1>
      <p class="app-header-description">Coloque abaixo as opções e o polvo decidirá por você:</p>
    </header>
    <FormPolvoDefault />
    <footer>
      <p>Desenvolvido por <a class="about-link" href="https://github.com/Deustavo">Gustavo Andrade</a></p>
      <p>♡ Dedicado à moonjoume ♡</p>
    </footer>

    <ShortcutModal
      :is-open="isShortcutModalOpen"
      @close="closeShortcutModal"
    />

    <div class="floating-shortcut-container">
      <Transition name="tooltip">
        <div v-if="showTooltip" class="install-tooltip">
          Adicione o Polvo à sua tela inicial! 🐙
          <div class="tooltip-arrow"></div>
        </div>
      </Transition>
      
      <button 
        v-if="isMobileDevice"
        class="floating-shortcut-button"
        @click="openShortcutModal"
        aria-label="Adicionar à tela inicial"
      >
        <i class="fas fa-mobile-alt"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";

.floating-shortcut-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.install-tooltip {
  position: absolute;
  bottom: calc(100% + 12px);
  right: 0;
  background-color: white;
  color: #D63F8C;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(214, 63, 140, 0.4);
  
  .tooltip-arrow {
    position: absolute;
    bottom: -7px;
    right: 24px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }
}

// Tooltip animations
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.tooltip-enter-to,
.tooltip-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.floating-shortcut-button {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #D63F8C;
  border: none;
  box-shadow: 0 2px 8px rgba(214, 63, 140, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  z-index: 100;

  i {
    color: white;
    font-size: 24px;
  }

  &:hover, &:focus {
    transform: scale(1.05);
    background-color: color.scale(#D63F8C, $lightness: -5%);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 769px) {
    display: none;
  }
}
</style>
  
<style>
  @import '../assets/sass/app.scss';
</style>
  
  