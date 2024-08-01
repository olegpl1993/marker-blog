import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { memo, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryContext } from "../../../app/providers/CategoryProvider";
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
    <ul className={styles.categories}>
      {categories.map((category) => (
        <li key={category.id} className={styles.row}>
          {category.slug === selectedCategory && (
            <KeyboardDoubleArrowRightIcon
              sx={{ color: "var(--primary-color)", fontSize: "16px" }}
            />
          )}
          <Link
            className={styles.item}
            to={`/blog/${category.slug}`}
            onClick={handleClose}
          >
            {category.name}
          </Link>
          {category.slug === selectedCategory && (
            <KeyboardDoubleArrowLeftIcon
              sx={{ color: "var(--primary-color)", fontSize: "16px" }}
            />
          )}
        </li>
      ))}
    </ul>
  );
});

export default Categories;
