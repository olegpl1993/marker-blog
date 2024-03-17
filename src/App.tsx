import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
