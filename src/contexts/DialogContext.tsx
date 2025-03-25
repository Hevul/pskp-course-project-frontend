import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface DialogContextType {
  isOpen: boolean;
  dialog: ReactNode | null;
  open: (dialog: ReactNode) => void;
  close: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialogContent] = useState<ReactNode | null>(null);

  const open = (content: ReactNode) => {
    setDialogContent(content);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setDialogContent(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    if (isOpen) document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        dialog,
        open,
        close,
      }}
    >
      {children}
      {isOpen && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 100,
            top: 0,
            position: "fixed",
          }}
          onClick={close}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              backgroundColor: "white",
              transform: "translate(-50%, -50%)",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {dialog}
          </div>
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
