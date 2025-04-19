import { FC } from "react";
import styles from "./Loading.module.css";

interface Props {
  size?: "small" | "medium" | "large";
  color?: string;
  className?: string;
  label?: string;
}

const Loading: FC<Props> = ({
  size = "medium",
  color = "#4676fb",
  className = "",
  label = "",
}) => {
  const sizeMap = {
    small: { dot: "12px", fontSize: "14px" },
    medium: { dot: "16px", fontSize: "16px" },
    large: { dot: "20px", fontSize: "18px" },
  };

  const { dot: dotSize, fontSize } = sizeMap[size];

  return (
    <div className={`${styles.loaderContainer} ${className}`}>
      <div className={styles.loader}>
        <div
          className={styles.dot}
          style={{
            backgroundColor: color,
            width: dotSize,
            height: dotSize,
          }}
        />
        <div
          className={styles.dot}
          style={{
            backgroundColor: color,
            width: dotSize,
            height: dotSize,
          }}
        />
        <div
          className={styles.dot}
          style={{
            backgroundColor: color,
            width: dotSize,
            height: dotSize,
          }}
        />
      </div>
      {label && (
        <div
          className={styles.label}
          style={{
            color,
            fontSize,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default Loading;
