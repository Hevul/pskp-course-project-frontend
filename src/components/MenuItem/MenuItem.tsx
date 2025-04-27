import { FC, ReactNode, useState } from "react";
import styles from "./MenuItem.module.css";
import { MenuItem as MenuItemProps } from "../../contexts/ContextMenuContext";

const MenuItem: FC<MenuItemProps> = ({
  title,
  action,
  icon,
  hasSeparator = false,
  disabled = false,
}) => {
  if (disabled) return null;

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
