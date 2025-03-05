import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import SOAButton from "../buttons/SOAButton";

import "./cards.scss";

const UpdateCoverageCard = () => {
  const navigate = useNavigate();
  const {
    coverageChangeReasons,
    coverageChangeReasonsLoading,
    setCoverageChangeReason,
    openEnrollment,
  } = useContext(StaticSiteDataContext);
  const [selectedCoverage, setSelectedCoverage] = useState("");

  //  If Open Enrollment, then prepopulate the input with that reason and set it to context.
  useEffect(() => {
    if (openEnrollment) {
      setSelectedCoverage(openEnrollment.coverageChangeReasonId);
      setCoverageChangeReason(openEnrollment);
    }
  }, [openEnrollment, setCoverageChangeReason]);

  const handleSelectChange = (event) => {
    setSelectedCoverage(event.target.value);
    setCoverageChangeReason({
      coverageChangeReasonId: event.target.value,
      title: event.target.options[event.target.selectedIndex].text,
    });
  };
  const handleClick = () => {
    navigate("/change-coverage");
  };

  return (
    <Card className="coverageCard">
      <Card.Header className="card-header-standard">
        <div className="headerContent">
          <Card.Title>Choose Coverage</Card.Title>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Make Open Enrollment selections or change coverage for other
          Qualifying Events, like a marriage or losing coverage, which allow you
          to request changes to benefits outside of Open Enrollment.
        </Card.Text>
        <div className="input-group">
          <select
            className="modern-select"
            value={selectedCoverage}
            onChange={handleSelectChange}>
            <option value="">Choose Coverage Reason</option>
            {!coverageChangeReasonsLoading && coverageChangeReasons ? (
              coverageChangeReasons.map((unit) => (
                <option
                  key={unit.coverageChangeReasonId}
                  value={unit.coverageChangeReasonId}>
                  {unit.title}
                </option>
              ))
            ) : (
              <>... loading</>
            )}
          </select>
        </div>
        <div className="button-group">
          <SOAButton
            onClick={handleClick}
            outline
            text="Choose Coverage"
            disabled={selectedCoverage === ""}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

UpdateCoverageCard.propTypes = {
  handleClick: PropTypes.func,
};

export default UpdateCoverageCard;
