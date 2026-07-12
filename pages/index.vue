<script setup>
definePageMeta({
  key: (route) => route.fullPath,
});

import miadoAudio from '@/assets/audio/miado1.mp3';

// @ts-ignore - Auto-imported by Nuxt
const { getTheme, toggleTheme } = useTheme();
// @ts-ignore - Auto-imported by Nuxt
const { grinchVariantActive } = useSeasonalTheme();
const isShortcutModalOpen = ref(false);
const isMobileDevice = ref(false);
const showGameTooltip = ref(false);

const themeIcon = computed(() => {
  return getTheme.value === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

const headerTitle = computed(() => grinchVariantActive.value ? 'Pergunte ao Grinch!' : 'Pergunte ao Polvo!');
const headerDescription = computed(() => grinchVariantActive.value
  ? 'Coloque abaixo as opções e o grinch decidirá por você:'
  : 'Coloque abaixo as opções e o polvo decidirá por você:');

const checkAndShowGameTooltip = () => {
  if (process.client) {
    const lastSeenDate = localStorage.getItem('gameTooltipLastSeenDate');
    const today = new Date().toDateString();

    // Mostra tooltip apenas na primeira vez que a pessoa abre a página no dia
    if (lastSeenDate !== today) {
      showGameTooltip.value = true;
      localStorage.setItem('gameTooltipLastSeenDate', today);

      const audio = new Audio(miadoAudio);
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Autoplay bloqueado pelo navegador: toca no primeiro gesto do usuário
        const playOnFirstInteraction = () => {
          audio.play().catch(() => {});
          document.removeEventListener('click', playOnFirstInteraction);
          document.removeEventListener('touchstart', playOnFirstInteraction);
          document.removeEventListener('keydown', playOnFirstInteraction);
        };
        document.addEventListener('click', playOnFirstInteraction, { once: true });
        document.addEventListener('touchstart', playOnFirstInteraction, { once: true });
        document.addEventListener('keydown', playOnFirstInteraction, { once: true });
      });

      // Auto-hide tooltip after 5 seconds
      setTimeout(() => {
        showGameTooltip.value = false;
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

  // Show game tooltip after 2 seconds
  setTimeout(() => {
    checkAndShowGameTooltip();
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

const openChinelaDestroyer = () => {
  window.open('https://chinela-destroyer.vercel.app/', '_blank', 'noopener,noreferrer');
};

</script>

<template>
  <div>
    <header class="app-header">
      <ImagePolvo />
      <h1>{{ headerTitle }}</h1>
      <!-- <NuxtLink class="app-header-description about-link" to="/about">O que é o pergunte ao polvo?</NuxtLink> -->
      <!-- <p class="app-header-description">Se precisar fazer uma escolha difícil, pergunte ao polvo!<br>Ele saberá a resposta certa.</p> -->
      <p class="app-header-description">{{ headerDescription }}</p>
    </header>
    <FormPolvoDefault />
    <!-- <FormPolvoMultiChoices /> -->
    <footer>
      <p>Desenvolvido por <a class="about-link" href="https://github.com/Deustavo" target="_blank" rel="noopener noreferrer">Gustavo Andrade</a></p>
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
        <div v-if="showGameTooltip" class="game-tooltip">
          Jogue Chinela Destroyer <i class="fas fa-cat" /> 
          <div class="tooltip-arrow"></div>
        </div>
      </Transition>

      <button
        type="button"
        class="floating-button game-button"
        aria-label="Jogar Chinela Destroyer"
        @click="openChinelaDestroyer"
      >
        <img src="@/assets/img/chinela.png" alt="Chinela Destroyer" />
      </button>

      <button
        type="button"
        class="floating-button donation-button"
        aria-label="Ver doações"
        @click="goToDonations"
      >
        <i class="fas fa-heart" />
      </button>
    </div>
    <SeasonalDecorations />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Index.scss';
</style>

<style>
@import '@/assets/sass/app.scss';
</style>
  
