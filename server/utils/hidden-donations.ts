/**
 * Blocklist of donation IDs to hide from the API responses.
 *
 * IDs use the same format returned by /api/donations: `message-<id>` for
 * vaquinha messages and `payment-<id>` for payments. Add an entry here to
 * hide it everywhere the filter is applied.
 *
 * Kept as a committed constant (not a writable file) so it works reliably in
 * serverless environments where the filesystem is read-only.
 */

export const HIDDEN_DONATION_IDS: readonly string[] = [
  'message-6a2c2488e81df5eee602bba1',
  'message-6a2c2375963dc7856f01cf17',
];

const hiddenSet = new Set(HIDDEN_DONATION_IDS);

/**
 * Returns true when the given donation id is in the blocklist.
 */
export function isDonationHidden(id: string): boolean {
  return hiddenSet.has(id);
}

/**
 * Removes blocklisted donations from a list. Accepts any item exposing an `id`.
 */
export function filterHiddenDonations<T extends { id: string }>(items: T[]): T[] {
  return items.filter((item) => !hiddenSet.has(item.id));
}
