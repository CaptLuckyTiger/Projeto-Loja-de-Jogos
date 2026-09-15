import { useEffect, useMemo, useState } from 'react';
import { storage } from '../model/storage';

export function useStoreViewModel() {
  const [cart, setCart] = useState(storage.getCart);
  const [user, setUser] = useState(storage.getUser);
  const [authMode, setAuthMode] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => storage.saveCart(cart), [cart]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} foi adicionado ao carrinho.`);
  }

  function updateQuantity(id, quantity) {
    const nextQuantity = Math.max(1, Number(quantity) || 1);
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: nextQuantity } : item));
  }

  function removeFromCart(id) { setCart((current) => current.filter((item) => item.id !== id)); }
  function clearCart() { setCart([]); }

  function login(name) {
    const cleanName = name.trim();
    if (!cleanName) return setNotice('Informe seu nome para entrar.');
    storage.saveUser(cleanName); setUser(cleanName); setAuthMode(null); setNotice(`Bem-vindo, ${cleanName}!`);
  }

  function logout() { storage.clearUser(); setUser(''); setNotice('Você saiu da sua conta.'); }
  function register(data) { login(data.name); }

  return { cart, cartCount, subtotal, user, authMode, notice, setAuthMode, setNotice, addToCart, updateQuantity, removeFromCart, clearCart, login, register, logout };
}
