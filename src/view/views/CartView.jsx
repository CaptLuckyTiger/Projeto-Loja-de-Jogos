import { useMemo, useState } from 'react';
import { formatPrice } from '../../model/format';

const initialCheckout = {
  name: '',
  address: '',
  number: '',
  city: '',
  state: '',
  zip: '',
  payment: 'pix',
  shipping: 'standard',
};

export default function CartView({ store }) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkout, setCheckout] = useState(initialCheckout);

  const shippingPrice = checkout.shipping === 'express' ? 19.9 : 0;
  const total = Math.max(0, store.subtotal * (1 - discount) + shippingPrice);
  const itemCount = useMemo(
    () => store.cart.reduce((sum, item) => sum + item.quantity, 0),
    [store.cart],
  );

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === 'UTFPR') {
      setDiscount(0.15);
      store.setNotice('Cupom aplicado: 15% de desconto.');
    } else {
      store.setNotice('Cupom inválido.');
    }
    setCoupon('');
  }

  function updateCheckout(event) {
    setCheckout((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function finish(event) {
    event.preventDefault();
    if (!store.user) return store.setAuthMode('login');
    const address = `${checkout.address}, ${checkout.number} - ${checkout.city}/${checkout.state}, CEP ${checkout.zip}`;
    store.placeOrder({
      customerName: checkout.name,
      address,
      payment: checkout.payment,
      shipping: checkout.shipping,
      shippingPrice,
      total,
    });
    setFinished(true);
    setCheckoutOpen(false);
  }

  if (store.cart.length === 0) {
    return (
      <section className="section-block cart-page">
        <div className="page-intro">
          <div>
            <span className="eyebrow">Resumo do pedido</span>
            <h1>Seu carrinho</h1>
          </div>
          {store.user && <p>Olá, {store.user}.</p>}
        </div>
        <div className="empty-panel">
          <h2>{finished ? 'Compra finalizada!' : 'Seu carrinho está vazio.'}</h2>
          <p>
            {finished
              ? 'Seu pedido foi salvo no histórico local. Obrigado por comprar com a Checkpoint Games.'
              : 'Adicione alguns jogos para continuar.'}
          </p>
          {finished && (
            <p className="order-note">Você pode acompanhar o pedido na área de histórico.</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="section-block cart-page">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Resumo do pedido</span>
          <h1>Seu carrinho</h1>
        </div>
        {store.user && <p>Olá, {store.user}.</p>}
      </div>
      <div className="cart-layout">
        <div className="cart-table">
          <div className="cart-table-heading">
            <strong>
              {itemCount} {itemCount === 1 ? 'item' : 'itens'} no pedido
            </strong>
            <span>Revise antes de finalizar</span>
          </div>
          {store.cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <small>{formatPrice(item.price)} cada</small>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) => store.updateQuantity(item.id, event.target.value)}
                aria-label={`Quantidade de ${item.name}`}
              />
              <strong>{formatPrice(item.price * item.quantity)}</strong>
              <button className="link-button danger" onClick={() => store.removeFromCart(item.id)}>
                Remover
              </button>
            </div>
          ))}
        </div>
        <aside className="summary-panel">
          <h2>Resumo</h2>
          <div className="coupon-row">
            <input
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              placeholder="Cupom de desconto"
              aria-label="Cupom de desconto"
            />
            <button className="secondary-button" onClick={applyCoupon}>
              Aplicar
            </button>
          </div>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>{formatPrice(store.subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="summary-line discount">
              <span>Desconto</span>
              <span>-15%</span>
            </div>
          )}
          <div className="summary-line">
            <span>Entrega</span>
            <span>{shippingPrice ? formatPrice(shippingPrice) : 'Grátis'}</span>
          </div>
          <div className="summary-line total-line">
            <strong>Total</strong>
            <strong>{formatPrice(total)}</strong>
          </div>
          {checkoutOpen ? (
            <form className="checkout-form" onSubmit={finish}>
              <div className="checkout-step">
                <span>01</span>
                <strong>Identificação</strong>
              </div>
              <label>
                Nome completo
                <input
                  name="name"
                  value={checkout.name}
                  onChange={updateCheckout}
                  autoComplete="name"
                  required
                />
              </label>
              <div className="checkout-step">
                <span>02</span>
                <strong>Entrega</strong>
              </div>
              <label>
                Rua
                <input
                  name="address"
                  value={checkout.address}
                  onChange={updateCheckout}
                  autoComplete="street-address"
                  required
                />
              </label>
              <div className="checkout-fields">
                <label>
                  Número
                  <input name="number" value={checkout.number} onChange={updateCheckout} required />
                </label>
                <label>
                  CEP
                  <input
                    name="zip"
                    value={checkout.zip}
                    onChange={updateCheckout}
                    inputMode="numeric"
                    pattern="[0-9]{5}-?[0-9]{3}"
                    placeholder="00000-000"
                    required
                  />
                </label>
              </div>
              <div className="checkout-fields">
                <label>
                  Cidade
                  <input name="city" value={checkout.city} onChange={updateCheckout} required />
                </label>
                <label>
                  UF
                  <input
                    name="state"
                    value={checkout.state}
                    onChange={updateCheckout}
                    maxLength="2"
                    required
                  />
                </label>
              </div>
              <label>
                Tipo de entrega
                <select name="shipping" value={checkout.shipping} onChange={updateCheckout}>
                  <option value="standard">Normal · grátis</option>
                  <option value="express">Expressa · R$ 19,90</option>
                </select>
              </label>
              <div className="checkout-step">
                <span>03</span>
                <strong>Pagamento</strong>
              </div>
              <label>
                Forma de pagamento
                <select name="payment" value={checkout.payment} onChange={updateCheckout}>
                  <option value="pix">Pix</option>
                  <option value="card">Cartão de crédito</option>
                  <option value="boleto">Boleto</option>
                </select>
              </label>
              <button className="primary-button full-button" type="submit">
                Confirmar pedido · {formatPrice(total)}
              </button>
            </form>
          ) : (
            <button
              className="primary-button full-button"
              onClick={() => {
                if (!store.user) return store.setAuthMode('login');
                setCheckoutOpen(true);
              }}
            >
              Continuar para checkout
            </button>
          )}
        </aside>
      </div>
    </section>
  );
}
