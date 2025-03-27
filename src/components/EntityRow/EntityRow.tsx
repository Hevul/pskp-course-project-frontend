import { FC, useState } from "react";
import { Entity } from "../../models/Entity";
import styles from "./EntityRow.module.css";
import FolderIcon from "../icons/FolderIcon";
import FileIcon from "../icons/FileIcon";
import { useEntities } from "../../contexts/EntitiesContext";
import { useStorage } from "../../contexts/StorageContext";

interface Props {
  entity: Entity;
}

const EntityRow: FC<Props> = ({ entity }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCurrentDir } = useEntities();
  const { storage } = useStorage();

  const { id, name, type } = entity;

  const handleDirEnter = () => {
    if (isFile) return;
    if (!storage) return;

    setCurrentDir({
      ...entity,
    });
  };

  const isFile = type === "file";

  return (
    <div
      className={styles.row}
      style={{
        backgroundColor: !isFile && isHovered ? "#ECF5FE" : "white",
        cursor: isFile ? "default" : "pointer",
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onDoubleClick={handleDirEnter}
    >
      {isFile ? (
        <FileIcon color={"#4676FB"} />
      ) : (
        <FolderIcon color={"#4676FB"} />
      )}

      <h1 className={styles.h1}>{name}</h1>
    </div>
  );
};

export default EntityRow;
