// Demo configuration - doesn't require external API endpoints
const mockConfig = {
  baseUrl: '/demo/api', // Not used since we're mocking
  logoutUrl: '/portfolio',
  isDemoMode: true,
  version: '2.1.0-demo',
  features: {
    enrollmentEnabled: true,
    changesEnabled: true,
    reportsEnabled: true,
    payrollIntegrationEnabled: false
  }
};

export default mockConfig;