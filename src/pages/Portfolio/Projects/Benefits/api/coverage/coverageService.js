// subscriberService.js
import axios from "axios";

import config from "../config";

// get coverage options for a subscriber based on bargaining unit, FT/PT, coverage choice reason, and event date
export const postCoverageOptions = async (eventInfo) => {
  try {
    const response = await axios.post(
      `${config.baseUrl}/coverage-choice`,
      eventInfo,
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error updating subscriber account", error);
    throw error;
  }
};

export const getUserCoverage = async () => {
  try {
    const response = await axios.get(`${config.baseUrl}/coverage`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error getting user coverage", error);
    throw error;
  }
};

// GET request to the /subscriber/rest/coverage-choice/stale-oe endpoint.
export const getIsOeStale = async () => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/coverage-choice/stale-oe`,
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error getting is OE stale", error);
    throw error;
  }
};

//  DELETE request to the /subscriber/rest/coverage-choice/{id} endpoint.
export const deleteCoverageChoice = async (id) => {
  try {
    const response = await axios.delete(
      `${config.baseUrl}/coverage-choice/${id}`,
    );
    if (response.status === 200) {
      return "CoverageChoice record deleted successfully";
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error deleting CoverageChoice record", error);
    throw error;
  }
};

// POST validate coverage choices and return opt-out certification requirements
export const validateCoverageChoices = async (
  choiceCriteria,
  benefitSelections,
) => {
  // Map over benefitSelections and change optionId to selectedBenefitOptionId
  const updatedBenefitSelections = Object.values(benefitSelections).map(
    ({ optionId: selectedBenefitOptionId, ...rest }) => ({
      selectedBenefitOptionId,
      ...rest,
    }),
  );

  try {
    const response = await axios.post(
      `${config.baseUrl}/coverage-choice/validate`,
      {
        choiceCriteria,
        benefitSelections: updatedBenefitSelections,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error validating coverage choices", error);
    throw error;
  }
};

// POST  send  bargaining unit, FT/PT, coverage choice reason, and event date and benefit selections
export const postCoverageChoices = async (
  choiceCriteria,
  benefitSelections,
) => {
  try {
    const response = await axios.post(
      `${config.baseUrl}/coverage-choice/selections`,
      {
        choiceCriteria,
        benefitSelections,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating subscriber account", error);
    throw error;
  }
};
