import { FC, useState } from "react";
import ExtFileIcon from "../icons/fileExts/ExtFileIcon";
import style from "./UploadsMenu.module.css";
import { UploadStatus, useUploads } from "../../contexts/UploadContext";
import CloseCircleIcon from "../icons/CloseCircleIcon";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

interface Props {
  id: string;
  filename: string;
  size: number;
  progress: number;
  status: UploadStatus;
  error?: string;
}

function formatFileSize(bytes: number, locale = "ru-RU"): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return (
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: 2,
    }).format(size) +
    " " +
    units[unitIndex]
  );
}

const UploadRow: FC<Props> = ({
  id,
  filename,
  size,
  progress = 0,
  status = "pending",
  error,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { removeUpload, cancelUpload } = useUploads();

  const isCompleted = status === "completed";
  const isCanceled = status === "canceled";
  const isUploading = status === "uploading";
  const isConflicted = status === "conflicted";
  const ext = filename.split(".").pop() || "";

  const handleRemove = () => removeUpload(id);
  const handleCancel = () => cancelUpload(id);

  const handleOverwrite = () => {
    // const requestConfig = overwrite(file, storage.id, currentDir?.id, {
    //   isLarge: file.size > config.smallFileLimit * 1024 * 1024,
    //   onUploadProgress,
    //   cancelToken: source.token,
    // });
  };

  return (
    <div
      className={style.uploadRow}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{ backgroundColor: isHovered ? "#ECF5FE" : "white" }}
    >
      <div className={style.left}>
        <ExtFileIcon
          ext={ext}
          color={
            isCompleted
              ? "#4676FB"
              : isCanceled
              ? "#FF3333"
              : isConflicted
              ? "#FB8546"
              : "#41404B"
          }
          width="30"
          fontColor={"white"}
        />

        <div className={style.filenameAndSize}>
          <h1
            className={style.filename}
            style={{
              color: isCompleted
                ? "#4676FB"
                : isCanceled
                ? "#FF3333"
                : isConflicted
                ? "#FB8546"
                : "#41404B",
              width: isUploading ? "200px" : "100%",
            }}
            title={filename}
          >
            {filename}
          </h1>

          <h2
            className={style.size}
            style={{
              color: isCompleted
                ? "rgba(70, 118, 251, 0.6)"
                : isCanceled
                ? "rgba(255, 51, 51, 0.6)"
                : isConflicted
                ? "rgba(251, 133, 70, 0.6)"
                : "rgba(65, 64, 75, 0.6)",
            }}
          >
            {formatFileSize(size)}
          </h2>
        </div>
      </div>

      <div
        style={{
          visibility:
            isCompleted || isCanceled || isConflicted ? "hidden" : "visible",
        }}
        className={style.fileLoadingEmpty}
      >
        <div
          className={style.fileLoadingFilled}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {isConflicted && (
        <SecondaryButton title={"Перезаписать"} onClick={() => {}} />
      )}

      <div
        className={style.iconButton}
        onClick={status === "uploading" ? handleCancel : handleRemove}
      >
        <CloseCircleIcon color="#ADC0F8" />
      </div>
    </div>
  );
};

export default UploadRow;
