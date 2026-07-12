<script setup>
import { useSeasonalTheme } from '@/composables/useSeasonalTheme';

const { activeTheme } = useSeasonalTheme();
</script>

<template>
  <SnowFall v-if="activeTheme === 'natal'" />
  <ConfettiFall v-if="activeTheme === 'carnaval'" />
  <img
    v-if="activeTheme === 'halloween'"
    class="teia-img"
    src="@/assets/img/teia.png"
    alt=""
  />
</template>

<style scoped>
.teia-img {
  position: fixed;
  top: -12px;
  left: 0;
  width: 100%;
  max-width: 480px;
  z-index: 10;
  pointer-events: none;
}
</style>
