import { useCategories } from "@api/hooks";
import filterIcon from "@assets/icon-filter.svg";
import { MultiDropdown } from "@components/MultiDropdown";
import { useProductsContext } from "@contexts/ProductsContext";
import { convertCategoriesToOptions } from "@utils/convertCategoriesToOptions";

import styles from "./Filter.module.scss";

export const Filter = () => {
  const { selectedCategories, setSelectedCategories } = useProductsContext();
  const { categories, loading } = useCategories();
  const buttonText = (
    <>
      <img src={filterIcon} alt="" style={{ marginRight: "12px" }} /> Filter
    </>
  );
  return (
    <MultiDropdown
      buttonText={buttonText}
      options={convertCategoriesToOptions(categories)}
      loading={loading}
      value={selectedCategories}
      onChange={setSelectedCategories}
      pluralizeOptions={(value) => `Selected: ${value.length}`}
    />
  );
};
