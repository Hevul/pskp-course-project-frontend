import { useState } from "react";
import ChevronUpIcon from "../icons/ChevronUpIcon";
import UploadRow from "./UploadRow";
import styles from "./UploadsMenu.module.css";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import { useUploads } from "../../contexts/UploadContext";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

const UploadsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { uploads, totalProgress, clearCompleted } = useUploads();

  const isCompleted = totalProgress === 100;

  return (
    <div className={styles.menu}>
      <div className={styles.globalLoadingEmpty}>
        <div
          className={styles.closeButton}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isOpen ? (
            <ChevronDownIcon
              color={
                isCompleted
                  ? "white"
                  : isHovered
                  ? "rgba(70, 118, 251, 0.7)"
                  : "rgba(70, 118, 251, 0.4)"
              }
              width="34"
            />
          ) : (
            <ChevronUpIcon
              color={
                isCompleted
                  ? "white"
                  : isHovered
                  ? "rgba(70, 118, 251, 0.7)"
                  : "rgba(70, 118, 251, 0.4)"
              }
              width="34"
            />
          )}
        </div>
      </div>

      <div
        className={styles.globalLoadingFilled}
        style={{ width: `${totalProgress}%` }}
      />

      {isOpen && (
        <div className={styles.rows}>
          {uploads.map((upload) => {
            return (
              <UploadRow
                key={upload.id}
                id={upload.id}
                filename={upload.filename}
                size={upload.size}
                progress={upload.progress}
                status={upload.status}
                error={upload.error}
              />
            );
          })}

          {uploads.length !== 0 && (
            <div className={styles.clearButtonContainer}>
              <SecondaryButton
                title="Очистить загрузки"
                onClick={clearCompleted}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadsMenu;
