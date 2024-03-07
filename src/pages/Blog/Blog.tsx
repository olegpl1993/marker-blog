import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchCategories } from "../../api/categories";
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

  const queryCategories = useQuery({
    queryKey: ["categories", category],
    queryFn: () => fetchCategories(),
    enabled: !!category,
  });

  const categoryID = queryCategories.data?.find(
    (item) => item.slug === category
  )?.id;

  const queryPosts = useQuery({
    queryKey: ["posts", queryValue, category],
    queryFn: () => fetchPosts(queryValue),
    enabled: !category,
  });

  const queryCategoryPosts = useQuery({
    queryKey: ["categoryPosts", category, queryValue, categoryID],
    queryFn: () => fetchPostsByCategory(categoryID!, queryValue),
    enabled: !!categoryID,
  });

  const queryResult = category ? queryCategoryPosts : queryPosts;

  if (queryResult.isLoading)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  if (queryResult.isError) return <PageNotFound />;

  return (
    <div className={styles.blog}>
      <div className={styles.content}>
        {queryResult.data?.length === 0 ? (
          <div className={styles.noPosts}>Постів не знайдено</div>
        ) : (
          queryResult.data?.map((post) => (
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
