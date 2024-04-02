import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { memo, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryProvider";
import Categories from "../../Categories/Categories";
import Modal from "../../Modal/Modal";
import Search from "../../Search/Search";
import Tags from "../../Tags/Tags";
import styles from "./BurgerMenu.module.css";

const BurgerMenu = memo(() => {
  const categories = useContext(CategoryContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (!categories) return null;
  return (
    <div className={styles.burgerMenu}>
      <IconButton onClick={handleOpen} aria-label="Кнопка відкрити меню">
        <MenuIcon fontSize="large" className={styles.burgerIcon} />
      </IconButton>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={styles.content}>
          <Link className={styles.link} to={"/"} onClick={handleClose}>
            Головна
          </Link>
          <Link className={styles.link} to={"/blog"} onClick={handleClose}>
            Блог
          </Link>
          <Search setIsOpen={setIsOpen} />
          <span className={styles.title}>Категорії</span>
          <Categories setIsOpen={setIsOpen} />
          <span className={styles.title}>Теги</span>
          <Tags setIsOpen={setIsOpen} />
        </div>
      </Modal>
    </div>
  );
});

export default BurgerMenu;
