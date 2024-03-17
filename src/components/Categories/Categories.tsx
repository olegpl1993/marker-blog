import { memo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryProvider";
import styles from "./Categories.module.css";

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Categories = memo((props: Props) => {
  const { setIsOpen } = props;
  const navigate = useNavigate();
  const selectedCategory = useParams().category;
  const categories = useContext(CategoryContext);

  const handleClick = (route: string) => {
    navigate(new URL(`/blog/${route}`, window.location.origin).pathname);
    setIsOpen && setIsOpen(false);
  };

  if (!categories) return null;
  return (
    <ul className={styles.categories}>
      {categories.map((category) => (
        <li
          className={`${styles.item} ${
            category.slug === selectedCategory && styles.active
          }`}
          key={category.id}
          onClick={() => handleClick(category.slug)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
});

export default Categories;
