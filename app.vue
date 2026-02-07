<script setup lang="ts">
import { watchEffect } from 'vue';

// @ts-ignore - Auto-imported by Nuxt
const { getTheme } = useTheme();

/**
 * Sync theme with html and body elements
 */
watchEffect(() => {
  if (process.client) {
    const themeClass = `${getTheme.value}-theme`;
    
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(themeClass);
    
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(themeClass);
  }
});
</script>

<template>
  <NuxtPage />
</template>

