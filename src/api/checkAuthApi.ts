import axios from "axios";
import config from "../config.json";

const checkAuthApi = async () => {
  try {
    const response = await axios.get(
      `${config.apiUrl}${config.usersRoute}/check-auth`,
      {
        withCredentials: true,
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Auth check failed");
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      throw new Error("Network error or server is unavailable");
    }
  }
};

export default checkAuthApi;
