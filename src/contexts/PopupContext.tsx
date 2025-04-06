import React, { createContext, ReactNode, useContext, useState } from "react";
import Popup from "../components/Popup/Popup";

interface PopupContextType {
  show: (message: string, icon?: ReactNode) => void;
  hide: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState<ReactNode | null>(null);

  const show = (msg: string, icon?: ReactNode) => {
    setIsVisible(false);
    setTimeout(() => {
      setMessage(msg);
      setIcon(icon);
      setIsVisible(true);
    }, 300);
  };

  const hide = () => {
    setIsVisible(false);
  };

  return (
    <PopupContext.Provider value={{ show, hide }}>
      {children}
      <Popup
        isVisible={isVisible}
        message={message}
        onClose={hide}
        icon={icon}
      />
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
