import { useCallback } from "react";

type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox = ({
  onChange,
  checked = false,
  ...props
}: CheckBoxProps) => {
  const onClick = useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);
  return (
    <input type="checkbox" checked={checked} onChange={onClick} {...props} />
  );
};
