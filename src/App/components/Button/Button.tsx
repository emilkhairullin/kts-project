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

export const Button = ({
  loading = false,
  color = ButtonColor.primary,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const cx = classNames(
    styles.button,
    styles[`button_color--${color}`],
    { [styles["button--loading"]]: loading },
    className
  );
  return (
    <button {...props} className={cx} disabled={disabled || loading}>
      {loading && (
        <Loader className={styles.button_loader} size={LoaderSize.s} />
      )}
      {children}
    </button>
  );
};
