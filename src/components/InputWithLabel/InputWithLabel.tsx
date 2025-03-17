import { FC } from "react";
import styles from "./InputWithLabel.module.css";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputWithLabel: FC<Props> = ({ label, placeholder, value, setValue }) => {
  return (
    <div className={styles.div}>
      <p className={styles.p}>{label}</p>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputWithLabel;
