import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button } from "@mui/material";
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
        {imageQuery.isLoading && <p>Loading...</p>}
        {imageQuery.data === null && (
          <img
            className={styles.image}
            src={"/imageNotFound.jpg"}
            onClick={imageClick}
          />
        )}
        {imageQuery.data && (
          <img
            className={styles.image}
            src={imageQuery.data?.source_url}
            alt={post.title.rendered}
            onClick={imageClick}
          />
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.wrapper}>
          <div className={styles.topRow}>
            <Link className={styles.title} to={`/topic/${post.id}`}>
              {post.title.rendered}
            </Link>
            <div className={styles.dateBox}>
              <CalendarMonthIcon fontSize="small" className={styles.icon} />
              <p className={styles.date}>{post.date.split("T")[0]}</p>
            </div>
          </div>

          {categoriesQuery.data && (
            <p className={styles.category}>
              {createCategoriesString(categoriesQuery.data, post.categories)}
            </p>
          )}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={createMarkup()}
          />
        </div>

        <div className={styles.bottomRow}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/topic/${post.id}`)}
            sx={{
              width: "100%",
              height: "40px",
              color: "var(--title-color)",
              borderColor: "var(--title-color)",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            читати детальніше
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
