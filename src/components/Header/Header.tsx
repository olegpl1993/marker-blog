import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../api/categories";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";

function Header() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Game Marker
      </Link>
      <BurgerMenu categories={query.data} />
    </header>
  );
}

export default Header;
