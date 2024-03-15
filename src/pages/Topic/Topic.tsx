import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../../api/categories";
import { fetchPostById } from "../../api/postById";
import Spinner from "../../components/Spinner/Spinner";
import { createCategoriesString } from "../../utils/Categories.utils";
import PageNotFound from "../PageNotFound/PageNotFound";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import styles from "./Topic.module.css";

function Topic() {
  const { id } = useParams();

  const postQuery = useQuery({
    queryKey: ["postById", id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const createMarkup = () => {
    if (!postQuery.data) return;
    return { __html: postQuery.data?.content.rendered };
  };

  if (postQuery.isLoading)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  if (!postQuery.data) return <PageNotFound />;

  return (
    <div className={styles.topic}>
      <BreadCrumbs
        categories={postQuery.data?.categories}
        title={postQuery.data?.title.rendered}
      />
      <h1 className={styles.title}>{postQuery.data?.title.rendered}</h1>
      <div className={styles.strings}>
        {postQuery.data?.genre && (
          <span>
            Жанри:{" "}
            <span className={styles.string}>{postQuery.data?.genre}</span>
          </span>
        )}
        {categoriesQuery.data && postQuery.data?.categories && (
          <span>
            Платформи:{" "}
            <span className={styles.string}>
              {createCategoriesString(
                categoriesQuery.data,
                postQuery.data?.categories
              )}
            </span>
          </span>
        )}
        {postQuery.data?.developer && (
          <span>
            Розробник:{" "}
            <span className={styles.string}>{postQuery.data?.developer}</span>
          </span>
        )}
        {postQuery.data?.release && (
          <span>
            Дата видання:{" "}
            <span className={styles.string}>{postQuery.data?.release}</span>
          </span>
        )}
        {postQuery.data?.publisher && (
          <span>
            Видавець:{" "}
            <span className={styles.string}>{postQuery.data?.publisher}</span>
          </span>
        )}
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
}

export default Topic;
