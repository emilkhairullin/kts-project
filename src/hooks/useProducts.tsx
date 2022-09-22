import { useEffect } from "react";

import ProductsStore from "@store/ProductsStore/ProductsStore";
import { useLocalStore } from "@utils/useLocalStore";

export const useProducts = () => {
  const productsStore = useLocalStore(() => new ProductsStore());

  useEffect(() => {
    productsStore.fetch();
  }, [productsStore]);

  return { productsStore };
};
