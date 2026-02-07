/**
 * Lists donations from LivePix API.
 * Fetches both payments (GET /v2/payments) and messages (GET /v2/messages),
 * since vaquinha donations often appear as messages. Merges and sorts by date.
 */

import { getLivePixAccessToken, clearLivePixTokenCache } from '../utils/livepix-auth';

const LIVEPIX_API_BASE = 'https://api.livepix.gg/v2';

interface LivePixPayment {
  id: string;
  proof?: string;
  reference?: string;
  amount: number;
  currency: string;
  createdAt: string;
}

interface LivePixMessage {
  id: string;
  proof?: string;
  reference?: string;
  username?: string;
  message?: string;
  amount: number;
  currency: string;
  createdAt: string;
}

export interface DonationItem {
  id: string;
  amountInReais: number;
  currency: string;
  createdAt: string;
  reference: string | null;
  /** Set when donation came from messages (vaquinha). */
  username?: string | null;
  /** Set when donation came from messages (vaquinha). */
  message?: string | null;
}

async function fetchApi(
  token: string,
  path: string,
): Promise<{ ok: boolean; status: number; data: unknown[]; text: string }> {
  const res = await fetch(`${LIVEPIX_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const text = await res.text();
  let data: unknown[] = [];
  try {
    const json = JSON.parse(text) as { data?: unknown[] };
    data = json.data ?? [];
  } catch {
    // leave data []
  }
  return { ok: res.ok, status: res.status, data, text };
}

export default defineEventHandler(async (event): Promise<{ data: DonationItem[] }> => {
  const query = getQuery(event);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 50));

  let token = await getLivePixAccessToken();

  let paymentsResult = await fetchApi(token, `/payments?page=1&limit=${limit}`);
  let messagesResult = await fetchApi(token, `/messages?page=1&limit=${limit}`);

  if (paymentsResult.status === 401 || messagesResult.status === 401) {
    clearLivePixTokenCache();
    token = await getLivePixAccessToken();
    paymentsResult = await fetchApi(token, `/payments?page=1&limit=${limit}`);
    messagesResult = await fetchApi(token, `/messages?page=1&limit=${limit}`);
  }

  if (!paymentsResult.ok && !messagesResult.ok) {
    throw createError({
      statusCode: paymentsResult.status || 502,
      message: `LivePix API error: ${paymentsResult.status} ${paymentsResult.text}`,
    });
  }

  const fromPayments: DonationItem[] = (paymentsResult.data as LivePixPayment[]).map((p) => ({
    id: `payment-${p.id}`,
    amountInReais: p.amount / 100,
    currency: p.currency ?? 'BRL',
    createdAt: p.createdAt,
    reference: p.reference ?? null,
    username: null,
    message: null,
  }));

  const fromMessages: DonationItem[] = (messagesResult.data as LivePixMessage[]).map((m) => ({
    id: `message-${m.id}`,
    amountInReais: m.amount / 100,
    currency: m.currency ?? 'BRL',
    createdAt: m.createdAt,
    reference: m.reference ?? null,
    username: m.username ?? null,
    message: m.message ?? null,
  }));

  const merged = [...fromPayments, ...fromMessages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const data = merged.slice(0, limit);

  return { data };
});
