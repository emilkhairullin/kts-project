import React from "react";

import classNames from "classnames";

import { useTruncatedText } from "./hooks/useTruncatedText";
import styles from "./ReadMore.module.scss";

interface ReadMoreProps {
  description: string;
  limit: number;
  className: string;
}

export const ReadMore: React.FC<ReadMoreProps> = React.memo(
  ({ description, limit, className }) => {
    const { text, isTruncable, showText } = useTruncatedText(
      description,
      limit
    );

    return (
      <p className={classNames(styles["read-more__text"], className)}>
        {text}
        {isTruncable && (
          <span
            onClick={() => showText()}
            className={styles["read-more__show-button"]}
          >
            Read&nbsp;More
          </span>
        )}
      </p>
    );
  }
);
