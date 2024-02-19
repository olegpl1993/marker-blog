import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { Post } from "../types";
import styles from "./Topic.module.css";

function Topic() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    post?.featured_media &&
      fetch(`http://marker.cx.ua/wp-json/wp/v2/media/${post.featured_media}`)
        .then((response) => response.json())
        .then((json) => setImage(json.source_url));
  }, [post, post?.featured_media]);

  useEffect(() => {
    fetch("http://marker.cx.ua/wp-json/wp/v2/posts/" + id)
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, [id]);

  if (!post)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.topic}>
      <div className={styles.title}>{post?.title.rendered}</div>
      <div className={styles.imageBox}>
        {image ? (
          <img
            className={styles.image}
            src={image}
            alt={post?.title.rendered}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.content}>{post?.content.rendered}</div>
    </div>
  );
}

export default Topic;
