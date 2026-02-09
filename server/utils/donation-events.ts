/**
 * In-memory event emitter for new donation events.
 * Used by webhook handler to notify SSE clients.
 */

import { EventEmitter } from 'node:events';

export const donationEvents = new EventEmitter();
donationEvents.setMaxListeners(100);

export const DONATION_EVENT_NAME = 'new-donation';
