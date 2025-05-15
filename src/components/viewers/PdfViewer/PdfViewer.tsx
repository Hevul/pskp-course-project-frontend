import React, { useState, useMemo, ChangeEvent } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "./PdfViewer.module.css";
import config from "../../../config.json";
import File from "../../../models/File";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import MinusIcon from "../../icons/MinusIcon";
import MoonIcon from "../../icons/MoonIcon";
import PlusIcon from "../../icons/PlusIcon";
import RightArrowIcon from "../../icons/RightArrowIcon";
import SunIcon from "../../icons/SunIcon";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  filename: string;
  fileId: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ filename, fileId }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const fileUrl = `${config.server}/${config.routes.file}/view/${fileId}`;

  const documentOptions = useMemo(
    () => ({
      withCredentials: true,
    }),
    []
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const changePage = (offset: number) => setPageNumber((prev) => prev + offset);
  const toggleTheme = () => setTheme(theme === "vs-dark" ? "light" : "vs-dark");
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const [inputPage, setInputPage] = useState("");
  const handlePageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(inputPage);
      if (!isNaN(page) && numPages && page >= 1 && page <= numPages) {
        setPageNumber(page);
      } else {
        setInputPage(pageNumber.toString());
      }
    }
  };

  React.useEffect(() => {
    setInputPage(pageNumber.toString());
  }, [pageNumber]);

  return (
    <div
      className={`${styles.container} ${theme === "light" ? styles.light : ""}`}
    >
      <div className={styles.toolbar}>
        <div className={styles.group}>
          <button
            className={styles.iconButton}
            onClick={zoomOut}
            disabled={scale <= 0.5}
          >
            <MinusIcon />
          </button>
          <button
            className={styles.iconButton}
            onClick={zoomIn}
            disabled={scale >= 2}
          >
            <PlusIcon />
          </button>
        </div>

        <div className={styles.midGroup}>
          <button
            className={styles.iconButton}
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
          >
            <LeftArrowIcon />
          </button>

          <div className={styles.pageInputContainer}>
            <input
              type="text"
              className={styles.pageInput}
              value={inputPage}
              onChange={handlePageInputChange}
              onKeyDown={handlePageInputSubmit}
              size={3}
              aria-label="Номер страницы"
            />
            <span className={styles.pageSpan}>из {numPages || "--"}</span>
          </div>

          <button
            className={styles.iconButton}
            onClick={() => changePage(1)}
            disabled={!!numPages && pageNumber >= numPages}
          >
            <RightArrowIcon />
          </button>
        </div>

        <button className={styles.iconButton} onClick={toggleTheme}>
          {theme === "vs-dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <div className={styles.documentScrollContainer}>
        <Document
          file={fileUrl}
          options={documentOptions}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <span className={styles.pageSpan}>Загрузка документа...</span>
          }
          error={<span className={styles.pageSpan}>Ошибка загрузки PDF</span>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            width={800}
            loading={
              <span className={styles.pageSpan}>Загрузка страницы...</span>
            }
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
