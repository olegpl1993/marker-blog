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
