import { useEffect, useRef } from 'react';

export default function AddToCartNotification({ product, onClose }) {
  const notificationRef = useRef(null);

  useEffect(() => {
    notificationRef.current?.focus();
  }, []);

  return (
    <div
      ref={notificationRef}
      className="cart-notification"
      role="status"
      tabIndex="-1"
    >
      <img src={product.image} alt="" />
      <div>
        <strong>{product.name}</strong>
        <span>Adicionado ao carrinho!</span>
      </div>
      <button type="button" aria-label="Fechar notificação" onClick={onClose}>
        ×
      </button>
    </div>
  );
}