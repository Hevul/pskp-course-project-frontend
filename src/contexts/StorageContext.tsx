import React, { createContext, useContext, useState } from "react";

interface Storage {
  id: string;
  name: string;
}

interface StorageContextType {
  storage: Storage | null;
  setStorage: (storage: Storage) => void;
}

const StorageContext = createContext<StorageContextType | null>(null);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storage, setStorage] = useState<Storage | null>(null);

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
