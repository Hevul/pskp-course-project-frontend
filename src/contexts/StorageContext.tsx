import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAll } from "../api/storage";
import Storage from "../models/Storage";

interface StorageContextType {
  storage: Storage | null;
  storages: Storage[];
  refresh: () => void;
  selectStorage: (storage: Storage | null) => void;
}

const StorageContext = createContext<StorageContextType | null>(null);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    localStorage.removeItem("storage");
  }, []);

  const [storage, setStorage] = useState<Storage | null>(null);

  useEffect(() => {
    if (storage) {
      localStorage.setItem("storage", JSON.stringify(storage));
    } else {
      localStorage.removeItem("storage");
    }
  }, [storage]);

  const selectStorage = (s: Storage | null) => {
    setStorage(s);
  };

  const [storages, setStorages] = useState<Storage[]>([]);

  const fetchStorages = async () => {
    try {
      const response = await axios(getAll());

      if (!response) return;

      const storages: Storage[] = response.data.map((s: any) => ({
        id: s.id,
        name: s._name,
      }));

      setStorages(storages);
    } catch {
      setStorages([]);
    }
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const refresh = () => {
    fetchStorages();
  };

  return (
    <StorageContext.Provider
      value={{ storage, storages, refresh, selectStorage }}
    >
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
