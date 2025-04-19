import { FC, useState } from "react";
import ExtFileIcon from "../../../../components/icons/fileExts/ExtFileIcon";
import style from "./UploadsMenu.module.css";
import { UploadStatus, useUploads } from "../../../../contexts/UploadContext";
import CloseCircleIcon from "../../../../components/icons/CloseCircleIcon";
import SecondaryButton from "../../../../components/SecondaryButton/SecondaryButton";
import useAxios from "../../../../hooks/useAxios";
import { confirmOverwrite } from "../../../../api/files";
import { formatSize } from "../../../../utils";
import { useDialog } from "../../../../contexts/DialogContext";
import ResolveConflictDialog from "../../../../components/dialogs/ResolveConflictDialog/ResolveConflictDialog";

interface Props {
  id: string;
  filename: string;
  size: number;
  progress: number;
  status: UploadStatus;
  error?: string;
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

  const { removeUpload, cancelUpload, getUpload } = useUploads();
  const { open } = useDialog();

  const isCompleted = status === "completed";
  const isCanceled = status === "canceled";
  const isUploading = status === "uploading";
  const isConflicted = status === "conflicted";
  const ext = filename.split(".").pop() || "";

  const handleRemove = () => removeUpload(id);
  const handleCancel = () => cancelUpload(id);
  const handleOverwrite = () => {
    const upload = getUpload(id);
    if (upload) open(<ResolveConflictDialog upload={upload} />);
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
            {formatSize(size)}
          </h2>
        </div>
      </div>

      {!isCompleted && !isCanceled && !isConflicted && (
        <div className={style.fileLoadingEmpty}>
          <div
            className={style.fileLoadingFilled}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      )}

      {isConflicted && (
        <div className={style.conflictButton}>
          <SecondaryButton title={"Разрешить"} onClick={handleOverwrite} />
        </div>
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
