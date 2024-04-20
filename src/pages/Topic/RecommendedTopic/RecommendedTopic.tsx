import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { fetchPosts } from "../../../api/posts";
import RecommendedCard from "../../../components/RecommendedCard/RecommendedCard";
import styles from "./RecommendedTopic.module.css";

interface Props {
  categories: number[];
  tags: number[];
  id: number;
}

const RecommendedTopic = memo((props: Props) => {
  const { categories, tags, id } = props;

  const recommendedTopicQuery = useQuery({
    queryKey: ["RecommendedQuery", categories, tags],
    queryFn: () => fetchPosts(categories, tags, undefined, undefined, 3, id),
    enabled: categories.length > 0 || tags.length > 0,
  });
  const data = recommendedTopicQuery.data?.data;

  const additionalQuery = useQuery({
    queryKey: ["AdditionalQuery", data],
    queryFn: () =>
      fetchPosts(
        undefined,
        undefined,
        undefined,
        undefined,
        3 - data!.length,
        id
      ),
    enabled: data && data.length < 3 ? true : false,
  });

  const renderData =
    data && additionalQuery.data?.data
      ? [...data, ...additionalQuery.data.data]
      : data;

  return (
    <div className={styles.recommendedTopic}>
      <h2 className={styles.title}>Рекомендуемо новини</h2>
      <div className={styles.row}>
        {renderData &&
          renderData.map((post) => (
            <RecommendedCard key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
});

export default RecommendedTopic;
