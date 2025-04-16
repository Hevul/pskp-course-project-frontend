import { FC, ReactNode } from "react";
import styles from "./Button.module.css";
import Loading from "../Loading/Loading";

interface Props {
  title: string;
  onClick: () => void;
  icon?: ReactNode;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<Props> = ({
  title,
  onClick,
  icon,
  color = "#4676fb",
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${loading ? styles.loading : ""}`}
      onClick={onClick}
      style={
        {
          "--button-color": color,
          "--hover-color": `${color}cc`, // Добавляем прозрачность
          "--active-color": `${color}99`,
        } as React.CSSProperties
      }
      disabled={loading || disabled}
    >
      {loading ? (
        <Loading color="white" size="small" />
      ) : (
        <div className={styles.content}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title}
        </div>
      )}
    </button>
  );
};

export default Button;
