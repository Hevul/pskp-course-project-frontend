import React from "react";

const GoogleDocsViewer = ({ fileUrl = "" }) => {
  const encodedUrl = encodeURIComponent(fileUrl);

  return (
    <div
      style={{
        position: "fixed", // Фиксированное позиционирование
        top: 0,
        left: 0,
        width: "100vw", // 100% ширины окна
        height: "100vh", // 100% высоты окна
        border: "none", // Убираем границы
        margin: 0, // Убираем отступы
        padding: 0,
        overflow: "hidden", // Отключаем скролл
      }}
    >
      <iframe
        title="Google Docs Viewer"
        src={`https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

const FileView = () => {
  const fileUrl = "";

  return (
    <div style={{ height: "100vh", margin: 0, padding: 0 }}>
      <GoogleDocsViewer fileUrl={fileUrl} />
    </div>
  );
};

export default FileView;
