import React, { useState } from "react";
import PropTypes from "prop-types";

import CustomCheckbox from "../checkbox/DRBCheckbox";

import "./steps.scss";


export const AcceptTerms = ({ onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    onCheckboxChange(event.target.checked);
  };

  return (
    <div className="accept-terms">
      <span className="terms">
        By accessing the enrollment system and using your login credentials to
        enroll, you certify that you have received and read the plan provisions,
        you understand you cannot change your elections, except as allowed by
        plan provisions, and your elections authorize the State of Alaska to
        make any required adjustments to your pay.
      </span>
      <span className="terms">
        You are accessing a government information system. Your system usage may
        be monitored, recorded, and subject to audit. Your use of this system
        indicates consent to monitoring and recording. Unauthorized use of this
        system is prohibited and is punishable under Alaska Criminal Law.
      </span>
      <CustomCheckbox
        handleCheckboxChange={handleCheckboxChange}
        isChecked={isChecked}>
        <span>I agree to the terms and conditions</span>
      </CustomCheckbox>
    </div>
  );
};

AcceptTerms.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
};

export default AcceptTerms;
