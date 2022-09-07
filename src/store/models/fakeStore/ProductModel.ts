import {
  normalizeProductRating,
  ProductRatingApi,
  ProductRatingModel,
} from "./RatingModel";

export type ProductApi = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRatingApi;
};

export type ProductModel = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRatingModel;
};

export const normalizeProduct = (from: ProductApi): ProductModel => ({
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description,
  category: from.category,
  image: from.image,
  rating: normalizeProductRating(from.rating),
});
