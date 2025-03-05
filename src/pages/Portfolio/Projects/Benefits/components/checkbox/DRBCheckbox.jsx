import React from "react";
import PropTypes from "prop-types";

import "./drb-checkbox.scss";

const CustomCheckbox = ({ isChecked, handleCheckboxChange, children }) => (
  <div className="accept-terms">
    <input
      checked={isChecked}
      onChange={handleCheckboxChange}
      type="checkbox"
    />
    <span>{children}</span>
  </div>
);

CustomCheckbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default CustomCheckbox;
