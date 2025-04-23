import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import styles from "./TextViewer.module.css";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../Loading/Loading";
import SunIcon from "../../icons/SunIcon";
import MoonIcon from "../../icons/MoonIcon";
import MinusIcon from "../../icons/MinusIcon";
import PlusIcon from "../../icons/PlusIcon";

interface TextViewerProps {
  fileUrl: string;
  fileName: string;
}

const LANGUAGE_MAP: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  ts: "typescript",
  tsx: "typescript",
  html: "html",
  htm: "html",
  css: "css",
  scss: "scss",
  sass: "sass",
  less: "less",

  // Данные и конфиги
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  xml: "xml",
  toml: "toml",
  ini: "ini",
  conf: "ini",
  properties: "ini",

  // Документация
  md: "markdown",
  markdown: "markdown",
  rst: "restructuredtext",

  // Языки программирования
  py: "python",
  pyw: "python",
  java: "java",
  class: "java",
  jar: "java",
  c: "c",
  h: "c",
  cpp: "cpp",
  cc: "cpp",
  hpp: "cpp",
  cs: "csharp",
  php: "php",
  rb: "ruby",
  go: "go",
  rs: "rust",
  kt: "kotlin",
  swift: "swift",
  scala: "scala",
  groovy: "groovy",
  lua: "lua",
  pl: "perl",
  pm: "perl",
  r: "r",
  sh: "shell",
  bash: "shell",
  zsh: "shell",
  fish: "shell",
  ps1: "powershell",
  bat: "bat",
  cmd: "bat",

  // Базы данных
  sql: "sql",
  pgsql: "sql",
  mysql: "sql",

  // Другие текстовые форматы
  txt: "plaintext",
  log: "log",
  csv: "csv",
  tsv: "csv",
  diff: "diff",
  patch: "diff",

  // Конфигурации сборки
  dockerfile: "dockerfile",
  makefile: "makefile",
  mk: "makefile",

  // Шаблоны
  twig: "twig",
  j2: "jinja",
  jinja: "jinja",
  jinja2: "jinja",

  // Специальные форматы
  env: "properties",
  dotenv: "properties",
  gitignore: "gitignore",
  htaccess: "htaccess",
};

const FONT_SIZES = [12, 14, 16, 18, 20];
const DEFAULT_FONT_SIZE = 14;

const TextViewer: React.FC<TextViewerProps> = ({ fileUrl, fileName }) => {
  const [content, setContent] = useState<string>("");
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);
  const viewerRef = useRef<any>(null);

  const fileType = fileName.split(".").pop()?.toLowerCase() || "txt";
  const language = LANGUAGE_MAP[fileType] || "plaintext";

  const { sendRequest } = useAxios({
    onSuccess(response) {
      setContent(response.data);
    },
    onError(error) {
      setContent("не удалось загрузить файл");
    },
  });

  useEffect(() => {
    sendRequest({
      url: fileUrl,
      method: "get",
      withCredentials: true,
      responseType: "text",
    });
  }, [fileUrl]);

  const handleViewerDidMount = (editor: any) => {
    viewerRef.current = editor;
    editor.updateOptions({ readOnly: true });
  };

  const toggleTheme = () => {
    setTheme(theme === "vs-dark" ? "light" : "vs-dark");
  };

  const increaseFontSize = () => {
    setFontSize((prev) =>
      Math.min(...FONT_SIZES.filter((size) => size > prev))
    );
  };

  const decreaseFontSize = () => {
    setFontSize((prev) =>
      Math.max(...FONT_SIZES.filter((size) => size < prev))
    );
  };

  return (
    <div
      className={`${styles.container} ${theme === "light" ? styles.light : ""}`}
    >
      <div className={styles.toolbar}>
        <div className={styles.changeSizeGroup}>
          <button
            className={styles.iconButton}
            onClick={decreaseFontSize}
            disabled={fontSize <= Math.min(...FONT_SIZES)}
          >
            <MinusIcon />
          </button>
          <button
            className={styles.iconButton}
            onClick={increaseFontSize}
            disabled={fontSize >= Math.max(...FONT_SIZES)}
          >
            <PlusIcon />
          </button>
        </div>

        <button className={styles.iconButton} onClick={toggleTheme}>
          {theme === "vs-dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <div className={styles.editorContainer}>
        <Editor
          width="70vw"
          height="80vh"
          language={language}
          theme={theme}
          value={content}
          onMount={handleViewerDidMount}
          options={{
            fontSize,
            readOnly: true,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: true,
            lineNumbers: "off",
            wordWrap: "on",
            quickSuggestions: false,
            folding: false,
          }}
          loading={<Loading size="large" />}
        />
      </div>
    </div>
  );
};

export default TextViewer;
