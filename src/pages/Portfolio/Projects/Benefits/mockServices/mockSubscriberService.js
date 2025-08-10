import { mockSubscriberAccount, mockEmploymentStatus } from '../mockData/subscriberData';
import mockConfig from '../mockConfig/mockConfig';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getSubscriberAccount = async () => {
  await delay();
  console.log('Mock: getSubscriberAccount called');
  
  return mockSubscriberAccount;
};

export const getSubscriberEmploymentInfo = async () => {
  await delay();
  console.log('Mock: getSubscriberEmploymentInfo called');
  
  return mockEmploymentStatus;
};

export const upsertSubscriberAccount = async (subscriberAccount) => {
  await delay();
  console.log('Mock: upsertSubscriberAccount called with:', subscriberAccount);
  
  // Simulate updating the account
  const updatedAccount = {
    ...mockSubscriberAccount,
    ...subscriberAccount,
    lastUpdated: new Date().toISOString()
  };
  
  return updatedAccount;
};

export const postAcceptTerms = async (id) => {
  await delay();
  console.log('Mock: postAcceptTerms called with ID:', id);
  
  return {
    subscriberAccountId: id,
    termsAccepted: true,
    acceptedDate: new Date().toISOString(),
    version: '2024.1'
  };
};