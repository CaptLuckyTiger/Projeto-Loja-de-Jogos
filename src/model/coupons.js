export const availableCoupons = {
  UTFPR: { name: 'UTFPR', discount: 0.15, label: '15% de desconto' },
  GAME10: { name: 'GAME10', discount: 0.10, label: '10% de desconto' },
  BLACKFRIDAY: { name: 'BLACKFRIDAY', discount: 0.20, label: '20% de desconto' },
};

export function validateCoupon(code) {
  if (!code) return null;
  const normalized = code.trim().toUpperCase();
  return availableCoupons[normalized] || null;
}
