import { useContext } from "react";
import PropTypes from "prop-types";

import { SubscriberContext } from "@/config/SubscriberContext";
import SOAButton from "@/components/buttons/SOAButton";
import { useNavigate } from "react-router-dom";
import { useValidationErrors } from "@/config/ErrorContext";

import ConfirmDependents from "@/components/steps/ConfirmDependents";

const OneDependents = ({ goNext }) => {
  const navigate = useNavigate();
  const {
    dependents,
    fetchDependentsData,
    errorFetchingDependents,
    dependentsLoading,
  } = useContext(SubscriberContext);

  const { setValidationErrors } = useValidationErrors();

  const handleCancelClick = () => {
    navigate("/");
  };

  const handleNextClick = () => {
    setValidationErrors(null);
    goNext();
  };

  return (
    <div className="step-container">
      <>
        {errorFetchingDependents ? (
          <b style={{ color: "red" }}>
            Error fetching dependents, please contact your administrator for
            details
          </b>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "60px",
            }}>
            {!errorFetchingDependents && (
              <ConfirmDependents
                dependents={dependents}
                dependentsLoading={dependentsLoading}
              />
            )}
          </div>
        )}
      </>

      <div className="button-group">
        <SOAButton lg onClick={handleCancelClick} secondary text="Cancel" />
        <SOAButton
          lg
          onClick={handleNextClick}
          primary
          text="Next"
          width="200px"
        />
        <SOAButton
          lg
          disabled={dependentsLoading}
          onClick={fetchDependentsData}
          style={{ marginLeft: "20px" }}
          text={dependentsLoading ? "Loading" : "Refresh"}
        />
      </div>
    </div>
  );
};

OneDependents.propTypes = {
  goNext: PropTypes.func.isRequired,
};

export default OneDependents;
