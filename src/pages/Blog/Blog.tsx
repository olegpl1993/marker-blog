import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchPosts } from "../../api/posts";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import { CategoryContext } from "../../contexts/CategoryProvider";
import { TagContext } from "../../contexts/TagProvider";
import { Page404 } from "../Page404/Page404";
import styles from "./Blog.module.css";
import PaginationBlog from "./PaginationBlog/PaginationBlog";
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
  const categoryID = categories?.find((item) => item.slug === category)?.id;
  const tagID = tags?.find((item) => item.slug === tagsSearchParams)?.id;

  const queryPosts = useQuery({
    queryKey: ["posts", categoryID, tagID, search, page],
    queryFn: () => fetchPosts(categoryID, tagID, search, page),
    enabled: category ? !!categoryID : true,
  });

  const totalPages = Number(queryPosts.data?.headers.get("X-WP-TotalPages"));

  if (queryPosts.isLoading)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  if (queryPosts.isError) return <Page404 />;

  return (
    <div className={styles.blog}>
      <Helmet>
        <title>{`${categoryName ? categoryName + " - " : ""} ${
          tagName ? tagName + " - " : ""
        } Game Marker Блог`}</title>
        <meta
          name="description"
          content={tags?.map((item) => item.name).join(", ")}
        />
        <meta
          name="keywords"
          content={categories?.map((item) => item.name).join(", ")}
        />
      </Helmet>

      <BreadCrumbs
        category={category}
        tagsSearchParams={tagsSearchParams}
        search={search}
      />

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
