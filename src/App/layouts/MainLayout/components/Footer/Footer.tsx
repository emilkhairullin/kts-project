import React from "react";

import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__container}`}>
        <p className={styles.footer__text}>E-commerce; KTS</p>
      </div>
    </footer>
  );
};
