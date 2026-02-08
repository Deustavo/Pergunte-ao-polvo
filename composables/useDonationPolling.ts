/**
 * Polls /api/donations to detect new donations.
 * Use this instead of SSE in production (serverless timeouts and no shared memory).
 */

const POLL_INTERVAL_MS = 20_000;

export interface DonationPollItem {
  id: string;
  amountInReais: number;
  currency: string;
  username?: string | null;
  message?: string | null;
}

export function useDonationPolling() {
  let lastSeenId: string | null = null;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  const callbacks: Array<(donation: DonationPollItem) => void> = [];

  const onNewDonation = (cb: (donation: DonationPollItem) => void) => {
    callbacks.push(cb);
  };

  const poll = async () => {
    try {
      const res = await $fetch<{ data: DonationPollItem[] }>('/api/donations', {
        query: { limit: 1 },
      });
      const list = res.data ?? [];
      const latest = list[0];
      if (!latest) return;
      if (lastSeenId !== null && latest.id !== lastSeenId) {
        callbacks.forEach((cb) => cb(latest));
      }
      lastSeenId = latest.id;
    } catch {
      // Network or API error; keep lastSeenId and retry on next interval
    }
  };

  const start = () => {
    if (intervalId !== null) return;
    poll();
    intervalId = setInterval(poll, POLL_INTERVAL_MS);
  };

  const stop = () => {
    if (intervalId === null) return;
    clearInterval(intervalId);
    intervalId = null;
  };

  return { start, stop, onNewDonation };
}
