import React, { useState, useMemo } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "./PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  // Мемоизированные options
  const documentOptions = useMemo(
    () => ({
      withCredentials: true,
    }),
    []
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const changePage = (offset: number) => {
    setPageNumber((prev) => prev + offset);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
        >
          ←
        </button>
        <span>
          Страница {pageNumber} из {numPages || "--"}
        </span>
        <button
          className={styles.button}
          onClick={() => changePage(1)}
          disabled={!!numPages && pageNumber >= numPages}
        >
          →
        </button>

        <div className={styles.zoomControls}>
          <button className={styles.button} onClick={zoomOut}>
            -
          </button>
          <span>{(scale * 100).toFixed(0)}%</span>
          <button className={styles.button} onClick={zoomIn}>
            +
          </button>
        </div>
      </div>

      <Document
        file={fileUrl}
        options={documentOptions}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div>Загрузка PDF...</div>}
        error={<div>Ошибка загрузки PDF</div>}
      >
        <Page
          pageNumber={pageNumber}
          scale={scale}
          width={800}
          loading={<div>Загрузка страницы...</div>}
        />
      </Document>
    </div>
  );
};

export default PdfViewer;
