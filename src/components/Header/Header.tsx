import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";
import Menu from "./Menu/Menu";

function Header() {
  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <img src="/logo-gamepad.png" alt="логотип" className={styles.logoImg} />
      </Link>

      <Menu />
      <BurgerMenu />
    </header>
  );
}

export default Header;
