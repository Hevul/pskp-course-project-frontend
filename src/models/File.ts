export default interface File {
  id: string;
  name: string;
  size: number;
  uploadAt: Date;
  updateAt?: Date;
  type: "file";
  hasLink?: boolean;
}
