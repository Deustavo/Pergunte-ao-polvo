/**
 * One-time script to register the LivePix webhook URL.
 * Run after deploy: node --env-file=.env scripts/register-livepix-webhook.mjs
 * Or: export LIVEPIX_CLIENT_ID LIVEPIX_CLIENT_SECRET LIVEPIX_WEBHOOK_URL && node scripts/register-livepix-webhook.mjs
 * Requires: LIVEPIX_CLIENT_ID, LIVEPIX_CLIENT_SECRET, LIVEPIX_WEBHOOK_URL (e.g. https://pergunteaopolvo.com/api/webhooks/livepix)
 */

const LIVEPIX_OAUTH_URL = 'https://oauth.livepix.gg/oauth2/token';
const LIVEPIX_WEBHOOKS_URL = 'https://api.livepix.gg/v2/webhooks';
const SCOPE = 'account:read wallet:read webhooks payments:read messages:read';

const clientId = process.env.LIVEPIX_CLIENT_ID;
const clientSecret = process.env.LIVEPIX_CLIENT_SECRET;
const webhookUrl = process.env.LIVEPIX_WEBHOOK_URL;

if (!clientId || !clientSecret) {
  console.error('Missing LIVEPIX_CLIENT_ID or LIVEPIX_CLIENT_SECRET. Set them in .env');
  process.exit(1);
}

if (!webhookUrl) {
  console.error('Missing LIVEPIX_WEBHOOK_URL (e.g. https://your-domain.com/api/webhooks/livepix). Set it in .env');
  process.exit(1);
}

async function getToken() {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: SCOPE,
  });
  const res = await fetch(LIVEPIX_OAUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    throw new Error(`OAuth failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function registerWebhook(token) {
  const res = await fetch(LIVEPIX_WEBHOOKS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: webhookUrl }),
  });
  if (!res.ok) {
    throw new Error(`Register webhook failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

(async () => {
  try {
    const token = await getToken();
    const result = await registerWebhook(token);
    console.log('Webhook registered successfully:', result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
