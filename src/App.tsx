import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
