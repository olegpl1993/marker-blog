import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryType } from "../../types/category.types";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Category from "./Category/Category";
import styles from "./Header.module.css";
import { fetchCategories } from "./Header.utils";

function Header() {
  const [categories, setCategories] = useState<CategoryType[] | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      setCategories(await fetchCategories());
    };
    getCategories();
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MARKER
      </Link>
      <Category categories={categories} />
      <BurgerMenu categories={categories} />
    </header>
  );
}

export default Header;
