import { useNavigate } from "react-router-dom";
import { CategoryType } from "../../../types/category.types";
import styles from "./Category.module.css";

interface Props {
  categories: CategoryType[] | undefined;
}

function Category(props: Props) {
  const { categories } = props;
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(`blog/${route}`);
  };

  if (!categories) return null;

  return (
    <ul className={styles.category}>
      {categories.map((category) => (
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
