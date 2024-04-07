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
          Game Marker - Огляди відео ігор та анонси ігрових релізів.
        </title>
        <meta
          name="description"
          content="Відкрийте для себе нові та популярні відеоігри разом із нашими оглядами та анонсами. Будьте в курсі останніх ігрових релізів та оновлень."
        />
        <meta
          name="keywords"
          content="відео ігри, ігрові анонси, огляди ігор, ігрові релізи, оновлення ігор, популярні ігри, ігрові події"
        />
        <link rel="canonical" href="https://marker.cx.ua" />
      </Helmet>
      <Slider />
      <Recommended />
    </div>
  );
}
