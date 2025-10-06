<script setup>
import Settings from '@/settings';
import Teia from '@/assets/img/teia.png';

const { getTheme, toggleTheme } = Settings();
const isShortcutModalOpen = ref(false);
const isMobileDevice = ref(false);

const themeIcon = computed(() => {
  return getTheme.value === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

onMounted(() => {
  const checkMobile = () => {
    isMobileDevice.value = window.innerWidth <= 768;
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

    <button 
      v-if="isMobileDevice"
      class="floating-shortcut-button"
      @click="openShortcutModal"
      aria-label="Adicionar à tela inicial"
    >
      <i class="fas fa-mobile-alt"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";

.floating-shortcut-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
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
  
  