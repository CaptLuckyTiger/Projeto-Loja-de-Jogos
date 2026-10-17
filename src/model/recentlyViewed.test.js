import { describe, expect, it } from 'vitest';
import { addRecentlyViewed } from './recentlyViewed';

describe('recentlyViewed', () => {
  it('adds to front and limits to 6 items', () => {
    const result = addRecentlyViewed(['a', 'b', 'c', 'd', 'e', 'f'], 'g');
    expect(result).toEqual(['g', 'a', 'b', 'c', 'd', 'e']);
  });

  it('moves existing item to front', () => {
    const result = addRecentlyViewed(['a', 'b', 'c'], 'b');
    expect(result).toEqual(['b', 'a', 'c']);
  });
});
