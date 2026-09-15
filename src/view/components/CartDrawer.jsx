import { Link } from 'react-router-dom';
import { formatPrice } from '../../model/format';

export default function CartDrawer({ store }) {
  return <aside className="cart-drawer"><div className="section-heading"><div><span className="eyebrow">Seu pedido</span><h2>Carrinho</h2></div><span className="cart-count">{store.cartCount} itens</span></div>{store.cart.length === 0 ? <p className="empty-state">Seu carrinho ainda está vazio.</p> : <>{store.cart.map((item) => <div className="cart-line" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>{item.quantity} × {formatPrice(item.price)}</small></div><button className="icon-button" onClick={() => store.removeFromCart(item.id)} aria-label={`Remover ${item.name}`}>×</button></div>)}<div className="cart-total"><span>Total</span><strong>{formatPrice(store.subtotal)}</strong></div><Link className="primary-button full-button" to="/carrinho">Ver carrinho completo</Link></>}</aside>;
}
