import { mockSystemStatus } from '../mockData/sessionData';
import mockConfig from '../mockConfig/mockConfig';

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const STATUS_NORMAL = 1;

export const getSystemStatus = async () => {
  await delay();
  console.log('Mock: getSystemStatus called');
  
  return mockSystemStatus;
};

export const logout = async () => {
  await delay();
  console.log('Mock: logout called');
  
  // In a real app, this would redirect to logout URL
  // For demo, we'll just show a message
  alert('Demo: Logout functionality - would redirect to authentication system');
  
  return {
    success: true,
    message: 'Logout successful'
  };
};