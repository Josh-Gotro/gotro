/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { SubscriberContext } from "@/config/SubscriberContext";

import {
  getBartainingUnits,
  getCoverageChangeReasons,
} from "../mockServices/mockStaticService";

import { getIsOeStale } from "../mockServices/mockCoverageService";

const StaticSiteDataContext = React.createContext();

const StaticSiteDataContextProvider = ({ children }) => {
  const [bargainingUnits, setBargainingUnits] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(SubscriberContext);

  const [coverageChangeReasons, setCoverageChangeReasons] = useState(null);
  //TODO: this state should not be tracked here
  const [coverageChangeReason, setCoverageChangeReason] = useState({
    coverageChangeReasonId: 1,
    title: "Hire/Rehire",
  });
  const [ccrLoading, setCcrLoading] = useState(true);
  const [openEnrollment, setOpenEnrollment] = useState(null);
  const [isOeStale, setIsOeStale] = useState(null);

  const fetchBargainingUnits = async () => {
    try {
      const bUnits = await getBartainingUnits();
      setBargainingUnits(bUnits);
      setLoading(false); // Set loading to false after the data is fetched
    } catch (error) {
      console.error("Error fetching subscriber data", error);
      setLoading(false); // Also set loading to false if there's an error
    }
  };

  const fetchIsOeStale = async () => {
    try {
      const isOeStale = await getIsOeStale();
      setIsOeStale(isOeStale);
    } catch (error) {
      console.error("Error fetching is OE stale", error);
    }
  };

  const fetchCoverageChangeReasons = async () => {
    try {
      const reasons = await getCoverageChangeReasons();
      setCoverageChangeReasons(reasons);
      setCcrLoading(false); // Set loading to false after the data is fetched

      // Check if reasons include an object with coverageChangeReasonId === 12, which is open enrollment
      const openEnrollment = reasons.find(
        (reason) => reason.title === "Open Enrollment",
      );
      setOpenEnrollment(openEnrollment);
    } catch (error) {
      console.error("Error fetching subscriber data", error);
      setCcrLoading(false); // Also set loading to false if there's an error
    }
  };

  useEffect(() => {
    if (user?.subscriberAccountId) {
      fetchIsOeStale();
    }
  }, [user]);

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchBargainingUnits();
  }, []);

  // Fetch user data when the component mounts
  useEffect(() => {
    user?.subscriberAccountId && fetchCoverageChangeReasons();
  }, [user]);

  const getNextJanuaryFirst = () => {
    const nextYear = new Date().getFullYear() + 1;
    // Create date for Jan 1 at 09:00 UTC (which is 00:00 in Alaska)
    const date = new Date(Date.UTC(nextYear, 0, 1, 9, 0, 0));

    // Format the date as YYYY-MM-DD
    return date.toLocaleDateString("en-CA", {
      timeZone: "America/Anchorage",
    });
  };

  return (
    <StaticSiteDataContext.Provider
      value={{
        bargainingUnits,
        fetchBargainingUnits,
        coverageChangeReason,
        setCoverageChangeReason,
        coverageChangeReasons,
        openEnrollment,
        getNextJanuaryFirst,
        fetchCoverageChangeReasons,
        coverageChangeReasonsLoading: ccrLoading,
        loading,
        isOeStale,
      }}>
      {children}
    </StaticSiteDataContext.Provider>
  );
};

StaticSiteDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StaticSiteDataContext, StaticSiteDataContextProvider };
