import { IconButton } from "./components/IconButton";
import { Logo } from "./components/Logo";
import { Navigation } from "./components/Navigation";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <Logo className="as" />
        <Navigation />
        <IconButton />
      </div>
    </header>
  );
};
