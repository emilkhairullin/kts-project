export type ProductRatingApi = {
  rate: number;
  count: number;
};

export type ProductRatingModel = {
  rate: number;
  count: number;
};

export const normalizeProductRating = (
  from: ProductRatingApi
): ProductRatingModel => ({
  rate: from.rate,
  count: from.count,
});
