import axios from "axios";
import config from "../config.json";

const getFilesByStorageApi = async (id: string) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}${config.fileRoute}/get_all_by_storage/${id}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) return error.response;
    throw error;
  }
};

export default getFilesByStorageApi;
