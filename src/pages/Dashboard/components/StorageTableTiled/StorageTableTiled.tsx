import { SetStateAction, useEffect, useRef, useState } from "react";
import { useEntities } from "../../../../contexts/EntitiesContext";
import { Entity } from "../../../../models/Entity";
import styles from "./StorageTableTiled.module.css";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import EmptyBoxIcon from "../../../../components/icons/EmptyBoxIcon";
import { useStorage } from "../../../../contexts/StorageContext";
import FileTile from "../FileTile/FileTile";
import DirTile from "../DirTile/DirTile";

const StorageTableTiled = () => {
  const { entities } = useEntities();
  const { storage } = useStorage();

  const [selectedEntities, setSelectedEntities] = useState<Entity[]>([]); // Изменим на массив выбранных элементов
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
        setSelectedEntities([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEntityClick = (entity: Entity, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      // Для Mac (Cmd)
      // Множественный выбор
      setSelectedEntities((prev) =>
        prev.some((e) => e.id === entity.id)
          ? prev.filter((e) => e.id !== entity.id)
          : [...prev, entity]
      );
    } else {
      // Одиночный выбор
      setSelectedEntities([entity]);
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.table}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest(".tile")) {
          setSelectedEntities([]);
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
        sortedEntities.map((e) =>
          e.type === "file" ? (
            <FileTile
              key={e.id}
              file={e}
              selectedEntities={selectedEntities}
              onClick={handleEntityClick}
            />
          ) : (
            <DirTile
              key={e.id}
              dir={e}
              selectedEntities={selectedEntities}
              onClick={handleEntityClick}
            />
          )
        )
      )}
    </div>
  );
};

export default StorageTableTiled;
