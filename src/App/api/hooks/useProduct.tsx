import { useState, useEffect } from "react";

import type { Product } from "@interfaces/product.interface";

import { getProduct, getRelatedItems } from "../api";

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedItems, setRelatedItems] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>(undefined);

  useEffect(() => {
    try {
      (async function () {
        setLoading(true);
        const data = await getProduct(id);
        const relatedItems = await getRelatedItems(data.category);
        setProduct(data);
        setRelatedItems(relatedItems);
        setLoading(false);
      })();
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [id]);

  return { product, relatedItems, loading, error };
};
