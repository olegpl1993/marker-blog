import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { fetchMediaLink } from "../../../api/mediaLink";
import { PostType } from "../../../types/post.types";
import styles from "./Card.module.css";

interface Props {
  post: PostType;
}

function Card(props: Props) {
  const { post } = props;
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["image", post.featured_media],
    queryFn: () => fetchMediaLink(post.featured_media),
  });

  const imageClick = () => {
    navigate(`/topic/${post.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        {!query.isLoading ? (
          <img
            className={styles.image}
            src={query.data?.source_url}
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
