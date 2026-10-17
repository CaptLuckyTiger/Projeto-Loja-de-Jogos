const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

export const ORDER_STATUSES = ['processando', 'enviado', 'entregue'];

export function addItem(cart, product) {
  const existing = cart.find((item) => item.id === product.id);
  return existing
    ? cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    : [...cart, { ...product, quantity: 1 }];
}

export function updateItemQuantity(cart, id, quantity) {
  const nextQuantity = Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Number(quantity) || 1));
  return cart.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item));
}

export function removeItem(cart, id) {
  return cart.filter((item) => item.id !== id);
}

export function calculateItemCount(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function calculateSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function buildOrder({ cart, subtotal, customer, details }) {
  return {
    id: `CP-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'processando',
    customer,
    items: cart,
    subtotal,
    ...details,
  };
}

export function advanceOrderStatus(order) {
  const currentIndex = ORDER_STATUSES.indexOf(order.status);
  if (currentIndex === -1 || currentIndex === ORDER_STATUSES.length - 1) {
    return { ...order, updatedAt: new Date().toISOString() };
  }
  return {
    ...order,
    status: ORDER_STATUSES[currentIndex + 1],
    updatedAt: new Date().toISOString(),
  };
}
