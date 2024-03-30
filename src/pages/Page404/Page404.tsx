import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./Page404.module.css";

function Page404() {
  return (
    <div className={styles.page404}>
      <Helmet>
        <title>Game Marker | Error Page</title>
      </Helmet>

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

export default Page404;
