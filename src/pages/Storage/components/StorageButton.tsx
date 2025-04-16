import { FC, useState } from "react";
import OptionsIcon from "../../../components/icons/OptionsIcon";
import Storage from "../../../models/Storage";
import styles from "./styles.module.css";
import { useStorage } from "../../../contexts/StorageContext";
import { useContextMenu } from "../../../contexts/ContextMenuContext";
import DeleteStorageDialog from "../../../components/dialogs/DeleteStorageDialog/DeleteStorageDialog";
import DeleteIcon from "../../../components/icons/DeleteIcon";
import EditIcon from "../../../components/icons/EditIcon";
import RenameStorageDialog from "../../../components/dialogs/RenameStorageDialog/RenameStorageDialog";
import { useDialog } from "../../../contexts/DialogContext";
import InfoSquareIcon from "../../../components/icons/InfoSquareIcon";
import InfoDialog from "../../../components/dialogs/InfoDialog/InfoDialog";
import useAxios from "../../../hooks/useAxios";
import { StorageFullInfo } from "../../../models/StorageFullInfo";
import { getFullInfo } from "../../../api/storages";
import { formatDate, formatSize } from "../../../utils";

interface Props {
  storage: Storage;
}

const StorageButton: FC<Props> = ({ storage }) => {
  const { selectStorage, storage: currentStorage, refresh } = useStorage();
  const { showContextMenu } = useContextMenu();
  const { open } = useDialog();

  const { sendRequest } = useAxios({
    onSuccess(response) {
      const fullInfo = response.data;
      open(
        <InfoDialog
          title="Информация о хранилище"
          fields={[
            {
              label: "Название:",
              value: storage.name,
            },
            {
              label: "Размер:",
              value: formatSize(fullInfo.size),
            },
            {
              label: "Количество файлов:",
              value: fullInfo.fileCount.toString(),
            },
            {
              label: "Количество папок:",
              value: fullInfo.dirCount.toString(),
            },
          ]}
        />
      );
    },
  });

  const isSelected = storage.id === currentStorage?.id;

  const handleStorageClick = () => selectStorage(storage);
  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const menuItems = [
      {
        title: `Переименовать хранилище`,
        icon: <EditIcon width="18" />,
        action: () =>
          open(<RenameStorageDialog storage={storage} onSuccess={refresh} />),
      },
      {
        title: `Удалить хранилище`,
        icon: <DeleteIcon width="18" />,
        hasSeparator: true,
        action: () =>
          open(<DeleteStorageDialog storage={storage} onSuccess={refresh} />),
      },
      {
        title: `Информация о хранилище`,
        icon: <InfoSquareIcon width="18" />,
        action: () => {
          sendRequest(getFullInfo(storage.id));
        },
      },
    ];

    showContextMenu(menuItems, { x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className={styles.storage}
      style={{ background: isSelected ? "#4676FB" : "#ECF5FE" }}
      onClick={handleStorageClick}
    >
      <div className={styles.options} onClick={handleOptionsClick}>
        <OptionsIcon color={isSelected ? "white" : "rgba(65, 64, 75, 0.6)"} />
      </div>
      <h1
        className={styles.storageName}
        style={{ color: isSelected ? "white" : "rgba(65, 64, 75, 0.6)" }}
      >
        {storage.name}
      </h1>
    </div>
  );
};

export default StorageButton;
