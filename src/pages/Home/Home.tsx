import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Spinner from "../../components/Spinner/Spinner";
import { CategoryContext } from "../../contexts/CategoryProvider";
import { TagContext } from "../../contexts/TagProvider";
import styles from "./Home.module.css";
import Recommended from "./Recommended/Recommended";
import Slider from "./Slider/Slider";

export function Home() {
  const categories = useContext(CategoryContext);
  const tags = useContext(TagContext);

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
      <Recommended />
    </div>
  );
}
