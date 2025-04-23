import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "./ImageViewer.module.css";
import SunIcon from "../../icons/SunIcon";
import MoonIcon from "../../icons/MoonIcon";

interface ImageViewerProps {
  fileUrl: string;
  fileName: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ fileUrl, fileName }) => {
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const toggleTheme = () => setTheme(theme === "vs-dark" ? "light" : "vs-dark");

  return (
    <div
      className={`${styles.container} ${theme === "light" ? styles.light : ""}`}
    >
      <div className={styles.toolbar}>
        <button className={styles.iconButton} onClick={toggleTheme}>
          {theme === "vs-dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <div className={styles.imageContainer}>
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={3}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                  minWidth: `30vw`,
                  minHeight: `30vh`,
                }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: `30vw`,
                  minHeight: `30vh`,
                }}
              >
                <img
                  src={fileUrl}
                  alt={fileName}
                  className={styles.image}
                  style={{ cursor: "grab" }}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default ImageViewer;
