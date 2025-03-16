import { FC } from "react";
import styles from "./Trouble.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  code?: number;
  header?: string;
  description?: string;
  buttonText?: string;
  backUrl?: string;
}

const Trouble: FC<Props> = ({
  code = 0,
  header = "",
  description = "",
  buttonText = "Перейти к аутентификации",
  backUrl = "/login",
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.h1}>{code}</h1>
        <h2 className={styles.h2}>{header}</h2>
        <p className={styles.p}>{description}</p>
        <button onClick={() => navigate(backUrl)} className={styles.button}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Trouble;
