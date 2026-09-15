import { formatPrice } from '../../model/format';

export default function ProductCard({ product, onDetails, onAdd, isFavorite, onToggleFavorite }) {
  return (
    <article className="product-card">
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
        <strong>{formatPrice(product.price)}</strong>
        <button className="primary-button" onClick={() => onAdd(product)}>
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
