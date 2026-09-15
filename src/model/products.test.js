import { describe, expect, it } from 'vitest';
import { featuredProducts, products } from './products';

describe('products catalog', () => {
  it('keeps unique product ids and valid prices', () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(products.length);
    expect(products.every((product) => product.price > 0)).toBe(true);
  });

  it('contains featured products from the catalog', () => {
    expect(featuredProducts).toHaveLength(3);
    expect(featuredProducts.every((product) => products.includes(product))).toBe(true);
  });
});
