import { createContext, useContext, useState } from "react";
import { Entity } from "../models/Entity";
import { useEntities } from "./EntitiesContext";
import { usePopup } from "./PopupContext";
import useAxios from "../hooks/useAxios";
import { remove as removeDir } from "../api/dirs";
import { remove as removeFile } from "../api/files";

interface SelectedEntitiesContextType {
  selectedEntities: Entity[];
  setSelectedEntities: (entities: Entity[]) => void;
  toggleEntitySelection: (entity: Entity, event: React.MouseEvent) => void;
  clearSelection: () => void;
  handleDeleteSelected: () => Promise<void>;
  isDeleting: boolean;
}

const SelectedEntitiesContext =
  createContext<SelectedEntitiesContextType | null>(null);

export const SelectedEntitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedEntities, setSelectedEntities] = useState<Entity[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const { refresh } = useEntities();
  const { show } = usePopup();
  const { sendRequest } = useAxios();

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

  const handleDeleteSelected = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const deletePromises = selectedEntities.map(async (entity) => {
        if (entity.type === "file") {
          await sendRequest(removeFile(entity.id));
        } else {
          await sendRequest(removeDir(entity.id));
        }
      });

      await Promise.all(deletePromises);

      const message =
        selectedEntities.length === 1
          ? `Удален${
              selectedEntities[0].type === "file" ? " файл" : "а папка"
            } ${selectedEntities[0].name}`
          : `Удалено ${selectedEntities.length} элементов`;

      show(message, {
        iconType: "success",
      });

      clearSelection();
      refresh();
    } catch (error) {
      const errorMessage =
        selectedEntities.length === 1
          ? `Не удалось удалить ${
              selectedEntities[0].type === "file" ? "файл" : "папку"
            } "${selectedEntities[0].name}"`
          : "Ошибка при удалении элементов";

      show(errorMessage, {
        iconType: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <SelectedEntitiesContext.Provider
      value={{
        selectedEntities,
        setSelectedEntities,
        toggleEntitySelection,
        clearSelection,
        handleDeleteSelected,
        isDeleting,
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
