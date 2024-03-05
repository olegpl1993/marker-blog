import Categories from "./Categories/Categories";
import Search from "./Search/Search";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Search />
      <Categories />
    </aside>
  );
}

export default Sidebar;
