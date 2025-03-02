import { useState } from "react";

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<React.ReactNode>(null);

  const open = (content: React.ReactNode) => {
    setIsOpen(true);
    setDialog(content);
  };
  const close = () => {
    setIsOpen(false);
    setDialog(null);
  };

  return {
    isOpen,
    dialog,
    open,
    close,
  };
};

export default useDialog;
