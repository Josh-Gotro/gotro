import React, { useEffect } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import AppProvider from './config/AppProvider';
import ConfigureInterceptors from './api/interceptors';
import {
  useValidationErrors,
  ValidationErrorProvider,
} from '@/config/ErrorContext';

function BenefitsContent() {
  const { setValidationErrors } = useValidationErrors();

  useEffect(() => {
    ConfigureInterceptors(setValidationErrors);
  }, []);

  return (
    <React.StrictMode>
      <AppProvider />
      <ToastContainer autoClose={2500} transition={Slide} hideProgressBar />
    </React.StrictMode>
  );
}

function Benefits() {
  return (
    <ValidationErrorProvider>
      <BenefitsContent />
    </ValidationErrorProvider>
  );
}

export default Benefits;
