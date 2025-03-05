// subscriberService.js
import axios from "axios";

import config from "../config";

export const getUserDependents = async () => {
  try {
    const response = await axios.get(`${config.baseUrl}/dependents`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error getting user coverage", error);
    throw error;
  }
};
