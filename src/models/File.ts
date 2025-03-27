export default interface File {
  id: string;
  name: string;
  size: number;
  uploadAt: Date;
  type: "file";
}
