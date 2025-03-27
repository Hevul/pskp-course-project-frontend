import { FC, ReactNode, useState } from "react";
import styles from "./MenuItem.module.css";

interface Props {
  title: string;
  action: () => void;
  icon?: ReactNode;
  hasSeparator?: boolean;
}

const MenuItem: FC<Props> = ({ title, action, icon, hasSeparator = false }) => {
  return (
    <li
      className={`${styles.menuItem} ${
        hasSeparator ? styles.withSeparator : ""
      }`}
      onClick={action}
    >
      <div className={styles.itemContent}>
        <div className={styles.icon}>{icon}</div>

        {title}
      </div>
    </li>
  );
};

export default MenuItem;
