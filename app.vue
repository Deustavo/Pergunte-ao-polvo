<script setup lang="ts">
import { watchEffect } from 'vue';

// @ts-ignore - Auto-imported by Nuxt
const { getTheme } = useTheme();

const route = useRoute();
const pageKey = computed(() => route.fullPath);

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
 * Donation notification: show at top when a new donation is received (via polling).
 */
interface DonationNotificationPayload {
  amountInReais?: number;
  currency?: string;
  username?: string | null;
  message?: string | null;
}

const donationNotification = ref<DonationNotificationPayload | null>(null);
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

const { start: startDonationPolling, stop: stopDonationPolling, onNewDonation } = useDonationPolling();

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

onNewDonation((donation) => {
  showDonationNotification({
    amountInReais: donation.amountInReais,
    currency: donation.currency,
    username: donation.username ?? null,
    message: donation.message ?? null,
  });
});

onMounted(() => {
  if (process.client) startDonationPolling();
});

onUnmounted(() => {
  if (hideTimeout) clearTimeout(hideTimeout);
  stopDonationPolling();
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
    <div :key="pageKey">
      <NuxtPage :page-key="pageKey" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/sass/App.scss';
</style>

