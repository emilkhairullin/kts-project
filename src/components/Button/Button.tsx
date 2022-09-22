import React, { useMemo } from "react";

import { Loader, LoaderSize } from "@components/Loader";
import classNames from "classnames";

import styles from "./Button.module.scss";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    loading = false,
    color = ButtonColor.primary,
    children,
    className,
    disabled,
    ...props
  }) => {
    const cx = useMemo(() => {
      return classNames(
        styles.button,
        styles[`button_color--${color}`],
        { [styles["button_loading"]]: loading },
        className
      );
    }, [className, color, loading]);
    return (
      <button {...props} className={cx} disabled={disabled || loading}>
        {loading && (
          <Loader className={styles.button__loader} size={LoaderSize.s} />
        )}
        {children}
      </button>
    );
  }
);
