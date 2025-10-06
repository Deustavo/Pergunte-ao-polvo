<script setup>
import Settings from '@/settings';
import Teia from '@/assets/img/teia.png';

const { getTheme, toggleTheme } = Settings();

const themeIcon = computed(() => {
  return getTheme.value === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

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
      <!-- <NuxtLink class="app-header-description about-link" to="/about">O que é o pergunte ao polvo?</NuxtLink> -->
      <!-- <p class="app-header-description">Se precisar fazer uma escolha difícil, pergunte ao polvo!<br>Ele saberá a resposta certa.</p> -->
      <p class="app-header-description">Coloque abaixo as opções e o polvo decidirá por você:</p>
    </header>
    <FormPolvoDefault />
    <!-- <FormPolvoMultiChoices /> -->
    <footer>
      <p>Desenvolvido por <a class="about-link" href="https://github.com/Deustavo">Gustavo Andrade</a></p>
      <p>♡ Dedicado à moonjoume ♡</p>
    </footer>

    <!-- <div class="floating-container">
      <button
        class="theme-button"
        @click="toggleTheme"
      >
        <i :class="themeIcon" />
      </button>
    </div> -->
  </div>

  <!-- Neve caindo -->
  <!-- <SnowFall /> -->
</template>
  
<style>
  @import '../assets/sass/app.scss';
</style>
  
  