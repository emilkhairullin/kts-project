import React from "react";

import styles from "./NotFound.module.scss";

const NotFound: React.FC = React.memo(() => {
  return <div className={styles["not-found"]}>NotFound</div>;
});

export default NotFound;
