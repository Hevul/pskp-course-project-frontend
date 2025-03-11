import { FC, ReactNode } from "react";
import styles from "./NavButton.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

interface Props {
  icon: ReactNode;
  url: string;
}

const NavButton: FC<Props> = ({ icon, url }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentUrl = location.pathname;
  const isActive = url === currentUrl;

  return (
    <div className={styles.container} onClick={() => navigate(url)}>
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
