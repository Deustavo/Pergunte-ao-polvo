/**
 * Server-Sent Events stream for new donation notifications.
 * Kept for local/dev. In serverless (e.g. Vercel) this hits FUNCTION_INVOCATION_TIMEOUT
 * and webhook/stream run in different instances (no shared memory). Production uses
 * polling via useDonationPolling instead.
 */

import { donationEvents, DONATION_EVENT_NAME } from '../../utils/donation-events';

const SSE_KEEPALIVE_INTERVAL_MS = 15000;

export default defineEventHandler((event) => {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const send = (data: string) => {
        try {
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch {
          // Client may have disconnected
        }
      };

      const onNewDonation = (payload: Record<string, unknown>) => {
        send(JSON.stringify({ type: 'new-donation', ...payload }));
      };

      donationEvents.on(DONATION_EVENT_NAME, onNewDonation);

      const keepalive = setInterval(() => {
        send(JSON.stringify({ type: 'keepalive' }));
      }, SSE_KEEPALIVE_INTERVAL_MS);

      event.node.req.on('close', () => {
        clearInterval(keepalive);
        donationEvents.off(DONATION_EVENT_NAME, onNewDonation);
        try {
          controller.close();
        } catch {
          // Already closed
        }
      });
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
});
