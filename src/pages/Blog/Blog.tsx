import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchPosts } from "../../api/posts";
import { fetchPostsByCategory } from "../../api/postsByCategory";
import Spinner from "../../components/Spinner/Spinner";
import PageNotFound from "../PageNotFound/PageNotFound";
import styles from "./Blog.module.css";
import Card from "./Card/Card";
import Sidebar from "./Sidebar/Sidebar";

function Blog() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get("search");

  const query = useQuery({
    queryKey: ["posts", category, queryValue],
    queryFn: category
      ? () => fetchPostsByCategory(category, queryValue)
      : () => fetchPosts(queryValue),
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
        {query.data?.length === 0 ? (
          <div className={styles.noPosts}>Постів не знайдено</div>
        ) : (
          query.data?.map((post) => (
            <div className={styles.post} key={post.id}>
              <Card post={post} />
            </div>
          ))
        )}
      </div>

      <Sidebar />
    </div>
  );
}

export default Blog;
