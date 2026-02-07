/**
 * Receives LivePix webhook when a payment (donation) is received.
 * Responds 200 immediately; optionally emits event for SSE clients.
 */

import { donationEvents, DONATION_EVENT_NAME } from '../../utils/donation-events';

interface LivePixWebhookResource {
  id?: string;
  reference?: string;
  type?: string;
}

interface LivePixWebhookBody {
  userId?: string;
  clientId?: string;
  event?: string;
  resource?: LivePixWebhookResource;
}

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method !== 'POST') {
    throw createError({ statusCode: 405, message: 'Method Not Allowed' });
  }

  setResponseStatus(event, 200);
  let body: LivePixWebhookBody = {};
  try {
    body = (await readBody(event)) as LivePixWebhookBody;
  } catch {
    return { ok: false };
  }

  const isPaymentEvent =
    body.event === 'new' &&
    body.resource?.type === 'payment';

  if (isPaymentEvent) {
    setImmediate(() => {
      donationEvents.emit(DONATION_EVENT_NAME, {
        id: body.resource?.id,
        reference: body.resource?.reference,
      });
    });
  }

  return { ok: true };
});
