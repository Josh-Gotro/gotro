/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  getSubscriberAccount,
  postAcceptTerms,
  upsertSubscriberAccount,
  getSubscriberEmploymentInfo,
} from "../mockServices/mockSubscriberService";

import { getUserDependents } from "../mockServices/mockDependentsService";

const SubscriberContext = React.createContext();

const SubscriberContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEmploymentInfo, setUserEmploymentInfo] = useState(null);
  const [loading, setUserLoading] = useState(true);
  const [employmenInfoLoading, setEmploymentInfoLoading] = useState(true);
  const [dependents, setDependents] = useState([]);
  const [dependentsLoading, setDependentsLoading] = useState(false);
  const [errorFetchingDependents, setErrorFetchingDependents] = useState(null);
  const [newUserInputsForOE, setNewUserInputsForOE] = useState(null);

  const fetchUserData = async () => {
    try {
      const userData = await getSubscriberAccount();
      setUser(userData);
      setUserLoading(false); // Set loading to false after the data is fetched
    } catch (error) {
      console.error("Error fetching subscriber data", error);
      setUserLoading(false); // Also set loading to false if there's an error
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserEmploymentInfo = async () => {
    if (user?.employmentId) {
      try {
        const employmentInfo = await getSubscriberEmploymentInfo();
        setUserEmploymentInfo(employmentInfo);
        setEmploymentInfoLoading(false);
      } catch (error) {
        console.error("Error fetching user employment info", error);
        setEmploymentInfoLoading(false);
        // Handle the error appropriately
      }
    }
  };

  useEffect(() => {
    user?.employmentId && fetchUserEmploymentInfo();
  }, [user]);

  // Function to fetch user data
  const refreshUserData = async () => {
    try {
      const updatedUser = await getSubscriberAccount();
      setUser(updatedUser);
    } catch (error) {
      console.error("Error refreshing subscriber data", error);
    }
  };

  // Function to accept terms
  const acceptTerms = async (id) => {
    try {
      await postAcceptTerms(id);
      await fetchUserData();
    } catch (error) {
      console.error("Error accepting terms", error);
    }
  };

  // Function to update user data when form is submitted
  const updateUserData = async (newData) => {
    try {
      const {
        birthdate,
        lastName,
        firstName,
        middleName,
        ssn,
        contactPhone,
        contactEmail,
        acceptedTermsDate,
        employmentId,
        subscriberAccountId,
      } = newData;

      const dataForUpsert = {
        birthdate,
        lastName,
        firstName,
        middleName,
        ssn,
        contactPhone,
        contactEmail,
        acceptedTermsDate,
        employmentId,
        subscriberAccountId,
      };
      // Persist data to the database
      await upsertSubscriberAccount(dataForUpsert);
      const updatedUser = await getSubscriberAccount();
      // Update Context
      setUser(updatedUser);
    } catch (error) {
      console.error("Error persisting subscriber data", error);
      throw error;
    }
  };

  const fetchDependentsData = async () => {
    if (!user?.subscriberAccountId) return;
    try {
      setDependentsLoading(true);
      const dependents = await getUserDependents();
      setDependents(dependents);
      setDependentsLoading(false);
    } catch (error) {
      setErrorFetchingDependents(error);
      setDependentsLoading(false);
    }
  };

  // Only check for user dependents if they have a SubscriberId
  useEffect(() => {
    if (user?.subscriberAccountId) {
      fetchDependentsData();
    }
  }, [user?.subscriberAccountId]);

  return (
    <SubscriberContext.Provider
      value={{
        dependents,
        dependentsLoading,
        errorFetchingDependents,
        user,
        userEmploymentInfo,
        setUser: updateUserData,
        fetchDependentsData,
        employmenInfoLoading,
        loading,
        acceptTerms,
        refreshUserData,
        setNewUserInputsForOE,
        newUserInputsForOE,
      }}>
      {children}
    </SubscriberContext.Provider>
  );
};

SubscriberContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SubscriberContext, SubscriberContextProvider };
