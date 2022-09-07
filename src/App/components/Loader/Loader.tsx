import classNames from "classnames";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className,
}: LoaderProps) => {
  const loaderClass = classNames(
    styles.loader,
    styles[`loader_size-${size}`],
    className
  );

  return (
    <>
      {loading && (
        <svg
          className={loaderClass}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 61 61"
        >
          <path
            fillRule="evenodd"
            d="M40.9268 52.5369c-7.5134 3.495-16.6342 2.9994-23.9103-2.0954C6.15875 42.8388 3.52 27.8737 11.1227 17.016c7.6026-10.8577 22.5677-13.49645 33.4254-5.8938 7.2762 5.0948 10.8614 13.496 10.1469 21.7517l5.9781.5231c.8932-10.3197-3.5883-20.8212-12.6835-27.18971C34.4174-3.29603 15.7111.00241 6.20775 13.5746-3.29558 27.1467.00285 45.8531 13.575 55.3564c9.0952 6.3686 20.4961 6.988 29.888 2.6192l-2.5362-5.4387Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </>
  );
};
