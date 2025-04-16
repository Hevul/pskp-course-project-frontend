import DialogShell from "../DialogShell";
import styles from "./InfoDialog.module.css";
import { FC } from "react";

interface FieldProps {
  label: string;
  value: string;
}

interface Props {
  title: string;
  fields: FieldProps[];
}

const Field = ({ label = "", value = "" }: FieldProps) => {
  return (
    <div className={styles.field}>
      <h1 className={styles.h1}>{label}</h1>
      <h2 className={styles.h2}>{value}</h2>
    </div>
  );
};

const InfoDialog: FC<Props> = ({ title, fields }) => {
  return (
    <DialogShell title={title} width="380px">
      <div className={styles.container}>
        {fields.map((field, index) => (
          <Field key={index} label={field.label} value={field.value} />
        ))}
      </div>
    </DialogShell>
  );
};

export default InfoDialog;
