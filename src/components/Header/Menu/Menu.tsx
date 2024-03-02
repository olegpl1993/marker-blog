import { useNavigate } from "react-router-dom";
import { CategoryType } from "../../../types/category.types";
import styles from "./Menu.module.css";

interface Props {
  categories: CategoryType[] | undefined;
}

function Menu(props: Props) {
  const { categories } = props;
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(`blog/${route}`);
  };

  if (!categories) return null;

  return (
    <ul className={styles.menu}>
      {categories.map((category) => (
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

export default Menu;
