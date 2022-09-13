import React from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export enum InputColor {
  primary = "primary",
  naked = "naked",
}

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
  color?: InputColor;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  className,
  disabled,
  color = InputColor.primary,
  ...props
}) => {
  let cn = classNames(
    styles.input,
    styles[`input_color--${color}`],
    className,
    {
      [styles.input_disabled]: disabled,
    }
  );
  return (
    <input
      type={type}
      className={cn}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      disabled={disabled}
      {...props}
    />
  );
};
