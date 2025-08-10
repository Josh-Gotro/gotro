import { lazy, useContext, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
const CardContainer = lazy(
  () => import('@/components/dashboard/card-container/CardContainer')
);

const ChangeCoverageWorkflow = lazy(
  () => import('@/pages/workflows/change-coverage/ChangeCoverageWorkflow')
);

const PageNotFound = lazy(() => import('./PageNotFound'));

const EnrollmentRoutes = () => {
  const { user, loading } = useContext(SubscriberContext);
  const navigate = useNavigate();
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Cleanup function to track if component is still mounted
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && user && isMountedRef.current) {
      try {
        // For demo purposes, always redirect to new-hire workflow
        // This bypasses the dashboard and goes directly to the enrollment stepper
        navigate('new-hire', { replace: true });
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to new-hire on navigation errors
        if (isMountedRef.current) {
          navigate('new-hire', { replace: true });
        }
      }
    }
  }, [user, loading, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="new-hire" replace />} />
      <Route path="terms" element={<TermsPersonalInfoWorkflow />} />
      <Route path="new-hire/*" element={<NewHireWorkflow />} />
      <Route path="open-enrollment/*" element={<OpenEnrollmentWorkflow />} />
      <Route path="change-coverage/*" element={<ChangeCoverageWorkflow />} />
      <Route path="user-info/*" element={<PersonalInfoWorkflow />} />
      <Route path="dashboard" element={<CardContainer />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default EnrollmentRoutes;
