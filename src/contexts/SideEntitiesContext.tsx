import { createContext, useContext, useEffect, useState } from "react";
import File from "../models/File";
import { getFilesByStorageId } from "../api/file";
import { getDirsByStorageId } from "../api/dir";
import useAxios from "../hooks/useAxios";
import { useStorage } from "./StorageContext";
import Dir from "../models/Dir";

type Entity = File | Dir;

interface SideEntitiesContextType {
  entities: Entity[];
  refresh: () => void;
  currentDir: Dir | null;
  setCurrentDir: (dir: Dir | null) => void;
  path: Dir[];
}

const SideEntitiesContext = createContext<SideEntitiesContextType | null>(null);

export const SideEntitiesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [currentDir, setDir] = useState<Dir | null>(null);
  const [path, setPath] = useState<Dir[]>([]);

  const { storage } = useStorage();
  const { sendRequest: getFiles } = useAxios();
  const { sendRequest: getDirs } = useAxios();

  const fetchFiles = async () => {
    console.log("fetchFiles");

    if (!storage) return [];

    const response = await getFiles(
      getFilesByStorageId(storage.id, currentDir?.id)
    );

    if (!response) return [];

    const files: File[] = response.data.files.map((f: any) => ({
      id: f.id,
      type: "file",
      name: f._name,
      size: f.size,
      uploadAt: new Date(f.uploadAt),
    }));

    return files;
  };

  const fetchDirs = async () => {
    console.log("fetchDirs");

    if (!storage) return [];

    const response = await getDirs(
      getDirsByStorageId(storage.id, currentDir?.id)
    );

    if (!response) return [];

    const dirs: Dir[] = response.data.dirs.map((d: any) => ({
      id: d.id,
      type: "dir",
      name: d._name,
      uploadAt: new Date(d.uploadAt),
      parent: d.parent,
    }));

    return dirs;
  };

  const fetchEntities = async () => {
    const [files, dirs] = await Promise.all([fetchFiles(), fetchDirs()]);
    setEntities([...files, ...dirs]);
  };

  useEffect(() => {
    fetchEntities();
  }, [storage, currentDir]);

  const refresh = () => {
    fetchEntities();
  };

  const setCurrentDir = (dir: Dir | null) => {
    setDir(dir);
    addPath(dir);
  };

  const addPath = (dir: Dir | null) => {
    if (!dir) {
      setPath([]);
      return;
    }

    const dirs: Dir[] = [...path];

    const index = dirs.findIndex((d) => d.id === dir.id);

    if (index !== -1) dirs.splice(index + 1);
    else dirs.push(dir);

    setPath(dirs);
  };

  return (
    <SideEntitiesContext.Provider
      value={{ entities, refresh, currentDir, setCurrentDir, path }}
    >
      {children}
    </SideEntitiesContext.Provider>
  );
};

export const useSideEntities = () => {
  const context = useContext(SideEntitiesContext);
  if (!context)
    throw new Error(
      "useSideEntities must be used within a SideEntitiesProvider"
    );

  return context;
};
