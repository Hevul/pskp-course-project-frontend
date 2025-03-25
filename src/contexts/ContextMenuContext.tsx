import { createContext, useContext, useState, useEffect, useRef } from "react";
import MenuItem from "../components/MenuItem/MenuItem";

export type MenuItem = {
  title: string;
  icon?: React.ReactNode;
  action: () => void;
};

type ContextMenuContextType = {
  showContextMenu: (
    items: MenuItem[],
    position: { x: number; y: number }
  ) => void;
  hideContextMenu: () => void;
};

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

export const ContextMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const showContextMenu = (
    menuItems: MenuItem[],
    pos: { x: number; y: number }
  ) => {
    console.log(menuItems);
    setItems(menuItems);
    setPosition(pos);
    setIsVisible(true);
  };

  const hideContextMenu = () => setIsVisible(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        hideContextMenu();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <ContextMenuContext.Provider value={{ showContextMenu, hideContextMenu }}>
      <div style={{ width: "100%", height: "100%" }}>
        {isVisible && (
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: position.y,
              left: position.x,
              zIndex: 1000,
              backgroundColor: "white",
              boxShadow: "0px 0px 6px rgba(70, 118, 251, 0.5)",
              borderRadius: "8px",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                margin: "0",
                padding: "0",
              }}
            >
              {items.map((i) => (
                <MenuItem
                  key={i.title}
                  title={i.title}
                  icon={i.icon}
                  action={() => {
                    i.action();
                    setIsVisible(false);
                  }}
                />
              ))}
            </ul>
          </div>
        )}
        {children}
      </div>
    </ContextMenuContext.Provider>
  );
};

export const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("useContextMenu must be used within a ContextMenuProvider");
  }
  return context;
};
