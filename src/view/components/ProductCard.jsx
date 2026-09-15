import { formatPrice } from '../../model/format';

export default function ProductCard({ product, onDetails, onAdd }) {
  return <article className="product-card">
    <button className="product-cover" onClick={() => onDetails(product)}><img src={product.image} alt={product.name} /></button>
    <div className="product-info"><span className="eyebrow">{product.genre}</span><h3>{product.name}</h3><strong>{formatPrice(product.price)}</strong><button className="primary-button" onClick={() => onAdd(product)}>Adicionar ao carrinho</button></div>
  </article>;
}
