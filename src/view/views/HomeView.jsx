import { Link } from 'react-router-dom';
import { featuredProducts } from '../../model/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useState } from 'react';

export default function HomeView({ store }) {
  const [selected, setSelected] = useState(null);
  const wallpaperUrl = new window.URL(
    `${import.meta.env.BASE_URL}assets/001.jpg`,
    document.baseURI,
  ).href;
  return (
    <>
      <section className="hero">
        <img className="hero-wallpaper" src={wallpaperUrl} alt="" aria-hidden="true" />
        <div className="hero-copy">
          <span className="eyebrow">Sua próxima campanha começa aqui</span>
          <h1>Jogos que ficam na memória.</h1>
          <p>Uma curadoria de aventuras, mundos abertos e clássicos para quem joga com intenção.</p>
          <Link className="primary-button" to="/produtos">
            Explorar catálogo
          </Link>
        </div>
      </section>
      <section className="section-block">
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
            <ProductCard
              key={product.id}
              product={product}
              onDetails={setSelected}
              onAdd={store.addToCart}
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
