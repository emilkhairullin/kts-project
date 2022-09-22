import { createContext, useContext } from "react";

import ProductsStore from "@store/ProductsStore/ProductsStore";

export const ProductsContext = createContext<ProductsStore | undefined>(
  undefined
);

export const useProductsContext = () => {
  const ctx = useContext(ProductsContext);
  if (ctx === undefined) {
    throw new Error(
      "useProductsContext must be called within ProdcutsContext.Provider"
    );
  }
  return ctx;
};
