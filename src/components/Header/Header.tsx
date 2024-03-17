import { useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(new URL(`/`, window.location.origin).pathname);
  };

  return (
    <header className={styles.header}>
      <img
        src="/logo-gamepad.png"
        alt="logo gamepad"
        className={styles.logoImg}
        onClick={handleClick}
      />
      <BurgerMenu />
    </header>
  );
}

export default Header;
