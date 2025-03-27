export default interface Dir {
  id: string;
  name: string;
  uploadAt: Date;
  type: "dir";
  parent?: string;
}
