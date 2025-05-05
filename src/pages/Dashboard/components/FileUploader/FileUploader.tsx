import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { upload } from "../../../../api/file";
import useAxios from "../../../../hooks/useAxios";
import { useStorage } from "../../../../contexts/StorageContext";
import { useEntities } from "../../../../contexts/EntitiesContext";
import { FileUpload, useUploads } from "../../../../contexts/UploadContext";
import config from "../../../../config.json";
import axios from "axios";
import { usePopup } from "../../../../contexts/PopupContext";

export interface FileUploaderRef {
  triggerFileDialog: () => void;
}

interface FileUploaderProps {}

const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(
  ({}, ref) => {
    const { storage } = useStorage();
    const { currentDir, refresh } = useEntities();
    const {
      addUpload,
      updateUploadProgress,
      completeUpload,
      failUpload,
      conflictUpload,
      cancelUpload,
    } = useUploads();
    const { show } = usePopup();
    const [completedUploads, setCompletedUploads] = useState<number>(0);
    const refreshTimeoutRef = useRef<NodeJS.Timeout>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileDialog = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    useImperativeHandle(ref, () => ({
      triggerFileDialog,
    }));

    useEffect(() => {
      if (completedUploads > 0) {
        if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);

        refreshTimeoutRef.current = setTimeout(() => {
          refresh();
          setCompletedUploads(0);
        }, 300);
      }

      return () => {
        if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
      };
    }, [completedUploads, refresh]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;
      if (!storage) {
        show("Необходимо выбрать хранилище!", { iconType: "error" });
        return;
      }

      try {
        const uploadPromises = files.map(async (file) => {
          const source = axios.CancelToken.source();
          const uploadItem = addUpload(file, source);

          const onUploadProgress = (progress: number) => {
            updateUploadProgress(uploadItem.id, progress);
          };

          const requestConfig = upload(file, storage.id, currentDir?.id, {
            onUploadProgress,
            cancelToken: source.token,
          });

          return axios(requestConfig)
            .then(() => {
              show(`Файл ${file.name} успешно загружен!`, {
                iconType: "success",
              });
              completeUpload(uploadItem.id);
              setCompletedUploads((prev) => prev + 1);
            })
            .catch((error) => {
              const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

              if (axios.isCancel(error)) cancelUpload(uploadItem.id);
              else if (error?.response?.data?.conflict) {
                const response = error?.response?.data;

                conflictUpload(uploadItem.id, {
                  existingFileId: response.existingFileId,
                  tempFileId: response.tempFileId,
                });
                show(
                  `Файл с именем ${file.name} уже есть в текущей директории. Разрешите конфликт!`,
                  {
                    iconType: "error",
                  }
                );
              } else failUpload(uploadItem.id, errorMessage);
            });
        });

        Promise.all(uploadPromises);
      } catch (error) {
        console.log(error);
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    return (
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />
    );
  }
);

FileUploader.displayName = "FileUploader";

export default FileUploader;
