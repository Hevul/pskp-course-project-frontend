import { FC, ReactNode, useState } from "react";
import styles from "./LinkDialog.module.css";

type Status = "public" | "private";

interface TileProps {
  header: string;
  description: string;
  icon: ReactNode;
  tileStatus: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status | null>>;
  status: Status | null;
  onClick: () => void;
}

const Tile: FC<TileProps> = ({
  header,
  description,
  icon,
  tileStatus,
  setStatus,
  status,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
    onClick();
    setStatus(tileStatus);
  };

  const isSelected = tileStatus === status;

  return (
    <div
      className={styles.tile}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{
        backgroundColor: isSelected
          ? "#4676FB"
          : isHovered
          ? "#ECF5FE"
          : "white",
      }}
      onClick={handleClick}
    >
      {icon}
      <div className={styles.text}>
        <h1
          className={styles.h1}
          style={{ color: isSelected ? "white" : "#41404B" }}
        >
          {header}
        </h1>
        <h2
          className={styles.h2}
          style={{
            color: isSelected
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(65, 64, 75, 0.72)",
          }}
        >
          {description}
        </h2>
      </div>
    </div>
  );
};

export default Tile;
