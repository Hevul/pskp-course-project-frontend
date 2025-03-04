import React, { createContext, useContext, useEffect, useState } from "react";

interface Storage {
  id: string;
  name: string;
}

interface StorageContextType {
  storage: Storage | null;
  setStorage: (storage: Storage | null) => void;
}

const StorageContext = createContext<StorageContextType | null>(null);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const loadStorageFromLocalStorage = (): Storage | null => {
    const storedStorage = localStorage.getItem("storage");

    if (storedStorage) return JSON.parse(storedStorage) as Storage;

    return null;
  };

  const [storage, setStorage] = useState<Storage | null>(
    loadStorageFromLocalStorage()
  );

  useEffect(() => {
    if (storage) localStorage.setItem("storage", JSON.stringify(storage));
    else localStorage.removeItem("storage");
  }, [storage]);

  return (
    <StorageContext.Provider value={{ storage, setStorage }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context)
    throw new Error("useStorage must be used within a StorageProvider");

  return context;
};
