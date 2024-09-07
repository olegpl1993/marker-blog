import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ImagesGallery.module.css";

const modalRootElement = document.getElementById("modal") as HTMLElement;

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageArr: string[];
  imageUrl: string;
}

function ImagesGallery(props: Props) {
  const { isOpen, setIsOpen, imageArr, imageUrl } = props;
  const element = document.createElement("div");

  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    setCurrentImage(
      imageArr.find((image) => image === imageUrl) || imageArr[0]
    );
  }, [imageArr, imageUrl, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    modalRootElement?.appendChild(element);
    return () => {
      document.body.style.overflow = "auto";
      modalRootElement?.removeChild(element);
    };
  }, [isOpen, element]);

  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  const prevImage = useCallback(() => {
    if (currentImage === imageArr[0]) {
      setCurrentImage(imageArr[imageArr.length - 1]);
    } else {
      setCurrentImage(imageArr[imageArr.indexOf(currentImage) - 1]);
    }
  }, [currentImage, imageArr]);

  const nextImage = useCallback(() => {
    if (currentImage === imageArr[imageArr.length - 1]) {
      setCurrentImage(imageArr[0]);
    } else {
      setCurrentImage(imageArr[imageArr.indexOf(currentImage) + 1]);
    }
  }, [currentImage, imageArr]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevImage();
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentImage, prevImage, nextImage, handleClose]);

  const handleClickPrev = (event: React.MouseEvent) => {
    event.stopPropagation();
    prevImage();
  };

  const handleClickNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    nextImage();
  };

  if (isOpen) {
    return createPortal(
      <div className={styles.imagesGallery} onClick={handleClose}>
        <button className={styles.prev} onClick={handleClickPrev}>
          {"<"}
        </button>

        <button className={styles.next} onClick={handleClickNext}>
          {">"}
        </button>
        <div className={styles.imagesBox}>
          <img
            src={currentImage}
            alt={`картинка ${currentImage}`}
            loading="lazy"
            className={styles.image}
          />
        </div>
      </div>,
      element
    );
  }
  return null;
}

export default ImagesGallery;
