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

/**
 * Donation notification from SSE: show at top when a new donation is received.
 */
interface DonationNotificationPayload {
  amountInReais?: number;
  currency?: string;
  username?: string | null;
  message?: string | null;
}

const donationNotification = ref<DonationNotificationPayload | null>(null);
let eventSource: EventSource | null = null;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

const formatDonationValue = (value: number, currency: string) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency || 'BRL',
  }).format(value);
};

const donationNotificationLine1 = computed(() => {
  const d = donationNotification.value;
  if (!d || d.amountInReais == null) return '';
  const nome = d.username?.trim() || 'Anônimo';
  const valor = formatDonationValue(d.amountInReais, d.currency || 'BRL');
  return `Obrigado ${nome} pela doação de ${valor}`;
});

const donationNotificationLine2 = computed(() => {
  const d = donationNotification.value;
  return d?.message?.trim() ?? '';
});

const showDonationNotification = (payload: DonationNotificationPayload) => {
  if (hideTimeout) clearTimeout(hideTimeout);
  donationNotification.value = payload;
  hideTimeout = setTimeout(() => {
    donationNotification.value = null;
    hideTimeout = null;
  }, 6000);
};

const startDonationStream = () => {
  if (typeof EventSource === 'undefined' || eventSource) return;
  const url = `${window.location.origin}/api/donations/stream`;
  eventSource = new EventSource(url);
  eventSource.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      if (data.type === 'new-donation' && (data.amountInReais != null || data.username != null)) {
        showDonationNotification({
          amountInReais: data.amountInReais,
          currency: data.currency,
          username: data.username ?? null,
          message: data.message ?? null,
        });
      }
    } catch {
      // ignore keepalive or parse errors
    }
  };
  eventSource.onerror = () => {
    eventSource?.close();
    eventSource = null;
  };
};

onMounted(() => {
  if (process.client) startDonationStream();
});

onUnmounted(() => {
  if (hideTimeout) clearTimeout(hideTimeout);
  eventSource?.close();
  eventSource = null;
});
</script>

<template>
  <div>
    <Transition name="donation-notification">
      <div
        v-if="donationNotification && donationNotificationLine1"
        class="donation-notification-bar"
        role="alert"
      >
        <div class="donation-notification-line">{{ donationNotificationLine1 }}</div>
        <div v-if="donationNotificationLine2" class="donation-notification-line donation-notification-message">
          {{ donationNotificationLine2 }}
        </div>
      </div>
    </Transition>
    <NuxtPage :page-key="(route) => route.fullPath" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/sass/App.scss';
</style>

