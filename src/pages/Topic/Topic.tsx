import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { fetchPostBySlug } from "../../api/postBySlug";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Spinner from "../../components/Spinner/Spinner";
import { decodeHtmlEntities } from "../../utils/decodeHtmlEntities";
import { getFirstSentence } from "../../utils/getFirstSentence";
import { Page404 } from "../Page404/Page404";
import RecommendedTopic from "./RecommendedTopic/RecommendedTopic";
import Share from "./Share/Share";
import styles from "./Topic.module.css";

export function Topic() {
  const { slug } = useParams();

  const postQuery = useQuery({
    queryKey: ["fetchPostBySlug", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
  });

  const title =
    postQuery.data?.title.rendered &&
    decodeHtmlEntities(postQuery.data?.title.rendered);

  if (postQuery.isLoading)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  if (!postQuery.data) return <Page404 />;

  return (
    <div className={styles.topic}>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={getFirstSentence(postQuery.data?.excerpt.rendered)}
        />
        <link rel="canonical" href={`https://marker.cx.ua/topic/${slug}`} />

        {/* TEST OG META */}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={getFirstSentence(postQuery.data?.excerpt.rendered)}
        />
        <meta
          property="og:image"
          content="https://wp.marker.cx.ua/wp-content/uploads/2024/04/1662320177173925581.webp"
        />
        <meta property="twitter:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content={getFirstSentence(postQuery.data?.excerpt.rendered)}
        />
        <meta
          name="twitter:image:src"
          content="https://wp.marker.cx.ua/wp-content/uploads/2024/04/1662320177173925581.webp"
        />
        {/* TEST OG META */}
      </Helmet>

      <BreadCrumbs
        categories={postQuery.data?.categories}
        title={title}
        game={postQuery.data?.game}
      />

      <h1 className={styles.title}>{title}</h1>
      <div className={styles.strings}>
        {postQuery.data?.game && (
          <span>
            Назва гри:{" "}
            <span className={styles.string}>{postQuery.data?.game}</span>
          </span>
        )}

        {postQuery.data?.release && (
          <span>
            Дата видання:{" "}
            <span className={styles.string}>{postQuery.data?.release}</span>
          </span>
        )}

        {postQuery.data?.genre && (
          <span>
            Жанри:{" "}
            <span className={styles.string}>{postQuery.data?.genre}</span>
          </span>
        )}

        {postQuery.data?.platform && (
          <span>
            Платформи:{" "}
            <span className={styles.string}>{postQuery.data?.platform}</span>
          </span>
        )}

        {postQuery.data?.developer && (
          <span>
            Розробник:{" "}
            <span className={styles.string}>{postQuery.data?.developer}</span>
          </span>
        )}

        {postQuery.data?.publisher && (
          <span>
            Видавець:{" "}
            <span className={styles.string}>{postQuery.data?.publisher}</span>
          </span>
        )}
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: postQuery.data?.content.rendered }}
      />

      <Share textToShare={title} />

      <RecommendedTopic
        categories={postQuery.data?.categories}
        tags={postQuery.data?.tags}
        id={postQuery.data?.id}
      />
    </div>
  );
}
