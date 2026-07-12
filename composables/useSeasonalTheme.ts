import { ref, computed, onMounted } from 'vue';
import { seasonalThemes, resolveThemeDateRange, type SeasonalThemeConfig, type SeasonalThemeId } from '@/settings/seasonalThemes';

export type { SeasonalThemeId };

const stripTime = (date: Date): number => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

/**
 * True when `date` falls inside the theme's window for its own year OR the previous
 * year's window (covers ranges that cross the year boundary, e.g. dez -> jan).
 */
const isThemeActiveOn = (config: SeasonalThemeConfig, date: Date): boolean => {
  const time = stripTime(date);

  return [date.getFullYear() - 1, date.getFullYear()].some((year) => {
    const { start, end } = resolveThemeDateRange(config, year);
    return time >= stripTime(start) && time <= stripTime(end);
  });
};

/** Ids na mesma ordem de prioridade de settings/seasonalThemes.ts */
const themeIds: SeasonalThemeId[] = seasonalThemes.map((t) => t.id);

/**
 * Global override state shared across all components, used for dev/QA preview
 * (?tema=halloween in the URL, persisted for the browser session)
 */
const overrideTheme = ref<SeasonalThemeId | null>(null);

/**
 * Set by ImagePolvo when it renders the natal "grinch" variant, read by pages/index.vue
 * to swap the header title/description. Shared global ref, same pattern as useTheme.ts.
 */
export const grinchVariantActive = ref(false);

/**
 * Applies ?tema= from the query string. Uses useRoute() (not window.location) so the
 * server render and the client's first render agree — avoids a hydration mismatch.
 */
const applyQueryOverride = (queryTheme: unknown): void => {
  if (queryTheme === 'nenhum') {
    overrideTheme.value = null;
    if (process.client) sessionStorage.setItem('seasonalThemeOverride', 'nenhum');
    return;
  }

  if (typeof queryTheme === 'string' && themeIds.includes(queryTheme as SeasonalThemeId)) {
    overrideTheme.value = queryTheme as SeasonalThemeId;
    if (process.client) sessionStorage.setItem('seasonalThemeOverride', queryTheme);
  }
};

export const useSeasonalTheme = () => {
  // @ts-ignore - Auto-imported by Nuxt
  const route = useRoute();
  applyQueryOverride(route.query.tema);

  /**
   * Re-apply a previously remembered override (sessionStorage) after mount, when no
   * ?tema= is present on this navigation. Deferred to onMounted, like useTheme.ts,
   * since sessionStorage isn't available during SSR and reading it eagerly would
   * make the client's first render diverge from the server's.
   */
  onMounted(() => {
    if (route.query.tema) return;
    const stored = sessionStorage.getItem('seasonalThemeOverride');
    if (stored === 'nenhum') {
      overrideTheme.value = null;
    } else if (stored && themeIds.includes(stored as SeasonalThemeId)) {
      overrideTheme.value = stored as SeasonalThemeId;
    }
  });

  const activeTheme = computed<SeasonalThemeId | null>(() => {
    if (overrideTheme.value) return overrideTheme.value;

    const today = new Date();
    return seasonalThemes.find((theme) => isThemeActiveOn(theme, today))?.id ?? null;
  });

  return {
    activeTheme,
    grinchVariantActive,
  };
};
