import { useQuery } from "@tanstack/react-query";
import { DiscussionEmbed } from "disqus-react";
import { useEffect, useRef, useState } from "react";
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
import ImagesGallery from "../../shared/components/ImagesGallery/ImagesGallery";

export function Topic() {
  const { slug } = useParams();

  const [openImage, setOpenImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageArr, setImageArr] = useState<string[]>([]);

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

  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!postQuery.data?.content.rendered) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(postQuery.data?.content.rendered, 'text/html');
    const imgTags = doc.querySelectorAll('img');
    const srcArray = Array.from(imgTags).map(img => img.src);
    setImageArr(srcArray);
  }, [postQuery.data?.content.rendered]);

  const imageClickHandler = (event: MouseEvent) => {
    if (event.target instanceof HTMLImageElement) {
      setOpenImage(true);
      setImageUrl(event.target.src);
    }
  };

  useEffect(() => {
    const refContentCurrent = refContent.current;

    if (refContentCurrent)
      refContentCurrent.addEventListener("click", imageClickHandler);

    return () => {
      if (refContentCurrent)
        refContentCurrent.removeEventListener("click", imageClickHandler);
    };
  }, [postQuery.data?.content.rendered]);

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
        ref={refContent}
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

      <ImagesGallery isOpen={openImage} setIsOpen={setOpenImage} imageArr={imageArr} imageUrl={imageUrl} />
    </div>
  );
}
