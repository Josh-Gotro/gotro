import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import SOAButton from '@/components/buttons/SOAButton';
import AcceptTerms from '@/components/steps/AcceptTerms';
import PersonalInfo from '@/components/steps/PersonalInfo';
import { useValidationErrors } from '@/config/ErrorContext';

import { SubscriberContext } from '../../../config/SubscriberContext';

import './terms-personal-info.scss';

const TermsPersonalInfo = () => {
  const { user, setUser, acceptTerms } = useContext(SubscriberContext);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const navigate = useNavigate();
  const { setValidationErrors } = useValidationErrors();
  const [hasSSN, setHasSSN] = useState(false);

  useEffect(() => {
    if (user) {
      setIsUserDataLoaded(true);
      // determine if the user has an ssn. there is a case where a user may come in for the first time with ssn prefilled.
      // In this case we don't want to prompt the user to enter their personal information, but we still need them to accept terms.
      setHasSSN(!!user.ssn && user.ssn !== '');
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsUserDataLoaded(true);
      // If user data is loaded, stop showing the loading indicator
      setIsLoading(false);
      // Redirect if conditions are met
      if (user.acceptedTermsDate) {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleUserFormSubmit = async (data) => {
    // Convert the date to MM/DD/YYYY format, extra 0s are added to the month and day if they are less than 10
    if (data.birthdate) {
      const date = new Date(data.birthdate + 'T00:00:00');
      const formattedDate = `${
        date.getMonth() + 1 < 10 ? '0' : ''
      }${date.getMonth() + 1}/${
        date.getDate() < 10 ? '0' : ''
      }${date.getDate()}/${date.getFullYear()}`;
      data.birthdate = formattedDate;
    }

    await setUser(data);
  };

  const handleTermsFormSubmit = async () => {
    if (user.subscriberAccountId && isTermsChecked) {
      await acceptTerms(user.subscriberAccountId);
    }
  };

  const handleFormSubmit = async (data) => {
    await setValidationErrors(null);

    if (isUserDataLoaded && user && !user.employmentId && !hasSSN) {
      try {
        await handleUserFormSubmit(data);
        // If the request is successful, navigate to "/"
        navigate('/');
      } catch (error) {
        // If the request fails, log the error and do not navigate
        console.error(error);
      }
    } else {
      await handleTermsFormSubmit();
      setValidationErrors(null);

      navigate('/');
    }
  };

  const handleCheckboxChange = (checked) => {
    setIsTermsChecked(checked);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="step-container">
      {isUserDataLoaded && user && !user.employmentId && !hasSSN ? (
        <>
          <div>
            <PersonalInfo
              control={control}
              errors={errors}
              onSubmit={handleSubmit(handleFormSubmit)}
              register={register}
              watch={watch}
            />
          </div>
          <div className="flex-container">
            <div className="accept-terms-container">
              <AcceptTerms onCheckboxChange={handleCheckboxChange} />
            </div>
          </div>

          <div className="button-group">
            <SOAButton
              disabled={!isTermsChecked}
              lg
              onClick={handleSubmit(handleFormSubmit)}
              primary
              text="Submit"
              width="200px"
            />
          </div>
        </>
      ) : (
        <>
          <>
            <h2>Welcome!</h2>
            <p>To get started, please and accept the following terms.</p>
          </>
          <div className="flex-container-column">
            <div className="accept-terms-container">
              <AcceptTerms onCheckboxChange={handleCheckboxChange} />
            </div>
            <div className="button-group">
              <SOAButton
                disabled={!isTermsChecked}
                lg
                onClick={handleSubmit(handleFormSubmit)}
                primary
                text="Submit"
                width="200px"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TermsPersonalInfo;
