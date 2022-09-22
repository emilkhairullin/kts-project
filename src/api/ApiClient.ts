import { API_URL, ENDPOINTS } from "@config/api.config";
import { ApiResponse, IApiClient } from "@myTypes/apiTypes";
import { ProductApi, ProductModel } from "@store/models/fakeStore";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiClient implements IApiClient {
  private readonly _client: AxiosInstance = axios.create({ baseURL: API_URL });

  private async _wrapperFunction<SuccessT, ErrorT = any>(
    callback: () => Promise<AxiosResponse<SuccessT>>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      const response = await callback();
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: response.status as any,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async getProducts(): Promise<ApiResponse<ProductApi[], any>> {
    const res = await this._wrapperFunction<ProductApi[]>(() =>
      this._client.get(ENDPOINTS.products)
    );
    return res;
  }

  async getProduct(
    id: ProductModel["id"]
  ): Promise<ApiResponse<ProductApi, any>> {
    const res = await this._wrapperFunction<ProductApi>(() =>
      this._client.get(`${ENDPOINTS.products}/${id}`)
    );
    return res;
  }

  async getCategories(): Promise<ApiResponse<string[], any>> {
    const res = await this._wrapperFunction<string[]>(() =>
      this._client.get(ENDPOINTS.categories)
    );
    return res;
  }

  async getRelatedItems(
    category: string,
    limit: number = 3
  ): Promise<ApiResponse<ProductApi[], any>> {
    const res = await this._wrapperFunction<ProductApi[]>(() =>
      this._client.get(
        `${ENDPOINTS.productsByCategory}/${encodeURI(category)}`,
        { params: { limit } }
      )
    );
    return res;
  }

  async getProductsByCategory(
    category: string
  ): Promise<ApiResponse<ProductApi[], any>> {
    const res = await this._wrapperFunction<ProductApi[]>(() =>
      this._client.get(`${ENDPOINTS.productsByCategory}/${encodeURI(category)}`)
    );
    return res;
  }

  async getLimitedProduct(
    limit: number = 6
  ): Promise<ApiResponse<ProductApi[], any>> {
    const res = await this._wrapperFunction<ProductApi[]>(() =>
      this._client.get(`${ENDPOINTS.products}`, { params: { limit } })
    );
    return res;
  }
}
