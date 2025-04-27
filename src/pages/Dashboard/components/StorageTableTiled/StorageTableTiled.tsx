import { SetStateAction, useEffect, useRef, useState } from "react";
import { useEntities } from "../../../../contexts/EntitiesContext";
import { Entity } from "../../../../models/Entity";
import styles from "./StorageTableTiled.module.css";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import EmptyBoxIcon from "../../../../components/icons/EmptyBoxIcon";
import { useStorage } from "../../../../contexts/StorageContext";
import FileTile from "../FileTile/FileTile";
import DirTile from "../DirTile/DirTile";
import {
  SelectedEntitiesProvider,
  useSelectedEntities,
} from "../../../../contexts/SelectedEntitiesContext";

const StorageTableTiledContent = () => {
  const { entities } = useEntities();
  const { storage } = useStorage();
  const { clearSelection } = useSelectedEntities();

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
        clearSelection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clearSelection]);

  return (
    <div
      ref={containerRef}
      className={styles.table}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest(".tile")) {
          clearSelection();
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
            <FileTile key={e.id} file={e} />
          ) : (
            <DirTile key={e.id} dir={e} />
          )
        )
      )}
    </div>
  );
};

const StorageTableTiled = () => {
  return (
    <SelectedEntitiesProvider>
      <StorageTableTiledContent />
    </SelectedEntitiesProvider>
  );
};

export default StorageTableTiled;
