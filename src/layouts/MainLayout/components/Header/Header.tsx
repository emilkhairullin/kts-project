import React, { useMemo } from "react";

import classNames from "classnames";

import { IconButton } from "./components/IconButton";
import { Logo } from "./components/Logo";
import { Navigation } from "./components/Navigation";
import styles from "./Header.module.scss";

export const Header: React.FC = React.memo(() => {
  const headerClasses = useMemo(
    () => classNames("container", styles.header__container),
    []
  );

  return (
    <header className={styles.header}>
      <div className={headerClasses}>
        <Logo />
        <Navigation />
        <IconButton />
      </div>
    </header>
  );
});
