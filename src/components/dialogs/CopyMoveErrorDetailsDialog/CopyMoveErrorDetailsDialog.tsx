import { FC } from "react";
import DialogShell from "../DialogShell";
import styles from "./CopyMoveErrorDetailsDialog.module.css";
import { useDialog } from "../../../contexts/DialogContext";
import Button from "../../Button/Button";

interface Props {
  errors: { name: string; type: string; reason: string }[];
  closeOut?: () => void;
  type?: "copy" | "move";
}

const CopyMoveErrorDetailsDialog: FC<Props> = ({ errors, closeOut, type = "copy" }) => {
  const fileErrors = errors.filter((e) => e.type === "file");
  const dirErrors = errors.filter((e) => e.type === "dir");

  const { close } = useDialog();

  const handleClose = () => {
    closeOut?.();
    close();
  };

  return (
    <DialogShell
      title={`Ошибки при ${type == "copy" ? "копировании" : "перемещении"}  ${
        errors.length
      } объектов`}
      width="50vw"
    >
      <div className={styles.container}>
        {errors.length === 0 ? (
          <div className={styles.noErrors}>{`Все объекты ${
            type == "copy" ? "скопированы" : "перемещены"
          }`}</div>
        ) : (
          <>
            <div className={styles.errorList}>
              {fileErrors.length > 0 && (
                <div className={styles.errorGroup}>
                  <h3 className={styles.groupTitle}>Файлы:</h3>
                  <ul>
                    {fileErrors.map((error, index) => (
                      <li key={index} className={styles.errorItem}>
                        <span className={styles.errorName}>{error.name}</span>
                        <span className={styles.errorReason}>
                          {error.reason}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dirErrors.length > 0 && (
                <div className={styles.errorGroup}>
                  <h3 className={styles.groupTitle}>Папки:</h3>
                  <ul>
                    {dirErrors.map((error, index) => (
                      <li key={index} className={styles.errorItem}>
                        <span className={styles.errorName}>{error.name}</span>
                        <span className={styles.errorReason}>
                          {error.reason}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <Button onClick={handleClose} title="Понятно" />
            </div>
          </>
        )}
      </div>
    </DialogShell>
  );
};

export default CopyMoveErrorDetailsDialog;
