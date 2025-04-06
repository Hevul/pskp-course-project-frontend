import fileDownload from "js-file-download";
import { download } from "../../api/links";
import Button from "../../components/Button/Button";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

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

const DownloadByLink = () => {
  const { link } = useParams();

  const { sendRequest: sendDownload } = useAxios();

  return (
    <div>
      <Button
        title="скачатъ"
        onClick={async () => {
          if (link) {
            const res = await sendDownload(download(link));

            if (!res) return;

            const data = res.data;

            const contentDisposition = res.headers["content-disposition"];
            const filename = decodeFilename(contentDisposition);

            fileDownload(data, filename);
          }
        }}
      />
    </div>
  );
};

export default DownloadByLink;
