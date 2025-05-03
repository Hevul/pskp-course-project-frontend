import { FC } from "react";
import { Entity } from "../../../models/Entity";
import ExtFileIcon from "../../icons/fileExts/ExtFileIcon";
import styles from "./MoveDirConflictDialog.module.css";
import File from "../../../models/File";
import { formatDate, formatSize } from "../../../utils";
import { DirFullInfo } from "../../../models/DirFullInfo";
import FolderIcon from "../../icons/FolderIcon";

interface Props {
  dir: DirFullInfo;
  title: string;
}

const InfoTile: FC<Props> = ({ dir, title }) => {
  const { size, createAt, dirCount, fileCount } = dir;

  return (
    <div className={styles.dir}>
      <FolderIcon width="50" color={"#4676FB"} />

      <div className={styles.dirInfo}>
        <h1 className={styles.h1} style={{ marginBottom: "4px" }}>
          {title}
        </h1>
        <p className={styles.p}>Размер: {formatSize(size)}</p>
        <p className={styles.p}>Количесто объектов: {dirCount + fileCount}</p>
        <p className={styles.p}>Дата загрузки: {formatDate(createAt)}</p>
      </div>
    </div>
  );
};

export default InfoTile;
