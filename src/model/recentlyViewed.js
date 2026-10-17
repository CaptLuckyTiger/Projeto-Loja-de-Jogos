const MAX_RECENT = 6;

export function addRecentlyViewed(recent, productId) {
  if (!productId) return recent;
  const filtered = recent.filter((id) => id !== productId);
  return [productId, ...filtered].slice(0, MAX_RECENT);
}
