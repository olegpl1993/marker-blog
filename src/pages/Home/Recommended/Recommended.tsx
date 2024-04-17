import { PostType } from "../../../types/post.types";
import RecommendedCard from "./RecommendedCard/RecommendedCard";
import styles from "./Recommended.module.css";

interface Props {
  posts: PostType[];
}

function Recommended(props: Props) {
  const { posts } = props;

  const renderPosts = posts.slice(0, 5);

  return (
    <section className={styles.recommended}>
      <h1 className={styles.title}>Останні ігрові новини</h1>
      <div className={styles.content}>
        {renderPosts && (
          <>
            <div className={styles.row}>
              <RecommendedCard key={renderPosts[0].id} post={renderPosts[0]} />
              <RecommendedCard key={renderPosts[1].id} post={renderPosts[1]} />
            </div>
            <div className={styles.row}>
              <RecommendedCard key={renderPosts[0].id} post={renderPosts[2]} />
              <RecommendedCard key={renderPosts[1].id} post={renderPosts[3]} />
              <RecommendedCard key={renderPosts[2].id} post={renderPosts[4]} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Recommended;
