import { ref, computed, onMounted } from 'vue';

/**
 * Global theme state shared across all components
 */
const themeState = ref<string>('light');

export const useTheme = () => {
  /**
   * Initialize theme from localStorage after mount to avoid hydration mismatch
   */
  onMounted(() => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        themeState.value = savedTheme;
      }
    }
  });

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = (): void => {
    themeState.value = themeState.value === 'light' ? 'dark' : 'light';
    
    if (process.client) {
      localStorage.setItem('theme', themeState.value);
    }
  };

  /**
   * Get current theme as computed property
   */
  const getTheme = computed(() => themeState.value);

  return {
    theme: themeState,
    getTheme,
    toggleTheme
  };
};

