import React from "react";

import styles from "./EmptyPage.module.scss";

const EmptyPage: React.FC = React.memo(() => {
  return <div className={styles["empty-page"]}>EmptyPage</div>;
});

export default EmptyPage;
