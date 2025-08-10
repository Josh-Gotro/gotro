import { useContext } from "react";
import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import { SubscriberContext } from "@/config/SubscriberContext";
import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";
import SOAButton from "@/components/buttons/SOAButton";
import DemoBanner from "@/components/demo-banner/DemoBanner";

import "./new-hire-workflow.scss";

const FourComplete = ({ goFinish }) => {
  const navigate = useNavigate();
  const { user, loading } = useContext(SubscriberContext);
  const { openEnrollment, setCoverageChangeReason, coverageChangeReason } =
    useContext(StaticSiteDataContext);

  const handleRedirectToOpenEnrollment = () => {
    setCoverageChangeReason(openEnrollment);
    navigate("/open-enrollment");
  };

  const handleComplete = () => {
    // Navigate back to portfolio instead of calling goFinish
    navigate("/portfolio");
  };

  return (
    <div className="step-container">
      <DemoBanner />
      <div className="happy-check">
        <CheckCircleIcon height="400" width="400" />
      </div>
      <h2>New/Rehire benefits enrollment is complete!</h2>
      {openEnrollment && (
        <p>Click Continue to make Open Enrollment selections.</p>
      )}
      <div className="button-group">
        {openEnrollment &&
        coverageChangeReason.coverageChangeReasonId !== 12 ? (
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

FourComplete.propTypes = {
  goNext: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goFinish: PropTypes.func.isRequired,
};

export default FourComplete;
