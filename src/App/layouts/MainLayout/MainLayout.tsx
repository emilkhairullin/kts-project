import { Outlet } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import styles from "./MainLayout.module.scss";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
