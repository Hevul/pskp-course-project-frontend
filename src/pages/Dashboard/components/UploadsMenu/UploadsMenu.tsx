import { useEffect, useState } from "react";
import ChevronUpIcon from "../../../../components/icons/ChevronUpIcon";
import UploadRow from "./UploadRow";
import styles from "./UploadsMenu.module.css";
import ChevronDownIcon from "../../../../components/icons/ChevronDownIcon";
import { useUploads } from "../../../../contexts/UploadContext";
import SecondaryButton from "../../../../components/SecondaryButton/SecondaryButton";

const UploadsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { uploads, totalProgress, clear: clearCompleted } = useUploads();
  const [isAnimating, setIsAnimating] = useState(false);

  const isCompleted = totalProgress === 100;
  const hasUploads = uploads.length > 0;

  useEffect(() => {
    if (hasUploads) setIsMounted(true);
    else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [hasUploads]);

  if (!isMounted && !hasUploads) return null;

  const toggleMenu = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsOpen(!isOpen);

    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <div
      className={`${styles.menu} ${isOpen ? styles.open : ""} ${
        hasUploads ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles.globalLoadingEmpty}>
        <div
          className={styles.closeButton}
          onClick={toggleMenu}
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

      <div className={styles.rows}>
        {uploads.map((upload) => (
          <UploadRow
            key={upload.id}
            id={upload.id}
            filename={upload.filename}
            size={upload.size}
            progress={upload.progress}
            status={upload.status}
            error={upload.error}
          />
        ))}

        {uploads.length !== 0 && (
          <div className={styles.clearButtonContainer}>
            <SecondaryButton
              title="Очистить загрузки"
              onClick={clearCompleted}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadsMenu;
