import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CategoryContext } from "../../app/providers/CategoryProvider";
import { TagContext } from "../../app/providers/TagProvider";
import { fetchPosts } from "../../shared/api/posts";
import BreadCrumbs from "../../shared/components/BreadCrumbs/BreadCrumbs";
import Spinner from "../../shared/components/Spinner/Spinner";
import { Page404 } from "../Page404/Page404";
import styles from "./Blog.module.css";
import Card from "./Card/Card";
import PaginationBlog from "./PaginationBlog/PaginationBlog";
import { SeoBlog } from "./SeoBlog";
import Sidebar from "./Sidebar/Sidebar";

export function Blog() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const tagsSearchParams = searchParams.get("tags");

  const categories = useContext(CategoryContext);
  const tags = useContext(TagContext);

  const categoryName = categories?.find((item) => item.slug === category)?.name;
  const tagName = tags?.find((item) => item.slug === tagsSearchParams)?.name;
  const categoryId = categories?.find((item) => item.slug === category)?.id;
  const tagId = tags?.find((item) => item.slug === tagsSearchParams)?.id;

  const queryPosts = useQuery({
    queryKey: ["posts", categoryId, tagId, search, page],
    queryFn: () => fetchPosts({ categoryId, tagId, search, page }),
    enabled: category ? !!categoryId : true,
  });

  const totalPages = Number(queryPosts.data?.headers.get("X-WP-TotalPages"));

  if (queryPosts.isLoading)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  if (queryPosts.isError) return <Page404 />;

  const h1 =
    "Новини та огляди ігор " +
    (categoryName ? categoryName : "") +
    (tagName ? " жанру " + tagName : "");

  return (
    <div className={styles.blog}>
      <SeoBlog
        categoryName={categoryName}
        tagName={tagName}
        category={category}
        tagsSearchParams={tagsSearchParams}
      />

      <BreadCrumbs
        category={category}
        tagsSearchParams={tagsSearchParams}
        search={search}
      />

      <h1 className={styles.title}>{h1}</h1>

      <div className={styles.wrapper}>
        <section className={styles.content}>
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
        </section>
        <Sidebar />
      </div>
    </div>
  );
}
