import { mockBargainingUnits, mockCoverageChangeReasons } from '../mockData/staticData';

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getBartainingUnits = async () => {
  await delay();
  console.log('Mock: getBartainingUnits called');
  
  return mockBargainingUnits.filter(unit => unit.isActive);
};

export const getCoverageChangeReasons = async () => {
  await delay();
  console.log('Mock: getCoverageChangeReasons called');
  
  return mockCoverageChangeReasons;
};