import { createContext, useContext, useState } from "react";
import { Entity } from "../models/Entity";
import { useEntities } from "./EntitiesContext";
import { usePopup } from "./PopupContext";
import useAxios from "../hooks/useAxios";
import { remove as removeDir } from "../api/dir";
import { remove as removeFile } from "../api/file";
import config from "../config.json";

interface SelectedEntitiesContextType {
  selectedEntities: Entity[];
  setSelectedEntities: (entities: Entity[]) => void;
  toggleEntitySelection: (entity: Entity, event: React.MouseEvent) => void;
  clearSelection: () => void;
  handleDeleteSelected: () => Promise<void>;
  handleDownloadSelected: () => void;
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

  const handleDownloadSelected = async () => {
    show("Подготовка архива...", { iconType: "info" });

    try {
      const fileIds = selectedEntities
        .filter((e) => e.type === "file")
        .map((e) => e.id);

      const dirIds = selectedEntities
        .filter((e) => e.type === "dir")
        .map((e) => e.id);

      const encodedFileIds = encodeURIComponent(JSON.stringify(fileIds));
      const encodedDirIds = encodeURIComponent(JSON.stringify(dirIds));

      const downloadUrl = `${config.base}/${config.entity}/download-many?fileIds=${encodedFileIds}&dirIds=${encodedDirIds}`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.style.display = "none";
      document.body.appendChild(link);

      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
      }, 100);

      const totalItems = fileIds.length + dirIds.length;
      show(
        `Начато скачивание архива (${totalItems} элементов: ${fileIds.length} файлов и ${dirIds.length} папок)`,
        {
          iconType: "info",
        }
      );
    } catch (error) {
      console.error("Ошибка при подготовке скачивания:", error);
      show("Не удалось начать скачивание", {
        iconType: "error",
      });
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
        handleDownloadSelected,
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
