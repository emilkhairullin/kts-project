import React from "react";

import filterIcon from "@assets/icon-filter.svg";
import { MultiDropdown } from "@components/MultiDropdown";
import { useProductsContext } from "@contexts/ProductsContext";
import { convertCategoriesToOptions } from "@utils/convertCategoriesToOptions";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";

const Filter = () => {
  const { categories, selectedCategories, setSelectedCategories, meta } =
    useProductsContext();

  const buttonText = (
    <>
      <img src={filterIcon} alt="" style={{ marginRight: "12px" }} /> Filter
    </>
  );
  return (
    <MultiDropdown
      buttonText={buttonText}
      options={convertCategoriesToOptions(categories)}
      loading={meta === Meta.loading}
      value={selectedCategories}
      onChange={setSelectedCategories}
      pluralizeOptions={(value) => `Selected: ${value.length}`}
    />
  );
};

export default observer(Filter);
