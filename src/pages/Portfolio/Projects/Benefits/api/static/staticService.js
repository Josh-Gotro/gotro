// subscriberService.js
import axios from "axios";

import config from "../config";

export const getBartainingUnits = async () => {
  try {
    const response = await axios.get(`${config.baseUrl}/codes/bargainingUnits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bargaining units", error);
    if (error.message === "Network Error") {
      // handle network error
      console.error("Network error occurred while fetching bargaining units");
    }
    throw error;
  }
};

export const getCoverageChangeReasons = async () => {
  try {
    const response = await axios.get(`${config.baseUrl}/codes/coverageChangeReasons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coverage change reasons", error);
    if (error.message === "Network Error") {
      // handle network error
      console.error(
        "Network error occurred while fetching coverage change reasons",
      );
    }
    throw error;
  }
};
