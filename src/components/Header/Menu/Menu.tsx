import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(new URL(link, window.location.origin).pathname);
  };

  return (
    <ul className={styles.menu}>
      <li className={styles.item} onClick={() => handleClick("/")}>
        Головна
      </li>
      <li className={styles.item} onClick={() => handleClick("/blog")}>
        Блог
      </li>
    </ul>
  );
}

export default Menu;
