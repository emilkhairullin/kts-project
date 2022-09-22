import { useMemo } from "react";
import React from "react";

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

export const VariationPicker: React.FC<VariationPickerProps> = React.memo(
  ({ name, variations, onVariationClick, className }) => {
    const cn = useMemo(
      () => classNames(styles["variation-picker"], className),
      [className]
    );

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
  }
);
