import { FC } from "react";
import ExtFileIcon from "../../icons/fileExts/ExtFileIcon";
import styles from "./MoveFileConflictDialog.module.css";
import File from "../../../models/File";
import { formatDate, formatSize } from "../../../utils";

interface Props {
  file: File;
  title: string;
}

const InfoTile: FC<Props> = ({ file, title }) => {
  const { name, id, size, uploadAt } = file;
  const ext = name.split(".").pop() || "";

  return (
    <div className={styles.file}>
      <ExtFileIcon ext={ext} width="50" color={"#4676FB"} fontColor={"white"} />

      <div className={styles.fileInfo}>
        <h1 className={styles.h1} style={{ marginBottom: "4px" }}>
          {title}
        </h1>
        <p className={styles.p}>Размер: {formatSize(size)}</p>
        <p className={styles.p}>Дата загрузки: {formatDate(uploadAt)}</p>
      </div>
    </div>
  );
};

export default InfoTile;
