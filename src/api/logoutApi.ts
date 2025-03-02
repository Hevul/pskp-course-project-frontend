import config from "../config.json";
import axios from "axios";

const logoutApi = async () => {
  try {
    const response = await axios.post(
      `${config.apiUrl}${config.usersRoute}/logout`
    );

    return response.data;
  } catch (error: any) {
    if (error.response) return error.response;
    throw error;
  }
};

export default logoutApi;
