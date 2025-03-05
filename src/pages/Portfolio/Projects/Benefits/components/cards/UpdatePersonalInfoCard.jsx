import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import SOAButton from "../buttons/SOAButton";

const UpdatePersonalInfoCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/user-info");
  };

  return (
    <Card className="coverageCard">
      <Card.Header className="card-header-standard">
        <div className="headerContent">
          <Card.Title>Update Personal Info</Card.Title>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Click Update Info to edit your Name, Phone Number, Email Address, or
          Social Security Number any time in the 30 day enrollment window.
        </Card.Text>
        <SOAButton onClick={handleClick} outline text="Update Info" />
      </Card.Body>
    </Card>
  );
};

UpdatePersonalInfoCard.propTypes = {
  handleClick: PropTypes.func,
};

export default UpdatePersonalInfoCard;
