import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import { Blog } from "./pages/Blog/Blog";
import { Home } from "./pages/Home/Home";
import { Page404 } from "./pages/Page404/Page404";
import { Topic } from "./pages/Topic/Topic";

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:category" element={<Blog />} />
          <Route path="topic/:id" element={<Topic />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
