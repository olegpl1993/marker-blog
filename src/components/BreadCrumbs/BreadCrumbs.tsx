import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryProvider";
import { TagContext } from "../../contexts/TagProvider";
import styles from "./BreadCrumbs.module.css";

interface Props {
  categories?: number[] | undefined;
  title?: string | undefined;
  category?: string | undefined;
  tagsSearchParams?: string | null;
  search?: string | null | undefined;
  game?: string | null | undefined;
}

const BreadCrumbs = memo((props: Props) => {
  const { categories, title, category, tagsSearchParams, search, game } = props;
  const categoriesList = useContext(CategoryContext);
  const tags = useContext(TagContext);

  const categoryName = categoriesList?.find(
    (item) => item.slug === category
  )?.name;
  const tagName = tags?.find((item) => item.slug === tagsSearchParams)?.name;

  return (
    <span className={styles.breadCrumbs}>
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
          <Link to={`/blog?tags=${tagsSearchParams}`} className={styles.link}>
            {tagName}
          </Link>
        </>
      )}

      {search && (
        <>
          <span>{">"}</span>
          <span>{search}</span>
        </>
      )}

      {categories && categoriesList && (
        <>
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
        </>
      )}

      {(title || game) && (
        <>
          <span>{">"}</span>
          <span>{game ? game : title}</span>
        </>
      )}
    </span>
  );
});

export default BreadCrumbs;
