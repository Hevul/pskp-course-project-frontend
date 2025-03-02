import axios from "axios";
import config from "../config.json";

const uploadFileApi = async (
  file: File,
  storageId: string,
  parentId?: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("storageId", storageId);
  formData.append("parentId", parentId || "");
  formData.append("name", file.name);

  try {
    const response = await axios.post(
      `${config.apiUrl}${config.fileRoute}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) return error.response;
    throw error;
  }
};

export default uploadFileApi;
