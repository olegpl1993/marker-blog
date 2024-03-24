import { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryProvider";
import { TagContext } from "../../../contexts/TagProvider";
import styles from "./Selected.module.css";

interface Props {
  category: string | undefined;
  tagsSearchParams: string | null;
  search: string | null | undefined;
}

function Selected(pros: Props) {
  const { category, tagsSearchParams, search } = pros;
  const categories = useContext(CategoryContext);
  const tags = useContext(TagContext);

  const categoryName = categories?.find((item) => item.slug === category)?.name;
  const tagName = tags?.find((item) => item.slug === tagsSearchParams)?.name;

  return (
    <div className={styles.selected}>
      <Link to={"/"} className={styles.link}>
        Game Marker
      </Link>
      <span>{">"}</span>
      <Link to={"/blog"} className={styles.link}>
        Блог
      </Link>
      {categoryName && (
        <>
          <span>{">"}</span>
          <Link to={`/blog/${category}`} className={styles.link}>
            {categoryName}
          </Link>
        </>
      )}
      {tagName && (
        <>
          <span>{">"}</span>
          <Link to={`/blog/?tags=${tagsSearchParams}`} className={styles.link}>
            {tagName}
          </Link>
        </>
      )}
      {search && (
        <>
          <span>{">"}</span>
          <span className={styles.title}>{search}</span>
        </>
      )}
    </div>
  );
}

export default Selected;
