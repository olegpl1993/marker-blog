import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MARKER
      </Link>
      <div className={styles.menu}>MENU</div>
    </header>
  );
}

export default Header;
