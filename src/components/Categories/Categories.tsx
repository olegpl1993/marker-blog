import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../api/categories";
import styles from "./Categories.module.css";

function Categories() {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const handleClick = (route: string) => {
    navigate(new URL(`/blog/${route}`, window.location.origin).pathname);
  };

  if (!query.data) return null;
  return (
    <ul className={styles.categories}>
      {query.data.map((category) => (
        <li
          className={styles.item}
          key={category.id}
          onClick={() => handleClick(category.slug)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default Categories;