import { lazy, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { SubscriberContext } from '@/config/SubscriberContext';

// Lazy load components
const TermsPersonalInfoWorkflow = lazy(
  () =>
    import('@/pages/workflows/terms-personal-info/TermsPersonalInfoWorkflow')
);
const NewHireWorkflow = lazy(
  () => import('@/pages/workflows/new-hire/NewHireWorkflow')
);
const OpenEnrollmentWorkflow = lazy(
  () => import('@/pages/workflows/open-enrollment/OpenEnrollmentWorkflow')
);
const PersonalInfoWorkflow = lazy(
  () => import('@/pages/workflows/personal-info/PersonalInfoWorkflow')
);
// const CardContainer = lazy(
//   () => import('@/components/dashboard/card-container/CardContainer')
// );

const ChangeCoverageWorkflow = lazy(
  () => import('@/pages/workflows/change-coverage/ChangeCoverageWorkflow')
);

const PageNotFound = lazy(() => import('./PageNotFound'));

const EnrollmentRoutes = () => {
  const { user, loading } = useContext(SubscriberContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      const isKnownUser = Boolean(user.employmentId);

      if (!isKnownUser) {
        if (!user.subscriberAccountId || !user.acceptedTermsDate) {
          navigate('portfolio/benefits/terms');
        } else if (
          user.subscriberAccountId &&
          user.acceptedTermsDate &&
          !user.hasPendingChoices
        ) {
          navigate('/new-enrollment');
        }
      } else {
        if (!user.acceptedTermsDate) {
          navigate('portfolio/benefits/terms');
        }
      }
    }
  }, [user, loading]);

  return (
    <Routes>
      <Route path="terms" element={<TermsPersonalInfoWorkflow />} />
      <Route path="new-hire" element={<NewHireWorkflow />} />
      <Route path="open-enrollment/*" element={<OpenEnrollmentWorkflow />} />
      <Route path="change-coverage/*" element={<ChangeCoverageWorkflow />} />
      <Route path="user-info/*" element={<PersonalInfoWorkflow />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default EnrollmentRoutes;
