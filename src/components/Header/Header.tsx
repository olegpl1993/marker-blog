import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../api/categories";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

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
      <BurgerMenu categories={query.data} />
    </header>
  );
}

export default Header;
