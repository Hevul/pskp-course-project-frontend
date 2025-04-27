import { FC, useEffect, useMemo } from "react";
import AudioViewer from "./AudioViewer/AudioViewer";
import VideoViewer from "./VideoViewer/VideoViewer";
import ImageViewer from "./ImageViewer/ImageViewer";
import TextViewer from "./TextViewer/TextViewer";
import config from "../../config.json";
import PdfViewer from "./PdfViewer/PdfViewer";
import DocxViewer from "./OfficeViewer/OfficeViewer";
import { usePopup } from "../../contexts/PopupContext";
import { useFileViewer } from "../../contexts/FileViewerContext";

interface Props {
  filename: string;
  fileId: string;
}

const TEXT_FILE_EXTENSIONS = [
  "txt",
  "json",
  "js",
  "jsx",
  "mjs",
  "cjs",
  "ts",
  "tsx",
  "html",
  "htm",
  "css",
  "scss",
  "sass",
  "less",
  "yaml",
  "yml",
  "xml",
  "toml",
  "ini",
  "conf",
  "properties",
  "md",
  "markdown",
  "rst",
  "py",
  "pyw",
  "java",
  "class",
  "jar",
  "c",
  "h",
  "cpp",
  "cc",
  "hpp",
  "cs",
  "php",
  "rb",
  "go",
  "rs",
  "kt",
  "swift",
  "scala",
  "groovy",
  "lua",
  "pl",
  "pm",
  "r",
  "sh",
  "bash",
  "zsh",
  "fish",
  "ps1",
  "bat",
  "cmd",
  "sql",
  "pgsql",
  "mysql",
  "log",
  "csv",
  "tsv",
  "diff",
  "patch",
  "dockerfile",
  "makefile",
  "mk",
  "twig",
  "j2",
  "jinja",
  "jinja2",
  "env",
  "dotenv",
  "gitignore",
  "htaccess",
];

const FileViewer: FC<Props> = ({ filename, fileId }) => {
  const fileExtension = filename.split(".").pop()?.toLowerCase() ?? "";
  const fileUrl = `${config.base}/${config.file}/view/${fileId}`;

  const { show } = usePopup();
  const { close } = useFileViewer();

  const isSupported = useMemo(() => {
    if (!fileExtension) return false;

    const supportedFormats = [
      "mp3",
      "wav",
      "ogg",
      "flac",
      "aac",
      "mp4",
      "webm",
      "mov",
      "avi",
      "mkv",
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "svg",
      "pdf",
      "docx",
      ...TEXT_FILE_EXTENSIONS,
    ];

    return supportedFormats.includes(fileExtension);
  }, [fileExtension]);

  useEffect(() => {
    if (!fileExtension) {
      show("Не удалось открыть файл! Неизвестный тип файла.", {
        iconType: "error",
      });
      close();
      return;
    }

    if (!isSupported) {
      show(
        `Не удалось открыть файл! Тип файла ${fileExtension} не поддерживается для просмотра.`,
        { iconType: "error" }
      );
      close();
    }
  }, [fileExtension, isSupported, show, close]);

  const renderFileContent = () => {
    if (!fileExtension || !isSupported) return null;

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
        return <PdfViewer fileId={fileId} filename={filename} />;
      case "docx":
        return <DocxViewer fileUrl={fileUrl} fileName={filename} />;
      default:
        if (TEXT_FILE_EXTENSIONS.includes(fileExtension)) {
          return <TextViewer fileUrl={fileUrl} fileName={filename} />;
        }
        return null;
    }
  };

  return renderFileContent();
};

export default FileViewer;
