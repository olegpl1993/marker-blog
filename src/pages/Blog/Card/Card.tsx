import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { memo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchMediaLink } from "../../../api/mediaLink";
import SpinnerCircle from "../../../components/SpinnerCircle/SpinnerCircle";
import { CategoryContext } from "../../../contexts/CategoryProvider";
import { PostType } from "../../../types/post.types";
import { createCategoriesString } from "../../../utils/category.utils";
import styles from "./Card.module.css";

interface Props {
  post: PostType;
}

const Card = memo((props: Props) => {
  const { post } = props;
  const navigate = useNavigate();
  const categories = useContext(CategoryContext);

  const imageQuery = useQuery({
    queryKey: ["image", post.featured_media],
    queryFn: () => fetchMediaLink(post.featured_media),
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
        {imageQuery.isLoading && (
          <div>
            <SpinnerCircle />
          </div>
        )}
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

          {categories && (
            <p className={styles.category}>
              {createCategoriesString(categories, post.categories)}
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
