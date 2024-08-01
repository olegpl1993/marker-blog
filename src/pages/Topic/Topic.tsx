import { useQuery } from "@tanstack/react-query";
import { DiscussionEmbed } from "disqus-react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { fetchPostBySlug } from "../../shared/api/postBySlug";
import BreadCrumbs from "../../shared/components/BreadCrumbs/BreadCrumbs";
import Spinner from "../../shared/components/Spinner/Spinner";
import { decodeHtmlEntities } from "../../shared/utils/decodeHtmlEntities";
import { getFirstSentence } from "../../shared/utils/getFirstSentence";
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

      <div className={styles.disqus}>
        <DiscussionEmbed
          shortname="game-marker-1"
          config={{
            url: `https://marker.cx.ua/topic/${slug}`,
            identifier: slug,
            title: title,
            language: "ua",
          }}
        />
      </div>

      <RecommendedTopic
        categories={postQuery.data?.categories}
        tags={postQuery.data?.tags}
        id={postQuery.data?.id}
      />
    </div>
  );
}
