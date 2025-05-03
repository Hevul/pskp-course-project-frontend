import { FC } from "react";
import styles from "./TextField.module.css";

interface Props {
  text?: string;
  weight?: "regular" | "bold" | "semi-bold";
}

const TextField: FC<Props> = ({ text, weight = "regular" }) => {
  let fontWeight = `var(--${weight})`;

  return (
    <h1 className={styles.h1} style={{ fontWeight }}>
      {text}
    </h1>
  );
};

export default TextField;
