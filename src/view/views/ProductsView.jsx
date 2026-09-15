import { useMemo, useState } from 'react';
import { products } from '../../model/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

export default function ProductsView({ store, favoriteOnly = false }) {
  const [sort, setSort] = useState('featured');
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('all');
  const [selected, setSelected] = useState(null);
  const genres = useMemo(() => ['all', ...new Set(products.map((product) => product.genre))], []);
  const visibleProducts = useMemo(
    () =>
      [...products]
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
        .filter((product) => genre === 'all' || product.genre === genre)
        .filter((product) => !favoriteOnly || store.favorites.includes(product.id))
        .sort((a, b) =>
          sort === 'name' ? a.name.localeCompare(b.name) : sort === 'price' ? a.price - b.price : 0,
        ),
    [query, genre, sort, favoriteOnly, store.favorites],
  );
  return (
    <section className="section-block products-page">
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
        </select>
      </div>
      {visibleProducts.length ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetails={setSelected}
              onAdd={store.addToCart}
              isFavorite={store.favorites.includes(product.id)}
              onToggleFavorite={store.toggleFavorite}
            />
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
