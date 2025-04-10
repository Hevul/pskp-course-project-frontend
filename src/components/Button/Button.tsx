import { FC, ReactNode } from "react";
import styles from "./Button.module.css";
import Loading from "../Loading/Loading";

interface Props {
  title: string;
  onClick: () => void;
  icon?: ReactNode;
  color?: string;
  loading?: boolean;
}

const Button: FC<Props> = ({
  title,
  onClick,
  icon,
  color = "#4676fb",
  loading = false,
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{ background: color }}
      disabled={loading}
    >
      {loading ? (
        <Loading color="white" size="small" />
      ) : (
        <div>
          {icon}
          {title}
        </div>
      )}
    </button>
  );
};

export default Button;
