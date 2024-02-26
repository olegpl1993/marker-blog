import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <div className={styles.imgBox}>
        <img
          className={styles.img}
          src="/pageNotFound1.jpg"
          alt="page not found"
        />
      </div>
    </div>
  );
}

export default PageNotFound;
