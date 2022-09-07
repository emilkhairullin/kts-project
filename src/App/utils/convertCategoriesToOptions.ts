import type { OptionType } from "@components/MultiDropdown";

export const convertCategoriesToOptions = (
  categories: string[] | null
): OptionType[] => {
  if (categories === null) {
    throw new Error("Categories must be not null");
  }
  const options: OptionType[] = categories.map((category) => {
    return { key: category, value: category };
  });
  return options;
};
