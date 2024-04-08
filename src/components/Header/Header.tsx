import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";
import Menu from "./Menu/Menu";

function Header() {
  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <img
          src="/logo-gamepad.webp"
          alt="Лого сайту - геймпад з текстом Game Marker"
          className={styles.logoImg}
        />
      </Link>

      <Menu />
      <BurgerMenu />
    </header>
  );
}

export default Header;
