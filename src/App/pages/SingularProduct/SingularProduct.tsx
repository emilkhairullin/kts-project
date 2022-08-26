import { useProduct } from "@api/hooks";
import { WithLoader } from "@components/WithLoader";
import { ProductContext } from "@contexts/ProductContext";
import classNames from "classnames";
import { useParams } from "react-router-dom";

import { ProductDisplay } from "./components/ProductDisplay";
import { RelatedItems } from "./components/RelatedItems";
import styles from "./SingularProduct.module.scss";

export const SingularProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { product, relatedItems, loading, error } = useProduct(id as string);

  const pageStyles = classNames(styles["singular-page"], "container");

  return (
    <ProductContext.Provider value={{ product, relatedItems, loading, error }}>
      <WithLoader loading={loading} className={pageStyles}>
        <ProductDisplay />
        <RelatedItems />
      </WithLoader>
    </ProductContext.Provider>
  );
};
