import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Spinner from "../../components/Spinner/Spinner";
import { CategoryContext } from "../../contexts/CategoryProvider";
import { TagContext } from "../../contexts/TagProvider";
import styles from "./Home.module.css";
import Recommended from "./Recommended/Recommended";
import Slider from "./Slider/Slider";

function Home() {
  const categories = useContext(CategoryContext);
  const tags = useContext(TagContext);

  return (
    <div className={styles.home}>
      <Helmet>
        <title>Game Marker</title>
      </Helmet>

      {!categories || !tags ? (
        <div className={styles.spinnerBox}>
          <Spinner />
        </div>
      ) : (
        <>
          <Slider />
          <Recommended />
        </>
      )}
    </div>
  );
}

export default Home;
