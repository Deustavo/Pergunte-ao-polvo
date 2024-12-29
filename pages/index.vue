<template>
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
      <p>♡ Dedicado à moonjoume ♡</p>
    </footer>
    <div class="floating-container">
      <a
        class="twitter-button"
        href="https://x.com/pergunteAoPolv0"
        target="_blank"
      >
        <i class="fa-brands fa-x-twitter"></i>
      </a>
    </div>
    <!-- Neve caindo -->
    <!-- <SnowFall /> -->
</template>
  
<style>
  @import '../assets/sass/app.scss';
</style>
  
  