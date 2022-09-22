import { Card } from "@components/Card";
import { Loader } from "@components/Loader";
import { WithLoader } from "@components/WithLoader";
import { PRODUCTS_COUNT } from "@config/api.config";
import { useProductsContext } from "@contexts/ProductsContext";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import styles from "./ProductGrid.module.scss";

const ProductGrid = () => {
  const {
    products,
    meta,
    searchTerm,
    fetchMore,
    hasMore,
    filteredProductsBySearch,
  } = useProductsContext();
  return (
    <WithLoader loading={meta === Meta.loading}>
      <section className="container">
        <header className={styles.header}>
          {searchTerm ? (
            <h2 className={styles.header__title}>
              Results for: {searchTerm.toString()}
            </h2>
          ) : (
            <>
              <h2 className={styles.header__title}>Total Prodcuts</h2>
              <span className={styles.header__count}>{PRODUCTS_COUNT}</span>
            </>
          )}
        </header>
        <main>
          {searchTerm && (
            <div className={styles["product-grid"]}>
              {filteredProductsBySearch.map((product) => (
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
            </div>
          )}

          {!searchTerm && (
            <InfiniteScroll
              hasMore={hasMore}
              next={fetchMore}
              dataLength={products.length}
              loader={<Loader />}
              className={styles["product-grid"]}
            >
              {products.map((product) => (
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
            </InfiniteScroll>
          )}
        </main>
      </section>
    </WithLoader>
  );
};

export default observer(ProductGrid);
