import React, { useState, useCallback, useEffect } from "react";

import { Loader, LoaderSize } from "@components/Loader";
import classNames from "classnames";

import styles from "./MultiDropdown.module.scss";

/** Вариант для выбора в фильтре */
export type OptionType = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  buttonText?: React.ReactNode;
  /** Массив возможных вариантов для выбора */
  options: OptionType[];
  /** Идет ли загрузка данных */
  loading?: boolean;
  /** Текущие выбранные значения поля, массив может быть пустым */
  value: OptionType[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: OptionType[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
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

export const MultiDropdown = ({
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
    setIsOpen(false);
  }, [disabled === true]);

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
