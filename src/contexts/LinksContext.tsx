import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getAllByOwner } from "../api/links";
import Link from "../models/Link";

interface LinksContextType {
  links: Link[];
  refresh: () => void;
  loading: boolean;
}

const LinksContext = createContext<LinksContextType | null>(null);

export const LinksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [links, setLinks] = useState<Link[]>([]);

  const { sendRequest, loading } = useAxios({
    onSuccess: (response) => {
      setLinks(
        response.data.map((l: any) => ({
          id: l.id,
          link: l.link,
          status: l.isPublic ? "public" : "private",
          friends: l.friends,
          fileId: l.fileInfoId,
        }))
      );
    },
  });

  const refresh = () => {
    sendRequest(getAllByOwner());
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <LinksContext.Provider value={{ links, refresh, loading }}>
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
};
