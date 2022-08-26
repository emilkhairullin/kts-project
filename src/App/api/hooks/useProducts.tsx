import { useState, useEffect } from "react";

import { OptionType } from "@components/MultiDropdown";
import type { Product } from "@interfaces/product.interface";

import { getProducts } from "../api";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | undefined>(undefined);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(
    []
  );

  const filterProducts = () => {
    if (!products) return null;

    const filtered = products.filter((product) => {
      const categories = selectedCategories.map((el) => el.value);
      return categories.includes(product.category);
    });
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    try {
      (async function () {
        const products = await getProducts();
        setProducts(products);
        setLoading(false);
      })();
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategories]);

  return {
    products: filteredProducts.length === 0 ? products : filteredProducts,
    loading,
    error,
    selectedCategories,
    setSelectedCategories,
  };
};
