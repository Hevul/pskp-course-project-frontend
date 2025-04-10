import { useRef, forwardRef, useImperativeHandle } from "react";
import { upload } from "../../api/files";
import useAxios from "../../hooks/useAxios";
import { useStorage } from "../../contexts/StorageContext";
import { useEntities } from "../../contexts/EntitiesContext";
import { FileUpload, useUploads } from "../../contexts/UploadContext";
import config from "../../config.json";
import axios from "axios";
import { usePopup } from "../../contexts/PopupContext";

export interface FileUploaderRef {
  triggerFileDialog: () => void;
}

interface FileUploaderProps {
  maxParallelUploads?: number;
}

const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(
  ({ maxParallelUploads = 3 }, ref) => {
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

    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileDialog = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    useImperativeHandle(ref, () => ({
      triggerFileDialog,
    }));

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0 || !storage) return;

      try {
        const uploadPromises = files.map(async (file) => {
          const source = axios.CancelToken.source();
          const uploadItem = addUpload(file, source);

          const onUploadProgress = (progress: number) => {
            updateUploadProgress(uploadItem.id, progress);
          };

          const requestConfig = upload(file, storage.id, currentDir?.id, {
            isLarge: file.size > config.smallFileLimit * 1024 * 1024,
            onUploadProgress,
            cancelToken: source.token,
          });

          return axios(requestConfig)
            .then(() => {
              show(`Файл ${file.name} успешно загружен!`, {
                iconType: "success",
              });
              completeUpload(uploadItem.id);
              refresh();
            })
            .catch((error) => {
              const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

              if (axios.isCancel(error)) cancelUpload(uploadItem.id);
              else if (error?.response?.data?.errors?.[0]?.path === "upload") {
                conflictUpload(uploadItem.id);
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
