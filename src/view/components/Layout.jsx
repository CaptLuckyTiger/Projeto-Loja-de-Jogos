import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthModal from './AuthModal';
import AddToCartNotification from './AddToCartNotification';
import Toast from './Toast';

export default function Layout({ store, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartNotification, setCartNotification } = store;

  useEffect(() => {
    if (!cartNotification) return;
    const timer = window.setTimeout(() => setCartNotification(null), 3000);
    return () => window.clearTimeout(timer);
  }, [cartNotification, setCartNotification]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark">CG</span>
          <span>Checkpoint Games</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          {[
            ['/', 'Início'],
            ['/produtos', 'Produtos'],
            ['/favoritos', `Favoritos (${store.favorites.length})`],
            ['/carrinho', `Carrinho (${store.cartCount})`],
            ['/pedidos', 'Pedidos'],
            ['/contato', 'Contato'],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="account-actions">
          {store.user ? (
            <>
              <span className="user-greeting">Olá, {store.user}</span>
              <button className="text-button" onClick={store.logout}>
                Sair
              </button>
            </>
          ) : (
            <button className="text-button" onClick={() => store.setAuthMode('login')}>
              Entrar
            </button>
          )}
        </div>
      </header>
      <main>{children}</main>
      {cartNotification && (
        <AddToCartNotification
          product={cartNotification}
          onClose={() => setCartNotification(null)}
        />
      )}
      <footer className="site-footer">
        <span>Checkpoint Games</span>
        <span>contato@lojadejogos.com</span>
      </footer>
      {store.authMode && (
        <AuthModal
          mode={store.authMode}
          onClose={() => store.setAuthMode(null)}
          onModeChange={store.setAuthMode}
          onLogin={store.login}
          onRegister={store.register}
        />
      )}
      {store.notice && (
        <Toast message={store.notice} onClose={() => store.setNotice('')} />
      )}
    </div>
  );
}

