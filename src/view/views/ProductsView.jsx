import { useMemo, useState } from 'react';
import { products } from '../../model/products';
import ProductCardEnhanced from '../components/ProductCardEnhanced';
import ProductModal from '../components/ProductModal';

export default function ProductsView({ store, favoriteOnly = false }) {
  const [sort, setSort] = useState('featured');
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('0');
  const [selected, setSelected] = useState(null);
  const backgroundImage = `${import.meta.env.BASE_URL}assets/futuristic-moon-background.jpg`;
  const genres = useMemo(() => ['all', ...new Set(products.map((product) => product.genre))], []);
  const visibleProducts = useMemo(
    () =>
      [...products]
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
        .filter((product) => genre === 'all' || product.genre === genre)
        .filter((product) => !favoriteOnly || store.favorites.includes(product.id))
        .filter((product) => {
          const price = product.salePrice || product.price;
          const min = minPrice === '' ? -Infinity : Number(minPrice);
          const max = maxPrice === '' ? Infinity : Number(maxPrice);
          return price >= min && price <= max;
        })
        .filter((product) => {
          const rating = store.getProductRating(product.id) || product.rating || 0;
          return rating >= Number(minRating);
        })
        .sort((a, b) => {
          if (sort === 'name') return a.name.localeCompare(b.name);
          if (sort === 'price') {
            const pa = a.salePrice || a.price;
            const pb = b.salePrice || b.price;
            return pa - pb;
          }
          if (sort === 'rating') {
            const ra = store.getProductRating(a.id) || a.rating || 0;
            const rb = store.getProductRating(b.id) || b.rating || 0;
            return rb - ra;
          }
          if (sort === 'popularity') return b.rating - a.rating;
          return 0;
        }),
    [query, genre, sort, favoriteOnly, minPrice, maxPrice, minRating, store],
  );
  return (
    <section
      className="section-block products-page"
      style={{
        backgroundImage: `linear-gradient(rgba(5, 10, 22, 0.28), rgba(5, 10, 22, 0.48)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="page-intro">
        <div>
          <span className="eyebrow">{favoriteOnly ? 'Sua seleção' : 'Catálogo completo'}</span>
          <h1>{favoriteOnly ? 'Jogos favoritos.' : 'Encontre seu próximo jogo.'}</h1>
        </div>
        <p>{visibleProducts.length} títulos disponíveis</p>
      </div>
      <div className="toolbar">
        <label className="sr-only" htmlFor="product-search">
          Buscar produtos
        </label>
        <input
          id="product-search"
          className="search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por título..."
        />
        <input
          type="number"
          className="price-input"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Preço mín"
          min="0"
        />
        <input
          type="number"
          className="price-input"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Preço máx"
          min="0"
        />
        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          aria-label="Avaliação mínima"
        >
          <option value="0">Qualquer avaliação</option>
          <option value="4">4★ ou mais</option>
          <option value="4.5">4.5★ ou mais</option>
        </select>
        <label className="sr-only" htmlFor="genre-filter">
          Filtrar por gênero
        </label>
        <select
          id="genre-filter"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          aria-label="Filtrar por gênero"
        >
          <option value="all">Todos os gêneros</option>
          {genres.slice(1).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="product-sort">
          Ordenar produtos
        </label>
        <select
          id="product-sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="Ordenar produtos"
        >
          <option value="featured">Ordenação padrão</option>
          <option value="name">Nome</option>
          <option value="price">Menor preço</option>
          <option value="rating">Melhor avaliação</option>
          <option value="popularity">Popularidade</option>
        </select>
      </div>
      {visibleProducts.length ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <div className="product-card-wrapper" key={product.id}>
              <ProductCardEnhanced
                product={product}
                onDetails={setSelected}
                onAdd={store.addToCart}
                isFavorite={store.favorites.includes(product.id)}
                onToggleFavorite={store.toggleFavorite}
                rating={store.getProductRating(product.id) || product.rating}
              />
              <button
                className="compare-button"
                onClick={() => {
                  store.addToComparison(product.id);
                  store.setNotice('Adicionado ao comparador');
                }}
              >
                + Comparar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-panel">
          <h2>{favoriteOnly ? 'Nenhum favorito ainda' : 'Nenhum jogo encontrado'}</h2>
          <p>
            {favoriteOnly
              ? 'Use o coração nos cards para guardar seus jogos.'
              : 'Tente outro título ou gênero.'}
          </p>
        </div>
      )}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={store.addToCart}
        />
      )}
    </section>
  );
}
