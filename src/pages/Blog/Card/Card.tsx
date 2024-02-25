import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostType } from "../../../types/post.types";
import styles from "./Card.module.css";
import { fetchMediaLink } from "./Card.utils";

interface Props {
  post: PostType;
}

function Card(props: Props) {
  const { post } = props;
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const getImageLink = async () => {
      setImage(await fetchMediaLink(post.featured_media));
    };
    getImageLink();
  }, [post.featured_media]);

  const imageClick = () => {
    navigate(`/topic/${post.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        {image ? (
          <img
            className={styles.image}
            src={image}
            alt={post.title.rendered}
            onClick={imageClick}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.info}>
        <Link className={styles.title} to={`/topic/${post.id}`}>
          {post.title.rendered}
        </Link>
        <div className={styles.content}>{post.excerpt.rendered}</div>
      </div>
    </div>
  );
}

export default Card;
