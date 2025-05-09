import fileDownload from "js-file-download";
import { download, getByLink, getFullInfo } from "../../api/link";
import Button from "../../components/Button/Button";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import styles from "./DownloadByLink.module.css";
import FileIcon from "../../components/icons/FileIcon";
import OptionsIcon from "../../components/icons/OptionsIcon";
import { useEffect, useState } from "react";
import Link from "../../models/Link";
import { usePopup } from "../../contexts/PopupContext";
import { useDialog } from "../../contexts/DialogContext";
import AccessLinkDeniedDialog from "../../components/dialogs/AccessLinkDeniedDialog/AccessLinkDeniedDialog";
import DangerCircleIcon from "../../components/icons/DangerCircleIcon";
import Loading from "../../components/Loading/Loading";
import IconButton from "../../components/IconButton/IconButton";
import InfoDialog from "../../components/dialogs/InfoDialog/InfoDialog";
import { LinkFullInfo } from "../../models/LinkFullInfo";
import { formatDate, formatSize } from "../../utils";
import { useFileViewer } from "../../contexts/FileViewerContext";

const DownloadByLink = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [link, setLink] = useState<Link | null>(null);
  const [denied, setDenied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const { link: linkString } = useParams();
  const { show } = usePopup();
  const { open } = useDialog();
  const { view } = useFileViewer();

  const { sendRequest: sendDownload } = useAxios({
    onSuccess(response) {
      const data = response.data;

      const contentDisposition = response.headers["content-disposition"];
      const filename = decodeFilename(contentDisposition);

      fileDownload(data, filename);
    },
    onError(error) {
      show("Не удалось скачать файл по ссылке!", { iconType: "error" });
      if (linkString) sendGetByLink(getByLink(linkString));
    },
  });
  const { sendRequest: sendGetFullInfo } = useAxios({
    onSuccess(response) {
      const fullInfo = response.data.fullInfo as LinkFullInfo;
      open(
        <InfoDialog
          title={"Информация о ссылке"}
          fields={[
            { label: "Название:", value: fullInfo.filename },
            { label: "Размер:", value: formatSize(fullInfo.size) },
            { label: "Владелец:", value: fullInfo.owner },
            { label: "Дата создания:", value: formatDate(fullInfo.createAt) },
            {
              label: "Количество скачиваний:",
              value: `${fullInfo.downloadCount}`,
            },
          ]}
        />
      );
    },
    onError(error) {
      show("Не удалось получить информации о ссылке!", { iconType: "error" });
      if (linkString) sendGetByLink(getByLink(linkString));
    },
  });
  const { sendRequest: sendGetByLink, loading } = useAxios({
    onSuccess(response) {
      if (response.status !== 200) return;

      const {
        id,
        link,
        friends,
        fileInfoId: fileId,
        isPublic,
        filename,
      } = response.data.link;

      const status = isPublic ? "public" : "private";

      setLink({
        id,
        link,
        status,
        friends,
        fileId,
        filename,
      });

      setDenied(false);
      setNotFound(false);
    },
    onError(error) {
      const status = error?.response?.status;

      if (status === 404) {
        setNotFound(true);
        setDenied(false);
        show("Ссылка на файл не найдена!", {
          iconType: "error",
        });
      } else {
        setDenied(true);
        setNotFound(false);

        if (status === 403) {
          show("Доступ к ссылке запрещён!", { iconType: "error" });
          open(<AccessLinkDeniedDialog reason={"no-access"} />);
        } else if (status === 401) {
          show("Доступ к ссылке запрещён! Необходимо войти в аккаунт.", {
            iconType: "error",
          });
          open(<AccessLinkDeniedDialog reason={"not-authorized"} />);
        }
      }
    },
  });

  useEffect(() => {
    if (linkString) sendGetByLink(getByLink(linkString));
  }, [linkString]);

  const handleDownload = () => {
    if (linkString) sendDownload(download(linkString));
  };

  const handleGetFullInfo = () => {
    if (link) sendGetFullInfo(getFullInfo(link?.id));
  };

  if (loading) {
    return (
      <div className={styles.main}>
        <div className={styles.cloud}>
          <Loading size="large" label="Загрузка ссылки" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      {notFound ? (
        <div className={styles.cloud}>
          <DangerCircleIcon color="#41404b" width="160" />
          <h1 className={styles.h1}>Ссылка не найдена!</h1>
          <div className={styles.buttons}>
            <Button
              title={"Попробовать ещё раз"}
              onClick={() => {
                if (linkString) sendGetByLink(getByLink(linkString));
              }}
            />
          </div>
        </div>
      ) : denied ? (
        <div className={styles.cloud}>
          <DangerCircleIcon color="#41404b" width="160" />
          <h1 className={styles.h1}>Доступ запрещён!</h1>
          <div className={styles.buttons}>
            <Button
              title={"Попробовать ещё раз"}
              onClick={() => {
                if (linkString) sendGetByLink(getByLink(linkString));
              }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.cloud}>
          <div
            className={styles.options}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            <IconButton
              icon={<OptionsIcon color={isHovered ? "#4676FB" : "#ACC2FF"} />}
              onClick={handleGetFullInfo}
              hasBorder={false}
            />
          </div>

          <FileIcon color="#4676FB" width="160" strokeWidth="0.5" />

          <h1 className={styles.h1}>{link?.filename}</h1>

          <div className={styles.buttons}>
            <Button title={"Скачать"} onClick={handleDownload} />
          </div>
        </div>
      )}
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
