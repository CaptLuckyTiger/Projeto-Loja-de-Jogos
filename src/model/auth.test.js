import { describe, expect, it } from 'vitest';
import { hashPassword, isValidEmail, isValidPassword } from './auth';

describe('isValidEmail', () => {
  it('accepts well-formed addresses', () => {
    expect(isValidEmail('ana@example.com')).toBe(true);
  });

  it('rejects addresses without a domain', () => {
    expect(isValidEmail('ana@')).toBe(false);
  });

  it('rejects addresses without an @', () => {
    expect(isValidEmail('ana.example.com')).toBe(false);
  });

  it('rejects empty input', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidPassword', () => {
  it('rejects passwords shorter than 8 characters', () => {
    expect(isValidPassword('1234567')).toBe(false);
  });

  it('accepts passwords with 8 or more characters', () => {
    expect(isValidPassword('12345678')).toBe(true);
  });
});

describe('hashPassword', () => {
  it('produces a 64-character hex digest (SHA-256)', async () => {
    const hash = await hashPassword('super-secret');
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('is deterministic for the same input', async () => {
    const [a, b] = await Promise.all([hashPassword('abc'), hashPassword('abc')]);
    expect(a).toBe(b);
  });

  it('produces different hashes for different input', async () => {
    const [a, b] = await Promise.all([hashPassword('abc'), hashPassword('abd')]);
    expect(a).not.toBe(b);
  });
});
