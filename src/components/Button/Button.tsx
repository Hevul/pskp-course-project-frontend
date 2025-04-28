import { FC, ReactNode, useState } from "react";
import styles from "./Button.module.css";
import Loading from "../Loading/Loading";

interface Props {
  title: string;
  onClick: () => void;
  icon?: ReactNode;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  singleClick?: boolean;
}

const Button: FC<Props> = ({
  title,
  onClick,
  icon,
  color = "#4676fb",
  loading = false,
  disabled = false,
  singleClick = false,
}) => {
  const [wasClicked, setWasClicked] = useState(false);

  const handleClick = () => {
    if (singleClick) {
      setWasClicked(true);
    }
    onClick();
  };

  const isDisabled = loading || disabled || (singleClick && wasClicked);

  return (
    <button
      className={`${styles.button} ${loading ? styles.loading : ""}`}
      onClick={handleClick}
      style={
        {
          "--button-color": color,
          "--hover-color": `${color}cc`,
          "--active-color": `${color}99`,
          opacity: singleClick && wasClicked ? 0.7 : 1,
        } as React.CSSProperties
      }
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {loading ? (
        <Loading color="white" size="small" />
      ) : (
        <div className={styles.content}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {singleClick && wasClicked ? "Выполнено" : title}
        </div>
      )}
    </button>
  );
};

export default Button;
