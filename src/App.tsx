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
          content="Блог про ігри. Огляди нових і популярних ігор. Публікація новин про ігрову індустрію, анонси майбутніх релізів і оновлень"
        />
        <meta
          name="keywords"
          content="ігри, огляди ігор, ігрові анонси, ігрова індустрія, games, games reviews, games releases, games news, games events, gaming industry"
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
