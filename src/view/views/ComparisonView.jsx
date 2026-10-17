import { Link } from 'react-router-dom';
import { products } from '../../model/products';
import { formatPrice } from '../../model/format';

export default function ComparisonView({ store }) {
  const compared = store.comparisonList
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="section-block comparison-page">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Comparação</span>
          <h1>Compare jogos</h1>
        </div>
        <p>{compared.length} {compared.length === 1 ? 'item' : 'itens'} selecionados</p>
      </div>
      {compared.length === 0 ? (
        <div className="empty-panel">
          <h2>Nenhum jogo selecionado para comparação</h2>
          <p>Adicione até 3 jogos ao comparador pelos cards de produto.</p>
          <Link className="primary-button" to="/produtos">
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <div className="comparison-grid">
          {compared.map((product) => (
            <article className="comparison-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p className="price">{formatPrice(product.salePrice || product.price)}</p>
              <div className="comparison-row">
                <span>Gênero</span>
                <strong>{product.genre}</strong>
              </div>
              <div className="comparison-row">
                <span>Produtora</span>
                <strong>{product.studio}</strong>
              </div>
              <div className="comparison-row">
                <span>Avaliação</span>
                <strong>{(store.getProductRating(product.id) || product.rating || 0).toFixed(1)} ★</strong>
              </div>
              <p className="description">{product.description}</p>
              <div className="comparison-actions">
                <button className="secondary-button" onClick={() => store.addToCart(product)}>
                  Adicionar ao carrinho
                </button>
                <button className="link-button" onClick={() => store.removeFromComparison(product.id)}>
                  Remover
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {compared.length > 0 && (
        <div className="comparison-footer">
          <button className="link-button" onClick={store.clearComparison}>
            Limpar comparação
          </button>
        </div>
      )}
    </section>
  );
}
