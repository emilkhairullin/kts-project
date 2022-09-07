import { useState } from "react";

import icon_search from "@assets/icon-search.svg";
import { Button } from "@components/Button";
import { Input, InputColor } from "@components/Input";

import styles from "./Controlls.module.scss";

export const Controlls = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className={styles.controlls}>
      <img src={icon_search} alt="" />
      <Input
        className={styles.controlls__input}
        value={search}
        onChange={setSearch}
        color={InputColor.naked}
        placeholder="Search Term Here"
      />
      <Button className={styles.controlls__button}>Find Now</Button>
    </div>
  );
};
