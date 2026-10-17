import { useEffect, useMemo, useState } from 'react';
import { storage } from '../model/storage';
import { hashPassword, isValidEmail, isValidPassword } from '../model/auth';
import {
  addItem,
  advanceOrderStatus,
  buildOrder,
  calculateItemCount,
  calculateSubtotal,
  removeItem,
  updateItemQuantity,
} from '../model/cart';
import { addAddress, removeAddress } from '../model/addresses';
import { addRecentlyViewed } from '../model/recentlyViewed';
import { addReview, getAverageRating } from '../model/reviews';
import { validateCoupon } from '../model/coupons';
import { getProductPriceForCart } from '../model/products';
import { applyTheme } from '../model/theme';

export function useStoreViewModel() {
  const [cart, setCart] = useState(storage.getCart);
  const [session, setSession] = useState(storage.getUser);
  const [users, setUsers] = useState(storage.getUsers);
  const [orders, setOrders] = useState(storage.getOrders);
  const [favorites, setFavorites] = useState(storage.getFavorites);
  const [authMode, setAuthMode] = useState(null);
  const [notice, setNotice] = useState('');
  const [theme, setThemeState] = useState(storage.getTheme());
  const [reviews, setReviews] = useState(storage.getReviews());
  const [addresses, setAddresses] = useState(storage.getAddresses());
  const [recentlyViewed, setRecentlyViewed] = useState(storage.getRecentlyViewed());
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [comparisonList, setComparisonList] = useState([]);

  useEffect(() => {
    storage.saveCart(cart);
  }, [cart]);
  useEffect(() => {
    storage.saveOrders(orders);
  }, [orders]);
  useEffect(() => {
    storage.saveFavorites(favorites);
  }, [favorites]);
  useEffect(() => {
    storage.saveUsers(users);
  }, [users]);
  useEffect(() => {
    storage.saveTheme(theme);
    applyTheme(theme);
  }, [theme]);
  useEffect(() => {
    storage.saveReviews(reviews);
  }, [reviews]);
  useEffect(() => {
    storage.saveAddresses(addresses);
  }, [addresses]);
  useEffect(() => {
    storage.saveRecentlyViewed(recentlyViewed);
  }, [recentlyViewed]);

  const cartCount = useMemo(() => calculateItemCount(cart), [cart]);
  const subtotal = useMemo(() => calculateSubtotal(cart), [cart]);
  const discount = useMemo(() => activeCoupon?.discount || 0, [activeCoupon]);

  function addToCart(product) {
    const priceForCart = getProductPriceForCart(product);
    const productForCart = { ...product, price: priceForCart };
    setCart((current) => addItem(current, productForCart));
    setNotice(`${product.name} foi adicionado ao carrinho.`);
  }

  function updateQuantity(id, quantity) {
    setCart((current) => updateItemQuantity(current, id, quantity));
  }

  function removeFromCart(id) {
    setCart((current) => removeItem(current, id));
  }

  function clearCart() {
    setCart([]);
  }

  function placeOrder(details) {
    const order = buildOrder({ cart, subtotal, customer: session, details });
    setOrders((current) => [order, ...current]);
    setCart([]);
    setActiveCoupon(null);
    setNotice(`Pedido ${order.id} confirmado.`);
    return order;
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    );
  }

  async function login(email, password) {
    const cleanEmail = String(email || '')
      .trim()
      .toLowerCase();
    if (!isValidEmail(cleanEmail)) return setNotice('Informe um e-mail válido.');
    if (!password) return setNotice('Informe sua senha.');

    const account = users.find((entry) => entry.email === cleanEmail);
    if (!account) return setNotice('Não encontramos uma conta com esse e-mail.');

    const passwordHash = await hashPassword(password);
    if (passwordHash !== account.passwordHash) return setNotice('Senha incorreta.');

    const nextSession = { name: account.name, email: account.email };
    storage.saveUser(nextSession);
    setSession(nextSession);
    setAuthMode(null);
    setNotice(`Bem-vindo, ${account.name}!`);
  }

  function logout() {
    storage.clearUser();
    setSession(null);
    setNotice('Você saiu da sua conta.');
  }

  async function register({ name, email, password }) {
    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '')
      .trim()
      .toLowerCase();

    if (!cleanName) return setNotice('Informe seu nome.');
    if (!isValidEmail(cleanEmail)) return setNotice('Informe um e-mail válido.');
    if (!isValidPassword(password)) return setNotice('A senha precisa ter ao menos 8 caracteres.');
    if (users.some((entry) => entry.email === cleanEmail)) {
      return setNotice('Já existe uma conta com esse e-mail.');
    }

    const passwordHash = await hashPassword(password);
    const account = { name: cleanName, email: cleanEmail, passwordHash };
    setUsers((current) => [...current, account]);

    const nextSession = { name: account.name, email: account.email };
    storage.saveUser(nextSession);
    setSession(nextSession);
    setAuthMode(null);
    setNotice(`Bem-vindo, ${cleanName}!`);
  }


  function toggleTheme() {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  function addReviewForProduct(productId, reviewData) {
    setReviews((current) => ({
      ...current,
      [productId]: addReview(current[productId] || [], reviewData),
    }));
  }

  function getProductReviews(productId) {
    return reviews[productId] || [];
  }

  function getProductRating(productId) {
    return getAverageRating(getProductReviews(productId));
  }

  function addNewAddress(addressData) {
    setAddresses((current) => addAddress(current, addressData));
  }

  function deleteAddress(id) {
    setAddresses((current) => removeAddress(current, id));
  }

  function viewProduct(productId) {
    setRecentlyViewed((current) => addRecentlyViewed(current, productId));
  }

  function applyCouponCode(code) {
    const valid = validateCoupon(code);
    if (valid) {
      setActiveCoupon(valid);
      setNotice(`Cupom aplicado: ${valid.label}.`);
      return true;
    }
    setNotice('Cupom inválido.');
    return false;
  }

  function clearCoupon() {
    setActiveCoupon(null);
  }

  function addToComparison(productId) {
    setComparisonList((current) => {
      if (current.includes(productId)) return current;
      if (current.length >= 3) return [productId, ...current.slice(0, 2)];
      return [...current, productId];
    });
  }

  function removeFromComparison(productId) {
    setComparisonList((current) => current.filter((id) => id !== productId));
  }

  function clearComparison() {
    setComparisonList([]);
  }

  function advanceStatus(orderId) {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? advanceOrderStatus(order) : order)),
    );
  }

  return {
    cart,
    cartCount,
    subtotal,
    discount,
    activeCoupon,
    user: session,
    orders,
    favorites,
    authMode,
    notice,
    theme,
    reviews,
    addresses,
    recentlyViewed,
    comparisonList,
    setAuthMode,
    setNotice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    toggleFavorite,
    login,
    register,
    logout,
    toggleTheme,
    addReviewForProduct,
    getProductReviews,
    getProductRating,
    addNewAddress,
    deleteAddress,
    viewProduct,
    applyCouponCode,
    clearCoupon,
    addToComparison,
    removeFromComparison,
    clearComparison,
    advanceStatus,
  };
}
