import React, { useContext } from "react";
import { Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useValidationErrors } from "@/config/ErrorContext";
import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import SOAButton from "../buttons/SOAButton";

const OpenEnrollmentCard = ({ completedOpenEnroll }) => {
  const navigate = useNavigate();
  const { setValidationErrors } = useValidationErrors();

  const { setCoverageChangeReason, openEnrollment } = useContext(
    StaticSiteDataContext,
  );

  const handleClick = () => {
    setValidationErrors(null);
    setCoverageChangeReason(openEnrollment);
    navigate("open-enrollment");
  };

  const tooltipContent = (
    <Tooltip id="header-tooltip">
      We do not have any pending Open Enrollment selections on file for you. If
      no choices are made, default coverage will apply.
    </Tooltip>
  );

  return (
    <Card className="coverageCard">
      <Card.Header
        className={
          completedOpenEnroll
            ? "card-header-standard"
            : "card-header-open-enrollment"
        }>
        <div className="split-header-content">
          <Card.Title className="title-left">Open Enrollment</Card.Title>
          {!completedOpenEnroll && (
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
      <Card.Body>
        <Card.Text>
          Choose your benefits for the upcoming year starting January. If no
          choices are made, default coverage will apply. See the Open Enrollment
          section in the AlaskaCare Plan Booklet for more information.
        </Card.Text>
        <SOAButton
          onClick={handleClick}
          outline={completedOpenEnroll}
          quaternary={!completedOpenEnroll}
          text={
            `${!completedOpenEnroll ? "Make " : "Update "}` +
            "Next Year’s Choices"
          }
        />
      </Card.Body>
    </Card>
  );
};

OpenEnrollmentCard.propTypes = {
  handleClick: PropTypes.func,
};

export default OpenEnrollmentCard;
