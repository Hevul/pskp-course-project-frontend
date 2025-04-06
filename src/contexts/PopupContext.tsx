// contexts/PopupContext.tsx
import React, { createContext, useContext, useState } from "react";
import Popup from "../components/Popup/Popup";

interface PopupContextType {
  show: (message: string) => void;
  hide: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const show = (msg: string) => {
    setIsVisible(false);
    setTimeout(() => {
      setMessage(msg);
      setIsVisible(true);
    }, 300);
  };

  const hide = () => {
    setIsVisible(false);
  };

  return (
    <PopupContext.Provider value={{ show, hide }}>
      {children}
      <Popup isVisible={isVisible} message={message} onClose={hide} />
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
