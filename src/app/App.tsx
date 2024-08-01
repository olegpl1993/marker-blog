import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer/Footer";
import ScrollToTopButton from "../shared/components/ScrollToTopButton/ScrollToTopButton";
import Header from "../widgets/Header/Header";
import styles from "./App.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
