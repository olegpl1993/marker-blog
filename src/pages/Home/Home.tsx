import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { CategoryContext } from "../../app/providers/CategoryProvider";
import { TagContext } from "../../app/providers/TagProvider";
import { fetchPosts } from "../../shared/api/posts";
import Spinner from "../../shared/components/Spinner/Spinner";
import SpinnerCircle from "../../shared/components/SpinnerCircle/SpinnerCircle";
import styles from "./Home.module.css";
import Recommended from "./Recommended/Recommended";
import Selected from "./Selected/Selected";
import { SeoHome } from "./SeoHome";
import Slider from "./Slider/Slider";

export function Home() {
  const categories = useContext(CategoryContext);
  const tags = useContext(TagContext);

  const queryPosts = useQuery({
    queryKey: ["HomePosts"],
    queryFn: () => fetchPosts({ perPage: 20 }),
  });

  if (!categories || !tags)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.home}>
      <SeoHome />

      <Slider />

      {queryPosts.isLoading && (
        <div className={styles.spinnerBox}>
          <SpinnerCircle />
        </div>
      )}

      {queryPosts.data && (
        <>
          <Recommended posts={queryPosts.data.data} />
          <Selected posts={queryPosts.data.data} />
        </>
      )}
    </div>
  );
}
