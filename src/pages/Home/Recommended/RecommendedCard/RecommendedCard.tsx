import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { Link } from "react-router-dom";
import { fetchMediaLink } from "../../../../api/mediaLink";
import SpinnerCircle from "../../../../components/SpinnerCircle/SpinnerCircle";
import { PostType } from "../../../../types/post.types";
import styles from "./RecommendedCard.module.css";

interface Props {
  post: PostType;
}

const RecommendedCard = memo((props: Props) => {
  const { post } = props;

  const imageQuery = useQuery({
    queryKey: ["image", post.featured_media],
    queryFn: () => fetchMediaLink(post.featured_media),
  });

  return (
    <Link className={styles.recommendedCard} to={`/topic/${post.slug}`}>
      {imageQuery.isLoading && (
        <div>
          <SpinnerCircle />
        </div>
      )}
      {imageQuery.data === null && (
        <img
          className={styles.image}
          src={"/imageNotFound.webp"}
          alt={"каринка відсутня"}
        />
      )}
      {imageQuery.data && (
        <img
          className={styles.image}
          src={imageQuery.data?.source_url}
          alt={post.title.rendered}
          loading="lazy"
        />
      )}

      <div className={styles.content}>
        <div className={styles.row}>
          <h2 className={styles.title}>{post.title.rendered}</h2>
          <div className={styles.dateBox}>
            <CalendarMonthIcon fontSize="small" className={styles.icon} />
            <p className={styles.date}>{post.date.split("T")[0]}</p>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default RecommendedCard;
