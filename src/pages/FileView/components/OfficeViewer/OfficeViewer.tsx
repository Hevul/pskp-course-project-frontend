import React, { useState, useEffect, useRef, JSX } from "react";
import * as docx from "docx-preview";
import * as XLSX from "xlsx";
import styles from "./OfficeViewer.module.css";
import axios from "axios";

const injectPageBreaks = () => {
  const style = document.createElement("style");
  style.textContent = `
      .docx-wrapper section.docx {
        position: relative;
        margin-bottom: 20px;
        box-shadow: 0 0 0 1px #e0e0e0;
      }
    `;
  document.head.appendChild(style);
};

interface OfficeViewerProps {
  fileUrl: string;
  fileName: string;
}

const OfficeViewer: React.FC<OfficeViewerProps> = ({ fileUrl, fileName }) => {
  const docxRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<JSX.Element | string>("Загрузка...");
  const [fileType, setFileType] = useState<string>("");

  useEffect(() => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    setFileType(extension);

    const fetchAndRenderFile = async () => {
      try {
        const response = await axios.get(fileUrl, {
          responseType: "arraybuffer",
          withCredentials: true,
        });
        const arrayBuffer = response.data;

        switch (extension) {
          case "docx":
            await renderDocx(arrayBuffer);
            break;
          case "xlsx":
          case "xls":
            renderExcel(arrayBuffer);
            break;
          case "pptx":
            setContent(<PptxPlaceholder fileUrl={fileUrl} />);
            break;
          default:
            setContent("Формат файла не поддерживается");
        }
      } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        setContent("Ошибка загрузки файла");
      }
    };

    fetchAndRenderFile();
  }, [fileUrl, fileName]);

  const renderDocx = async (arrayBuffer: ArrayBuffer) => {
    if (docxRef.current) {
      docxRef.current.innerHTML = "";

      // Добавляем кастомные стили перед рендерингом
      injectPageBreaks();

      await docx.renderAsync(arrayBuffer, docxRef.current, undefined, {
        // Дополнительные опции рендеринга
        ignoreLastRenderedPageBreak: false,
        experimental: true,
      });
    }
  };

  const renderExcel = (arrayBuffer: ArrayBuffer) => {
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const html = XLSX.utils.sheet_to_html(worksheet);
    setContent(<div dangerouslySetInnerHTML={{ __html: html }} />);
  };

  const PptxPlaceholder = ({ fileUrl }: { fileUrl: string }) => (
    <div className={styles.pptxPlaceholder}>
      <p>Просмотр PPTX файлов напрямую не поддерживается.</p>
      <p>
        Вы можете{" "}
        <a href={fileUrl} download>
          скачать файл
        </a>{" "}
        или открыть его через{" "}
        <a
          href={`https://docs.google.com/viewer?url=${encodeURIComponent(
            fileUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Docs Viewer
        </a>
      </p>
    </div>
  );

  return (
    <div className={styles.officeViewer}>
      <h3>{fileName}</h3>
      <div className={styles.viewerContainer}>
        {fileType === "docx" && (
          <div
            ref={docxRef}
            className={`${styles.docxContainer} docx-wrapper`}
          />
        )}
        {fileType === "xlsx" || fileType === "xls" ? (
          <div className={styles.excelContainer}>{content}</div>
        ) : null}
        {fileType === "pptx" && content}
      </div>
    </div>
  );
};

export default OfficeViewer;
