import { useEffect, useRef } from 'react';
import { formatPrice } from '../../model/format';

export default function ProductModal({ product, onClose, onAdd }) {
  const closeButtonRef = useRef(null);
  useEffect(() => {
    closeButtonRef.current?.focus();
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  if (!product) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeButtonRef} className="modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <img src={product.image} alt={product.name} />
        <div>
          <span className="eyebrow">{product.genre}</span>
          <h2 id="product-modal-title">{product.name}</h2>
          <p className="modal-price">{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          <p>
            <strong>Produtora:</strong> {product.studio}
          </p>
          <button
            className="primary-button"
            onClick={() => {
              onAdd(product);
              onClose();
            }}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </section>
    </div>
  );
}
