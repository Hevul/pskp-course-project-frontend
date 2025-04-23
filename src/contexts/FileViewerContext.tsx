import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import styles from "./styles.module.css";

interface FileViewerContextType {
  isOpen: boolean;
  view: (content: ReactNode) => void;
  close: () => void;
}

const FileViewerContext = createContext<FileViewerContextType | null>(null);

interface FileViewerProviderProps {
  children: ReactNode;
}

export const FileViewerProvider: React.FC<FileViewerProviderProps> = ({
  children,
}) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = content !== null;

  const open = (newContent: ReactNode) => {
    setContent(newContent);

    setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = "1";
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = "1";
        contentRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      }
    }, 10);
  };

  const close = () => {
    if (overlayRef.current && contentRef.current) {
      contentRef.current.style.opacity = "0";
      contentRef.current.style.transform = "translate(-50%, -50%) scale(0.95)";
      overlayRef.current.style.opacity = "0";

      setTimeout(() => {
        setContent(null);
      }, 300);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <FileViewerContext.Provider
      value={{
        isOpen,
        view: open,
        close,
      }}
    >
      {children}
      {isOpen && (
        <div
          ref={overlayRef}
          className={styles.fileViewerOverlay}
          style={{
            opacity: 0,
            transition: "opacity 0.3s ease-out",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
          onClick={handleOverlayClick}
        >
          <div
            ref={contentRef}
            className={styles.fileViewerContainer}
            style={{
              opacity: 0,
              transform: "translate(-50%, -50%) scale(0.95)",
              transition: "all 0.3s ease-out",
              position: "fixed",
              top: "50%",
              left: "50%",
              maxWidth: "90%",
              maxHeight: "90%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "transparent",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </FileViewerContext.Provider>
  );
};

export const useFileViewer = () => {
  const context = useContext(FileViewerContext);
  if (!context) {
    throw new Error("useFileViewer must be used within a FileViewerProvider");
  }
  return context;
};
