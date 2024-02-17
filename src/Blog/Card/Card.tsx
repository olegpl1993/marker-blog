import { useEffect, useState } from "react";
import { Post } from "../../types";
import styles from "./Card.module.css";

interface Props {
  post: Post;
}

function Card(props: Props) {
  const { post } = props;
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://marker.cx.ua/wp-json/wp/v2/media/${post.featured_media}`)
      .then((response) => response.json())
      .then((json) => setImage(json.source_url));
  }, [post.featured_media]);

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        {image ? (
          <img className={styles.image} src={image} alt={post.title.rendered} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{post.title.rendered}</div>
        <div className={styles.content}>{post.excerpt.rendered}</div>
      </div>
    </div>
  );
}

export default Card;
