import React, { ReactNode, useEffect, useState } from "react";
import styles from "./Popup.module.css";
import CrossIcon from "../icons/CrossIcon";
import TickSquareIcon from "../icons/TickSquareIcon";
import DangerCircleIcon from "../icons/DangerCircleIcon";
import { IconType } from "../../contexts/PopupContext";

interface PopupProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  icon: ReactNode | null;
  iconType?: IconType;
}

const Popup: React.FC<PopupProps> = ({
  isVisible,
  message,
  onClose,
  icon,
  iconType,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const renderIcon = () => {
    if (icon) return icon;

    switch (iconType) {
      case "error":
        return <DangerCircleIcon color="#FF3030" />;
      case "success":
        return <TickSquareIcon color="#3EE657" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 500);
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
        {renderIcon()}
        <p className={styles.p}>{message}</p>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close notification"
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  );
};

export default Popup;
