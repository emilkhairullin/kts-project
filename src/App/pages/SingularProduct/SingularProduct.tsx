import React from "react";

import { WithLoader } from "@components/WithLoader";
import { ProductContext } from "@contexts/ProductContext";
import { useProduct } from "@hooks/useProduct";
import { Meta } from "@utils/meta";
import classNames from "classnames";
import { observer } from "mobx-react-lite";

import ProductDisplay from "./components/ProductDisplay/ProductDisplay";
import RelatedItems from "./components/RelatedItems/RelatedItems";
import styles from "./SingularProduct.module.scss";

const SingularProduct: React.FC = () => {
  const { productStore } = useProduct();

  return (
    <ProductContext.Provider value={productStore}>
      <WithLoader
        loading={productStore.meta === Meta.loading}
        className={classNames(styles["singular-page"], "container")}
      >
        <ProductDisplay />
        <RelatedItems />
      </WithLoader>
    </ProductContext.Provider>
  );
};

export default observer(SingularProduct);
