import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.search}>
      <div className={styles.title}>Пошук постів</div>
      <div className={styles.inputBox}>
        <input type="text" placeholder="Знайти" />
      </div>
    </div>
  );
}

export default Search;
