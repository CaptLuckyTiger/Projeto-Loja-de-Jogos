const CART_KEY = 'checkpoint-cart';
const USER_KEY = 'checkpoint-session';
const USERS_KEY = 'checkpoint-users';
const ORDERS_KEY = 'checkpoint-orders';
const FAVORITES_KEY = 'checkpoint-favorites';
const THEME_KEY = 'checkpoint-theme';
const REVIEWS_KEY = 'checkpoint-reviews';
const ADDRESSES_KEY = 'checkpoint-addresses';
const RECENTLY_VIEWED_KEY = 'checkpoint-recently-viewed';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Storage indisponível (modo privado, cota excedida etc). A aplicação
    // continua funcionando em memória durante a sessão atual.
    return false;
  }
}

export const storage = {
  getCart() {
    return readJSON(CART_KEY, []);
  },
  saveCart(cart) {
    return writeJSON(CART_KEY, cart);
  },
  getUser() {
    return readJSON(USER_KEY, null);
  },
  saveUser(user) {
    return writeJSON(USER_KEY, user);
  },
  clearUser() {
    try {
      localStorage.removeItem(USER_KEY);
      return true;
    } catch {
      return false;
    }
  },
  getUsers() {
    return readJSON(USERS_KEY, []);
  },
  saveUsers(users) {
    return writeJSON(USERS_KEY, users);
  },
  getOrders() {
    return readJSON(ORDERS_KEY, []);
  },
  saveOrders(orders) {
    return writeJSON(ORDERS_KEY, orders);
  },
  getFavorites() {
    return readJSON(FAVORITES_KEY, []);
  },
  saveFavorites(favorites) {
    return writeJSON(FAVORITES_KEY, favorites);
  },
  getTheme() {
    return readJSON(THEME_KEY, 'light');
  },
  saveTheme(theme) {
    return writeJSON(THEME_KEY, theme);
  },
  getReviews() {
    return readJSON(REVIEWS_KEY, {});
  },
  saveReviews(reviews) {
    return writeJSON(REVIEWS_KEY, reviews);
  },
  getAddresses() {
    return readJSON(ADDRESSES_KEY, []);
  },
  saveAddresses(addresses) {
    return writeJSON(ADDRESSES_KEY, addresses);
  },
  getRecentlyViewed() {
    return readJSON(RECENTLY_VIEWED_KEY, []);
  },
  saveRecentlyViewed(items) {
    return writeJSON(RECENTLY_VIEWED_KEY, items);
  },
};
