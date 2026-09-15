const CART_KEY = 'checkpoint-cart';
const USER_KEY = 'nomeUsuario';
const ORDERS_KEY = 'checkpoint-orders';
const FAVORITES_KEY = 'checkpoint-favorites';

export const storage = {
  getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
  },
  saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); },
  getUser() { return localStorage.getItem(USER_KEY) || ''; },
  saveUser(name) { localStorage.setItem(USER_KEY, name); },
  clearUser() { localStorage.removeItem(USER_KEY); },
  getOrders() {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch { return []; }
  },
  saveOrders(orders) { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); },
  getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []; } catch { return []; }
  },
  saveFavorites(favorites) { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); },
};
