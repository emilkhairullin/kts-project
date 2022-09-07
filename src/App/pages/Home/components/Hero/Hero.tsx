import { InputBox } from "./components/InputBox";
import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <div className="container">
      <div className={styles.hero}>
        <h1 className={styles.hero__title}>Products</h1>
        <h2 className={styles.hero__subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </h2>
        <InputBox />
      </div>
    </div>
  );
};
