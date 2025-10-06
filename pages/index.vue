<script setup>
import Settings from '@/settings';
import Teia from '@/assets/img/teia.png';

const { getTheme, toggleTheme } = Settings();
const isShortcutModalOpen = ref(false);

const themeIcon = computed(() => {
  return getTheme.value === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
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
      <p><a class="about-link" href="#" @click.prevent="openShortcutModal">Adicionar à tela inicial</a></p>
    </footer>

    <ShortcutModal
      :is-open="isShortcutModalOpen"
      @close="closeShortcutModal"
    />
  </div>
</template>
  
<style>
  @import '../assets/sass/app.scss';
</style>
  
  