import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../api/postById";
import Spinner from "../../components/Spinner/Spinner";
import PageNotFound from "../PageNotFound/PageNotFound";
import styles from "./Topic.module.css";

function Topic() {
  const { id } = useParams();

  const queryPost = useQuery({
    queryKey: ["postById", id],
    queryFn: () => fetchPostById(id as string),
    enabled: !!id,
  });

  const createMarkup = () => {
    if (!queryPost.data) return;
    return { __html: queryPost.data?.content.rendered };
  };

  if (queryPost.isLoading)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  if (queryPost.isError) return <PageNotFound />;

  return (
    <div className={styles.topic}>
      <div className={styles.title}>{queryPost.data?.title.rendered}</div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
}

export default Topic;
