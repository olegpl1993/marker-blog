import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchMediaLink } from "../../../../api/mediaLink";
import SpinnerCircle from "../../../../components/SpinnerCircle/SpinnerCircle";
import { PostType } from "../../../../types/post.types";
import styles from "./HomeCard.module.css";

interface Props {
  post: PostType;
}

function HomeCard(props: Props) {
  const { post } = props;

  const imageQuery = useQuery({
    queryKey: ["image", post.featured_media],
    queryFn: () => fetchMediaLink(post.featured_media),
  });

  return (
    <Link className={styles.homeCard} to={`/topic/${post.slug}`}>
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
        />
      )}

      <div className={styles.content}>
        <div className={styles.row}>
          <h3 className={styles.title}>{post.title.rendered}</h3>
          <div className={styles.dateBox}>
            <CalendarMonthIcon fontSize="small" className={styles.icon} />
            <p className={styles.date}>{post.date.split("T")[0]}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HomeCard;
