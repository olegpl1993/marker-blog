import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../api/postById";
import Spinner from "../../components/Spinner/Spinner";
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

  if (postQuery.data === null) return <PageNotFound />;

  return (
    <div className={styles.topic}>
      <BreadCrumbs
        categories={postQuery.data?.categories}
        title={postQuery.data?.title.rendered}
      />
      <div className={styles.title}>{postQuery.data?.title.rendered}</div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
}

export default Topic;
