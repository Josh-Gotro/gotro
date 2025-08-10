export const mockSystemStatus = {
  status: 1, // STATUS_NORMAL
  message: 'System is operating normally',
  maintenanceMode: false,
  lastUpdated: '2024-01-15T14:30:00Z',
  version: '2.1.0',
  environment: 'DEMO',
  features: {
    enrollmentEnabled: true,
    changesEnabled: true,
    reportsEnabled: true,
    payrollIntegrationEnabled: false
  },
  notifications: [
    {
      type: 'INFO',
      message: 'This is a demo version of the Benefits Enrollment System',
      priority: 'HIGH',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    }
  ]
};

export const mockEnrollmentPeriods = {
  openEnrollment: {
    isActive: true,
    startDate: '2024-10-01',
    endDate: '2024-10-31',
    effectiveDate: '2025-01-01',
    description: 'Annual Open Enrollment Period'
  },
  newHire: {
    isActive: true,
    enrollmentWindow: 30, // days from hire date
    description: 'New Hire Enrollment Window'
  },
  qualifyingEvents: {
    isActive: true,
    enrollmentWindow: 30, // days from qualifying event
    description: 'Qualifying Life Event Changes'
  }
};