import { FC, useState } from "react";
import styles from "./ChooseFileArea.module.css";
import ChooseFileButton from "../ChooseFileButton/ChooseFileButton";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isFileSelected: boolean;
}

const ChooseFileArea: FC<Props> = ({ setFile, isFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;

    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  return (
    <div
      className={`${styles.dragArea} ${isDragging ? styles.dragging : ""} ${
        isFileSelected ? styles.highlight : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <img className={styles.cloudImg} src="upload-cloud.svg" alt="" />

      <div className={styles.drag}>
        <p className={styles.uplP}>Выберите файл или перетащите его сюда</p>
        <p className={styles.uplAddP}>
          Вы также можете выбрать несколько файлов
        </p>
      </div>

      <ChooseFileButton setFile={setFile} />
    </div>
  );
};

export default ChooseFileArea;
