<script setup>
definePageMeta({
  key: (route) => route.fullPath,
});

// @ts-ignore - Auto-imported by Nuxt
const { getTheme, toggleTheme } = useTheme();
const isShortcutModalOpen = ref(false);
const isMobileDevice = ref(false);
const showDonationTooltip = ref(false);

const themeIcon = computed(() => {
  return getTheme.value === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

const checkAndShowDonationTooltip = () => {
  if (process.client) {
    const lastSeenTimestamp = localStorage.getItem('donationTooltipLastSeen');
    const now = Date.now();
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 7 dias em milissegundos
    
    // Mostra tooltip se nunca foi visto ou se passou mais de uma semana
    if (!lastSeenTimestamp || (now - parseInt(lastSeenTimestamp)) > oneWeekInMs) {
      showDonationTooltip.value = true;
      localStorage.setItem('donationTooltipLastSeen', now.toString());
      // Auto-hide tooltip after 5 seconds
      setTimeout(() => {
        showDonationTooltip.value = false;
      }, 5000);
    }
  }
};

onMounted(() => {
  const checkMobile = () => {
    isMobileDevice.value = window.innerWidth <= 768;
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  // Show donation tooltip after 2 seconds
  setTimeout(() => {
    checkAndShowDonationTooltip();
  }, 2000);
  
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

/**
 * Navigate to donations with full page load so the correct page is rendered.
 * Client-side navigation was not updating NuxtPage content (Nuxt 3.12).
 */
const goToDonations = () => {
  navigateTo('/donations', { external: true });
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

    <div class="floating-shortcut-container">
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
      <Transition name="tooltip">
        <div v-if="showDonationTooltip" class="donation-tooltip">
          Apoie o Pergunte ao Polvo! ❤️🐙
          <div class="tooltip-arrow"></div>
        </div>
      </Transition>
      
      <button
        type="button"
        class="floating-button donation-button"
        aria-label="Ver doações"
        @click="goToDonations"
      >
        <i class="fas fa-heart" />
      </button>
    </div>
    <!-- Neve caindo -->
    <!-- <SnowFall /> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Index.scss';
</style>

<style>
@import '@/assets/sass/app.scss';
</style>
  
