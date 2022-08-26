import { truncateText } from "@utils/truncateText";

import styles from "./Card.module.scss";

type CardProps = {
  image: string;
  title: string;
  subtitle: string;
  price: number;
  category?: string;
  onClick?: React.MouseEventHandler;
};

export const Card = ({
  image,
  title,
  subtitle,
  category,
  price,
  onClick,
}: CardProps) => {
  return (
    <article className={styles.card} onClick={onClick}>
      <img className={styles.card__image} src={image} alt="Product" />
      {category && <span className={styles.card__category}>{category}</span>}
      <h2 className={styles.card__title}>{title}</h2>
      <h3 className={styles.card__subtitle}>{truncateText(subtitle)}</h3>
      <p className={styles.card__price}>${price}</p>
    </article>
  );
};
