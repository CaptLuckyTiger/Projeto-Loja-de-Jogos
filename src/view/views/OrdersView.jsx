import { Link } from 'react-router-dom';
import { formatPrice } from '../../model/format';

const paymentLabels = { pix: 'Pix', card: 'Cartão de crédito', boleto: 'Boleto' };

export default function OrdersView({ store }) {
  return <section className="section-block orders-page">
    <div className="page-intro">
      <div><span className="eyebrow">Sua conta</span><h1>Histórico de pedidos.</h1></div>
      <p>{store.user ? `Pedidos de ${store.user}` : 'Pedidos salvos neste navegador'}</p>
    </div>
    {store.orders.length === 0 ? <div className="empty-panel"><h2>Nenhum pedido ainda.</h2><p>Quando você finalizar uma compra, ela aparecerá aqui.</p><Link className="primary-button" to="/produtos">Explorar catálogo</Link></div> : <div className="orders-list">{store.orders.map((order) => <article className="order-card" key={order.id}><div className="order-card-header"><div><span className="eyebrow">Pedido confirmado</span><h2>{order.id}</h2></div><strong>{formatPrice(order.total)}</strong></div><div className="order-meta"><span>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span><span>{paymentLabels[order.payment] || order.payment}</span><span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} itens</span></div><div className="order-items">{order.items.map((item) => <div className="order-item" key={item.id}><img src={item.image} alt="" /><span>{item.name}</span><small>{item.quantity} × {formatPrice(item.price)}</small></div>)}</div><p className="order-address"><strong>Entrega:</strong> {order.address}</p></article>)}</div>}
  </section>;
}
