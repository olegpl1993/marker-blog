import { useContext } from "react";
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
      {categoryName && <h1 className={styles.title}>{categoryName}</h1>}
      {categoryName && tagName && <h2 className={styles.title}>{">"}</h2>}
      {tagName && <h2 className={styles.title}>{tagName}</h2>}
      {categoryName && search && <h2 className={styles.title}>{">"}</h2>}
      {search && <h2 className={styles.title}>{search}</h2>}
    </div>
  );
}

export default Selected;
