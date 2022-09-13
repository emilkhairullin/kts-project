import React from "react";

import { Loader } from "@components/Loader";
import classNames from "classnames";

import styles from "./WithLoader.module.scss";

type WithLoaderProps = React.PropsWithChildren<{
  loading?: boolean;
  className?: string;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading = true,
  children,
  className,
}) => {
  const cn = classNames(styles["with-loader"], className);

  return (
    <div className={cn}>
      {loading ? (
        <div className={styles["with-loader__loader-wrapper"]}>
          <Loader />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
