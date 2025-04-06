import { FC, useState } from "react";
import styles from "./StorageTableRow.module.css";
import FolderIcon from "../icons/FolderIcon";
import FileIcon from "../icons/FileIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import OptionsIcon from "../icons/OptionsIcon";
import useAxios from "../../hooks/useAxios";
import { download, remove as removeFile } from "../../api/files";
import { remove as removeDir } from "../../api/dirs";
import { useEntities } from "../../contexts/EntitiesContext";
import File from "../../models/File";
import Dir from "../../models/Dir";
import { useDialog } from "../../contexts/DialogContext";
import RenameDialog from "../dialogs/RenameDialog/RenameDialog";
import DownloadIcon from "../icons/DownloadIcon";
import { useStorage } from "../../contexts/StorageContext";
import fileDownload from "js-file-download";
import { usePopup } from "../../contexts/PopupContext";

interface Props {
  entity: File | Dir;
}

const StorageTableRow: FC<Props> = ({ entity }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isFile = entity.type === "file";
  const { id, name } = entity;

  const { refresh, setCurrentDir } = useEntities();
  const { open } = useDialog();
  const { storage } = useStorage();
  const { show } = usePopup();

  const { sendRequest: sendDownload } = useAxios();
  const { sendRequest: sendDelete } = useAxios();

  const handleDelete = async () => {
    await sendDelete(isFile ? removeFile(id) : removeDir(id));

    refresh();
  };

  const handleRename = () => {
    open(<RenameDialog entity={entity} />);
  };

  const handleDirEnter = () => {
    if (isFile) return;
    if (!storage) return;

    setCurrentDir({
      ...entity,
    });
  };

  const handleDownload = async () => {
    if (!isFile) return;

    const response = await sendDownload(download(id));

    if (!response) return;

    fileDownload(response.data, name);
  };

  return (
    <tr
      className={styles.item}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onDoubleClick={handleDirEnter}
    >
      <td className={styles.type}>
        {isFile ? (
          <FileIcon color={isHovered ? "white" : "#4676FB"} />
        ) : (
          <FolderIcon color={isHovered ? "white" : "#4676FB"} />
        )}
      </td>
      <td className={styles.name}>{name}</td>
      <td className={styles.size}></td>
      <td className={styles.size}></td>
      <td className={styles.centerTd}>
        {isFile ? (
          <button onClick={handleDownload}>
            <DownloadIcon color="white" width="22" />
          </button>
        ) : null}
      </td>
      <td className={styles.centerTd}>
        {isHovered ? (
          <button onClick={handleRename}>
            <EditIcon width="18" height="18" color="white" />
          </button>
        ) : null}
      </td>
      <td className={styles.centerTd}>
        {isHovered ? (
          <button onClick={handleDelete}>
            <DeleteIcon width="18" height="18" color="white" />
          </button>
        ) : null}
      </td>
      <td className={styles.centerTd}>
        {isHovered ? (
          <button>
            <OptionsIcon width="6" color="white" />
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default StorageTableRow;
