import { ApiClient } from "@api/ApiClient";
import { OptionType } from "@components/MultiDropdown";
import {
  FETCH_MORE_COUNT,
  PRODUCTS_COUNT,
  SHOWN_PRODUCTS,
} from "@config/api.config";
import { normalizeProduct, ProductModel } from "@store/models/fakeStore";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/Collection";
import rootStore from "@store/RootStore";
import { QSParamType } from "@store/RootStore/QueryParamsStore/QueryParamsStore";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

type PrivateFields =
  | "_products"
  | "_categories"
  | "_selectedCategories"
  | "_meta"
  | "_searchTerm"
  | "_hasMore"
  | "_shownProductsCount"
  | "_allProducts"
  | "_filteredProductsByCategory";

export default class ProductsStore implements ILocalStore {
  private readonly _apiClient = new ApiClient();
  private _products: CollectionModel<number, ProductModel> =
    getInitialCollectionModel();
  private _allProducts: CollectionModel<number, ProductModel> =
    getInitialCollectionModel();
  private _filteredProductsByCategory: CollectionModel<number, ProductModel> =
    getInitialCollectionModel();
  private _productByCategoryLookup: Record<string, ProductModel[]> = {};
  private _categories: string[] = [];
  private _selectedCategories: OptionType[] = [];
  private _searchTerm: QSParamType;
  private _hasMore: boolean = true;
  private _shownProductsCount: number = SHOWN_PRODUCTS;
  private readonly _qsReaction: IReactionDisposer;
  private readonly _selectedCategoriesReaction: IReactionDisposer;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _meta: observable,
      _searchTerm: observable,
      _hasMore: observable,
      _products: observable.ref,
      _categories: observable.ref,
      _selectedCategories: observable.ref,
      _shownProductsCount: observable.ref,
      _allProducts: observable.ref,
      _filteredProductsByCategory: observable.ref,
      products: computed,
      categories: computed,
      selectedCategories: computed,
      meta: computed,
      hasMore: computed,
      filteredProductsBySearch: computed,
      fetch: action.bound,
      setSelectedCategories: action.bound,
      fetchMore: action.bound,
    });

    this._qsReaction = reaction(
      () => rootStore.query.getParam("search"),
      (search) => {
        this._searchTerm = search;
      }
    );

    this._selectedCategoriesReaction = reaction(
      () => this._selectedCategories,
      (selectedCategories) => {
        if (selectedCategories.length === 0) {
          this.fetchProdyctsByCategories(selectedCategories);
        }
      }
    );
  }

  get products() {
    const products = linearizeCollection(this._products);
    if (this._selectedCategories.length === 0) {
      return products;
    }
    return products.filter((product) => {
      let selectedCategoreis = this._selectedCategories.map((el) => el.value);
      return selectedCategoreis.includes(product.category);
    });
  }

  get filteredProductsBySearch() {
    let allProducts = linearizeCollection(this._allProducts);
    let searchTerm = this._searchTerm ? this._searchTerm.toString() : "";
    return allProducts.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  get filteredProductsByCategory() {
    return linearizeCollection(this._filteredProductsByCategory);
  }

  get categories() {
    return this._categories;
  }

  get selectedCategories() {
    return this._selectedCategories;
  }

  get searchTerm() {
    return this._searchTerm;
  }

  get hasMore() {
    return this._hasMore;
  }

  get meta() {
    return this._meta;
  }

  setSelectedCategories(newCategories: OptionType[]): void {
    this._selectedCategories = newCategories;
  }

  async fetchMore(): Promise<void> {
    if (this._shownProductsCount > PRODUCTS_COUNT) {
      this._hasMore = false;
      return;
    }
    const prevShownProductsCount = this._shownProductsCount;
    this._shownProductsCount += FETCH_MORE_COUNT;
    let prevStateProducts = linearizeCollection(this._products);

    let newProductsResponse = await this._apiClient.getLimitedProduct(
      this._shownProductsCount
    );

    runInAction(() => {
      if (!newProductsResponse.success) {
        this._hasMore = false;
        return;
      }

      let newProducts = newProductsResponse.data.slice(prevShownProductsCount);
      let additionlProducts: ProductModel[] = [];
      for (const product of newProducts) {
        additionlProducts.push(normalizeProduct(product));
      }
      this._products = normalizeCollection(
        [...prevStateProducts, ...additionlProducts],
        (el) => el.id
      );
    });
  }

  async fetch(): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const productsResponse = await this._apiClient.getProducts();
    const categoriesResponse = await this._apiClient.getCategories();

    runInAction(() => {
      if (!productsResponse.success || !categoriesResponse.success) {
        this._meta = Meta.error;
        return;
      }

      this._products = getInitialCollectionModel();
      this._allProducts = getInitialCollectionModel();
      this._categories = [];
      this._selectedCategories = [];

      let products: ProductModel[] = [];
      for (const product of productsResponse.data) {
        products.push(normalizeProduct(product));
      }

      try {
        this._meta = Meta.success;
        this._categories = categoriesResponse.data;
        this._products = normalizeCollection(
          products.slice(0, 6),
          (product) => product.id
        );
        this._allProducts = normalizeCollection(
          products,
          (product) => product.id
        );
      } catch {
        this._meta = Meta.error;
      }
    });
  }

  // TODO: later, сейчас не использутеся
  async fetchProdyctsByCategories(
    selectedCategories: OptionType[]
  ): Promise<void> {
    if (selectedCategories.length === 0) {
      this._filteredProductsByCategory = getInitialCollectionModel();
      return;
    }

    let categories = selectedCategories.map((category) => category.value);
    let missingCategories: string[] = [];
    let products: ProductModel[] = [];

    categories.forEach((category) => {
      if (this._productByCategoryLookup[category]) {
        products.push(...this._productByCategoryLookup[category]);
      } else {
        missingCategories.push(category);
      }
    });

    if (missingCategories.length === 0) {
      this._filteredProductsByCategory = normalizeCollection(
        products,
        (el) => el.id
      );
      return;
    }

    for (let i = 0; i < missingCategories.length; i++) {
      const temp = await this._apiClient.getProductsByCategory(
        missingCategories[i]
      );
    }
  }

  destroy(): void {
    this._qsReaction();
    this._selectedCategoriesReaction();
  }
}
