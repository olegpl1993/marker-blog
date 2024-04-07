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

  const description =
    categoryName || tagName
      ? `Блог з оглядами нових і популярних ігор та анонсами ігрових релізів ${
          categoryName ? "у категорії " + categoryName : ""
        } ${tagName ? "жанру " + tagName : ""}`
      : `Блог з оглядами ігрових новин та популярних ігор у жанрах: 3D-шутери, тактичні шутери, слешери, аркади, стелс-екшн, симулятори, економічні, стратегії, пригоди, рольові ігри, тактичні РПГ, головоломки, онлайнові ігри.`;

  const title =
    categoryName || tagName
      ? `${categoryName ? categoryName + " - " : ""} ${
          tagName ? tagName + " - " : ""
        } Game Marker - Ігрові огляди`
      : `Game Marker Блог - Оглядаемо відео ігри, новини ігрових релізів.`;

  const h1 =
    "Ігрові новини та огляди" +
    (categoryName ? " у категорії " + categoryName : "") +
    (tagName ? " жанру " + tagName : "");

  return (
    <div className={styles.blog}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="3D шутери, тактичні шутери, слешери, аркади, стелс, симулятори, стратегії, пригоди, рольові ігри, тактичні РПГ, головоломки, онлайнові ігри"
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
