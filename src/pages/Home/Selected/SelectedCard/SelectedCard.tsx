import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchMediaLink } from "../../../../api/mediaLink";
import SpinnerCircle from "../../../../components/SpinnerCircle/SpinnerCircle";
import { PostType } from "../../../../types/post.types";
import { getFirstParagraph } from "../../../../utils/getFirstParagraph";
import styles from "./SelectedCard.module.css";

interface Props {
  post: PostType;
}

function SelectedCard(props: Props) {
  const { post } = props;

  const imageQuery = useQuery({
    queryKey: ["image", post.featured_media],
    queryFn: () => fetchMediaLink(post.featured_media),
  });

  return (
    <Link className={styles.selectedCard} to={`/topic/${post.slug}`}>
      <div className={styles.imageBox} >
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
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.title}>
            {post.title.rendered}
          </div>
          <div className={styles.dateBox}>
            <CalendarMonthIcon fontSize="small" className={styles.icon} />
            <p className={styles.date}>{post.date.split("T")[0]}</p>
          </div>
        </div>
        <p className={styles.text}>
          {getFirstParagraph(post.excerpt.rendered)}
        </p>
      </div>
    </Link>
  );
}

export default SelectedCard;
