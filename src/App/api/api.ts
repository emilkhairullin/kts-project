import { API_URL, ENDPOINTS } from "@config/api.config";
import { Product } from "@interfaces/product.interface";
import axios from "axios";

const Client = axios.create({ baseURL: API_URL });

export const getProducts = async () => {
  const res = await Client.get<Product[]>(ENDPOINTS.products);
  return res.data;
};

export const getProduct = async (id: string) => {
  const res = await Client.get<Product>(`${ENDPOINTS.products}/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await Client.get<string[]>(ENDPOINTS.categories);
  return res.data;
};

export const getRelatedItems = async (category: string, limit: number = 3) => {
  const res = await Client.get<Product[]>(
    `${ENDPOINTS.productsByCategory}/${encodeURI(category)}`,
    { params: { limit } }
  );
  return res.data;
};
