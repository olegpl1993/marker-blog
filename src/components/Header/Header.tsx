import { Link } from "react-router-dom";
import Category from "./Category/Category";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MARKER
      </Link>
      <Category />
    </header>
  );
}

export default Header;
