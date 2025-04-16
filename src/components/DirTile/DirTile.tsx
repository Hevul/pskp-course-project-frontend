import { FC, useEffect, useRef, useState } from "react";
import Dir from "../../models/Dir";
import styles from "./DirTile.module.css";
import FolderIcon from "../icons/FolderIcon";
import { useStorage } from "../../contexts/StorageContext";
import { useEntities } from "../../contexts/EntitiesContext";
import { Entity } from "../../models/Entity";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { getFullInfo, remove as removeDir } from "../../api/dirs";
import ContextMenuArea from "../ContextMenuArea/ContextMenuArea";
import RenameDialog from "../dialogs/RenameDialog/RenameDialog";
import { useDialog } from "../../contexts/DialogContext";
import useAxios from "../../hooks/useAxios";
import InfoSquareIcon from "../icons/InfoSquareIcon";
import CopyDialog from "../dialogs/CopyDialog/CopyDialog";
import CopyIcon from "../icons/CopyIcon";
import MoveDialog from "../dialogs/MoveDialog/MoveDialog";
import CurvedIcon from "../icons/CurvedIcon";
import { usePopup } from "../../contexts/PopupContext";
import InfoDialog from "../dialogs/InfoDialog/InfoDialog";
import { formatDate, formatSize } from "../../utils";

interface Props {
  dir: Dir;
  selectedEntity: Entity | null;
  setSelectedEntity: React.Dispatch<React.SetStateAction<Entity | null>>;
}

const DirTile: FC<Props> = ({ dir, selectedEntity, setSelectedEntity }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [needsWrap, setNeedsWrap] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { setCurrentDir, refresh } = useEntities();
  const { storage } = useStorage();
  const { open } = useDialog();
  const { show } = usePopup();

  const { sendRequest: sendDelete } = useAxios({
    onSuccess(response) {
      show(`Папка ${name} удалена!`, {
        iconType: "success",
      });
    },
  });
  const { sendRequest: sendGetFullInfo } = useAxios({
    onSuccess(response) {
      const fullInfo = response.data;
      open(
        <InfoDialog
          title="Информация о папке"
          fields={[
            {
              label: "Название:",
              value: fullInfo.name,
            },
            { label: "Размер:", value: formatSize(fullInfo.size) },
            {
              label: "Дата создания:",
              value: formatDate(fullInfo.createAt),
            },
            {
              label: "Количество файлов:",
              value: fullInfo.fileCount.toString(),
            },
            {
              label: "Количество папок:",
              value: fullInfo.dirCount.toString(),
            },
            {
              label: "Путь до содержимого папки:",
              value: fullInfo.path,
            },
          ]}
        />
      );
    },
  });

  const { id, name } = dir;

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setNeedsWrap(isOverflowing);
    }
  }, [name]);

  const handleDirEnter = () => {
    if (!storage) return;

    setCurrentDir({
      ...dir,
    });
  };

  const handleDelete = async () => {
    await sendDelete(removeDir(id));
    refresh();
  };

  const isSelected = selectedEntity?.id === id;

  const menuItems = [
    {
      title: `Переименовать папку`,
      icon: <EditIcon width="18" />,
      action: () => open(<RenameDialog entity={dir} />),
    },
    {
      title: `Копировать папку`,
      icon: <CopyIcon width="18" />,
      action: () => open(<CopyDialog entity={dir} onSuccess={refresh} />),
    },
    {
      title: `Переместить папку`,
      icon: <CurvedIcon width="18" />,
      action: () => open(<MoveDialog entity={dir} onSuccess={refresh} />),
    },
    {
      title: `Удалить папку`,
      icon: <DeleteIcon width="18" />,
      action: handleDelete,
      hasSeparator: true,
    },
    {
      title: `Информация о папке`,
      icon: <InfoSquareIcon width="18" />,
      action: () => sendGetFullInfo(getFullInfo(id)),
    },
  ];

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`${styles.tile} tile`}
      onClick={() => setSelectedEntity(dir)}
      onDoubleClick={handleDirEnter}
      style={{
        backgroundColor: isSelected
          ? "#4676FB"
          : isHovered
          ? "#ECF5FE"
          : "white",
      }}
    >
      <ContextMenuArea items={menuItems}>
        <div
          className={styles.tileContainer}
          onContextMenu={() => setSelectedEntity(dir)}
        >
          <FolderIcon width="40" color={isSelected ? "white" : "#4676FB"} />

          <div className={styles.textContainer}>
            <h1
              ref={textRef}
              className={`${styles.h1} ${needsWrap ? styles.allowWrap : ""}`}
              title={name}
              style={{ color: isSelected ? "white" : "#4676FB" }}
            >
              {name}
            </h1>
          </div>
        </div>
      </ContextMenuArea>
    </div>
  );
};

export default DirTile;
