import React, { useEffect, useRef } from "react";
import * as docx from "docx-preview";
import useAxios from "../../../hooks/useAxios";

const injectPageBreaks = () => {
  const style = document.createElement("style");
  style.textContent = `
      .docx-wrapper section.docx {
        position: relative;
        margin-bottom: 20px;
      }
      .docx-wrapper section.docx:last-child {
        margin-bottom: 0 !important;
      }
      .docx-wrapper {
        padding: 0 !important;
        margin: 0 !important;
        background: #4C4C4C !important;
      }
    `;
  document.head.appendChild(style);
};

interface OfficeViewerProps {
  fileUrl: string;
  fileName: string;
}

const DocxViewer: React.FC<OfficeViewerProps> = ({ fileUrl, fileName }) => {
  const docxRef = useRef<HTMLDivElement>(null);
  const { sendRequest } = useAxios({
    onSuccess(response) {
      try {
        const arrayBuffer = response.data;
        renderDocx(arrayBuffer);
      } catch (error) {
        console.error("Ошибка загрузки файла:", error);
      }
    },
  });

  useEffect(() => {
    sendRequest({
      url: fileUrl,
      responseType: "arraybuffer",
      withCredentials: true,
      method: "get",
    });
  }, []);

  const renderDocx = async (arrayBuffer: ArrayBuffer) => {
    if (docxRef.current) {
      docxRef.current.innerHTML = "";

      injectPageBreaks();

      await docx.renderAsync(arrayBuffer, docxRef.current, undefined, {
        ignoreLastRenderedPageBreak: false,
        experimental: true,
      });
    }
  };

  return <div ref={docxRef} style={{ overflowY: "auto" }} />;
};

export default DocxViewer;
