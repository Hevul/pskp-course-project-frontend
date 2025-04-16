import { FC } from "react";
import styles from "./StorageButton.module.css";
import { useStorage } from "../../../../contexts/StorageContext";
import ContextMenuArea from "../../../../components/ContextMenuArea/ContextMenuArea";
import EditIcon from "../../../../components/icons/EditIcon";
import DeleteIcon from "../../../../components/icons/DeleteIcon";
import PlusIcon from "../../../../components/icons/PlusIcon";
import CreateStorageDialog from "../../../../components/dialogs/CreateStorageDialog/CreateStorageDialog";
import { useDialog } from "../../../../contexts/DialogContext";
import RenameStorageDialog from "../../../../components/dialogs/RenameStorageDialog/RenameStorageDialog";
import DeleteStorageDialog from "../../../../components/dialogs/DeleteStorageDialog/DeleteStorageDialog";
import { useEntities } from "../../../../contexts/EntitiesContext";

interface Props {
  name: string;
  id: string;
  className?: string;
}

const StorageButton: FC<Props> = ({ name, id, className }) => {
  const { storage, selectStorage, refresh } = useStorage();
  const { open } = useDialog();
  const { setCurrentDir } = useEntities();

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

  const handleClick = () => {
    selectStorage({ id, name });
    setCurrentDir(null);
  };

  return (
    <ContextMenuArea items={items}>
      <div className={styles.div}>
        <button
          style={{ color: isActive ? "#4676FB" : "#ADC0F8" }}
          className={styles.button}
          onClick={handleClick}
        >
          {name}
        </button>
        {isActive ? <div className={styles.underline}></div> : null}
      </div>
    </ContextMenuArea>
  );
};

export default StorageButton;
