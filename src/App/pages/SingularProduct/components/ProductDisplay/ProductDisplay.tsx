import React from "react";

import { Button, ButtonColor } from "@components/Button";
import { ReadMore } from "@components/ReadMore";
import { useProductContext } from "@contexts/ProductContext";

import { VariationPicker } from "./components/VariationPicker";
import type { Variation } from "./components/VariationPicker";
import styles from "./ProductDisplay.module.scss";

export const ProductDisplay = () => {
  const { product } = useProductContext();

  const variations: Variation[] = [
    { name: "Variation 1", color: "#151411" },
    { name: "Variation 2", color: "#314443" },
    { name: "Variation 3", color: "#C5A26E" },
    { name: "Variation 4", color: "#D8DBE0" },
  ];

  return (
    <section className={styles["product-display"]}>
      <div className={styles["product-display__left"]}>
        <img
          src={product?.image}
          alt={product?.title}
          className={styles["product-display__image"]}
        />
      </div>
      <div className={styles["product-display__right"]}>
        <h1 className={styles["product-display__title"]}>{product?.title}</h1>
        <p className={styles["product-display__category"]}>
          {product?.category}
        </p>
        <VariationPicker
          name="Color"
          variations={variations}
          className={styles["product-display__variations"]}
          onVariationClick={(variation) =>
            // eslint-disable-next-line no-console
            console.log(`${variation.name} was clicked!`)
          }
        />
        {product?.description && (
          <ReadMore
            className={styles["product-display__description"]}
            description={product.description}
            limit={8}
          />
        )}
        <p className={styles["product-display__price"]}>${product?.price}</p>
        <div className={styles["product-display__button-group"]}>
          <Button>Buy Now</Button>
          <Button color={ButtonColor.secondary}>Add to Cart</Button>
        </div>
      </div>
    </section>
  );
};
