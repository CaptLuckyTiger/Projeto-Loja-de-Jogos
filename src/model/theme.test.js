import { describe, expect, it, beforeEach } from 'vitest';
import { applyTheme } from './theme';

describe('theme', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    localStorage.clear();
  });

  it('adds theme-dark class for dark theme', () => {
    applyTheme('dark');
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true);
  });

  it('removes theme-dark class for light theme', () => {
    document.documentElement.classList.add('theme-dark');
    applyTheme('light');
    expect(document.documentElement.classList.contains('theme-dark')).toBe(false);
  });
});
