<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});

/**
 * Lists donations from LivePix and optionally listens for new donations via SSE.
 */

interface DonationItem {
  id: string;
  amountInReais: number;
  currency: string;
  createdAt: string;
  reference: string | null;
  username?: string | null;
  message?: string | null;
}

const donations = ref<DonationItem[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const showNewDonationToast = ref(false);
let eventSource: EventSource | null = null;

const fetchDonations = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await $fetch<{ data: DonationItem[] }>('/api/donations', {
      query: { limit: 50 },
    });
    donations.value = res.data ?? [];
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro ao carregar doações';
    error.value = msg;
    donations.value = [];
  } finally {
    loading.value = false;
  }
};

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatAmount = (value: number, currency: string) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency || 'BRL',
  }).format(value);
};

const startSSE = () => {
  if (typeof EventSource === 'undefined') return;
  if (eventSource) return;
  const url = `${window.location.origin}/api/donations/stream`;
  eventSource = new EventSource(url);
  eventSource.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      if (data.type !== 'new-donation') return;
      fetchDonations();
      showNewDonationToast.value = true;
      setTimeout(() => {
        showNewDonationToast.value = false;
      }, 5000);
    } catch {
      // ignore keepalive or parse errors
    }
  };
  eventSource.onerror = () => {
    eventSource?.close();
    eventSource = null;
  };
};

const stopSSE = () => {
  eventSource?.close();
  eventSource = null;
};

const LIVEPIX_DONATE_URL = 'https://livepix.gg/pergunteaopolvo';

onMounted(() => {
  fetchDonations();
  startSSE();
});

onUnmounted(() => {
  stopSSE();
});
</script>

<template>
  <div class="donations-page">
    <header class="donations-header">
      <NuxtLink class="back-link" to="/">
        <i class="fas fa-arrow-left"></i> Voltar
      </NuxtLink>
      <h1>Ajude o polvo a continuar existindo!</h1>
      <p>
        Se você também põe todas as decisões importantes da sua vida nos tentaculos do polvo,
        considere ajudá-lo a continuar existindo.
      </p>
      <a
        class="button support-button"
        :href="LIVEPIX_DONATE_URL"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fas fa-heart"></i>
        Apoie o polvo
      </a>
    </header>

    <div v-if="showNewDonationToast" class="toast">
      Nova doação recebida! Lista atualizada.
    </div>

    <div class="donations-container">
      <h2>Doações recebidas</h2>

      <div class="donations-actions">
        <button
          type="button"
          class="button refresh-button"
          :disabled="loading"
          @click="fetchDonations"
        >
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          Atualizar
        </button>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="loading && donations.length === 0" class="loading-message">
      Carregando...
    </div>

    <div v-else-if="donations.length === 0" class="empty-message">
      Nenhuma doação encontrada.
    </div>

    <ul v-else class="donations-list">
      <li
        v-for="item in donations"
        :key="item.id"
        class="donation-card"
      >
        <span class="donation-amount">{{ formatAmount(item.amountInReais, item.currency) }}</span>
        <span class="donation-date">{{ formatDate(item.createdAt) }}</span>
        <div v-if="item.username || item.message || item.reference" class="donation-details">
          <span v-if="item.username" class="donation-username">{{ item.username }}</span>
          <span v-if="item.message" class="donation-message">"{{ item.message }}"</span>
          <span v-else-if="item.reference" class="donation-reference">{{ item.reference }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/sass/Donations.scss';
</style>
