import { 
  mockCoverageOptions, 
  mockCurrentCoverage, 
  mockBenefitSelections, 
  mockValidationResult 
} from '../mockData/coverageData';
import mockConfig from '../mockConfig/mockConfig';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// get coverage options for a subscriber based on bargaining unit, FT/PT, coverage choice reason, and event date
export const postCoverageOptions = async (eventInfo) => {
  await delay();
  console.log('Mock: postCoverageOptions called with:', eventInfo);
  
  // Return different options based on employment type
  const isFullTime = eventInfo.employmentType === 'FULL_TIME' || eventInfo.partFullTime === 'F';
  let options = JSON.parse(JSON.stringify(mockCoverageOptions)); // Deep clone
  
  console.log('isFullTime:', isFullTime, 'eventInfo:', eventInfo);
  
  if (!isFullTime) {
    console.log('Processing part-time employee - filtering benefits');
    
    // Part-time employees get fewer medical options (only one plan)
    const medicalBenefit = options.benefits.find(b => b.benefitTypeId === 1);
    if (medicalBenefit) {
      console.log('Found medical benefit, filtering options');
      // Keep only the basic plan options (benefitPlanId 2) and opt-out
      medicalBenefit.benefitOptions = medicalBenefit.benefitOptions.filter(opt => 
        opt.benefitPlanId === null || opt.benefitPlanId === 2
      );
      
      // Clear all default indicators first
      medicalBenefit.benefitOptions.forEach(opt => {
        opt.defaultOptionIndicator = false;
      });
      
      // Update the selected default option to point to the Basic PPO Employee Only option
      const basicPPOEmployeeOnly = medicalBenefit.benefitOptions.find(opt => 
        opt.benefitPlanId === 2 && opt.benefitLevelId === 1
      );
      if (basicPPOEmployeeOnly) {
        // Set this as the new default and update the selectedBenefitOptionId
        basicPPOEmployeeOnly.defaultOptionIndicator = true;
        medicalBenefit.selectedBenefitOptionId = basicPPOEmployeeOnly.benefitOptionId;
      }
      
      console.log('Medical options after filtering:', medicalBenefit.benefitOptions);
    }
    
    // Remove supplemental benefits for part-time
    options.benefits = options.benefits.filter(b => 
      b.benefitTypeId === 1 || // Medical (required)
      b.benefitTypeId === 2 || // Dental
      b.benefitTypeId === 3 || // Vision
      b.benefitTypeId === 4    // Healthcare FSA
    );
    
    console.log('Final part-time benefits count:', options.benefits.length);
    console.log('Part-time benefits:', options.benefits.map(b => ({ id: b.benefitTypeId, title: b.benefitTypeTitle, optionCount: b.benefitOptions?.length })));
  }
  
  return options;
};

export const getUserCoverage = async () => {
  await delay();
  console.log('Mock: getUserCoverage called');
  
  return mockCurrentCoverage;
};

// GET request to check if open enrollment is stale
export const getIsOeStale = async () => {
  await delay();
  console.log('Mock: getIsOeStale called');
  
  return {
    isStale: false,
    lastUpdated: '2024-01-15T10:30:00Z',
    currentPeriod: 'OPEN_ENROLLMENT_2024'
  };
};

// DELETE request to remove a coverage choice
export const deleteCoverageChoice = async (id) => {
  await delay();
  console.log('Mock: deleteCoverageChoice called with ID:', id);
  
  return 'CoverageChoice record deleted successfully';
};

// POST validate coverage choices and return opt-out certification requirements
export const validateCoverageChoices = async (choiceCriteria, benefitSelections) => {
  await delay();
  console.log('Mock: validateCoverageChoices called with:', { choiceCriteria, benefitSelections });
  
  // Simulate validation logic
  const hasHealthPlan = benefitSelections.medical && !benefitSelections.medical.isOptedOut;
  const validation = { ...mockValidationResult };
  
  if (!hasHealthPlan) {
    validation.warnings.push({
      type: 'WARNING',
      message: 'You have opted out of health coverage. Please ensure you have alternative coverage.'
    });
    validation.optOutCertifications = [
      {
        type: 'HEALTH_WAIVER',
        required: true,
        description: 'Health coverage waiver certification required'
      }
    ];
  }
  
  // Calculate total premium
  let totalPremium = 0;
  Object.values(benefitSelections).forEach(selection => {
    if (selection.monthlyPremium && !selection.isOptedOut) {
      totalPremium += selection.monthlyPremium;
    }
  });
  
  validation.totalMonthlyPremium = totalPremium;
  
  return validation;
};

// POST send coverage selections
export const postCoverageChoices = async (choiceCriteria, benefitSelections) => {
  await delay(1000); // Longer delay for submission
  console.log('Mock: postCoverageChoices called with:', { choiceCriteria, benefitSelections });
  
  return {
    confirmationNumber: 'CONF' + Date.now(),
    effectiveDate: choiceCriteria.effectiveDate || '2024-01-01',
    totalMonthlyPremium: 343.25,
    enrollmentComplete: true,
    nextSteps: [
      'Review your confirmation email',
      'Update your beneficiary information if needed',
      'Contact HR with any questions'
    ]
  };
};