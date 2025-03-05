// subscriberService.js
import axios from 'axios';

import config from '../config';

export const getSubscriberAccount = async () => {
  try {
    const response = await axios.get(`${config.baseUrl}/subscriber-account`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriber account', error);
    // Return null so sidebar failing to load doesnt break the app.
    return null;
  }
};

export const getSubscriberEmploymentInfo = async () => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/subscriber-account/current-status`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriber employment info', error);
    throw error;
  }
};

export const upsertSubscriberAccount = async (subscriberAccount) => {
  try {
    const response = await axios.put(
      `${config.baseUrl}/subscriber-account`,
      subscriberAccount
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating subscriber account', error);
    throw error;
  }
};

export const postAcceptTerms = async (id) => {
  try {
    const response = await axios.post(
      `${config.baseUrl}/subscriber-accountportfolio/benefits/terms`,
      {
        subscriberAccountId: id,
        termsAccepted: true,
      }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating TOS', error);
    throw error;
  }
};
