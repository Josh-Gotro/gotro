import React, { useContext } from "react";
import { Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useValidationErrors } from "@/config/ErrorContext";
import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import SOAButton from "../buttons/SOAButton";

const NewHireCard = ({ completedNewHire }) => {
  const navigate = useNavigate();
  const { setValidationErrors } = useValidationErrors();
  const { setCoverageChangeReason } = useContext(StaticSiteDataContext);

  const handleClick = () => {
    setValidationErrors(null);
    setCoverageChangeReason({
      coverageChangeReasonId: 1,
      title: "Hire/Rehire",
    });
    navigate("/new-enrollment");
  };
  const tooltipContent = (
    <Tooltip id="header-tooltip">
      We do not have any pending New Hire coverage selections on file for you.
      If no choices are made, default coverage will apply.
    </Tooltip>
  );

  return (
    <Card className="coverageCard">
      <Card.Header
        className={
          completedNewHire
            ? "card-header-standard"
            : "card-header-open-enrollment"
        }>
        <div className="split-header-content">
          <Card.Title className="title-left">New Hire</Card.Title>
          {!completedNewHire && (
            <OverlayTrigger placement="bottom" overlay={tooltipContent}>
              <Card.Title className="title-right">
                <InformationCircleIcon
                  style={{ marginRight: "8px" }}
                  height="20"
                  width="20"
                />
                Important
              </Card.Title>
            </OverlayTrigger>
          )}
        </div>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Text>
          The New Hire enrollment period lasts 30 days. You can review your
          selections in the Pending Choices section or update them by clicking
          the Update Choices button below.
        </Card.Text>
        <div className="mt-auto">
          <SOAButton
            onClick={handleClick}
            outline={completedNewHire}
            quaternary={!completedNewHire}
            text={completedNewHire ? "Update Choices" : "Choose Coverage"}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

NewHireCard.propTypes = {
  handleClick: PropTypes.func,
};

export default NewHireCard;
