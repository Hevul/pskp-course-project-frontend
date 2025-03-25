import { FC, ReactNode } from "react";
import { MenuItem, useContextMenu } from "../../contexts/ContextMenuContext";

interface Props {
  children: ReactNode;
  items: MenuItem[];
}

const ContextMenuArea: FC<Props> = ({ children, items }) => {
  const { showContextMenu } = useContextMenu();

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    showContextMenu(items, { x: e.clientX, y: e.clientY });
  };

  return <div onContextMenu={handleContextMenu}>{children}</div>;
};

export default ContextMenuArea;
