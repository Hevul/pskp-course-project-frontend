import { FC, useState } from "react";
import styles from "./InputWithLabel.module.css";

interface Props {
  label?: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  hasError?: boolean;
}

const InputWithLabel: FC<Props> = ({
  label,
  placeholder,
  value,
  setValue,
  hasError = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.div}>
      {label && <p className={styles.p}>{label}</p>}
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          borderColor: hasError ? "#FF3030" : isFocused ? "#4676FB" : "#ADC0F8",
          outline: "none",
        }}
      />
    </div>
  );
};

export default InputWithLabel;
