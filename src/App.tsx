import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import { CategoryProvider } from "./contexts/CategoryProvider";
import { TagProvider } from "./contexts/TagProvider";
import "./styles/index.css";
import { Helmet } from "react-helmet-async";

const Home = lazy(() => import("./pages/Home/Home"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const Topic = lazy(() => import("./pages/Topic/Topic"));
const Page404 = lazy(() => import("./pages/Page404/Page404"));

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CategoryProvider>
        <TagProvider>
          <div className={styles.app}>
            <Helmet>
              <meta
                name="description"
                content="Блог про ігри. Огляди нових і популярних ігор. Публікація новин про ігрову індустрію, анонси майбутніх релізів, оновлень і подій у світі ігор."
              />
              <meta
                name="keywords"
                content="ігри, огляди ігор, ігрові анонси, ігрова індустрія, games, games reviews, games releases, games news, games events, gaming industry"
              />
              <meta property="og:title" content="Game Marker" />
              <meta
                property="og:description"
                content="Блог про ігри. Огляди нових і популярних ігор. Публікація новин про ігрову індустрію, анонси майбутніх релізів, оновлень і подій у світі ігор."
              />
              <meta property="og:image" content="/logo-gamepad.png" />
            </Helmet>
            <Header />
            <main className={styles.main}>
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:category" element={<Blog />} />
                  <Route path="/topic/:id" element={<Topic />} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <ScrollToTopButton />
          </div>
        </TagProvider>
      </CategoryProvider>
    </QueryClientProvider>
  );
}
