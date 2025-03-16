import { FC } from "react";
import styles from "./InputValidationError.module.css";
import DangerCircleIcon from "../icons/DangerCircleIcon";

interface Props {
  error: string | null;
}

const InputValidationError: FC<Props> = ({ error }) => {
  return (
    <div className={styles.div}>
      {error ? <DangerCircleIcon color="#FF3030" /> : null}
      <p className={styles.errorP}>{error}</p>
    </div>
  );
};

export default InputValidationError;
