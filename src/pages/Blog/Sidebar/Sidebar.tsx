import Categories from "../../../components/Categories/Categories";
import Search from "../../../components/Search/Search";
import styles from "./Sidebar.module.css";
import SidebarCard from "./SidebarCard/SidebarCard";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <SidebarCard title="Пошук">
        <Search />
      </SidebarCard>
      <SidebarCard title="Категорії">
        <Categories />
      </SidebarCard>
    </aside>
  );
}

export default Sidebar;
