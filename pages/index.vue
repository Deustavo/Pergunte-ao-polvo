<script setup>
// @ts-ignore - Auto-imported by Nuxt
const { getTheme, toggleTheme } = useTheme();
const isShortcutModalOpen = ref(false);
const isDonationModalOpen = ref(false);
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

const openDonationModal = () => {
  isDonationModalOpen.value = true;
};

const closeDonationModal = () => {
  isDonationModalOpen.value = false;
};
</script>

<template>
  <div>
    <header class="app-header">
      <ImagePolvo />
      <h1>Pergunte ao Polvo!</h1>
      <!-- <NuxtLink class="app-header-description about-link" to="/about">O que é o pergunte ao polvo?</NuxtLink> -->
      <!-- <p class="app-header-description">Se precisar fazer uma escolha difícil, pergunte ao polvo!<br>Ele saberá a resposta certa.</p> -->
      <p class="app-header-description">Coloque abaixo as opções e o polvo decidirá por você:</p>
    </header>
    <FormPolvoDefault />
    <!-- <FormPolvoMultiChoices /> -->
    <footer>
      <p>Desenvolvido por <a class="about-link" href="https://github.com/Deustavo">Gustavo Andrade</a></p>
      <p>❤️ Dedicado à moonjoume ❤️</p>
    </footer>

    <ShortcutModal
      :is-open="isShortcutModalOpen"
      @close="closeShortcutModal"
    />

    <DonationModal
      :is-open="isDonationModalOpen"
      @close="closeDonationModal"
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

    <div class="floating-container-top">
      <button
        class="floating-button theme-button"
        @click="toggleTheme"
        aria-label="Mudar tema"
      >
        <i :class="themeIcon" />
      </button>
    </div>

    <div class="floating-container-bottom">
      <button
        class="floating-button donation-button"
        @click="openDonationModal"
        aria-label="Doar"
      >
        <i class="fas fa-heart" />
      </button>
    </div>
  </div>

  <!-- Neve caindo -->
  <!-- <SnowFall /> -->
</template>

<style lang="scss" scoped>
@use "sass:color";

.floating-shortcut-container {
  position: fixed;
  bottom: 88px;
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
  background: linear-gradient(135deg, #D63F8C 0%, #F093B0 100%);
  border: none;
  box-shadow: 0 2px 8px rgba(214, 63, 140, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, all 0.2s;
  z-index: 100;

  i {
    color: white;
    font-size: 24px;
  }

  &:hover, &:focus {
    transform: scale(1.05);
    background: linear-gradient(135deg, color.scale(#D63F8C, $lightness: -5%) 0%, color.scale(#F093B0, $lightness: -5%) 100%);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 769px) {
    display: none;
  }
}

.floating-container-top {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.floating-container-bottom {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.floating-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
  z-index: 100;

  i {
    color: white;
    font-size: 20px;
  }

  &:hover, &:focus {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
}

.donation-button {
  background: linear-gradient(135deg, #D63F8C 0%, #F093B0 100%);
  animation: pulse 2s ease-in-out infinite;

  &:hover, &:focus {
    background: linear-gradient(135deg, color.scale(#D63F8C, $lightness: -10%) 0%, color.scale(#F093B0, $lightness: -10%) 100%);
    box-shadow: 0 4px 16px rgba(214, 63, 140, 0.5);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(214, 63, 140, 0.4);
  }
  50% {
    box-shadow: 0 2px 16px rgba(214, 63, 140, 0.6);
  }
}

.theme-button {
  background: linear-gradient(135deg, #D63F8C 0%, #F093B0 100%);

  &:hover, &:focus {
    background: linear-gradient(135deg, #b61f6d 0%, #d07a94 100%);
  }
}
</style>
  
<style>
  @import '../assets/sass/app.scss';
</style>
  
