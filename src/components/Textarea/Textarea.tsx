import { FC, useState } from "react";
import styles from "./Textarea.module.css";

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  hasError?: boolean;
  maxLength?: number;
  minHeight?: number | string;
  maxHeight?: number | string;
}

const Textarea: FC<Props> = ({
  label,
  placeholder = "",
  value,
  setValue,
  hasError = false,
  maxLength,
  minHeight = "100px",
  maxHeight = "300px",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) return;
    setValue(e.target.value);
  };

  return (
    <div className={styles.div}>
      {label && <p className={styles.p}>{label}</p>}
      <div
        style={{
          position: "relative",
          borderColor: hasError ? "#FF3030" : isFocused ? "#4676FB" : "#ADC0F8",
          borderWidth: "0.14em",
          borderStyle: "solid",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <textarea
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            border: "none",
            outline: "none",
            resize: "vertical",
            minHeight: minHeight,
            maxHeight: maxHeight,
            width: "100%",
            boxSizing: "border-box",
            overflowY: "auto",
            paddingBottom: maxLength ? "25px" : "12px",
          }}
          maxLength={maxLength}
        />
        {maxLength && (
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "12px",
              fontSize: "12px",
              color: "#ADC0F8",
              backgroundColor: "white",
              padding: "0 4px",
              borderRadius: "4px",
            }}
          >
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

export default Textarea;
