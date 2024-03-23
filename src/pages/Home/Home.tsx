import styles from "./Home.module.css";
import Recommended from "./Recommended/Recommended";
import Slider from "./Slider/Slider";

export function Home() {
  return (
    <div className={styles.home}>
      <Slider />
      <Recommended />
    </div>
  );
}
