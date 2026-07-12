/**
 * Eventos sazonais do site: data de início/fim de cada um.
 *
 * Para adicionar um evento novo, basta acrescentar uma entrada ao array
 * `seasonalThemes` abaixo — nenhum outro arquivo de configuração precisa mudar.
 * A lógica que interpreta essas datas fica em composables/useSeasonalTheme.ts;
 * este arquivo é só o "calendário".
 *
 * Quando as janelas de dois eventos se sobrepõem em algum ano, vence o que
 * aparecer primeiro no array.
 */

export type SeasonalThemeId = 'primeiro-de-abril' | 'halloween' | 'natal' | 'carnaval' | 'pascoa';

/** Data fixa todo ano (mês 1-12). Pode cruzar a virada do ano (ex: dez -> jan). */
export interface FixedDateRange {
  type: 'fixed';
  start: { month: number; day: number };
  end: { month: number; day: number };
}

/**
 * Data móvel, calculada a partir do Domingo de Páscoa daquele ano (ex: Carnaval).
 * Offsets em dias: negativo = antes da Páscoa, positivo = depois.
 */
export interface EasterOffsetRange {
  type: 'easter-offset';
  startOffsetDays: number;
  endOffsetDays: number;
}

export interface SeasonalThemeConfig {
  id: SeasonalThemeId;
  label: string;
  dateRange: FixedDateRange | EasterOffsetRange;
  /** Nota livre para lembrar por que a janela é essa (não usada em lógica) */
  notes?: string;
}

/**
 * Ordem de prioridade: em caso de sobreposição, o primeiro da lista vence.
 */
export const seasonalThemes: SeasonalThemeConfig[] = [
  {
    id: 'primeiro-de-abril',
    label: '1º de Abril',
    dateRange: { type: 'fixed', start: { month: 4, day: 1 }, end: { month: 4, day: 7 } },
    notes: 'Uma semana a partir do dia 1º',
  },
  {
    id: 'halloween',
    label: 'Halloween',
    dateRange: { type: 'fixed', start: { month: 10, day: 1 }, end: { month: 10, day: 31 } },
    notes: 'Mês de outubro inteiro',
  },
  {
    id: 'natal',
    label: 'Natal',
    dateRange: { type: 'fixed', start: { month: 12, day: 1 }, end: { month: 12, day: 31 } },
    notes: 'Mês de dezembro inteiro',
  },
  {
    id: 'carnaval',
    label: 'Carnaval',
    dateRange: { type: 'easter-offset', startOffsetDays: -53, endOffsetDays: -47 },
    notes: 'Uma semana terminando na Terça de Carnaval (47 dias antes da Páscoa)',
  },
  {
    id: 'pascoa',
    label: 'Páscoa',
    dateRange: { type: 'easter-offset', startOffsetDays: -6, endOffsetDays: 0 },
    notes: 'Uma semana terminando no Domingo de Páscoa',
  },

  // Para adicionar um novo evento, copie um bloco acima e ajuste id/label/dateRange.
  // Depois crie o pool de imagens e (se quiser) a decoração em:
  //   - components/ImagePolvo.vue (pool de imagens do polvo)
  //   - components/SeasonalDecorations.vue (efeito visual, se houver)
];

/** Domingo de Páscoa daquele ano, pelo algoritmo de Meeus/Jones/Butcher */
const getEasterSunday = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Resolve a janela de datas concreta (start/end) de um evento para um ano específico.
 * Útil para depurar/conferir visualmente quando cada evento vai estar ativo.
 */
export const resolveThemeDateRange = (config: SeasonalThemeConfig, year: number): { start: Date; end: Date } => {
  if (config.dateRange.type === 'fixed') {
    const { start, end } = config.dateRange;
    const startDate = new Date(year, start.month - 1, start.day);
    // Range que cruza a virada do ano (ex: 25/dez -> 05/jan): o fim cai no ano seguinte
    const crossesYearEnd = end.month * 100 + end.day < start.month * 100 + start.day;
    const endDate = new Date(crossesYearEnd ? year + 1 : year, end.month - 1, end.day);
    return { start: startDate, end: endDate };
  }

  const easter = getEasterSunday(year);
  return {
    start: addDays(easter, config.dateRange.startOffsetDays),
    end: addDays(easter, config.dateRange.endOffsetDays),
  };
};

/**
 * Imprime no console a janela de datas de cada evento para o ano informado.
 * Rode com: `npx tsx -e "import('./settings/seasonalThemes').then(m => m.printCalendar())"`
 * ou chame a partir de qualquer script/composable durante o desenvolvimento.
 */
export const printCalendar = (year: number = new Date().getFullYear()): void => {
  const fmt = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  for (const theme of seasonalThemes) {
    const { start, end } = resolveThemeDateRange(theme, year);
    const note = theme.notes ? ` (${theme.notes})` : '';
    console.log(`${theme.label.padEnd(16)} ${fmt(start)} -> ${fmt(end)}${note}`);
  }
};
