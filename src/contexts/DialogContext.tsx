import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import styles from "./styles.module.css";

interface DialogContextType {
  isOpen: boolean;
  dialogs: ReactNode[];
  open: (dialog: ReactNode) => void;
  close: () => void;
  closeAll: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [dialogs, setDialogs] = useState<ReactNode[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimmersRef = useRef<HTMLDivElement[]>([]);

  const isOpen = dialogs.length > 0;

  const addDimmer = (dialogElement: HTMLDivElement) => {
    const dimmer = document.createElement("div");
    dimmer.style.position = "absolute";
    dimmer.style.top = "0";
    dimmer.style.left = "0";
    dimmer.style.width = "100%";
    dimmer.style.height = "100%";
    dimmer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    dimmer.style.zIndex = "1";
    dialogElement.appendChild(dimmer);
    dimmersRef.current.push(dimmer);
    return dimmer;
  };

  const removeAllDimmers = () => {
    dimmersRef.current.forEach((dimmer) => {
      if (dimmer.parentNode) {
        dimmer.parentNode.removeChild(dimmer);
      }
    });
    dimmersRef.current = [];
  };

  const open = (content: ReactNode) => {
    setDialogs((prev) => [...prev, content]);

    setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = "1";
      }

      removeAllDimmers();

      dialogRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.style.opacity = "1";
          ref.style.transform = "translate(-50%, -50%) scale(1)";

          if (index !== dialogRefs.current.length - 1 && ref) {
            addDimmer(ref);
          }
        }
      });
    }, 10);
  };

  const close = () => {
    if (overlayRef.current && dialogRefs.current.length > 0) {
      const lastDialogRef = dialogRefs.current[dialogRefs.current.length - 1];
      if (lastDialogRef) {
        lastDialogRef.style.opacity = "0";
        lastDialogRef.style.transform = "translate(-50%, -50%) scale(0.95)";

        setTimeout(() => {
          setDialogs((prev) => prev.slice(0, -1));
          dialogRefs.current = dialogRefs.current.slice(0, -1);
          removeAllDimmers();

          if (dialogRefs.current.length > 0) {
            dialogRefs.current.forEach((ref, index) => {
              if (ref && index !== dialogRefs.current.length - 1) {
                addDimmer(ref);
              }
            });
          } else {
            if (overlayRef.current) {
              overlayRef.current.style.opacity = "0";
            }
          }
        }, 300);
      }
    }
  };

  const closeAll = () => {
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0";
      dialogRefs.current.forEach((ref) => {
        if (ref) {
          ref.style.opacity = "0";
          ref.style.transform = "translate(-50%, -50%) scale(0.95)";
        }
      });

      setTimeout(() => {
        setDialogs([]);
        dialogRefs.current = [];
        removeAllDimmers();
      }, 300);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Закрываем только если клик был на самом overlay, а не на диалоге
    if (e.target === overlayRef.current) {
      if (dialogs.length > 1) {
        // Если открыто несколько диалогов - закрываем последний
        close();
      } else {
        // Если только один диалог - закрываем его
        close();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (dialogs.length > 0) {
          close();
        }
      }
    };

    if (isOpen) document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, dialogs.length]);

  useEffect(() => {
    dialogRefs.current = dialogRefs.current.slice(0, dialogs.length);
  }, [dialogs.length]);

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        dialogs,
        open,
        close,
        closeAll,
      }}
    >
      {children}
      {isOpen && (
        <div
          ref={overlayRef}
          className={styles.overlay}
          style={{
            opacity: 0,
            transition: "opacity 0.3s ease-out",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
          onClick={handleOverlayClick}
        >
          {dialogs.map((dialog, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) {
                  dialogRefs.current[index] = el;
                }
              }}
              className={styles.dialogContainer}
              style={{
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0.95)",
                transition: "all 0.3s ease-out",
                zIndex: index + 1,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {dialog}
            </div>
          ))}
        </div>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
