import { FC, useState } from "react";
import styles from "./BigInput.module.css";
import HideIcon from "../icons/HideIcon";
import ViewIcon from "../icons/ViewIcon";

interface Props {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  placeholder?: string;
  type?: "text" | "password";
}

const BigInput: FC<Props> = ({
  label,
  value,
  setValue,
  error,
  placeholder = "",
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && !showPassword ? "password" : "text";

  return (
    <div className={styles.container}>
      <p className={styles.p}>{label}</p>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={inputType}
          placeholder={placeholder}
          style={{ borderColor: error ? "#FF3030" : "#4676FB" }}
        />
        {type === "password" && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? <HideIcon /> : <ViewIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default BigInput;
