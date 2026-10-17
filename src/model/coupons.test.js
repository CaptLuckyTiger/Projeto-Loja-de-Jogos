import { describe, expect, it } from 'vitest';
import { availableCoupons, validateCoupon } from './coupons';

describe('coupons', () => {
  it('validates UTFPR coupon', () => {
    const result = validateCoupon('utfpr');
    expect(result).toEqual(availableCoupons.UTFPR);
  });

  it('validates GAME10 coupon', () => {
    const result = validateCoupon('game10');
    expect(result).toEqual(availableCoupons.GAME10);
  });

  it('validates BLACKFRIDAY coupon', () => {
    const result = validateCoupon('blackfriday');
    expect(result).toEqual(availableCoupons.BLACKFRIDAY);
  });

  it('returns null for invalid coupon', () => {
    expect(validateCoupon('invalid')).toBeNull();
    expect(validateCoupon('')).toBeNull();
  });
});
