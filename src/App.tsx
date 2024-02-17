import styles from "./App.module.css";
import Blog from "./Blog/Blog";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>MARKER</div>
        <div className={styles.menu}>MENU</div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Blog />
        </div>
      </main>
      <footer className={styles.footer}>MARKER-GAME 2024</footer>
    </div>
  );
}

export default App;
