/**
 * Polls /api/donations to detect new donations.
 * Use this instead of SSE in production (serverless timeouts and no shared memory).
 *
 * A single interval is shared by every component that calls start() (app.vue and
 * pages/donations.vue), and it pauses while the tab is hidden.
 */

const POLL_INTERVAL_MS = 60_000;

export interface DonationPollItem {
  id: string;
  amountInReais: number;
  currency: string;
  username?: string | null;
  message?: string | null;
}

type DonationCallback = (donation: DonationPollItem) => void;

// Shared state (client only: start() is only called from onMounted)
let lastSeenId: string | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;
const subscribers = new Set<DonationCallback[]>();

const poll = async () => {
  try {
    const res = await $fetch<{ data: DonationPollItem[] }>('/api/donations', {
      query: { limit: 1 },
    });
    const list = res.data ?? [];
    const latest = list[0];
    if (!latest) return;
    if (lastSeenId !== null && latest.id !== lastSeenId) {
      subscribers.forEach((callbacks) => callbacks.forEach((cb) => cb(latest)));
    }
    lastSeenId = latest.id;
  } catch {
    // Network or API error; keep lastSeenId and retry on next interval
  }
};

const startInterval = () => {
  if (intervalId !== null) return;
  poll();
  intervalId = setInterval(poll, POLL_INTERVAL_MS);
};

const stopInterval = () => {
  if (intervalId === null) return;
  clearInterval(intervalId);
  intervalId = null;
};

const onVisibilityChange = () => {
  if (document.hidden) stopInterval();
  else if (subscribers.size > 0) startInterval();
};

export function useDonationPolling() {
  const callbacks: DonationCallback[] = [];

  const onNewDonation = (cb: DonationCallback) => {
    callbacks.push(cb);
  };

  const start = () => {
    if (subscribers.has(callbacks)) return;
    subscribers.add(callbacks);
    if (subscribers.size === 1) {
      document.addEventListener('visibilitychange', onVisibilityChange);
      if (!document.hidden) startInterval();
    }
  };

  const stop = () => {
    if (!subscribers.delete(callbacks)) return;
    if (subscribers.size === 0) {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stopInterval();
    }
  };

  return { start, stop, onNewDonation };
}
