const CART_KEY = 'checkpoint-cart';
const USER_KEY = 'nomeUsuario';

export const storage = {
  getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
  },
  saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); },
  getUser() { return localStorage.getItem(USER_KEY) || ''; },
  saveUser(name) { localStorage.setItem(USER_KEY, name); },
  clearUser() { localStorage.removeItem(USER_KEY); },
};
