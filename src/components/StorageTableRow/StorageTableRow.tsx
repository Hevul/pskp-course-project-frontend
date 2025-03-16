import { FC, useState } from "react";
import { format } from "date-fns";
import styles from "./StorageTableRow.module.css";
import FolderIcon from "../icons/FolderIcon";
import FileIcon from "../icons/FileIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import OptionsIcon from "../icons/OptionsIcon";

interface Props {
  id: string;
  type: "folder" | "file";
  name: string;
  size: number;
  date: Date;
}

const StorageTableRow: FC<Props> = ({ id, type, name, size, date }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = format(date, "yyyy-MM-dd HH:mm");

  return (
    <tr
      className={styles.item}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className={styles.type}>
        {type === "file" ? (
          <FileIcon color={isHovered ? "white" : "#4676FB"} />
        ) : (
          <FolderIcon color={isHovered ? "white" : "#4676FB"} />
        )}
      </td>
      <td className={styles.name}>{name}</td>
      <td className={styles.size}>{size} MB</td>
      <td className={styles.size}>{formattedDate}</td>
      <td className={styles.centerTd}>
        {type === "file" ? (
          <button className={styles.download}>Скачать</button>
        ) : null}
      </td>
      <td className={styles.centerTd}>
        <button className={styles.edit}>
          <EditIcon
            color={isHovered ? "white" : "#4676FB"}
            width="12"
            height="12"
          />
        </button>
      </td>
      <td className={styles.centerTd}>
        <button className={styles.delete}>
          <DeleteIcon
            color={isHovered ? "white" : "#FF0000"}
            width="12"
            height="12"
          />
        </button>
      </td>
      <td className={styles.centerTd}>
        <button>
          <OptionsIcon color={isHovered ? "white" : "#D0D7DD"} width="6" />
        </button>
      </td>
    </tr>
  );
};

export default StorageTableRow;
