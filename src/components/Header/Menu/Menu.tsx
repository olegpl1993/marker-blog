import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
  return (
    <div className={styles.menu}>
      <Link className={styles.item} to={"/"}>
        Головна
      </Link>
      <Link className={styles.item} to={"/blog"}>
        Блог
      </Link>
    </div>
  );
}

export default Menu;
