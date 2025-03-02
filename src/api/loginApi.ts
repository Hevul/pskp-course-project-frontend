import config from "../config.json";
import axios from "axios";

const loginApi = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}${config.usersRoute}/login`,
      {
        login: username,
        password,
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error: any) {
    if (error.response) return error.response;
    throw error;
  }
};

export default loginApi;
