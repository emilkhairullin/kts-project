import { useEffect, useState } from "react";

import icon_search from "@assets/icon-search.svg";
import { Button } from "@components/Button";
import { Input, InputColor } from "@components/Input";
import { useSearchParams } from "react-router-dom";

import styles from "./Controlls.module.scss";

const Controlls = () => {
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let param = searchParams.get("search");
    if (param) {
      setSearch(param);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (search.length !== 0) {
      setSearchParams({ search }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [setSearchParams, search]);

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

export default Controlls;
