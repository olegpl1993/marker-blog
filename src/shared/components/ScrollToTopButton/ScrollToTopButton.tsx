import { useEffect, useState } from "react";
import styles from "./ScrollToTopButton.module.css";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={styles.scrollToTopButton}
      color="primary"
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className={styles.border}>
        <div className={styles.arrowBox}>
          <span className={styles.arrow}>{">"}</span>
          <span className={`${styles.arrow} ${styles.arrow2}`}>{">"}</span>
          <span className={`${styles.arrow} ${styles.arrow3}`}>{">"}</span>
        </div>
      </div>
    </button>
  );
}

export default ScrollToTopButton;
