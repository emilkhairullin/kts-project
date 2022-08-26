import React, { createContext, useContext } from "react";

import { OptionType } from "@components/MultiDropdown";
import type { Product } from "@interfaces/product.interface";

type ProductsContextType = {
  products: Product[] | null;
  loading: boolean;
  error: unknown | undefined;
  selectedCategories: OptionType[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<OptionType[]>>;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(
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
