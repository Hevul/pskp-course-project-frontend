import { FC, ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  title: string;
  onClick: () => void;
  icon?: ReactNode;
  color?: string;
}

const Button: FC<Props> = ({ title, onClick, icon, color = "#4676fb" }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{ background: color }}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
