import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMediaLink } from "../../api/mediaLink";
import { PostType } from "../../types/post.types";
import SpinnerCircle from "../SpinnerCircle/SpinnerCircle";
import styles from "./Card.module.css";

interface Props {
  post: PostType;
}

const Card = memo((props: Props) => {
  const { post } = props;
  const navigate = useNavigate();

  const imageQuery = useQuery({
    queryKey: ["image", post.featured_media],
    queryFn: () => fetchMediaLink(post.featured_media),
  });

  const createMarkup = () => {
    return { __html: post.excerpt.rendered };
  };

  const selectClick = () => {
    navigate(`/topic/${post.slug}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        {imageQuery.isLoading && (
          <div>
            <SpinnerCircle />
          </div>
        )}
        {imageQuery.data === null && (
          <img
            className={styles.image}
            src={"/imageNotFound.jpg"}
            onClick={selectClick}
          />
        )}
        {imageQuery.data && (
          <img
            className={styles.image}
            src={imageQuery.data?.source_url}
            alt={post.title.rendered}
            onClick={selectClick}
          />
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.wrapper}>
          <div className={styles.topRow}>
            <div className={styles.title} onClick={selectClick}>
              {post.title.rendered}
            </div>
            <div className={styles.dateBox}>
              <CalendarMonthIcon fontSize="small" className={styles.icon} />
              <p className={styles.date}>{post.date.split("T")[0]}</p>
            </div>
          </div>

          <div className={styles.strings}>
            {post.genre && (
              <span>
                Жанри: <span className={styles.string}>{post.genre}</span>
              </span>
            )}

            {post.platform && (
              <span>
                Платформи:{" "}
                <span className={styles.string}>{post.platform}</span>
              </span>
            )}
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={createMarkup()}
          />
        </div>

        <div className={styles.bottomRow}>
          <Button
            variant="outlined"
            onClick={selectClick}
            sx={{
              height: "40px",
              color: "var(--secondary-color)",
              borderColor: "var(--secondary-color)",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              "@media (max-width: 412px)": {
                width: "100%",
              },
            }}
          >
            читати детальніше
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Card;
