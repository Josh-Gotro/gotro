import { mockDependents, mockRelationshipTypes, mockDependentValidation } from '../mockData/dependentsData';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getDependents = async () => {
  await delay();
  console.log('Mock: getDependents called');
  
  return {
    success: true,
    data: mockDependents,
    totalCount: mockDependents.length
  };
};

export const addDependent = async (dependentData) => {
  await delay();
  console.log('Mock: addDependent called with:', dependentData);
  
  const newDependent = {
    ...dependentData,
    id: 'DEP' + String(Date.now()).slice(-3),
    isEligible: true,
    eligibleBenefits: ['MEDICAL', 'DENTAL', 'VISION'],
    enrolledBenefits: []
  };
  
  return {
    success: true,
    data: newDependent,
    message: 'Dependent added successfully'
  };
};

export const updateDependent = async (dependentId, dependentData) => {
  await delay();
  console.log('Mock: updateDependent called with:', { dependentId, dependentData });
  
  const existingDependent = mockDependents.find(dep => dep.id === dependentId);
  const updatedDependent = {
    ...existingDependent,
    ...dependentData,
    lastUpdated: new Date().toISOString()
  };
  
  return {
    success: true,
    data: updatedDependent,
    message: 'Dependent updated successfully'
  };
};

export const removeDependent = async (dependentId) => {
  await delay();
  console.log('Mock: removeDependent called with ID:', dependentId);
  
  return {
    success: true,
    data: { dependentId, removed: true },
    message: 'Dependent removed successfully'
  };
};

export const getRelationshipTypes = async () => {
  await delay();
  console.log('Mock: getRelationshipTypes called');
  
  return {
    success: true,
    data: mockRelationshipTypes
  };
};

export const validateDependents = async (dependents) => {
  await delay();
  console.log('Mock: validateDependents called with:', dependents);
  
  // Simulate validation logic
  const validation = { ...mockDependentValidation };
  
  // Check for common validation issues
  const errors = [];
  const warnings = [];
  
  dependents.forEach(dependent => {
    // Age validation
    const birthDate = new Date(dependent.dateOfBirth);
    const age = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    
    if (dependent.relationship === 'CHILD' && age >= 26) {
      errors.push({
        dependentId: dependent.id,
        field: 'dateOfBirth',
        message: 'Child dependents must be under 26 years old'
      });
    }
    
    if (!dependent.ssn || dependent.ssn.length < 9) {
      warnings.push({
        dependentId: dependent.id,
        field: 'ssn',
        message: 'Social Security Number is required for coverage enrollment'
      });
    }
  });
  
  return {
    success: true,
    data: {
      isValid: errors.length === 0,
      errors,
      warnings,
      totalDependents: dependents.length,
      eligibleDependents: dependents.filter(d => d.isEligible).length
    }
  };
};

export const getUserDependents = async () => {
  await delay();
  console.log('Mock: getUserDependents called');
  
  return mockDependents;
};