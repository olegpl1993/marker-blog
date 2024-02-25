import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryType } from "../../../types/category.types";
import Modal from "../../Modal/Modal";
import styles from "./BurgerMenu.module.css";

interface Props {
  categories: CategoryType[] | null;
}

function BurgerMenu(props: Props) {
  const { categories } = props;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClick = (route: string) => {
    setIsOpen(false);
    navigate(`/${route}`);
  };

  if (!categories) return null;

  return (
    <div className={styles.burgerMenu}>
      <IconButton onClick={handleOpen}>
        <MenuIcon fontSize="large" className={styles.burgerIcon} />
      </IconButton>
      <Modal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        <ul className={styles.categories}>
          {categories.map((category) => (
            <li
              className={styles.category}
              key={category.id}
              onClick={() => handleClick(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default BurgerMenu;
