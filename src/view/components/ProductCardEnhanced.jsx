import { formatPrice } from '../../model/format';
import { getProductDisplayPrice } from '../../model/products';

export default function ProductCardEnhanced({ product, onDetails, onAdd, isFavorite, onToggleFavorite, rating }) {
  const displayPrice = getProductDisplayPrice(product);
  const hasDiscount = product.onSale && product.salePrice !== undefined;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.salePrice) / product.price) * 100) : null;
  
  return (
    <article className="product-card">
      <div className="product-badges">
        {product.isNew && <span className="badge badge-new">Lançamento</span>}
        {hasDiscount && <span className="badge badge-sale">-{discountPercent}%</span>}
      </div>
      <button
        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
        onClick={() => onToggleFavorite(product.id)}
        aria-label={
          isFavorite
            ? `Remover ${product.name} dos favoritos`
            : `Adicionar ${product.name} aos favoritos`
        }
        aria-pressed={isFavorite}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <button className="product-cover" onClick={() => onDetails(product)}>
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
      </button>
      <div className="product-info">
        <span className="eyebrow">{product.genre}</span>
        <h3>{product.name}</h3>
        {rating && (
          <div className="product-rating">
            <span className="stars">★ {rating.toFixed(1)}</span>
          </div>
        )}
        <div className="price-block">
          <strong className={hasDiscount ? 'price-current price-sale' : 'price-current'}>
            {formatPrice(displayPrice)}
          </strong>
          {hasDiscount && <span className="price-old">{formatPrice(product.price)}</span>}
        </div>
        <button className="primary-button" onClick={() => onAdd(product)}>
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
