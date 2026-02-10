<script setup lang="ts">
/**
 * Number of confetti pieces to render (varied sizes and colors via CSS).
 */
const confettiCount = 80;
const pieces = Array.from({ length: confettiCount }, (_, i) => i + 1);
</script>

<template>
  <div class="confetti-fall" aria-hidden="true">
    <div
      v-for="i in pieces"
      :key="i"
      class="confetti-piece"
      :class="`confetti-piece--${i}`"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/sass/ConfettiFall.scss';
</style>
