import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../api/posts";
import Card from "../../../components/Card/Card";
import SpinnerCircle from "../../../components/SpinnerCircle/SpinnerCircle";
import styles from "./Recommended.module.css";

function Recommended() {
  const queryPosts = useQuery({
    queryKey: ["RecommendedPosts"],
    queryFn: () => fetchPosts(),
  });

  const renderPosts = queryPosts.data?.data?.slice(0, 5);

  if (queryPosts.isLoading)
    return (
      <div className={styles.spinnerBox}>
        <SpinnerCircle />
      </div>
    );

  if (queryPosts.isError) return null;

  return (
    <div className={styles.recommended}>
      <div className={styles.title}>Рекомендовані</div>
      <div className={styles.content}>
        {renderPosts &&
          renderPosts.map((post) => (
            <div className={styles.post} key={post.id}>
              <Card post={post} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Recommended;
