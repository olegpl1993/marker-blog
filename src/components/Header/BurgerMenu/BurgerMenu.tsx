import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { CategoryType } from "../../../types/category.types";
import Categories from "../../Categories/Categories";
import Modal from "../../Modal/Modal";
import Search from "../../Search/Search";
import styles from "./BurgerMenu.module.css";

interface Props {
  categories: CategoryType[] | undefined;
}

function BurgerMenu(props: Props) {
  const { categories } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (!categories) return null;

  return (
    <div className={styles.burgerMenu}>
      <IconButton onClick={handleOpen}>
        <MenuIcon fontSize="large" className={styles.burgerIcon} />
      </IconButton>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={styles.content}>
          <Search />
          <Categories setIsOpen={setIsOpen}/>
        </div>
      </Modal>
    </div>
  );
}

export default BurgerMenu;
