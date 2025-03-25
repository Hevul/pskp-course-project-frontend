import { FC, useEffect, useRef, useState } from "react";
import Dir from "../../models/Dir";
import File from "../../models/File";
import styles from "./StorageTableTile.module.css";
import FileIcon from "../icons/FileIcon";
import FolderIcon from "../icons/FolderIcon";
import { useStorage } from "../../contexts/StorageContext";
import { useEntities } from "../../contexts/EntitiesContext";
import { Entity } from "../../models/Entity";
import DeleteIcon from "../icons/DeleteIcon";
import DownloadIcon from "../icons/DownloadIcon";
import EditIcon from "../icons/EditIcon";
import { useContextMenu } from "../../contexts/ContextMenuContext";
import ContextMenuArea from "../ContextMenuArea/ContextMenuArea";

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

  const { showContextMenu } = useContextMenu();
  const { setCurrentDir } = useEntities();
  const { storage } = useStorage();

  const isFile = entity.type === "file";
  const { id, name } = entity;

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

  const isSelected = selectedEntity?.id === id;

  const menuItems = [
    ...(isFile
      ? [
          {
            title: "Скачать файл",
            icon: <DownloadIcon width="16" />,
            action: () => console.log("download"),
          },
        ]
      : []),
    {
      title: `Переименовать ${isFile ? "файл" : "папку"}`,
      icon: <EditIcon width="18" />,
      action: () => console.log("edit"),
    },
    {
      title: `Удалить ${isFile ? "файл" : "папку"}`,
      icon: <DeleteIcon width="18" />,
      action: () => console.log("delete"),
    },
  ];

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={styles.tile}
      onClick={() => {
        if (isSelected) setSelectedEntity(null);
        else setSelectedEntity(entity);
      }}
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
        <div className={styles.tileContainer}>
          {isFile ? (
            <FileIcon width="40" color={isSelected ? "white" : "#4676FB"} />
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
        </div>
      </ContextMenuArea>
    </div>
  );
};

export default StorageTableTile;
