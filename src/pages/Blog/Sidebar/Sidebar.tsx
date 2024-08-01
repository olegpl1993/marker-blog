import { memo } from "react";
import Categories from "../../../shared/components/Categories/Categories";
import Search from "../../../shared/components/Search/Search";
import Genres from "../../../shared/components/Tags/Tags";
import styles from "./Sidebar.module.css";
import SidebarCard from "./SidebarCard/SidebarCard";

const Sidebar = memo(() => {
  return (
    <aside className={styles.sidebar}>
      <SidebarCard title="Пошук">
        <Search />
      </SidebarCard>
      <SidebarCard title="Категорії">
        <Categories />
      </SidebarCard>
      <SidebarCard title="Теги">
        <Genres />
      </SidebarCard>
    </aside>
  );
});

export default Sidebar;
