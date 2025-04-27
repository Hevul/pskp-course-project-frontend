import { createContext, useContext, useState } from "react";
import { Entity } from "../models/Entity";

interface SelectedEntitiesContextType {
  selectedEntities: Entity[];
  setSelectedEntities: (entities: Entity[]) => void;
  toggleEntitySelection: (entity: Entity, event: React.MouseEvent) => void;
  clearSelection: () => void;
}

const SelectedEntitiesContext =
  createContext<SelectedEntitiesContextType | null>(null);

export const SelectedEntitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedEntities, setSelectedEntities] = useState<Entity[]>([]);

  const toggleEntitySelection = (entity: Entity, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      setSelectedEntities((prev) =>
        prev.some((e) => e.id === entity.id)
          ? prev.filter((e) => e.id !== entity.id)
          : [...prev, entity]
      );
    } else {
      setSelectedEntities([entity]);
    }
  };

  const clearSelection = () => {
    setSelectedEntities([]);
  };

  return (
    <SelectedEntitiesContext.Provider
      value={{
        selectedEntities,
        setSelectedEntities,
        toggleEntitySelection,
        clearSelection,
      }}
    >
      {children}
    </SelectedEntitiesContext.Provider>
  );
};

export const useSelectedEntities = () => {
  const context = useContext(SelectedEntitiesContext);
  if (!context) {
    throw new Error(
      "useSelectedEntities must be used within a SelectedEntitiesProvider"
    );
  }
  return context;
};
