import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import { fetchPosts } from "../../../api/posts";
import SpinnerCircle from "../../../components/SpinnerCircle/SpinnerCircle";
import { PostType } from "../../../types/post.types";
import styles from "./Selected.module.css";
import SelectedCard from "./SelectedCard/SelectedCard";

interface Props {
  posts: PostType[];
}
const Selected = memo((props: Props) => {
  const { posts } = props;

  const [renderPosts, setRenderPosts] = useState<PostType[]>(posts.slice(8));
  const [postsPage, setPostsPage] = useState<number>(2);

  const queryPosts = useQuery({
    queryKey: ["NextPosts", postsPage],
    queryFn: () =>
      fetchPosts(undefined, undefined, undefined, String(postsPage), 10),
    enabled: postsPage > 2,
  });

  const postsPageQuantity = queryPosts.data?.headers.get("X-WP-TotalPages");
  const isNextButtonActive =
    postsPageQuantity === undefined || postsPage < Number(postsPageQuantity);
  const getNextPosts = () => isNextButtonActive && setPostsPage(postsPage + 1);

  useEffect(() => {
    if (queryPosts.data?.data) {
      setRenderPosts((prevRenderPosts) => [
        ...prevRenderPosts,
        ...queryPosts.data.data,
      ]);
    }
  }, [queryPosts.data?.data]);

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

      {isNextButtonActive && !queryPosts.isLoading && (
        <Button
          variant="outlined"
          onClick={getNextPosts}
          sx={{
            height: "40px",
            color: "var(--secondary-color)",
            borderColor: "var(--secondary-color)",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            "@media (max-width: 414px)": {
              width: "100%",
            },
          }}
        >
          більше новин
        </Button>
      )}

      {queryPosts.isLoading && (
        <div className={styles.spinnerBox}>
          <SpinnerCircle />
        </div>
      )}
    </div>
  );
});

export default Selected;
