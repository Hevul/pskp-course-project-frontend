import AiFileIcon from "./AiFileIcon";
import AviFileIcon from "./AviFileIcon";
import BpmFileIcon from "./BmpFileIcon";
import CrdFileIcon from "./CrdFileIcon";
import CsvFileIcon from "./CsvFileIcon";
import DefaultFileIcon from "./DefaultFileIcon";
import DllFileIcon from "./DllFileIcon";
import DocFileIcon from "./DocFileIcon";
import DocxFileIcon from "./DocxFileIcon";
import DwgFileIcon from "./DwgFileIcon";
import EpsFileIcon from "./EpsFileIcon";
import ExeFileIcon from "./ExeFileIcon";
import FlvFileIcon from "./FlvFileIcon";
import GifFileIcon from "./GifFileIcon";
import HtmlFileIcon from "./HtmlFileIcon";
import IsoFileIcon from "./IsoFileIcon";
import JpgFileIcon from "./JpgFileIcon";
import MdbFileIcon from "./MdbFileIcon";
import MidFileIcon from "./MidFileIcon";
import MovFileIcon from "./MovFileIcon";
import Mp3FileIcon from "./Mp3FileIcon";
import Mp4FilIcon from "./Mp4FileIcon";
import MpegFileIcon from "./MpegFileIcon";
import PdfFileIcon from "./PdfFileIcon";
import PngFileIcon from "./PngFileIcon";
import PptFileIcon from "./PptFileIcon";
import PsdFileIcon from "./PsdFileIcon";
import PsIconIcon from "./PsFileIcon";
import PubFileIcon from "./PubFileIcon";
import RarIconIcon from "./RarFileIcon";
import RawFileIcon from "./RawFileIcon";
import RssFileIcon from "./RssFileIcon";
import SvgFileIcon from "./SvgFileIcon";
import TiffFileIcon from "./TiffFileIcon";
import TxtFileIcon from "./TxtFileIcon";
import WavFileIcon from "./WavFileIcon";
import WmaFileIcon from "./WmaFileIcon";
import XmlFileIcon from "./XmlFileIcon";
import XslFileIcon from "./XslFileIcon";
import ZipFileIcon from "./ZipFileIcon";

const ExtFileIcon = ({
  color = "currentColor",
  fontColor = "currentColor",
  width = "25",
  ext = "",
}) => {
  switch (ext) {
    case "ai":
      return <AiFileIcon color={color} width={width} fontColor={fontColor} />;
    case "avi":
      return <AviFileIcon color={color} width={width} fontColor={fontColor} />;
    case "bmp":
      return <BpmFileIcon color={color} width={width} fontColor={fontColor} />;
    case "crd":
      return <CrdFileIcon color={color} width={width} fontColor={fontColor} />;
    case "csv":
      return <CsvFileIcon color={color} width={width} fontColor={fontColor} />;
    case "dll":
      return <DllFileIcon color={color} width={width} fontColor={fontColor} />;
    case "doc":
      return <DocFileIcon color={color} width={width} fontColor={fontColor} />;
    case "docx":
      return <DocxFileIcon color={color} width={width} fontColor={fontColor} />;
    case "dwg":
      return <DwgFileIcon color={color} width={width} fontColor={fontColor} />;
    case "eps":
      return <EpsFileIcon color={color} width={width} fontColor={fontColor} />;
    case "exe":
      return <ExeFileIcon color={color} width={width} fontColor={fontColor} />;
    case "ext":
      return <ExtFileIcon color={color} width={width} fontColor={fontColor} />;
    case "flv":
      return <FlvFileIcon color={color} width={width} fontColor={fontColor} />;
    case "gif":
      return <GifFileIcon color={color} width={width} fontColor={fontColor} />;
    case "html":
      return <HtmlFileIcon color={color} width={width} fontColor={fontColor} />;
    case "iso":
      return <IsoFileIcon color={color} width={width} fontColor={fontColor} />;
    case "jpeg":
      return <JpgFileIcon color={color} width={width} fontColor={fontColor} />;
    case "mbd":
      return <MdbFileIcon color={color} width={width} fontColor={fontColor} />;
    case "mid":
      return <MidFileIcon color={color} width={width} fontColor={fontColor} />;
    case "mov":
      return <MovFileIcon color={color} width={width} fontColor={fontColor} />;
    case "mp3":
      return <Mp3FileIcon color={color} width={width} fontColor={fontColor} />;
    case "mp4":
      return <Mp4FilIcon color={color} width={width} fontColor={fontColor} />;
    case "mpeg":
      return <MpegFileIcon color={color} width={width} fontColor={fontColor} />;
    case "pdf":
      return <PdfFileIcon color={color} width={width} fontColor={fontColor} />;
    case "png":
      return <PngFileIcon color={color} width={width} fontColor={fontColor} />;
    case "ppt":
      return <PptFileIcon color={color} width={width} fontColor={fontColor} />;
    case "psd":
      return <PsdFileIcon color={color} width={width} fontColor={fontColor} />;
    case "ps":
      return <PsIconIcon color={color} width={width} fontColor={fontColor} />;
    case "pub":
      return <PubFileIcon color={color} width={width} fontColor={fontColor} />;
    case "rar":
      return <RarIconIcon color={color} width={width} fontColor={fontColor} />;
    case "raw":
      return <RawFileIcon color={color} width={width} fontColor={fontColor} />;
    case "rss":
      return <RssFileIcon color={color} width={width} fontColor={fontColor} />;
    case "svg":
      return <SvgFileIcon color={color} width={width} fontColor={fontColor} />;
    case "tiff":
      return <TiffFileIcon color={color} width={width} fontColor={fontColor} />;
    case "txt":
      return <TxtFileIcon color={color} width={width} fontColor={fontColor} />;
    case "wav":
      return <WavFileIcon color={color} width={width} fontColor={fontColor} />;
    case "wma":
      return <WmaFileIcon color={color} width={width} fontColor={fontColor} />;
    case "xml":
      return <XmlFileIcon color={color} width={width} fontColor={fontColor} />;
    case "xsl":
      return <XslFileIcon color={color} width={width} fontColor={fontColor} />;
    case "zip":
      return <ZipFileIcon color={color} width={width} fontColor={fontColor} />;
    default:
      return (
        <DefaultFileIcon color={color} width={width} fontColor={fontColor} />
      );
  }
};

export default ExtFileIcon;
