import { useContext } from "react";
import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { SubscriberContext } from "@/config/SubscriberContext";
import SOAButton from "@/components/buttons/SOAButton";

import "./open-enrollment-workflow.scss";

const FourComplete = ({ goFinish }) => {
  const { user, loading } = useContext(SubscriberContext);

  const handleComplete = () => {
    if (!loading && user.hasPendingChoices) {
      goFinish();
    }
  };

  return (
    <div className="step-container">
      <div className="happy-check">
        <CheckCircleIcon height="400" width="400" />
      </div>
      <h1>Complete!</h1>
      <div className="button-group">
        <SOAButton
          lg
          onClick={handleComplete}
          primary
          text={loading ? "loading..." : "Home"}
          width="400px"
        />
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
