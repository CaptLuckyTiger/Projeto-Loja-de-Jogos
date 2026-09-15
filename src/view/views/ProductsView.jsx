import { useMemo, useState } from 'react';
import { products } from '../../model/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

export default function ProductsView({ store }) {
  const [sort, setSort] = useState('featured');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const visibleProducts = useMemo(() => [...products].filter((product) => product.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : sort === 'price' ? a.price - b.price : 0), [query, sort]);
  return <section className="section-block products-page"><div className="page-intro"><div><span className="eyebrow">Catálogo completo</span><h1>Encontre seu próximo jogo.</h1></div><p>{visibleProducts.length} títulos disponíveis</p></div><div className="toolbar"><input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título..." /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar produtos"><option value="featured">Ordenação padrão</option><option value="name">Nome</option><option value="price">Menor preço</option></select></div><div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onDetails={setSelected} onAdd={store.addToCart} />)}</div>{selected && <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={store.addToCart} />}</section>;
}
