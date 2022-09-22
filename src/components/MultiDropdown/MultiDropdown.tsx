import React, { useState, useCallback, useEffect } from "react";

import { Loader, LoaderSize } from "@components/Loader";
import classNames from "classnames";
import { observer } from "mobx-react-lite";

import styles from "./MultiDropdown.module.scss";

export type OptionType = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  buttonText?: React.ReactNode;
  options: OptionType[];
  loading?: boolean;
  value: OptionType[];
  onChange: (value: OptionType[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: OptionType[]) => string;
};

interface OptionProps {
  option: OptionType;
  onClick: (option: OptionType) => void;
  className: string;
  isAcive: boolean;
}

const Option = ({
  option,
  onClick,
  className,
  isAcive = false,
}: OptionProps) => {
  const cn = classNames(className, {
    [styles["m-d__option--active"]]: isAcive,
  });

  return (
    <li className={cn} key={option.key} onClick={() => onClick(option)}>
      {option.value}
    </li>
  );
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  buttonText = "Categories",
  options,
  loading = false,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (disabled === true) {
      setIsOpen(false);
    }
  }, [disabled]);

  const onOptionClick = useCallback(
    (option: OptionType) => {
      setIsOpen(false);
      if (value.length === 0) {
        onChange([option]);
        return;
      }
      let alreadySelected = value.some((el) => el.key === option.key);
      if (alreadySelected) {
        let filteredValue = value.filter((el) => el.key !== option.key);
        onChange(filteredValue);
        return;
      } else {
        onChange([...value, option]);
        return;
      }
    },
    [value, onChange]
  );

  return (
    <div className={styles["m-d"]}>
      <button
        className={styles["m-d__button"]}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        {loading ? (
          <Loader size={LoaderSize.s} />
        ) : value.length === 0 ? (
          buttonText
        ) : (
          pluralizeOptions(value)
        )}
      </button>
      {isOpen && (
        <ul className={styles["m-d__options"]}>
          {options.map((option) => {
            return (
              <Option
                className={styles["m-d__option"]}
                key={option.key}
                onClick={onOptionClick}
                option={option}
                isAcive={value.map((el) => el.value).includes(option.value)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default observer(MultiDropdown);
