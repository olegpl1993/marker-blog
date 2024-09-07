import { memo, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../../app/providers/CategoryProvider";
import Categories from "../../../shared/components/Categories/Categories";
import Modal from "../../../shared/components/Modal/Modal";
import Search from "../../../shared/components/Search/Search";
import Tags from "../../../shared/components/Tags/Tags";
import styles from "./BurgerMenu.module.css";

const BurgerMenu = memo(() => {
  const categories = useContext(CategoryContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (!categories) return null;
  return (
    <div className={styles.burgerMenu}>
      <button
        onClick={isOpen ? handleClose : handleOpen}
        title="Кнопка відкрити меню"
        className={styles.burgerButton}
      >
        <ul className={`${styles.burgerIcon} ${isOpen && styles.open}`}>
          <li className={styles.bar}></li>
          <li className={styles.bar}></li>
          <li className={styles.bar}></li>
        </ul>
      </button>

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
