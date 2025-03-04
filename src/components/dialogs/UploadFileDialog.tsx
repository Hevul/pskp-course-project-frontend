import { FC, useRef, useState } from "react";
import Dialog from "../Dialog";
import React from "react";
import SecondaryButton from "../SecondaryButton";
import { useStorage } from "../../contexts/StorageContext";
import useAxios from "../../hooks/useAxios";
import { upload } from "../../api/files";

interface Props {
  onSecondaryClick?: () => void;
  onPrimaryClick?: () => void;
}

const UploadFileDialog: FC<Props> = ({ onSecondaryClick, onPrimaryClick }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { storage } = useStorage();

  const { sendRequest } = useAxios();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!storage) {
      console.log("Storage must be defined!");
      return;
    }

    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);

      try {
        const response = await sendRequest(upload(file, storage!.id));
        console.log("File uploaded successfully:", response);
      } catch (error) {
        console.error("Failed to upload file:", error);
      }
    }
  };

  return (
    <Dialog title="Upload file">
      <div className="buttons">
        <SecondaryButton text="Cancel" onClick={onSecondaryClick} />
        <div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button onClick={handleButtonClick}>Upload File</button>

          {selectedFile && (
            <div>
              <p>Selected file: {selectedFile.name}</p>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default UploadFileDialog;
