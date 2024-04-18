import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { fetchPosts } from "../../api/posts";
import Spinner from "../../components/Spinner/Spinner";
import SpinnerCircle from "../../components/SpinnerCircle/SpinnerCircle";
import { CategoryContext } from "../../contexts/CategoryProvider";
import { TagContext } from "../../contexts/TagProvider";
import styles from "./Home.module.css";
import Recommended from "./Recommended/Recommended";
import Selected from "./Selected/Selected";
import Slider from "./Slider/Slider";

export function Home() {
  const categories = useContext(CategoryContext);
  const tags = useContext(TagContext);

  const queryPosts = useQuery({
    queryKey: ["HomePosts"],
    queryFn: () => fetchPosts(undefined, undefined, undefined, undefined, 20),
  });

  if (!categories || !tags)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.home}>
      <Helmet>
        <title>
          Game Marker - Останні ігрові новини та огляди на відео ігри
        </title>
        <meta
          name="description"
          content="Нові та популярні відео ігри, анонси та гайди, геймплей, топ ігор, кіберспорт. Дізнайтесь про останні ігрові релізи та оновлення."
        />
        <link rel="canonical" href="https://marker.cx.ua" />
      </Helmet>

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
