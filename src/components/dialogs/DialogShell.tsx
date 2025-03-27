import { FC, ReactNode, useState } from "react";
import styles from "./DialogShell.module.css";
import CrossIcon from "../icons/CrossIcon";
import { useDialog } from "../../contexts/DialogContext";

interface Props {
  title: string;
  children: ReactNode;
  width?: string;
  height?: string;
  onEnterDown?: () => void;
}

const DialogShell: FC<Props> = ({
  title,
  children,
  width = "540px",
  height = "fit-content",
  onEnterDown,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { close } = useDialog();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
      onEnterDown?.();
    }
  };

  return (
    <div
      className={styles.dialog}
      style={{ width, height }}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.header}>
        <h1 className={styles.h1}>{title}</h1>
        <div
          onClick={close}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          style={{ cursor: "pointer" }}
        >
          <CrossIcon color={isHovered ? "#4676FB" : "#ACC2FF"} width="32" />
        </div>
      </div>

      {children}
    </div>
  );
};

export default DialogShell;
