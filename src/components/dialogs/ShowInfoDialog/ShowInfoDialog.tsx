import DialogShell from "../DialogShell";
import styles from "./ShowInfoDialog.module.css";
import { Entity } from "../../../models/Entity";
import { FC } from "react";
import { format } from "date-fns";

interface Props {
  entity: Entity;
}

const Field = ({ label = "", value = "" }) => {
  return (
    <div className={styles.field}>
      <h1 className={styles.h1}>{label}</h1>
      <h2 className={styles.h2}>{value}</h2>
    </div>
  );
};

const ShowInfoDialog: FC<Props> = ({ entity }) => {
  const { name, uploadAt } = entity;
  const isFile = entity.type === "file";

  return (
    <DialogShell
      title={`Информация о ${isFile ? "файле" : "папке"}`}
      width="380px"
    >
      <div className={styles.container}>
        <Field label="Название:" value={name} />
        {isFile && (
          <Field label="Размер:" value={formatFileSize(entity.size)} />
        )}
        <Field
          label="Дата создания:"
          value={format(uploadAt, "dd.MM.yyyy HH:mm")}
        />
      </div>
    </DialogShell>
  );
};

function formatFileSize(bytes: number, locale = "ru-RU"): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return (
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: 2,
    }).format(size) +
    " " +
    units[unitIndex]
  );
}

export default ShowInfoDialog;
