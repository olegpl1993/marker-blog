import { memo, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryProvider";
import styles from "./Categories.module.css";

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Categories = memo((props: Props) => {
  const { setIsOpen } = props;
  const selectedCategory = useParams().category;
  const categories = useContext(CategoryContext);

  const handleClose = () => {
    if (setIsOpen) setIsOpen(false);
  };

  if (!categories) return null;
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <Link
          className={`${styles.item} ${
            category.slug === selectedCategory && styles.active
          }`}
          key={category.id}
          to={`/blog/${category.slug}`}
          onClick={handleClose}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
});

export default Categories;
