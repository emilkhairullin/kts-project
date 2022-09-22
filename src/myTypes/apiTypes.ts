import { ProductModel } from "@store/models/fakeStore";

export type ApiResponse<SuccessT, ErrorT> =
  | { success: true; data: SuccessT }
  | { success: false; data: ErrorT };

export interface IApiClient {
  getProducts: () => Promise<ApiResponse<ProductModel[], any>>;
  getProduct: (
    id: ProductModel["id"]
  ) => Promise<ApiResponse<ProductModel, any>>;
  getCategories: () => Promise<ApiResponse<string[], any>>;
  getRelatedItems: (
    category: string,
    limit: number
  ) => Promise<ApiResponse<ProductModel[], any>>;
}
