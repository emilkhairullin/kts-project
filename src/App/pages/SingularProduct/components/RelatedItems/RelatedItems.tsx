import { useEffect } from "react";

import { Card } from "@components/Card";
import { useProductContext } from "@contexts/ProductContext";
import { Link } from "react-router-dom";

import styles from "./RelatedItems.module.scss";

export const RelatedItems = () => {
  const { relatedItems } = useProductContext();

  return (
    <section className={styles["related-items"]}>
      <h2 className={styles["related-items__header"]}>Related Items</h2>
      <div className={styles["related-items__grid"]}>
        {relatedItems?.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className={styles["related-items__link"]}
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
    </section>
  );
};
