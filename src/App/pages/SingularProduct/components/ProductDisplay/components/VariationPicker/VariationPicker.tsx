import classNames from "classnames";

import styles from "./VariationPicker.module.scss";

export interface Variation {
  name: string;
  color: string;
}

interface VariationPickerProps {
  name: string;
  className?: string;
  variations: Variation[];
  onVariationClick: (variation: Variation) => void;
}

export const VariationPicker = ({
  name,
  variations,
  onVariationClick,
  className,
}: VariationPickerProps) => {
  const cn = classNames(styles["variation-picker"], className);

  return (
    <div className={cn}>
      <h3 className={styles["variation-picker__name"]}>{name}</h3>
      <div className={styles["variation-picker__list"]}>
        {variations.map((variation) => {
          return (
            <span
              key={variation.name}
              className={styles["variation-picker__variation"]}
              style={{ backgroundColor: variation.color }}
              onClick={() => onVariationClick(variation)}
            />
          );
        })}
      </div>
    </div>
  );
};
