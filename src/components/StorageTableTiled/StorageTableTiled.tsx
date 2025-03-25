import { useState } from "react";
import { useEntities } from "../../contexts/EntitiesContext";
import { Entity } from "../../models/Entity";
import StorageTableTile from "../StorageTableTile/StorageTableTile";
import styles from "./StorageTableTiled.module.css";

const StorageTableTiled = () => {
  const { entities } = useEntities();
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const sortedEntities = [...entities].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  return (
    <div className={styles.table}>
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
