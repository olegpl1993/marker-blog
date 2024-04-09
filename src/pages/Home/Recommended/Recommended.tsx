import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../api/posts";
import SpinnerCircle from "../../../components/SpinnerCircle/SpinnerCircle";
import HomeCard from "./HomeCard/HomeCard";
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
    <section className={styles.recommended}>
      <h1 className={styles.title}>Ігрові новини та огляди</h1>
      <div className={styles.content}>
        {renderPosts && (
          <>
            <div className={styles.row}>
              <HomeCard key={renderPosts[0].id} post={renderPosts[0]} />
              <HomeCard key={renderPosts[1].id} post={renderPosts[1]} />
            </div>
            <div className={styles.row}>
              <HomeCard key={renderPosts[0].id} post={renderPosts[2]} />
              <HomeCard key={renderPosts[1].id} post={renderPosts[3]} />
              <HomeCard key={renderPosts[2].id} post={renderPosts[4]} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Recommended;
