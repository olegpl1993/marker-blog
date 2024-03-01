import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../api/categories";
import { fetchMediaLink } from "../../../api/mediaLink";
import { PostType } from "../../../types/post.types";
import styles from "./Card.module.css";
import { createCategoriesString } from "./Card.utils";

interface Props {
  post: PostType;
}

function Card(props: Props) {
  const { post } = props;
  const navigate = useNavigate();

  const imageQuery = useQuery({
    queryKey: ["image", post.featured_media],
    queryFn: () => fetchMediaLink(post.featured_media),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const createMarkup = () => {
    return { __html: post.excerpt.rendered };
  };

  const imageClick = () => {
    navigate(`/topic/${post.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        {!imageQuery.isLoading ? (
          <img
            className={styles.image}
            src={imageQuery.data?.source_url}
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
        <p className={styles.date}>{post.date.split("T")[0]}</p>
        {categoriesQuery.isSuccess && (
          <p className={styles.category}>
            {createCategoriesString(categoriesQuery.data, post.categories)}
          </p>
        )}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    </div>
  );
}

export default Card;
