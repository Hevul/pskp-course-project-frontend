import axios from "axios";

const createStorageAPI = async (name: string) => {
  try {
    return await axios.post(
      "http://localhost:3001/api/storage/create",
      {
        name,
      },
      { withCredentials: true }
    );
  } catch (error: any) {
    if (error.response) return error.response;
  }
};

export default createStorageAPI;
