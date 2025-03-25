import { FC, useRef } from "react";
import styles from "./ChooseFileButton.module.css";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const ChooseFileButton: FC<Props> = ({ setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        className={styles.uplChooseFileButton}
        onClick={handleButtonClick}
      >
        ВЫБРАТЬ ФАЙЛ
      </button>
    </div>
  );
};

export default ChooseFileButton;
