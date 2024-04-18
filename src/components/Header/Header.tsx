import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";
import Menu from "./Menu/Menu";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={"/"}>
          <img
            src="/logo-gamepad.webp"
            alt="Лого сайту - геймпад з текстом Game Marker"
            className={styles.logoImg}
          />
        </Link>

        <Menu />
        <BurgerMenu />
      </div>
    </header>
  );
}

export default Header;
