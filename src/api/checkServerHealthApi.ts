import config from "../config.json";
import axios from "axios";

const checkServerHealthAPI = async () => {
  try {
    const response = await axios.get(`${config.base}/health`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export default checkServerHealthAPI;
