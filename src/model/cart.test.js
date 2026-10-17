import { describe, expect, it } from 'vitest';
import {
  addItem,
  buildOrder,
  calculateItemCount,
  calculateSubtotal,
  removeItem,
  updateItemQuantity,
} from './cart';

const sword = { id: 'sword', name: 'Sword', price: 10 };
const shield = { id: 'shield', name: 'Shield', price: 20 };

describe('addItem', () => {
  it('adds a new product with quantity 1', () => {
    expect(addItem([], sword)).toEqual([{ ...sword, quantity: 1 }]);
  });

  it('increments the quantity when the product is already in the cart', () => {
    const cart = addItem([{ ...sword, quantity: 1 }], sword);
    expect(cart).toEqual([{ ...sword, quantity: 2 }]);
  });

  it('does not mutate the original cart', () => {
    const original = [];
    addItem(original, sword);
    expect(original).toEqual([]);
  });
});

describe('updateItemQuantity', () => {
  const cart = [
    { ...sword, quantity: 1 },
    { ...shield, quantity: 3 },
  ];

  it('updates the quantity of the matching item', () => {
    const next = updateItemQuantity(cart, 'shield', 5);
    expect(next.find((item) => item.id === 'shield').quantity).toBe(5);
  });

  it('clamps to a minimum of 1', () => {
    const next = updateItemQuantity(cart, 'sword', 0);
    expect(next.find((item) => item.id === 'sword').quantity).toBe(1);
  });

  it('clamps to a maximum of 99', () => {
    const next = updateItemQuantity(cart, 'sword', 500);
    expect(next.find((item) => item.id === 'sword').quantity).toBe(99);
  });

  it('falls back to 1 for invalid input', () => {
    const next = updateItemQuantity(cart, 'sword', 'abc');
    expect(next.find((item) => item.id === 'sword').quantity).toBe(1);
  });
});

describe('removeItem', () => {
  it('removes the matching product and keeps the rest untouched', () => {
    const cart = [
      { ...sword, quantity: 1 },
      { ...shield, quantity: 1 },
    ];
    expect(removeItem(cart, 'sword')).toEqual([{ ...shield, quantity: 1 }]);
  });
});

describe('calculateItemCount and calculateSubtotal', () => {
  const cart = [
    { ...sword, quantity: 2 },
    { ...shield, quantity: 3 },
  ];

  it('sums the quantities of every line', () => {
    expect(calculateItemCount(cart)).toBe(5);
  });

  it('sums price times quantity for every line', () => {
    expect(calculateSubtotal(cart)).toBe(10 * 2 + 20 * 3);
  });
});

describe('buildOrder', () => {
  it('assembles an order with an id, a timestamp and the provided fields', () => {
    const cart = [{ ...sword, quantity: 1 }];
    const order = buildOrder({
      cart,
      subtotal: 10,
      customer: { name: 'Ana', email: 'ana@example.com' },
      details: { payment: 'pix', total: 10 },
    });

    expect(order.id).toMatch(/^CP-/);
    expect(order.items).toEqual(cart);
    expect(order.subtotal).toBe(10);
    expect(order.payment).toBe('pix');
    expect(order.total).toBe(10);
    expect(order.customer).toEqual({ name: 'Ana', email: 'ana@example.com' });
    expect(() => new Date(order.createdAt).toISOString()).not.toThrow();
  });
});
