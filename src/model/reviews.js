export function getAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return null;
  const sum = reviews.reduce((total, review) => total + Number(review.rating || 0), 0);
  return Number((sum / reviews.length).toFixed(1));
}

export function addReview(reviews, newReview) {
  return [
    {
      id: `rv-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      ...newReview,
    },
    ...reviews,
  ];
}
