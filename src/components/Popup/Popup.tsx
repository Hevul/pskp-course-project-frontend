// components/Popup/Popup.tsx
import React, { useEffect, useState } from "react";
import styles from "./Popup.module.css";

interface PopupProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isVisible, message, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
      // Небольшая задержка перед началом анимации для корректного рендера
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 500); // Ждем завершения анимации исчезновения
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isMounted) return null;

  return (
    <div
      className={`${styles.popup} ${isAnimating ? styles.show : styles.hide}`}
    >
      <div className={styles.content}>
        <p>{message}</p>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Popup;
