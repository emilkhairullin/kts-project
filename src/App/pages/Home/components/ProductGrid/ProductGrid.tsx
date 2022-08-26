import { Card } from "@components/Card";
import { WithLoader } from "@components/WithLoader";
import { PRODUCTS_COUNT } from "@config/api.config";
import { useProductsContext } from "@contexts/ProductsContext";
import { Link } from "react-router-dom";

import styles from "./ProductGrid.module.scss";

export const ProductGrid = () => {
  const { products, loading } = useProductsContext();
  return (
    <WithLoader loading={loading}>
      <section className="container">
        <header className={styles.header}>
          <h2 className={styles.header__title}>Total Prodcuts</h2>
          <span className={styles.header__count}>{PRODUCTS_COUNT}</span>
        </header>
        <main className={styles["product-grid"]}>
          {products &&
            products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                className={styles["product-grid__link"]}
                key={product.id}
              >
                <Card
                  image={product.image}
                  category={product.category}
                  title={product.title}
                  subtitle={product.description}
                  price={product.price}
                />
              </Link>
            ))}
        </main>
      </section>
    </WithLoader>
  );
};
