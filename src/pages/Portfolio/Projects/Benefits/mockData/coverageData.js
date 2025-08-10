export const mockCoverageOptions = {
  benefits: [
    {
      benefitTypeId: 1,
      benefitTypeTitle: 'Medical Coverage',
      selectedBenefitOptionId: 101,
      electedMonthlyRate: null,
      minMonthlyRate: null,
      maxMonthlyRate: null,
      benefitOptions: [
        {
          benefitOptionId: 100,
          benefitPlanId: null,
          benefitPlanTitle: null,
          benefitLevelId: null,
          benefitLevelTitle: 'Opt Out',
          monthlyCost: 0,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 101,
          benefitPlanId: 1,
          benefitPlanTitle: 'Comprehensive Health Plan (HMO)',
          benefitLevelId: 1,
          benefitLevelTitle: 'Employee Only',
          monthlyCost: 285.50,
          defaultOptionIndicator: true
        },
        {
          benefitOptionId: 102,
          benefitPlanId: 1,
          benefitPlanTitle: 'Comprehensive Health Plan (HMO)',
          benefitLevelId: 2,
          benefitLevelTitle: 'Employee + Spouse',
          monthlyCost: 520.75,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 103,
          benefitPlanId: 1,
          benefitPlanTitle: 'Comprehensive Health Plan (HMO)',
          benefitLevelId: 3,
          benefitLevelTitle: 'Employee + Children',
          monthlyCost: 485.25,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 104,
          benefitPlanId: 1,
          benefitPlanTitle: 'Comprehensive Health Plan (HMO)',
          benefitLevelId: 4,
          benefitLevelTitle: 'Employee + Family',
          monthlyCost: 742.90,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 105,
          benefitPlanId: 2,
          benefitPlanTitle: 'Basic Health Plan (PPO)',
          benefitLevelId: 1,
          benefitLevelTitle: 'Employee Only',
          monthlyCost: 195.75,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 106,
          benefitPlanId: 2,
          benefitPlanTitle: 'Basic Health Plan (PPO)',
          benefitLevelId: 2,
          benefitLevelTitle: 'Employee + Spouse',
          monthlyCost: 385.50,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 107,
          benefitPlanId: 2,
          benefitPlanTitle: 'Basic Health Plan (PPO)',
          benefitLevelId: 3,
          benefitLevelTitle: 'Employee + Children',
          monthlyCost: 350.25,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 108,
          benefitPlanId: 2,
          benefitPlanTitle: 'Basic Health Plan (PPO)',
          benefitLevelId: 4,
          benefitLevelTitle: 'Employee + Family',
          monthlyCost: 542.80,
          defaultOptionIndicator: false
        }
      ]
    },
    {
      benefitTypeId: 2,
      benefitTypeTitle: 'Dental Coverage',
      selectedBenefitOptionId: 201,
      electedMonthlyRate: null,
      minMonthlyRate: null,
      maxMonthlyRate: null,
      benefitOptions: [
        {
          benefitOptionId: 200,
          benefitPlanId: null,
          benefitPlanTitle: null,
          benefitLevelId: null,
          benefitLevelTitle: 'Opt Out',
          monthlyCost: 0,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 201,
          benefitPlanId: 10,
          benefitPlanTitle: 'Complete Dental Coverage',
          benefitLevelId: 1,
          benefitLevelTitle: 'Employee Only',
          monthlyCost: 45.25,
          defaultOptionIndicator: true
        },
        {
          benefitOptionId: 202,
          benefitPlanId: 10,
          benefitPlanTitle: 'Complete Dental Coverage',
          benefitLevelId: 2,
          benefitLevelTitle: 'Employee + Spouse',
          monthlyCost: 82.50,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 203,
          benefitPlanId: 10,
          benefitPlanTitle: 'Complete Dental Coverage',
          benefitLevelId: 3,
          benefitLevelTitle: 'Employee + Children',
          monthlyCost: 95.75,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 204,
          benefitPlanId: 10,
          benefitPlanTitle: 'Complete Dental Coverage',
          benefitLevelId: 4,
          benefitLevelTitle: 'Employee + Family',
          monthlyCost: 125.80,
          defaultOptionIndicator: false
        }
      ]
    },
    {
      benefitTypeId: 3,
      benefitTypeTitle: 'Vision Coverage',
      selectedBenefitOptionId: 301,
      electedMonthlyRate: null,
      minMonthlyRate: null,
      maxMonthlyRate: null,
      benefitOptions: [
        {
          benefitOptionId: 300,
          benefitPlanId: null,
          benefitPlanTitle: null,
          benefitLevelId: null,
          benefitLevelTitle: 'Opt Out',
          monthlyCost: 0,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 301,
          benefitPlanId: 20,
          benefitPlanTitle: 'Vision Care Plan',
          benefitLevelId: 1,
          benefitLevelTitle: 'Employee Only',
          monthlyCost: 12.50,
          defaultOptionIndicator: true
        },
        {
          benefitOptionId: 302,
          benefitPlanId: 20,
          benefitPlanTitle: 'Vision Care Plan',
          benefitLevelId: 2,
          benefitLevelTitle: 'Employee + Spouse',
          monthlyCost: 22.75,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 303,
          benefitPlanId: 20,
          benefitPlanTitle: 'Vision Care Plan',
          benefitLevelId: 3,
          benefitLevelTitle: 'Employee + Children',
          monthlyCost: 28.90,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 304,
          benefitPlanId: 20,
          benefitPlanTitle: 'Vision Care Plan',
          benefitLevelId: 4,
          benefitLevelTitle: 'Employee + Family',
          monthlyCost: 35.25,
          defaultOptionIndicator: false
        }
      ]
    },
    {
      benefitTypeId: 4,
      benefitTypeTitle: 'Healthcare FSA',
      selectedBenefitOptionId: 401,
      electedMonthlyRate: 150,
      minMonthlyRate: 10,
      maxMonthlyRate: 266,
      benefitOptions: [
        {
          benefitOptionId: 400,
          benefitPlanId: null,
          benefitPlanTitle: null,
          benefitLevelId: null,
          benefitLevelTitle: 'Opt Out',
          monthlyCost: 0,
          defaultOptionIndicator: false
        },
        {
          benefitOptionId: 401,
          benefitPlanId: 30,
          benefitPlanTitle: 'Healthcare FSA',
          benefitLevelId: 10,
          benefitLevelTitle: 'Participate',
          monthlyCost: null,
          defaultOptionIndicator: true
        }
      ]
    }
  ],
  effectiveDate: '2024-01-01',
  enrollmentDeadline: '2024-12-31'
};

export const mockCurrentCoverage = {
  current: {
    medicalPlan: {
      planId: 'MED001',
      tier: 'EMPLOYEE_ONLY',
      effectiveDate: '2024-01-01',
      monthlyPremium: 285.50
    },
    dentalPlan: {
      planId: 'DEN001',
      tier: 'EMPLOYEE_ONLY',
      effectiveDate: '2024-01-01',
      monthlyPremium: 45.25
    },
    visionPlan: {
      planId: 'VIS001',
      tier: 'EMPLOYEE_ONLY',
      effectiveDate: '2024-01-01',
      monthlyPremium: 12.50
    },
    lifePlans: [
      {
        planId: 'LIFE001',
        coverage: '2x Annual Salary',
        beneficiary: 'Jane Doe (Spouse)',
        effectiveDate: '2024-01-01'
      }
    ],
    totalMonthlyPremium: 343.25
  },
  pending: []
};

export const mockBenefitSelections = {
  medical: {
    planId: 'MED001',
    tier: 'EMPLOYEE_ONLY',
    optionId: 'MED001_EE',
    isOptedOut: false,
    optOutReason: null
  },
  dental: {
    planId: 'DEN001',
    tier: 'EMPLOYEE_ONLY',
    optionId: 'DEN001_EE',
    isOptedOut: false,
    optOutReason: null
  },
  vision: {
    planId: 'VIS001',
    tier: 'EMPLOYEE_ONLY',
    optionId: 'VIS001_EE',
    isOptedOut: false,
    optOutReason: null
  },
  life: {
    planId: 'LIFE001',
    coverage: '2x Annual Salary',
    beneficiary: 'Jane Doe',
    relationship: 'Spouse'
  }
};

export const mockValidationResult = {
  isValid: true,
  errors: [],
  warnings: [
    {
      type: 'INFO',
      message: 'Remember to update your beneficiary information if needed.'
    }
  ],
  optOutCertifications: [],
  totalMonthlyPremium: 343.25,
  effectiveDate: '2024-01-01'
};