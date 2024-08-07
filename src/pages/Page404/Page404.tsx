import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./Page404.module.css";

export function Page404() {
  return (
    <div className={styles.page404}>
      <Helmet>
        <title>Error Page - Game Marker</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://marker.cx.ua" />
      </Helmet>

      <Link to={"/"} className={styles.link}>
        ПОВЕРНУТИСЯ НА ГОЛОВНУ
      </Link>
      <div className={styles.imgBox}>
        <img
          className={styles.img}
          src={"/pageNotFound.webp"}
          alt="сторінка не знайдена"
        />
      </div>
    </div>
  );
}
