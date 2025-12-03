export const mockSubscriberAccount = {
  id: 123456,
  subscriberAccountId: 123456,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@democompany.com',
  contactEmail: 'john.doe@democompany.com',
  phone: '(555) 123-4567',
  contactPhone: '(555) 123-4567',
  dateOfBirth: '1985-06-15',
  ssn: '***-**-1234',
  address: {
    street1: '123 Demo Street',
    street2: 'Suite 100',
    city: 'Demo City',
    state: 'WA',
    zipCode: '98101'
  },
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '(555) 987-6543',
    email: 'jane.doe@email.com'
  },
  employmentInfo: {
    employeeId: 'EMP001234',
    employmentId: 'EMP001234', // This field indicates a known user
    hireDate: '2020-03-15',
    department: 'Engineering',
    jobTitle: 'Software Developer',
    bargainingUnit: 'PROFESSIONAL',
    employmentStatus: 'FULL_TIME',
    salary: 85000,
    payFrequency: 'BIWEEKLY'
  },
  benefitEligibility: {
    medicalEligible: true,
    dentalEligible: true,
    visionEligible: true,
    lifeEligible: true,
    disabilityEligible: true,
    fsaEligible: true,
    hsaEligible: true
  },
  termsAccepted: true,
  acceptedTermsDate: '2024-01-01T09:00:00Z', // Already accepted terms
  hasPendingChoices: false, // No pending enrollment required
  lastUpdated: '2024-01-15T10:30:00Z'
};

export const mockEmploymentStatus = {
  employmentId: 'EMP001234', // This indicates a known/established user
  bargainingUnit: 'PROFESSIONAL',
  employmentType: 'FULL_TIME',
  hireDate: '2020-03-15',
  eligibilityDate: '2020-06-15',
  isEligible: true,
  department: 'Engineering',
  payrollGroup: 'MONTHLY'
};