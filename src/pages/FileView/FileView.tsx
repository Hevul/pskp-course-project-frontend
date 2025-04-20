import React, { useEffect, useState } from "react";
import TextViewer from "./components/TextViewer/TextViewer";
import PdfViewer from "./components/PdfViewer/PdfViewer";
import { useParams } from "react-router-dom";
import styles from "./FileView.module.css";
import OfficeViewer from "./components/OfficeViewer/OfficeViewer";
import ImageViewer from "./components/ImageViewer/ImageViewer";
import VideoViewer from "./components/VideoViewer/VideoViewer";
import AudioViewer from "./components/AudioViewer/AudioViewer";
import useAxios from "../../hooks/useAxios";
import config from "../../config.json";
import { get } from "../../api/files";

const FileView: React.FC = () => {
  const { id } = useParams();
  const [filename, setFilename] = useState("");
  const fileUrl = `${config.base}/${config.file}/view/${id}`;

  const { sendRequest } = useAxios({
    onSuccess(response) {
      setFilename(response.data._name);
    },
  });

  const fileExtension = filename.split(".").pop()?.toLowerCase();

  const renderFileContent = () => {
    if (!fileExtension) {
      return <div>Неизвестный тип файла</div>;
    }

    switch (fileExtension) {
      case "mp3":
      case "wav":
      case "ogg":
      case "flac":
      case "aac":
        return <AudioViewer fileUrl={fileUrl} fileName={filename} />;
      case "mp4":
      case "webm":
      case "mov":
      case "avi":
      case "mkv":
        return <VideoViewer fileUrl={fileUrl} fileName={filename} />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
      case "svg":
        return <ImageViewer fileUrl={fileUrl} fileName={filename} />;
      case "pdf":
        return <PdfViewer fileUrl={fileUrl} />;
      case "docx":
      case "xlsx":
      case "pptx":
      case "xls":
        return <OfficeViewer fileUrl={fileUrl} fileName={filename} />;
      case "txt":
      case "json":
      case "js":
      case "ts":
      case "html":
      case "css":
      case "md":
        return <TextViewer fileUrl={fileUrl} fileName={filename} />;
      default:
        return (
          <div>
            Формат файла {fileExtension} не поддерживается для просмотра
          </div>
        );
    }
  };

  useEffect(() => {
    if (id) sendRequest(get(id));
  }, []);

  return (
    <div className={styles.fileViewContainer}>
      <h1>Просмотр файла: {filename}</h1>
      <div className={styles.fileContent}>{renderFileContent()}</div>
    </div>
  );
};

export default FileView;
