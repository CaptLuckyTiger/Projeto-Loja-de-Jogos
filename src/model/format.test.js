import { describe, expect, it } from 'vitest';
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formats Brazilian currency', () => {
    expect(formatPrice(199.9).replace(/\u00a0/g, ' ')).toBe('R$ 199,90');
  });
});