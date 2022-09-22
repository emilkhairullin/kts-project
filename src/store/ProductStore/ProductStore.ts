import { ApiClient } from "@api/ApiClient";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/Collection";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import {
  normalizeProduct,
  ProductModel,
} from "../models/fakeStore/ProductModel";

type PrivateFields = "_product" | "_relatedItems" | "_meta";

export default class ProductStore implements ILocalStore {
  private readonly _apiClient = new ApiClient();
  private _product: ProductModel = {} as ProductModel;
  private _relatedItems: CollectionModel<number, ProductModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      _relatedItems: observable.ref,
      _meta: observable,
      product: computed,
      relatedItems: computed,
      meta: computed,
      fetch: action.bound,
    });
  }

  get product(): ProductModel {
    return this._product;
  }

  get relatedItems(): ProductModel[] {
    return linearizeCollection(this._relatedItems);
  }

  get meta(): Meta {
    return this._meta;
  }

  async fetch(id: ProductModel["id"]): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._product = {} as ProductModel;
    this._relatedItems = getInitialCollectionModel();

    this._meta = Meta.loading;

    const productResponse = await this._apiClient.getProduct(id);
    const relatedItemsResponse = await this._apiClient.getRelatedItems(
      productResponse.data.category
    );

    runInAction(() => {
      if (!productResponse.success || !relatedItemsResponse.success) {
        this._meta = Meta.error;
        return;
      }

      const relatedItems: ProductModel[] = [];
      for (const item of relatedItemsResponse.data) {
        relatedItems.push(normalizeProduct(item));
      }

      try {
        this._meta = Meta.success;
        this._product = normalizeProduct(productResponse.data);
        this._relatedItems = normalizeCollection(
          relatedItems,
          (product) => product.id
        );
      } catch {
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {}
}
