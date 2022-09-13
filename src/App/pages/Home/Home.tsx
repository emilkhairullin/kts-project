import { ProductsContext } from "@contexts/ProductsContext";
import { useProducts } from "@hooks/useProducts";
import { observer } from "mobx-react-lite";

import { Hero } from "./components/Hero";
import ProductGrid from "./components/ProductGrid";

const Home: React.FC = () => {
  const { productsStore } = useProducts();

  return (
    <ProductsContext.Provider value={productsStore}>
      <Hero />
      <ProductGrid />
    </ProductsContext.Provider>
  );
};

export default observer(Home);
