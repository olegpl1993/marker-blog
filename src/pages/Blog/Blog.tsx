import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../api/posts";
import { fetchPostsByCategory } from "../../api/postsByCategory";
import Spinner from "../../components/Spinner/Spinner";
import PageNotFound from "../PageNotFound/PageNotFound";
import styles from "./Blog.module.css";
import Card from "./Card/Card";
import Sidebar from "./Sidebar/Sidebar";

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

  if (query.isError) return <PageNotFound />;

  return (
    <div className={styles.blog}>
      <div className={styles.content}>
        {query.data?.map((post) => (
          <div className={styles.post} key={post.id}>
            <Card post={post} />
          </div>
        ))}
      </div>

      <Sidebar />
    </div>
  );
}

export default Blog;
