import { FC } from "react";
import styles from "./StorageButton.module.css";
import { useStorage } from "../../contexts/StorageContext";
import ContextMenuArea from "../ContextMenuArea/ContextMenuArea";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import PlusIcon from "../icons/PlusIcon";
import CreateStorageDialog from "../dialogs/CreateStorageDialog/CreateStorageDialog";
import { useDialog } from "../../contexts/DialogContext";
import RenameStorageDialog from "../dialogs/RenameStorageDialog/RenameStorageDialog";
import DeleteStorageDialog from "../dialogs/DeleteStorageDialog/DeleteStorageDialog";

interface Props {
  name: string;
  id: string;
  className?: string;
}

const StorageButton: FC<Props> = ({ name, id, className }) => {
  const { storage, selectStorage, refresh } = useStorage();
  const { open } = useDialog();

  const isActive = storage?.id === id;

  const items = [
    {
      title: "Создать хранилище",
      icon: <PlusIcon />,
      action: () => open(<CreateStorageDialog onSuccess={refresh} />),
      hasSeparator: true,
    },
    {
      title: `Переименовать хранилище`,
      icon: <EditIcon width="18" />,
      action: () => {
        if (storage)
          open(
            <RenameStorageDialog storage={{ id, name }} onSuccess={refresh} />
          );
      },
    },
    {
      title: `Удалить хранилище`,
      icon: <DeleteIcon width="18" />,
      action: () => {
        if (storage)
          open(
            <DeleteStorageDialog storage={{ id, name }} onSuccess={refresh} />
          );
      },
    },
  ];

  return (
    <ContextMenuArea items={items}>
      <div className={className}>
        <button
          style={{ color: isActive ? "#4676FB" : "#ADC0F8" }}
          className={styles.button}
          onClick={() => selectStorage({ id, name })}
        >
          {name}
        </button>
        {isActive ? <div className={styles.underline}></div> : null}
      </div>
    </ContextMenuArea>
  );
};

export default StorageButton;
