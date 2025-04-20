import React, { useState, useRef } from "react";
import styles from "./ImageViewer.module.css";

interface ImageViewerProps {
  fileUrl: string;
  fileName: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ fileUrl, fileName }) => {
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isOriginalSize, setIsOriginalSize] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const rotate = () => setRotation((prev) => (prev + 90) % 360);
  const reset = () => {
    setScale(1);
    setRotation(0);
    setIsOriginalSize(false);
  };

  const toggleOriginalSize = () => {
    setIsOriginalSize(!isOriginalSize);
    if (!isOriginalSize && imgRef.current) {
      setScale(1);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getImageStyle = () => {
    const baseStyle = {
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transition: "transform 0.3s ease",
    };

    if (isOriginalSize) {
      return {
        ...baseStyle,
        maxWidth: "none",
        maxHeight: "none",
      };
    }

    return {
      ...baseStyle,
      maxWidth: "100%",
      maxHeight: "80vh",
    };
  };

  const props = {
    width: isOriginalSize ? "auto" : 600,
    height: isOriginalSize ? "auto" : 400,
    zoomWidth: 500,
    img: fileUrl,
    scale: scale,
    zoomStyle: "z-index: 1000; background-color: white;",
  };

  return (
    <div className={styles.imageViewer}>
      <div className={styles.toolbar}>
        <div className={styles.controlsGroup}>
          <button onClick={zoomIn} title="Увеличить">
            +
          </button>
          <span>Масштаб: {(scale * 100).toFixed(0)}%</span>
          <button onClick={zoomOut} title="Уменьшить">
            -
          </button>

          <button onClick={rotate} title="Повернуть">
            Поворот: {rotation}°
          </button>

          <button onClick={toggleOriginalSize} title="Оригинальный размер">
            {isOriginalSize ? "Уместить" : "Оригинал"}
          </button>

          <button onClick={reset} title="Сбросить">
            Сброс
          </button>
        </div>

        <button onClick={downloadImage} className={styles.downloadButton}>
          Скачать
        </button>
      </div>

      <div className={styles.imageContainer}>
        {rotation !== 0 || isOriginalSize ? (
          <img
            ref={imgRef}
            src={fileUrl}
            alt={fileName}
            className={styles.image}
            style={getImageStyle()}
          />
        ) : (
          <img
            ref={imgRef}
            src={fileUrl}
            alt={fileName}
            className={styles.image}
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              cursor: scale > 1 ? "grab" : "zoom-in",
            }}
            onClick={() => scale <= 1 && zoomIn()}
            onWheel={(e) => {
              e.deltaY > 0 ? zoomOut() : zoomIn();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
