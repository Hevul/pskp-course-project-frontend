import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import styles from "./TextViewer.module.css";
import useAxios from "../../../../hooks/useAxios";
import { view } from "../../../../api/files";
import Loading from "../../../../components/Loading/Loading";

interface TextViewerProps {
  fileUrl: string;
  fileName: string;
}

const LANGUAGE_MAP: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  jsx: "javascript",
  tsx: "typescript",
  json: "json",
  md: "markdown",
  csv: "plaintext",
  txt: "plaintext",
  html: "html",
  css: "css",
  scss: "scss",
  yaml: "yaml",
  yml: "yaml",
  xml: "xml",
  py: "python",
  java: "java",
  cpp: "cpp",
  cs: "csharp",
  php: "php",
  rb: "ruby",
  go: "go",
  rs: "rust",
  sh: "shell",
  kt: "kotlin",
  swift: "swift",
};

const FONT_SIZES = [12, 14, 16, 18, 20];
const DEFAULT_FONT_SIZE = 14;

const TextViewer: React.FC<TextViewerProps> = ({ fileUrl, fileName }) => {
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);
  const editorRef = useRef<any>(null);
  const viewerRef = useRef<any>(null);

  const fileType = fileName.split(".").pop()?.toLowerCase() || "txt";
  const language = LANGUAGE_MAP[fileType] || "plaintext";

  const { sendRequest, loading } = useAxios({
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
    });
  }, [fileUrl]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleViewerDidMount = (editor: any) => {
    viewerRef.current = editor;
    editor.updateOptions({ readOnly: true });
  };

  const handleSave = () => {
    if (editorRef.current) {
      const newValue = editorRef.current.getValue();
      setContent(newValue);
      console.log("Содержимое сохранено:", newValue);
    }
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
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

  const updateEditorOptions = (editor: any) => {
    if (editor) {
      editor.updateOptions({
        fontSize,
        readOnly: !isEditing,
        lineNumbers: isEditing ? "on" : "off",
        minimap: { enabled: false },
      });
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      updateEditorOptions(editorRef.current);
    }
    if (viewerRef.current) {
      updateEditorOptions(viewerRef.current);
    }
  }, [fontSize, isEditing]);

  if (loading) return <Loading label="Загрузка файла" size="large" />;

  return (
    <div
      className={`${styles.container} ${theme === "light" ? styles.light : ""}`}
    >
      <div className={styles.toolbar}>
        <div className={styles.controlsGroup}>
          <button className={styles.button} onClick={toggleTheme}>
            {theme === "vs-dark" ? "Светлая тема" : "Тёмная тема"}
          </button>

          <div className={styles.fontSizeControls}>
            <button
              className={styles.button}
              onClick={decreaseFontSize}
              disabled={fontSize <= Math.min(...FONT_SIZES)}
            >
              Уменьшить шрифт
            </button>
            <span className={styles.fontSizeDisplay}>{fontSize}px</span>
            <button
              className={styles.button}
              onClick={increaseFontSize}
              disabled={fontSize >= Math.max(...FONT_SIZES)}
            >
              Увеличить шрифт
            </button>
          </div>
        </div>

        <button
          className={`${styles.button} ${styles.editButton}`}
          onClick={toggleEditMode}
        >
          {isEditing ? "Сохранить" : "Редактировать"}
        </button>
      </div>

      <div className={styles.editorContainer}>
        <Editor
          height="80vh"
          language={language}
          theme={theme}
          value={content}
          onMount={isEditing ? handleEditorDidMount : handleViewerDidMount}
          options={{
            fontSize,
            readOnly: !isEditing,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            lineNumbers: isEditing ? "on" : "off",
            wordWrap: "on",
          }}
          loading={<div className={styles.loading}>Загрузка редактора...</div>}
        />
      </div>
    </div>
  );
};

export default TextViewer;
