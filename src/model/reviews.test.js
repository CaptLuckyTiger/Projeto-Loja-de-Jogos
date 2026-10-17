import { describe, expect, it } from 'vitest';
import { addReview, getAverageRating } from './reviews';

describe('reviews', () => {
  it('returns null when no reviews', () => {
    expect(getAverageRating([])).toBeNull();
    expect(getAverageRating(undefined)).toBeNull();
  });

  it('computes average correctly', () => {
    const reviews = [
      { rating: 5 },
      { rating: 4 },
    ];
    expect(getAverageRating(reviews)).toBe(4.5);
  });

  it('adds review with id and timestamp', () => {
    const result = addReview([], { user: 'Ana', rating: 5, comment: 'Ótimo' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBeTruthy();
    expect(result[0].createdAt).toBeTruthy();
    expect(result[0].user).toBe('Ana');
  });
});
