import { useProducts } from "@api/hooks";
import { ProductsContext } from "@contexts/ProductsContext";

import { Hero } from "./components/Hero";
import { ProductGrid } from "./components/ProductGrid";

export const Home = () => {
  const {
    products,
    loading,
    error,
    selectedCategories,
    setSelectedCategories,
  } = useProducts();

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        selectedCategories,
        setSelectedCategories,
      }}
    >
      <Hero />
      <ProductGrid />
    </ProductsContext.Provider>
  );
};
