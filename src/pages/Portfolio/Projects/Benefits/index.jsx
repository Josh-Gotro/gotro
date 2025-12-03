import React, { useEffect } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import AppProvider from './config/AppProvider';
import ConfigureInterceptors from './api/interceptors';
import ErrorBoundary from './components/ErrorBoundary';
import {
  useValidationErrors,
  ValidationErrorProvider,
} from '@/config/ErrorContext';

function BenefitsContent() {
  const { setValidationErrors } = useValidationErrors();

  useEffect(() => {
    try {
      ConfigureInterceptors(setValidationErrors);
    } catch (error) {
      console.error('Failed to configure interceptors:', error);
    }
  }, [setValidationErrors]);

  return (
    <React.StrictMode>
      <div className="benefits-app-container">
        <AppProvider />
        <ToastContainer autoClose={2500} transition={Slide} hideProgressBar />
      </div>
    </React.StrictMode>
  );
}

function Benefits() {
  return (
    <ErrorBoundary>
      <ValidationErrorProvider>
        <BenefitsContent />
      </ValidationErrorProvider>
    </ErrorBoundary>
  );
}

export default Benefits;
