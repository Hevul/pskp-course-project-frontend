import { CancelTokenSource } from "axios";
import { createContext, useContext, useState, useMemo } from "react";
import { usePopup } from "./PopupContext";

export type UploadStatus =
  | "pending"
  | "uploading"
  | "completed"
  | "error"
  | "canceled"
  | "conflicted";

export interface FileUpload {
  id: string;
  filename: string;
  size: number;
  progress: number;
  status: UploadStatus;
  cancelToken: CancelTokenSource;
  error?: string;
  existingFileId?: string;
  tempFileId?: string;
}

interface UploadContextType {
  uploads: FileUpload[];
  totalProgress: number;
  addUpload: (file: File, token: CancelTokenSource) => FileUpload;
  removeUpload: (id: string) => void;
  updateUploadProgress: (id: string, uploaded: number) => void;
  completeUpload: (id: string) => void;
  failUpload: (id: string, error: string) => void;
  clear: () => void;
  cancelUpload: (id: string) => void;
  conflictUpload: (
    id: string,
    options: { existingFileId: string; tempFileId: string }
  ) => void;
  getUpload: (id: string) => FileUpload | undefined;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const { show } = usePopup();

  const totalProgress = useMemo(() => {
    if (uploads.length === 0) return 0;

    const activeUploads = uploads.filter(
      (u) => u.status === "uploading" || u.status === "pending"
    );

    if (activeUploads.length === 0) return 100;

    const uploaded = activeUploads.reduce((sum, u) => sum + u.progress, 0);

    return uploaded;
  }, [uploads]);

  const addUpload = (file: File, token: CancelTokenSource): FileUpload => {
    const newUpload: FileUpload = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      filename: file.name,
      size: file.size,
      progress: 0,
      status: "pending",
      cancelToken: token,
    };

    setUploads((prev) => [...prev, newUpload]);
    show(`Файл ${file.name} добавлен в очередь загрузки.`, {
      iconType: "info",
    });

    return newUpload;
  };

  const updateUploadProgress = (id: string, uploaded: number) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id
          ? { ...upload, progress: uploaded, status: "uploading" }
          : upload
      )
    );
  };

  const completeUpload = (id: string) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id
          ? { ...upload, status: "completed", progress: 100 }
          : upload
      )
    );
  };

  const failUpload = (id: string, error: string) => {
    setUploads((prev) =>
      prev.map((upload) => {
        const status = upload.status === "canceled" ? "canceled" : "error";
        return upload.id === id ? { ...upload, status, error } : upload;
      })
    );

    const upload = uploads.find((u) => u.id === id);
    if (upload)
      show(`Не удалось загрузить файл ${upload.filename}!`, {
        iconType: "error",
      });
  };

  const conflictUpload = (
    id: string,
    options: { existingFileId: string; tempFileId: string }
  ) => {
    setUploads((prev) =>
      prev.map((upload) => {
        return upload.id === id
          ? { ...upload, status: "conflicted", ...options }
          : upload;
      })
    );
  };

  const clear = () => {
    setUploads((prev) => []);
  };

  const removeUpload = (id: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  const cancelUpload = (id: string) => {
    setUploads((prev) =>
      prev.map((upload) => {
        if (upload.id === id && upload.status === "uploading") {
          if (upload.cancelToken)
            upload.cancelToken.cancel("Upload canceled by user");

          return { ...upload, status: "canceled" };
        }
        return upload;
      })
    );

    const upload = uploads.find((u) => u.id === id);
    if (upload)
      show(`Загрузка файла ${upload.filename} отменена!`, {
        iconType: "success",
      });
  };

  const getUpload = (id: string): FileUpload | undefined => {
    return uploads.find((upload) => upload.id === id);
  };

  return (
    <UploadContext.Provider
      value={{
        uploads,
        totalProgress,
        addUpload,
        removeUpload,
        updateUploadProgress,
        completeUpload,
        failUpload,
        clear,
        cancelUpload,
        conflictUpload,
        getUpload,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUploads = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploads must be used within an UploadProvider");
  }
  return context;
};
