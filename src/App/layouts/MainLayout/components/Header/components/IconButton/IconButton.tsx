import React from "react";

import bagIcon from "@assets/icon-bag.svg";
import userIcon from "@assets/icon-user.svg";

import styles from "./IconButton.module.scss";

export const IconButton = () => {
  return (
    <div className={styles.icons}>
      <div className={styles.icons__item}>
        <img src={bagIcon} alt="" />
      </div>
      <div className={styles.icons__item}>
        <img src={userIcon} alt="" />
      </div>
    </div>
  );
};
