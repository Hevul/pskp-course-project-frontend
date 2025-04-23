import File from "../../models/File";
import { FC } from "react";
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
  file: File;
}

const FileViewer: FC<Props> = ({ file }) => {
  const { name, id } = file;

  const fileExtension = name.split(".").pop()?.toLowerCase();
  const fileUrl = `${config.base}/${config.file}/view/${id}`;

  const { show } = usePopup();
  const { close } = useFileViewer();

  const renderFileContent = () => {
    if (!fileExtension) {
      close();
      show("Не удалось открыть файл! Неизвестный тип файла.", {
        iconType: "error",
      });
      return null;
    }

    switch (fileExtension) {
      case "mp3":
      case "wav":
      case "ogg":
      case "flac":
      case "aac":
        return <AudioViewer fileUrl={fileUrl} fileName={name} />;
      case "mp4":
      case "webm":
      case "mov":
      case "avi":
      case "mkv":
        return <VideoViewer fileUrl={fileUrl} fileName={name} />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
      case "svg":
        return <ImageViewer fileUrl={fileUrl} fileName={name} />;
      case "pdf":
        return <PdfViewer file={file} />;
      case "docx":
        return <DocxViewer fileUrl={fileUrl} fileName={name} />;
      default:
        if (TEXT_FILE_EXTENSIONS.includes(fileExtension))
          return <TextViewer fileUrl={fileUrl} fileName={name} />;

        close();
        show(
          `Не удалось открыть файл! Тип файла ${fileExtension} не поддерживается для просмотра.`,
          {
            iconType: "error",
          }
        );
        return null;
    }
  };

  return renderFileContent();
};

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

export default FileViewer;
