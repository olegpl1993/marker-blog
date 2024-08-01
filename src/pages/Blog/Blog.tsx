import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
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

  const description =
    categoryName || tagName
      ? "Новини та огляди популярних ігор та анонси ігрових релізів" +
        (categoryName ? " у категорії " + categoryName : "") +
        (tagName ? " жанру " + tagName : "")
      : `Ігрові новини, анонси, огляди геймплей, відео ігри у жанрах: шутери, слешери, аркади, стелс, екшн, симулятори, економічні, стратегії, пригоди, рольові ігри, тактичні, РПГ, головоломки, онлайн ігри.`;

  const title =
    categoryName || tagName
      ? (categoryName ? categoryName + " - " : "") +
        (tagName ? tagName + " - " : "") +
        "огляди українською | Game Marker"
      : `Ігрові новини та огляди українською | Game Marker`;

  const h1 =
    "Новини та огляди ігор " +
    (categoryName ? categoryName : "") +
    (tagName ? " жанру " + tagName : "");

  return (
    <div className={styles.blog}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={
            "https://marker.cx.ua/blog" +
            (category ? "/" + category : "") +
            (tagsSearchParams ? "?tags=" + tagsSearchParams : "")
          }
        />
      </Helmet>

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
