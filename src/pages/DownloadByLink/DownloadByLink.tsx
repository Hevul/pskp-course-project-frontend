import fileDownload from "js-file-download";
import { download, getByLink } from "../../api/links";
import { get } from "../../api/files";
import Button from "../../components/Button/Button";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import styles from "./DownloadByLink.module.css";
import FileIcon from "../../components/icons/FileIcon";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import OptionsIcon from "../../components/icons/OptionsIcon";
import { useEffect, useState } from "react";
import Link from "../../models/Link";

const DownloadByLink = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [filename, setFilename] = useState("");
  const [link, setLink] = useState<Link | null>(null);

  const { link: linkString } = useParams();

  const { sendRequest: sendDownload } = useAxios();
  const { sendRequest: sendGetByLink } = useAxios({
    onSuccess(response) {
      if (response.status !== 200) return;

      const {
        id,
        link,
        friends,
        fileInfoId: fileId,
        isPublic,
      } = response.data.link;

      const status = isPublic ? "public" : "private";

      setLink({
        id,
        link,
        status,
        friends,
        fileId,
      });
    },
  });
  const { sendRequest: sendGetFileInfo } = useAxios({
    onSuccess(response) {
      if (response.status !== 200) return;
    },
  });

  useEffect(() => {
    if (linkString) sendGetByLink(getByLink(linkString));
  }, [linkString]);

  useEffect(() => {
    if (link) sendGetFileInfo(get(link.fileId));
  }, [link]);

  const handleDownload = async () => {
    if (linkString) {
      const res = await sendDownload(download(linkString));

      if (!res) return;

      const data = res.data;

      const contentDisposition = res.headers["content-disposition"];
      const filename = decodeFilename(contentDisposition);

      fileDownload(data, filename);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.cloud}>
        <div
          className={styles.options}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <OptionsIcon color={isHovered ? "#4676FB" : "#ACC2FF"} />
        </div>

        <FileIcon color="#4676FB" width="160" strokeWidth="0.5" />

        <h1 className={styles.h1}>{link?.fileId}</h1>

        <div className={styles.buttons}>
          <SecondaryButton
            title={"Сохранить ссылку"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Button title={"Скачать"} onClick={handleDownload} />
        </div>
      </div>
    </div>
  );
};

function decodeFilename(header: string) {
  const utf8FilenameRegex = /filename\*=UTF-8''([^;]+)/i;
  const asciiFilenameRegex = /filename=(["']?)(.*?[^\\])\1(;|$)/i;

  let filename = "";
  if (utf8FilenameRegex.test(header)) {
    filename = decodeURIComponent(utf8FilenameRegex.exec(header)![1]);
  } else {
    const matches = asciiFilenameRegex.exec(header);
    if (matches?.[2]) {
      filename = matches[2];
    }
  }
  return filename || "file";
}

export default DownloadByLink;
