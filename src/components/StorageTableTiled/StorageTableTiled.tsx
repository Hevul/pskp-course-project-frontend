import { useEffect, useRef, useState } from "react";
import { useEntities } from "../../contexts/EntitiesContext";
import { Entity } from "../../models/Entity";
import StorageTableTile from "../StorageTableTile/StorageTableTile";
import styles from "./StorageTableTiled.module.css";

const StorageTableTiled = () => {
  const { entities } = useEntities();
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedEntities = [...entities].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

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
      {sortedEntities.map((e) => (
        <StorageTableTile
          key={e.id}
          entity={e}
          selectedEntity={selectedEntity}
          setSelectedEntity={setSelectedEntity}
        />
      ))}
    </div>
  );
};

export default StorageTableTiled;
