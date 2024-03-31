import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

export function App() {
  return (
    <div className={styles.app}>
      <Helmet>
        <title>Game Marker</title>
        <meta
          name="description"
          content="Огляди нових і популярних ігор. Анонси майбутніх ігрових релізів і оновлень."
        />
        <meta
          name="keywords"
          content="відео ігри, ігрові анонси, огляди ігор, ігрові релізи, оновлення ігор"
        />
      </Helmet>

      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
