export function formatPrice(price) {
  if (price === 0) return "Free";
  return `$${price}`;
}