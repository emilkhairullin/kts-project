import { createContext, useContext } from "react";

import ProductStore from "@store/ProductStore";

export const ProductContext = createContext<ProductStore | undefined>(
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
