export const mockDependents = [
  {
    id: 'DEP001',
    firstName: 'Jane',
    lastName: 'Doe',
    relationship: 'SPOUSE',
    dateOfBirth: '1987-03-22',
    ssn: '***-**-5678',
    gender: 'F',
    isEligible: true,
    address: {
      street1: '123 Main Street',
      street2: 'Apt 4B',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101'
    },
    eligibleBenefits: ['MEDICAL', 'DENTAL', 'VISION'],
    enrolledBenefits: ['MEDICAL', 'DENTAL', 'VISION']
  },
  {
    id: 'DEP002',
    firstName: 'Emma',
    lastName: 'Doe',
    relationship: 'CHILD',
    dateOfBirth: '2015-09-10',
    ssn: '***-**-9012',
    gender: 'F',
    isEligible: true,
    address: {
      street1: '123 Main Street',
      street2: 'Apt 4B',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101'
    },
    eligibleBenefits: ['MEDICAL', 'DENTAL', 'VISION'],
    enrolledBenefits: ['MEDICAL', 'DENTAL', 'VISION'],
    studentStatus: 'NOT_APPLICABLE'
  },
  {
    id: 'DEP003',
    firstName: 'Michael',
    lastName: 'Doe',
    relationship: 'CHILD',
    dateOfBirth: '2012-12-05',
    ssn: '***-**-3456',
    gender: 'M',
    isEligible: true,
    address: {
      street1: '123 Main Street',
      street2: 'Apt 4B',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101'
    },
    eligibleBenefits: ['MEDICAL', 'DENTAL', 'VISION'],
    enrolledBenefits: ['MEDICAL', 'DENTAL'],
    studentStatus: 'ELEMENTARY'
  }
];

export const mockRelationshipTypes = [
  { code: 'SPOUSE', description: 'Spouse' },
  { code: 'DOMESTIC_PARTNER', description: 'Domestic Partner' },
  { code: 'CHILD', description: 'Child' },
  { code: 'STEPCHILD', description: 'Stepchild' },
  { code: 'ADOPTED_CHILD', description: 'Adopted Child' },
  { code: 'FOSTER_CHILD', description: 'Foster Child' }
];

export const mockDependentValidation = {
  isValid: true,
  errors: [],
  warnings: [
    {
      dependentId: 'DEP003',
      message: 'Vision coverage not selected for Michael Doe'
    }
  ]
};