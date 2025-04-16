import { useEffect, useRef, useState } from "react";
import { useEntities } from "../../contexts/EntitiesContext";
import { Entity } from "../../models/Entity";
import StorageTableTile from "../StorageTableTile/StorageTableTile";
import styles from "./StorageTableTiled.module.css";
import EmptyState from "../EmptyState/EmptyState";
import EmptyBoxIcon from "../icons/EmptyBoxIcon";
import { useStorage } from "../../contexts/StorageContext";

const StorageTableTiled = () => {
  const { entities } = useEntities();
  const { storage } = useStorage();

  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedEntities = [...entities].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;

    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  const isEmpty = sortedEntities.length === 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedEntity(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.table}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest(".tile")) {
          setSelectedEntity(null);
        }
      }}
    >
      {isEmpty || !storage ? (
        <div className={styles.emptyDiv}>
          <EmptyState
            message="Нет доступных файлов или папок"
            subMessage={
              storage
                ? "Создайте новую папку или загрузить файлы"
                : "Выберить хранилище или создайте новое"
            }
            icon={<EmptyBoxIcon />}
          />
        </div>
      ) : (
        sortedEntities.map((e) => (
          <StorageTableTile
            key={e.id}
            entity={e}
            selectedEntity={selectedEntity}
            setSelectedEntity={setSelectedEntity}
          />
        ))
      )}
    </div>
  );
};

export default StorageTableTiled;
