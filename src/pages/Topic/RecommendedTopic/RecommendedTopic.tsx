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
    queryFn: () =>
      fetchPosts({
        categoryId: categories,
        tagId: tags,
        perPage: 2,
        excludeId: id,
      }),
    enabled: categories.length > 0 || tags.length > 0,
  });
  const recommendedPosts = recommendedTopicQuery.data?.data;

  const additionalQuery = useQuery({
    queryKey: ["AdditionalQuery", recommendedPosts],
    queryFn: () => fetchPosts({ perPage: 20, excludeId: id }),
    enabled: !!recommendedPosts,
  });
  const randomAdditionalPosts = additionalQuery.data?.data.sort(
    () => Math.random() - 0.5
  );

  const renderData =
    recommendedPosts &&
    randomAdditionalPosts &&
    [...recommendedPosts, ...randomAdditionalPosts]
      .filter(
        (post, index, arr) =>
          index === arr.findIndex((findPost) => findPost.id === post.id)
      )
      .slice(0, 3);

  if (!renderData) return null;
  return (
    <div className={styles.recommendedTopic}>
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
