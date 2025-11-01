import { ref, computed } from 'vue';

/**
 * Global theme state shared across all components
 */
const themeState = ref<string>('light');
let initialized = false;

/**
 * Initialize theme from localStorage
 */
const initializeTheme = (): void => {
  if (!initialized && process.client) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      themeState.value = savedTheme;
    }
    initialized = true;
  }
};

export const useTheme = () => {
  /**
   * Initialize on first use
   */
  initializeTheme();

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

