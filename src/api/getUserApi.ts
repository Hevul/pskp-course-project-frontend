import axios from "axios";

const getUserApi = async () => {
  try {
    return await axios.get("http://localhost:3001/api/users/get", {
      withCredentials: true,
    });
  } catch (error: any) {
    if (error.response) return error.response;
    throw error;
  }
};

export default getUserApi;
