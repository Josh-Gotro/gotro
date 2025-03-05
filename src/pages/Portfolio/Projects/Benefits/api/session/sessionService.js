import axios from "axios";
import config from "../config";

export const STATUS_NORMAL = 1;
const sessionBaseUrl = config.baseUrl + "/session";

export const getSystemStatus = async () => {
  try {
    const response = await axios.get(`${sessionBaseUrl}/status`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching system status: ", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.get(sessionBaseUrl + "/logout").then(() => {
      window.location.assign(config.logoutUrl);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error logging out: ", error);
    throw error;
  }
};
