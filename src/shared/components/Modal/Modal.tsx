import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const modalRootElement = document.getElementById("modal") as HTMLElement;

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}

function Modal(props: Props) {
  const { isOpen, setIsOpen, children } = props;
  const element = document.createElement("div");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    modalRootElement?.appendChild(element);
    return () => {
      document.body.style.overflow = "auto";
      modalRootElement?.removeChild(element);
    };
  }, [isOpen, element]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isOpen) {
    return createPortal(
      <div className={styles.modalWrapper} onClick={handleClose}>
        <div
          className={styles.modalBox}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      element
    );
  }
  return null;
}

export default Modal;
