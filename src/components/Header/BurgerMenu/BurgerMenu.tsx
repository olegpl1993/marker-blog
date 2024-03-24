import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryProvider";
import Categories from "../../Categories/Categories";
import Modal from "../../Modal/Modal";
import Search from "../../Search/Search";
import Tags from "../../Tags/Tags";
import styles from "./BurgerMenu.module.css";

const BurgerMenu = memo(() => {
  const categories = useContext(CategoryContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(new URL(link, window.location.origin).pathname);
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen(true);

  if (!categories) return null;
  return (
    <div className={styles.burgerMenu}>
      <IconButton onClick={handleOpen}>
        <MenuIcon fontSize="large" className={styles.burgerIcon} />
      </IconButton>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={styles.content}>
          <div className={styles.link} onClick={() => handleClick("/")}>
            Головна
          </div>
          <div className={styles.link} onClick={() => handleClick("/blog")}>
            Блог
          </div>
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
