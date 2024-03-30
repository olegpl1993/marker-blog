import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import SpinnerCircle from "./components/SpinnerCircle/SpinnerCircle";
import { CategoryProvider } from "./contexts/CategoryProvider";
import { TagProvider } from "./contexts/TagProvider";
import "./styles/index.css";

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
            <Header />
            <main className={styles.main}>
              <Suspense fallback={<SpinnerCircle />}>
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
