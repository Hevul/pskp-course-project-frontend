import { FC, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./LinkTableTiled.module.css";
import Link from "../../../../models/Link";
import LinkTile from "../LinkTile/LinkTile";

interface Props {
  links: Link[];
}

const LinkTableTiled: FC<Props> = ({ links }) => {
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedLink(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.table}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest(".tile")) {
          setSelectedLink(null);
        }
      }}
    >
      {links.map((l) => (
        <LinkTile
          key={l.id}
          link={l}
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
        />
      ))}
    </div>
  );
};

export default LinkTableTiled;
