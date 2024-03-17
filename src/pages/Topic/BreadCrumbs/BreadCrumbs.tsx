import { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryProvider";
import styles from "./BreadCrumbs.module.css";

interface Props {
  categories: number[] | undefined;
  title: string | undefined;
}

function BreadCrumbs(props: Props) {
  const { categories, title } = props;
  const categoriesList = useContext(CategoryContext);

  if (!categoriesList || !categories || !title) return null;
  return (
    <span className={styles.breadCrumbs}>
      <Link to={"/"} className={styles.link}>
        Game Marker
      </Link>
      <span>{">"}</span>
      <Link to={"/blog"} className={styles.link}>
        Блог
      </Link>
      <span>{">"}</span>
      {categoriesList
        .filter((category) => categories.includes(category.id))
        .map((category, index, array) => (
          <div className={styles.category} key={category.id}>
            <Link to={`/blog/${category.slug}`} className={styles.link}>
              {category.name}
            </Link>
            <p>{index !== array.length - 1 && ", "}</p>
          </div>
        ))}
      <span>{">"}</span>
      <span>{title}</span>
    </span>
  );
}

export default BreadCrumbs;
