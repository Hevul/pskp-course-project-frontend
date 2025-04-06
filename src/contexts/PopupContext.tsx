import React, { createContext, ReactNode, useContext, useState } from "react";
import Popup from "../components/Popup/Popup";

export type IconType = "error" | "success";

interface PopupOptions {
  icon?: ReactNode;
  iconType?: IconType;
}

interface PopupContextType {
  show: (message: string, options?: PopupOptions) => void;
  hide: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState<ReactNode | null>(null);
  const [iconType, setIconType] = useState<IconType | undefined>(undefined);

  const show = (msg: string, options?: PopupOptions) => {
    setIcon(null);
    setIconType(undefined);

    if (options) {
      setIcon(options.icon);
      setIconType(options.iconType);
    }

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
      <Popup
        isVisible={isVisible}
        message={message}
        onClose={hide}
        icon={icon}
        iconType={iconType}
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
