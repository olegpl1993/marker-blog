import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { Link } from "react-router-dom";
import { fetchMediaLink } from "../../api/mediaLink";
import { PostType } from "../../types/post.types";
import SpinnerCircle from "../SpinnerCircle/SpinnerCircle";
import styles from "./Card.module.css";

interface Props {
  post: PostType;
}

const Card = memo((props: Props) => {
  const { post } = props;

  const imageQuery = useQuery({
    queryKey: ["image", post.featured_media],
    queryFn: () => fetchMediaLink(post.featured_media),
  });

  const createMarkup = () => {
    return { __html: post.excerpt.rendered };
  };

  return (
    <div className={styles.card}>
      <Link className={styles.imageBox} to={`/topic/${post.slug}`}>
        {imageQuery.isLoading && (
          <div>
            <SpinnerCircle />
          </div>
        )}
        {imageQuery.data === null && (
          <img
            className={styles.image}
            src={"/imageNotFound.jpg"}
            alt={"каринка відсутня"}
          />
        )}
        {imageQuery.data && (
          <img
            className={styles.image}
            src={imageQuery.data?.source_url}
            alt={post.title.rendered}
          />
        )}
      </Link>

      <div className={styles.info}>
        <div className={styles.wrapper}>
          <div className={styles.topRow}>
            <Link className={styles.title} to={`/topic/${post.slug}`}>
              {post.title.rendered}
            </Link>
            <div className={styles.dateBox}>
              <CalendarMonthIcon fontSize="small" className={styles.icon} />
              <p className={styles.date}>{post.date.split("T")[0]}</p>
            </div>
          </div>

          <div className={styles.strings}>
            {post.genre && (
              <span>
                <span className={styles.subString}>Жанри:</span>{" "}
                <span className={styles.string}>{post.genre}</span>
              </span>
            )}

            {post.platform && (
              <span>
                <span className={styles.subString}>Платформи:</span>{" "}
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
            href={`/topic/${post.slug}`}
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
