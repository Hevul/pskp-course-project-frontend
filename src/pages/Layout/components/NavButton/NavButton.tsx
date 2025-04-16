import { FC, ReactNode } from "react";
import styles from "./NavButton.module.css";
import React from "react";

interface Props {
  icon: ReactNode;
  onClick: () => void;
  isActive: boolean;
}

const NavButton: FC<Props> = ({ icon, onClick, isActive }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <img
        style={{ visibility: isActive ? "visible" : "collapse" }}
        className={styles.indicator}
        src="indicator.svg"
        alt=""
      />
      <div className={styles.iconContainer}>
        {React.cloneElement(icon as any, {
          color: isActive ? "#4676FB" : "#ACC2FF",
        })}
      </div>
    </div>
  );
};

export default NavButton;
