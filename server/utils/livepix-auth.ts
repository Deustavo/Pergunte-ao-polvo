/**
 * LivePix OAuth2 client_credentials token with in-memory cache.
 * Used by server routes that call the LivePix API.
 */

const LIVEPIX_OAUTH_URL = 'https://oauth.livepix.gg/oauth2/token';
/** payments:read and messages:read for listing donations (vaquinha often uses messages). */
const LIVEPIX_SCOPE = 'account:read wallet:read webhooks payments:read messages:read';

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

/**
 * Clears the cached token (e.g. after 401 from API so next call gets a fresh token).
 */
export function clearLivePixTokenCache(): void {
  tokenCache = null;
}

/**
 * Returns a valid access token, from cache or by requesting a new one.
 */
export async function getLivePixAccessToken(): Promise<string> {
  const now = Date.now();
  const bufferMs = 60 * 1000;

  if (tokenCache && tokenCache.expiresAt > now + bufferMs) {
    return tokenCache.accessToken;
  }

  const clientId = process.env.LIVEPIX_CLIENT_ID;
  const clientSecret = process.env.LIVEPIX_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('LIVEPIX_CLIENT_ID and LIVEPIX_CLIENT_SECRET must be set');
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: LIVEPIX_SCOPE,
  });

  const res = await fetch(LIVEPIX_OAUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LivePix OAuth failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  const expiresInMs = (data.expires_in ?? 3600) * 1000;

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: now + expiresInMs,
  };

  return tokenCache.accessToken;
}
