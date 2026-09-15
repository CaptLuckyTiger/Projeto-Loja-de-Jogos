import { useState } from 'react';
import { formatPrice } from '../../model/format';

export default function CartView({ store }) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finished, setFinished] = useState(false);
  const total = store.subtotal * (1 - discount);
  function applyCoupon() { if (coupon.trim().toUpperCase() === 'UTFPR') setDiscount(0.15); else store.setNotice('Cupom inválido.'); setCoupon(''); }
  function finish() { if (!store.user) return store.setAuthMode('login'); setFinished(true); store.clearCart(); }
  return <section className="section-block cart-page"><div className="page-intro"><div><span className="eyebrow">Resumo do pedido</span><h1>Seu carrinho</h1></div>{store.user && <p>Olá, {store.user}.</p>}</div>{store.cart.length === 0 ? <div className="empty-panel"><h2>{finished ? 'Compra finalizada!' : 'Seu carrinho está vazio.'}</h2><p>{finished ? 'Obrigado por comprar com a Checkpoint Games.' : 'Adicione alguns jogos para continuar.'}</p></div> : <div className="cart-layout"><div className="cart-table">{store.cart.map((item) => <div className="cart-row" key={item.id}><img src={item.image} alt={item.name} /><div><strong>{item.name}</strong><small>{formatPrice(item.price)} cada</small></div><input type="number" min="1" value={item.quantity} onChange={(event) => store.updateQuantity(item.id, event.target.value)} aria-label={`Quantidade de ${item.name}`} /><strong>{formatPrice(item.price * item.quantity)}</strong><button className="link-button danger" onClick={() => store.removeFromCart(item.id)}>Remover</button></div>)}</div><aside className="summary-panel"><h2>Resumo</h2><div className="coupon-row"><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Cupom" /><button className="secondary-button" onClick={applyCoupon}>Aplicar</button></div><div className="summary-line"><span>Subtotal</span><span>{formatPrice(store.subtotal)}</span></div>{discount > 0 && <div className="summary-line discount"><span>Desconto</span><span>-15%</span></div>}<div className="summary-line total-line"><strong>Total</strong><strong>{formatPrice(total)}</strong></div><button className="primary-button full-button" onClick={finish}>Finalizar compra</button></aside></div>}</section>;
}
