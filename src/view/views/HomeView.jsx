import { Link } from 'react-router-dom';
import { featuredProducts } from '../../model/products';
import ProductCardEnhanced from '../components/ProductCardEnhanced';
import ProductModal from '../components/ProductModal';
import { useState } from 'react';

export default function HomeView({ store }) {
  const [selected, setSelected] = useState(null);
  const wallpaperUrl = `${import.meta.env.BASE_URL}assets/001.jpg`;
  return (
    <>
      <section className="hero">
        <img
          className="hero-wallpaper"
          src={wallpaperUrl}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
        />
        <div className="hero-copy">
          <span className="eyebrow">Sua próxima campanha começa aqui</span>
          <h1>Jogos que ficam na memória.</h1>
          <p>Uma curadoria de aventuras, mundos abertos e clássicos para quem joga com intenção.</p>
          <Link className="primary-button" to="/produtos">
            Explorar catálogo
          </Link>
          <div className="hero-stats" aria-label="Estatísticas da loja">
            <div>
              <strong>1200+</strong>
              <span>títulos</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>avaliação</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>entrega</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Seleção da semana</span>
            <h2>Em destaque</h2>
          </div>
          <Link className="link-button" to="/produtos">
            Ver todos →
          </Link>
        </div>
        <div className="product-grid featured-grid">
          {featuredProducts.map((product) => (
            <ProductCardEnhanced
              key={product.id}
              product={product}
              onDetails={setSelected}
              onAdd={store.addToCart}
              isFavorite={store.favorites.includes(product.id)}
              onToggleFavorite={store.toggleFavorite}
              rating={store.getProductRating(product.id) || product.rating}
            />
          ))}
        </div>
      </section>
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={store.addToCart}
        />
      )}
    </>
  );
}
