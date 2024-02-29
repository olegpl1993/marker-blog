import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMediaLink } from "../../api/mediaLink";
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

  const query = useQuery({
    queryKey: ["image", queryPost.data?.featured_media],
    queryFn: () => fetchMediaLink(queryPost.data?.featured_media as number),
    enabled: !!queryPost.data?.featured_media,
  });

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
      <div className={styles.imageBox}>
        {!query.isLoading ? (
          <img
            className={styles.image}
            src={query.data?.source_url}
            alt={queryPost.data?.title.rendered}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.content}>{queryPost.data?.content.rendered}</div>
    </div>
  );
}

export default Topic;
