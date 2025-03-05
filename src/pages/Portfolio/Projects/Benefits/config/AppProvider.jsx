import { Suspense, lazy } from 'react';

import { EnvironmentProvider } from './EnvironmentContext';
import { LoadingBear } from '../components/loading-provider/LoadingProvider';
import useSessionTracking from '../config/useSessionTracking';
import RouterWrapper from './RouterWrapper';

// Lazy load EnrollmentWrapper
const EnrollmentWrapper = lazy(() => import('../pages/EnrollmentWrapper'));

const AppProvider = () => {
  useSessionTracking();
  return (
    <Suspense fallback={<LoadingBear />}>
      <EnvironmentProvider>
        <RouterWrapper>
          <EnrollmentWrapper />
        </RouterWrapper>
      </EnvironmentProvider>
    </Suspense>
  );
};

export default AppProvider;
