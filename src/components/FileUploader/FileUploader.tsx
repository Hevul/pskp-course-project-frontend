import { useRef, forwardRef, useImperativeHandle } from "react";
import { upload } from "../../api/files";
import useAxios from "../../hooks/useAxios";
import { useStorage } from "../../contexts/StorageContext";
import { useEntities } from "../../contexts/EntitiesContext";

export interface FileUploaderRef {
  triggerFileDialog: () => void;
}

interface FileUploaderProps {
  onUploadStart?: () => void;
  onUploadSuccess?: () => void;
  onUploadError?: (error: unknown) => void;
}

const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(
  ({ onUploadStart, onUploadSuccess, onUploadError }, ref) => {
    const { sendRequest } = useAxios();
    const { storage } = useStorage();
    const { currentDir, refresh } = useEntities();
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
      const files = e.target.files;
      if (!files || files.length === 0 || !storage) return;

      try {
        onUploadStart?.();
        await sendRequest(
          upload(Array.from(files), storage.id, currentDir?.id)
        );
        onUploadSuccess?.();
        refresh();
      } catch (error) {
        onUploadError?.(error);
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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
