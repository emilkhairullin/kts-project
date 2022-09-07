import { useCallback } from "react";

import classNames from "classnames";
import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.scss";

export const Navigation = () => {
  const navLinkClass = useCallback((isActive: boolean) => {
    return classNames(styles.nav__item, {
      [styles["nav__item--active"]]: isActive,
    });
  }, []);

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)}>
        Product
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) => navLinkClass(isActive)}
      >
        Services
      </NavLink>
      <NavLink
        to="/article"
        className={({ isActive }) => navLinkClass(isActive)}
      >
        Article
      </NavLink>
      <NavLink
        to="/about-us"
        className={({ isActive }) => navLinkClass(isActive)}
      >
        About Us
      </NavLink>
    </nav>
  );
};
