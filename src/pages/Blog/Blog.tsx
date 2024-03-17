import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchPosts } from "../../api/posts";
import Spinner from "../../components/Spinner/Spinner";
import { CategoryContext } from "../../contexts/CategoryProvider";
import PageNotFound from "../PageNotFound/PageNotFound";
import styles from "./Blog.module.css";
import Card from "./Card/Card";
import PaginationBlog from "./PaginationBlog/PaginationBlog";
import Sidebar from "./Sidebar/Sidebar";

export function Blog() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const categories = useContext(CategoryContext);

  const categoryID = categories?.find((item) => item.slug === category)?.id;
  const categoryName = categories?.find((item) => item.slug === category)?.name;

  const queryPosts = useQuery({
    queryKey: ["posts", categoryID, search, page],
    queryFn: () => fetchPosts(categoryID, search, page),
    enabled: category ? !!categoryID : true,
  });

  const totalPages = Number(queryPosts.data?.headers.get("X-WP-TotalPages"));

  if (queryPosts.isLoading)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  if (queryPosts.isError) return <PageNotFound />;

  return (
    <div className={styles.blog}>
      {categoryName && (
        <h1 className={styles.title}>
          Категорія: <span className={styles.category}>{categoryName}</span>
        </h1>
      )}
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {queryPosts.data?.data?.length === 0 ? (
            <div className={styles.noPosts}>Постів не знайдено</div>
          ) : (
            queryPosts.data?.data?.map((post) => (
              <div className={styles.post} key={post.id}>
                <Card post={post} />
              </div>
            ))
          )}
          {totalPages > 1 && <PaginationBlog totalPages={totalPages} />}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
