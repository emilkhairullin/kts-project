import { Controlls } from "../Controlls";
import { Filter } from "../Filter";
import styles from "./InputBox.module.scss";

export const InputBox = () => {
  return (
    <div className={styles["input-box"]}>
      <Controlls />
      <Filter />
    </div>
  );
};
