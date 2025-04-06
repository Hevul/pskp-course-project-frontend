import { FC, useEffect, useRef, useState } from "react";
import Dir from "../../models/Dir";
import File from "../../models/File";
import styles from "./StorageTableTile.module.css";
import FolderIcon from "../icons/FolderIcon";
import { useStorage } from "../../contexts/StorageContext";
import { useEntities } from "../../contexts/EntitiesContext";
import { Entity } from "../../models/Entity";
import DeleteIcon from "../icons/DeleteIcon";
import DownloadIcon from "../icons/DownloadIcon";
import EditIcon from "../icons/EditIcon";
import { download, remove as removeFile } from "../../api/files";
import { remove as removeDir } from "../../api/dirs";
import ContextMenuArea from "../ContextMenuArea/ContextMenuArea";
import RenameDialog from "../dialogs/RenameDialog/RenameDialog";
import { useDialog } from "../../contexts/DialogContext";
import fileDownload from "js-file-download";
import useAxios from "../../hooks/useAxios";
import ExtFileIcon from "../icons/fileExts/ExtFileIcon";
import ShowInfoDialog from "../dialogs/ShowInfoDialog/ShowInfoDialog";
import InfoSquareIcon from "../icons/InfoSquareIcon";
import CopyDialog from "../dialogs/CopyDialog/CopyDialog";
import CopyIcon from "../icons/CopyIcon";
import MoveDialog from "../dialogs/MoveDialog/MoveDialog";
import CurvedIcon from "../icons/CurvedIcon";
import LinkDialog from "../dialogs/LinkDialog/LinkDialog";
import AddUserIcon from "../icons/AddUserIcon";
import LinkIcon from "../icons/LinkIcon";
import { usePopup } from "../../contexts/PopupContext";

interface Props {
  entity: File | Dir;
  selectedEntity: Entity | null;
  setSelectedEntity: React.Dispatch<React.SetStateAction<Entity | null>>;
}

const StorageTableTile: FC<Props> = ({
  entity,
  selectedEntity,
  setSelectedEntity,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [needsWrap, setNeedsWrap] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { setCurrentDir, refresh } = useEntities();
  const { storage } = useStorage();
  const { open } = useDialog();
  const { show } = usePopup();

  const { sendRequest: sendDownload } = useAxios({
    onSuccess(response) {
      show(`Файл ${name} скачан!`, {
        iconType: "success",
      });
    },
  });
  const { sendRequest: sendDelete } = useAxios({
    onSuccess(response) {
      show(`${isFile ? "Файл" : "Папка"} ${name} удалён${isFile ? "" : "а"}!`, {
        iconType: "success",
      });
    },
  });

  const isFile = entity.type === "file";
  const { id, name } = entity;
  const ext = name.split(".").pop() || "";

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setNeedsWrap(isOverflowing);
    }
  }, [name]);

  const handleDirEnter = () => {
    if (isFile) return;
    if (!storage) return;

    setCurrentDir({
      ...entity,
    });
  };

  const handleDownload = async () => {
    if (!isFile) return;

    show("Скачивание файла скоро начнётся!", { iconType: "info" });
    const response = await sendDownload(download(id));

    if (!response) return;

    fileDownload(response.data, name);
  };

  const handleDelete = async () => {
    await sendDelete(isFile ? removeFile(id) : removeDir(id));

    refresh();
  };

  const isSelected = selectedEntity?.id === id;

  const menuItems = [
    ...(isFile
      ? [
          {
            title: "Скачать файл",
            icon: <DownloadIcon width="16" />,
            action: handleDownload,
            hasSeparator: true,
          },
          {
            title: "Поделиться",
            icon: <AddUserIcon width="16" />,
            action: () => open(<LinkDialog file={entity} />),
            hasSeparator: true,
          },
        ]
      : []),

    {
      title: `Переименовать ${isFile ? "файл" : "папку"}`,
      icon: <EditIcon width="18" />,
      action: () => open(<RenameDialog entity={entity} />),
    },
    {
      title: `Копировать ${isFile ? "файл" : "папку"}`,
      icon: <CopyIcon width="18" />,
      action: () => open(<CopyDialog entity={entity} onSuccess={refresh} />),
    },
    {
      title: `Переместить ${isFile ? "файл" : "папку"}`,
      icon: <CurvedIcon width="18" />,
      action: () => open(<MoveDialog entity={entity} onSuccess={refresh} />),
    },
    {
      title: `Удалить ${isFile ? "файл" : "папку"}`,
      icon: <DeleteIcon width="18" />,
      action: handleDelete,
      hasSeparator: true,
    },
    {
      title: `Информация о ${isFile ? "файле" : "папке"}`,
      icon: <InfoSquareIcon width="18" />,
      action: () => open(<ShowInfoDialog entity={entity} />),
    },
  ];

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`${styles.tile} tile`}
      onClick={() => setSelectedEntity(entity)}
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
          onContextMenu={() => setSelectedEntity(entity)}
        >
          {isFile ? (
            <ExtFileIcon
              ext={ext}
              width="40"
              color={isSelected ? "white" : "#4676FB"}
              fontColor={isSelected ? "#4676FB" : "white"}
            />
          ) : (
            <FolderIcon width="40" color={isSelected ? "white" : "#4676FB"} />
          )}

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

          {isFile && entity.hasLink && (
            <div className={styles.linkIcon}>
              <LinkIcon width="22" color={isSelected ? "white" : "#4676FB"} />
            </div>
          )}
        </div>
      </ContextMenuArea>
    </div>
  );
};

export default StorageTableTile;
