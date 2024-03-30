import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../api/postById";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Spinner from "../../components/Spinner/Spinner";
import { Page404 } from "../Page404/Page404";
import styles from "./Topic.module.css";

export function Topic() {
  const { id } = useParams();

  const postQuery = useQuery({
    queryKey: ["postById", id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
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

  if (!postQuery.data) return <Page404 />;

  return (
    <div className={styles.topic}>
      <Helmet>
        <title>{postQuery.data?.title.rendered} - Game Marker</title>
        <meta
          name="description"
          content={`${postQuery.data?.title.rendered} ${postQuery.data?.release} ${postQuery.data?.genre}`}
        />
        <meta
          name="keywords"
          content={
            postQuery.data?.title.rendered +
            ", " +
            postQuery.data?.genre +
            ", " +
            postQuery.data?.platform +
            ", " +
            postQuery.data?.developer +
            ", " +
            postQuery.data?.release +
            ", " +
            postQuery.data?.publisher
          }
        />
      </Helmet>

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
        {postQuery.data?.platform && (
          <span>
            Платформи:{" "}
            <span className={styles.string}>{postQuery.data?.platform}</span>
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
