import { useEffect } from "react";

import ProductStore from "@store/ProductStore";
import { useLocalStore } from "@utils/useLocalStore";
import { useParams } from "react-router-dom";

export const useProduct = () => {
  const { id } = useParams<{ id: string }>();
  const productStore = useLocalStore(() => new ProductStore());

  useEffect(() => {
    productStore.fetch(parseInt(id as string));
  }, [id, productStore]);

  return { productStore };
};
