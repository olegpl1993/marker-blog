import { useQuery } from "@tanstack/react-query";
import { DiscussionEmbed } from "disqus-react";
import { useParams } from "react-router-dom";
import { fetchPostBySlug } from "../../shared/api/postBySlug";
import BreadCrumbs from "../../shared/components/BreadCrumbs/BreadCrumbs";
import Spinner from "../../shared/components/Spinner/Spinner";
import { decodeHtmlEntities } from "../../shared/utils/decodeHtmlEntities";
import { Page404 } from "../Page404/Page404";
import RecommendedTopic from "./RecommendedTopic/RecommendedTopic";
import { SeoTopic } from "./SeoTopic";
import Share from "./Share/Share";
import styles from "./Topic.module.css";

export function Topic() {
  const { slug } = useParams();

  const postQuery = useQuery({
    queryKey: ["fetchPostBySlug", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
  });

  const dataFields = [
    { label: "Назва гри", value: postQuery.data?.game },
    { label: "Дата видання", value: postQuery.data?.release },
    { label: "Жанри", value: postQuery.data?.genre },
    { label: "Платформи", value: postQuery.data?.platform },
    { label: "Розробник", value: postQuery.data?.developer },
    { label: "Видавець", value: postQuery.data?.publisher },
  ];

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
      <SeoTopic title={title} slug={slug} />

      <BreadCrumbs
        categories={postQuery.data?.categories}
        title={title}
        game={postQuery.data?.game}
      />

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.strings}>
        {dataFields.map(
          (field, index) =>
            field.value && (
              <span key={index}>
                {field.label}:{" "}
                <span className={styles.string}>{field.value}</span>
              </span>
            )
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
