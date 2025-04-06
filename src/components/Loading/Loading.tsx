import { FC } from "react";
import styles from "./Loading.module.css";

interface Props {
  size?: "small" | "medium" | "large";
  color?: string;
  className?: string;
}

const Loading: FC<Props> = ({
  size = "medium",
  color = "#4676fb",
  className = "",
}) => {
  const sizeMap = {
    small: "16px",
    medium: "24px",
    large: "32px",
  };

  const dotSize = sizeMap[size];

  return (
    <div className={`${styles.loader} ${className}`}>
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
  );
};

export default Loading;
