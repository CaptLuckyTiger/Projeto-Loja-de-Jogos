import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../../model/products';
import { formatPrice } from '../../model/format';
import ProductCardEnhanced from '../components/ProductCardEnhanced';

export default function ProductDetailView({ store }) {
  const { id } = useParams();
  const product = useMemo(() => products.find((p) => p.id === id), [id]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const reviews = store.getProductReviews(id);
  const avgRating = store.getProductRating(id) || product?.rating;
  const recently = store.recentlyViewed.filter((rid) => rid !== id).slice(0, 3);
  const related = product ? products.filter((p) => p.id !== id && p.genre === product.genre).slice(0, 3) : [];

  useEffect(() => {
    if (product) {
      store.viewProduct(product.id);
    }
  }, [product, store]);

  if (!product) {
    return (
      <section className="section-block">
        <div className="empty-panel">
          <h2>Produto não encontrado</h2>
          <p>O produto que você procura não existe.</p>
          <Link className="primary-button" to="/produtos">
            Voltar ao catálogo
          </Link>
        </div>
      </section>
    );
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    if (!store.user) {
      store.setAuthMode('login');
      return;
    }
    if (!comment.trim()) {
      store.setNotice('Digite um comentário.');
      return;
    }
    store.addReviewForProduct(id, {
      user: store.user.name,
      rating: Number(rating),
      comment: comment.trim(),
    });
    setComment('');
    setRating(5);
    store.setNotice('Avaliação enviada com sucesso!');
  }

  return (
    <section className="section-block product-detail-page">
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={`../${product.image}`} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <span className="eyebrow">{product.genre}</span>
          <h1>{product.name}</h1>
          {avgRating && (
            <div className="detail-rating">
              <span>★ {avgRating.toFixed(1)}</span>
              <small>({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})</small>
            </div>
          )}
          <p className="detail-price">{formatPrice(product.salePrice || product.price)}</p>
          <p>{product.description}</p>
          <p>
            <strong>Produtora:</strong> {product.studio}
          </p>
          <button
            className="primary-button"
            onClick={() => store.addToCart(product)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Avaliações</h2>
        {store.user ? (
          <form className="review-form" onSubmit={handleSubmitReview}>
            <label>
              Nota
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} estrela{n>1?'s':''}</option>)}
              </select>
            </label>
            <label>
              Comentário
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
                placeholder="Conte o que achou do jogo..."
              />
            </label>
            <button className="secondary-button" type="submit">Enviar avaliação</button>
          </form>
        ) : (
          <p>Faça login para avaliar este produto.</p>
        )}
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="muted">Ainda não há avaliações para este produto.</p>
          ) : (
            reviews.map((rev) => (
              <div className="review-item" key={rev.id}>
                <div className="review-header">
                  <strong>{rev.user}</strong>
                  <span>★ {rev.rating}</span>
                  <small>{new Date(rev.createdAt).toLocaleDateString('pt-BR')}</small>
                </div>
                <p>{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h2>Produtos relacionados</h2>
          <div className="product-grid">
            {related.map((prod) => (
              <ProductCardEnhanced
                key={prod.id}
                product={prod}
                onDetails={() => window.location.hash = `#/produto/${prod.id}`}
                onAdd={store.addToCart}
                isFavorite={store.favorites.includes(prod.id)}
                onToggleFavorite={store.toggleFavorite}
                rating={store.getProductRating(prod.id) || prod.rating}
              />
            ))}
          </div>
        </div>
      )}

      {recently.length > 0 && (
        <div className="recent-section">
          <h2>Vistos recentemente</h2>
          <div className="product-grid">
            {recently.map((rid) => {
              const prod = products.find((p) => p.id === rid);
              if (!prod) return null;
              return (
                <ProductCardEnhanced
                  key={prod.id}
                  product={prod}
                  onDetails={() => window.location.hash = `#/produto/${prod.id}`}
                  onAdd={store.addToCart}
                  isFavorite={store.favorites.includes(prod.id)}
                  onToggleFavorite={store.toggleFavorite}
                  rating={store.getProductRating(prod.id) || prod.rating}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
