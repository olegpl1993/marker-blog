import { Link } from "react-router-dom";
import styles from "./Page404.module.css";

export function Page404() {
  return (
    <div className={styles.page404}>
      <Link to={"/"} className={styles.link}>
        ПОВЕРНУТИСЯ НА ГОЛОВНУ
      </Link>
      <div className={styles.imgBox}>
        <img
          className={styles.img}
          src={"/pageNotFound.jpg"}
          alt="page not found"
        />
      </div>
    </div>
  );
}
