import { memo } from "react";
import RecommendedCard from "../../../components/RecommendedCard/RecommendedCard";
import { PostType } from "../../../types/post.types";
import styles from "./Recommended.module.css";

interface Props {
  posts: PostType[];
}

const Recommended = memo((props: Props) => {
  const { posts } = props;

  const renderPosts = posts.slice(0, 8);

  return (
    <section className={styles.recommended}>
      <h1 className={styles.title}>Останні ігрові новини</h1>
      <div className={styles.content}>
        {renderPosts && (
          <>
            <div className={styles.row}>
              <RecommendedCard key={renderPosts[0].id} post={renderPosts[0]} />
              <RecommendedCard key={renderPosts[1].id} post={renderPosts[1]} />
              <RecommendedCard key={renderPosts[2].id} post={renderPosts[2]} />
            </div>
            <div className={styles.row}>
              <RecommendedCard key={renderPosts[3].id} post={renderPosts[3]} />
              <RecommendedCard key={renderPosts[4].id} post={renderPosts[4]} />
            </div>
            <div className={styles.row}>
              <RecommendedCard key={renderPosts[5].id} post={renderPosts[5]} />
              <RecommendedCard key={renderPosts[6].id} post={renderPosts[6]} />
              <RecommendedCard key={renderPosts[7].id} post={renderPosts[7]} />
            </div>
          </>
        )}
      </div>
    </section>
  );
});

export default Recommended;
