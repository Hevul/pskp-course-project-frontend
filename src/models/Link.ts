export default interface Link {
  id: string;
  link: string;
  status: "private" | "public";
  friends: string[];
  fileId: string;
  filename: string;
  path?: string;
}
