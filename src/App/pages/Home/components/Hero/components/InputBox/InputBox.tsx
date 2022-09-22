import React from "react";

import { Controlls } from "../Controlls";
import Filter from "../Filter";
import styles from "./InputBox.module.scss";

export const InputBox = React.memo(() => {
  return (
    <div className={styles["input-box"]}>
      <Controlls />
      <Filter />
    </div>
  );
});
