import classNames from "classnames";

import { useTruncatedText } from "./hooks/useTruncatedText";
import styles from "./ReadMore.module.scss";

interface ReadMoreProps {
  description: string;
  limit: number;
  className: string;
}

export const ReadMore = ({ description, limit, className }: ReadMoreProps) => {
  const { text, isTruncable, showText } = useTruncatedText(description, limit);
  const cn = classNames(styles["read-more__text"], className);

  if (!isTruncable) {
    return <p className={cn}>{text}</p>;
  }

  return (
    <p className={cn}>
      {text}
      <span
        onClick={() => showText()}
        className={styles["read-more__show-button"]}
      >
        Read&nbsp;More
      </span>
    </p>
  );
};
