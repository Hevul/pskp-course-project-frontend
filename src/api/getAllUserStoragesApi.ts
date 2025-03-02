import axios from "axios";

const getAllUserStoragesApi = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/storage/get_all",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) return error.response;
    throw error;
  }
};

export default getAllUserStoragesApi;
