import { FC } from "react";
import styles from "./BigInput.module.css";

interface Props {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  placeholder?: string;
}

const BigInput: FC<Props> = ({
  label,
  value,
  setValue,
  error,
  placeholder = "",
}) => {
  return (
    <div>
      <p className={styles.p}>{label}</p>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={placeholder}
        style={{ borderColor: error ? "#FF3030" : "#4676FB" }}
      />
    </div>
  );
};

export default BigInput;
