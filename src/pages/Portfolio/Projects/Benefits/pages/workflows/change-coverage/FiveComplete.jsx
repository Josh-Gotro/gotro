import React, { useContext, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

import { SubscriberContext } from "@/config/SubscriberContext";
import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";
import SOAButton from "@/components/buttons/SOAButton";

import "./change-coverage-workflow.scss";

const FiveComplete = ({ goFinish, goStart, setStepData }) => {
  const { loading } = useContext(SubscriberContext);
  const { openEnrollment, setCoverageChangeReason, coverageChangeReason } =
    useContext(StaticSiteDataContext);

  const handleRedirectToOpenEnrollment = () => {
    setCoverageChangeReason(openEnrollment);
    setStepData((prevData) => ({
      ...prevData,
      choiceCriteria: {
        eventDate: openEnrollment.eventDate,
        coverageChangeReasonId: openEnrollment.coverageChangeReasonId,
      },
    }));
    goStart();
  };
  const handleComplete = () => {
    if (!loading) {
      goFinish();
    }
  };

  return (
    <div className="step-container">
      <div className="happy-check">
        <CheckCircleIcon height="400" width="400" />
      </div>
      {openEnrollment &&
      coverageChangeReason?.coverageChangeReasonId != "12" ? (
        <>
          <b>
            Your coverage choices have been submitted for the current period.
          </b>
          <br />
          <h2>
            Please continue to Open Enrollment to make changes that will apply
            for the upcoming year.
          </h2>
        </>
      ) : (
        <h1>Complete!</h1>
      )}
      <div className="button-group">
        {openEnrollment &&
        coverageChangeReason?.coverageChangeReasonId != "12" ? (
          <>
            <SOAButton
              lg
              onClick={handleRedirectToOpenEnrollment}
              primary
              text={"Continue to Open Enrollment"}
              width="400px"
            />
            <SOAButton
              lg
              onClick={handleComplete}
              outline
              text={loading ? "loading..." : "Home"}
              width="85px"
            />
          </>
        ) : (
          <SOAButton
            lg
            onClick={handleComplete}
            primary
            text={loading ? "loading..." : "Home"}
            width="400px"
          />
        )}
      </div>
    </div>
  );
};

FiveComplete.propTypes = {
  goNext: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goFinish: PropTypes.func.isRequired,
};

export default FiveComplete;
