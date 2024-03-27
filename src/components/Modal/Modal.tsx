import React, { useEffect } from "react";
import styles from "./Modal.module.css";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}

function Modal(props: Props) {
  const { isOpen, setIsOpen, children } = props;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isOpen) {
    return (
      <div className={styles.modalWrapper} onClick={handleClose}>
        <div
          className={styles.modalBox}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Close"
            className={styles.modalClose}
            onClick={handleClose}
          />
          {children}
        </div>
      </div>
    );
  }
  return null;
}

export default Modal;
