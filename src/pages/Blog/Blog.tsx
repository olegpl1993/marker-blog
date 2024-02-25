import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../api/posts";
import { fetchPostsByCategory } from "../../api/postsByCategory";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Blog.module.css";
import Card from "./Card/Card";

function Blog() {
  const { category } = useParams();

  const query = useQuery({
    queryKey: ["posts", category],
    queryFn: category
      ? () => fetchPostsByCategory(category)
      : () => fetchPosts(),
  });

  if (query.isLoading)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.blog}>
      {query.data?.map((post) => (
        <div className={styles.post} key={post.id}>
          <Card post={post} />
        </div>
      ))}
    </div>
  );
}

export default Blog;
