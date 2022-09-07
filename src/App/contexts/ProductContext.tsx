import { createContext, useContext } from "react";

import type { Product } from "@interfaces/product.interface";

type ProductsContextType = {
  product: Product | null;
  relatedItems: Product[] | null;
  loading: boolean;
  error: unknown | undefined;
};

export const ProductContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (ctx === undefined) {
    throw new Error(
      "useProductContext must be called within ProdcutContext.Provider"
    );
  }
  return ctx;
};
