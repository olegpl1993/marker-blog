import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryType } from "../../../types/category.types";
import styles from "./Category.module.css";
import { fetchCategories } from "./Category.utils";

function Category() {
  const [categorys, setCategorys] = useState<CategoryType[] | null>(null);
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(`/${route}`);
  };

  useEffect(() => {
    const getCategories = async () => {
      setCategorys(await fetchCategories());
    };
    getCategories();
  }, []);

  if (!categorys) return null;

  return (
    <ul className={styles.category}>
      {categorys.map((category) => (
        <li
          className={styles.item}
          key={category.id}
          onClick={() => handleClick(category.name)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default Category;
