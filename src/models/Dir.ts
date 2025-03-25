export default interface Dir {
  id: string;
  name: string;
  date: Date;
  type: "dir";
  parent?: string;
}
