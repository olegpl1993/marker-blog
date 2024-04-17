import { PostType } from "../../../types/post.types";
import styles from "./Selected.module.css";
import SelectedCard from "./SelectedCard/SelectedCard";

interface Props {
  posts: PostType[];
}
function Selected(props: Props) {
  const { posts } = props;

  const renderPosts = posts.slice(8);

  return (
    <div className={styles.selected}>
      <h2 className={styles.title}>Ігрові новини та огляди</h2>
      {renderPosts && (
        <div className={styles.col}>
          {renderPosts.map((post) => (
            <SelectedCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Selected;
