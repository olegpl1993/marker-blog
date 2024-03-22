import styles from "./Home.module.css";
import Slider from "./Slider/Slider";

export function Home() {
  return (
    <div className={styles.home}>
      <Slider />
    </div>
  );
}
