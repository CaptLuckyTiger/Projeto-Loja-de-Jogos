import { Link, NavLink } from 'react-router-dom';
import AuthModal from './AuthModal';

export default function Layout({ store, children }) {
  return <div className="app-shell">
    <header className="site-header">
      <Link className="brand" to="/"><span className="brand-mark">CG</span><span>Checkpoint Games</span></Link>
      <nav className="main-nav">
        {[['/', 'Início'], ['/produtos', 'Produtos'], ['/favoritos', `Favoritos (${store.favorites.length})`], ['/carrinho', `Carrinho (${store.cartCount})`], ['/pedidos', 'Pedidos'], ['/contato', 'Contato']].map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
      </nav>
      <div className="account-actions">{store.user ? <><span className="user-greeting">Olá, {store.user}</span><button className="text-button" onClick={store.logout}>Sair</button></> : <button className="text-button" onClick={() => store.setAuthMode('login')}>Entrar</button>}</div>
    </header>
    <main>{children}</main>
    <footer className="site-footer"><span>Checkpoint Games</span><span>contato@lojadejogos.com</span></footer>
    {store.authMode && <AuthModal mode={store.authMode} onClose={() => store.setAuthMode(null)} onModeChange={store.setAuthMode} onLogin={store.login} onRegister={store.register} />}
    {store.notice && <div className="toast" role="status" onClick={() => store.setNotice('')}>{store.notice}</div>}
  </div>;
}
