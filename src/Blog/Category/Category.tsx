import { useEffect, useState } from "react";
import styles from "./Category.module.css";
import { CategoryType } from "./types";

function Category() {
  const [categorys, setCategorys] = useState<CategoryType[] | null>(null);

  useEffect(() => {
    fetch("http://marker.cx.ua/wp-json/wp/v2/categories")
      .then((response) => response.json())
      .then((json) => setCategorys(json));
  }, []);

  if (!categorys) return null;

  return (
    <ul className={styles.category}>
      {categorys.map((category) => (
        <li className={styles.item} key={category.id}>
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default Category;
