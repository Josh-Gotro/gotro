import React from "react";
import { Card, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import "./cards.scss";

const CoverageCard = ({ type, coverage }) => {
  const monthlyPremium = coverage.benefits
    .reduce((total, benefit) => {
      return total + (benefit.monthlyPremium || 0);
    }, 0)
    .toFixed(2);

  const truncate = (str, num) => {
    return str.length > num
      ? str.slice(0, num > 3 ? num - 3 : num) + "..."
      : str;
  };

  // if coverage.coverageChangeReason is "Hire/Rehire" then show a tooltip
  const hireRehireTooltip = coverage.coverageChangeReason === "Hire/Rehire";
  const tooltipContent =
    "The dates your coverage and premiums begin will be adjusted from the effective dates displayed here if you are subject to a waiting period.  (See the AlaskaCare Plan Booklet section on When Coverage Begins)";

  return (
    <Card className="coverageCard">
      <Card.Header
        className={
          type === "Current" ? "card-header-current" : "card-header-upcoming"
        }>
        <div className="headerContent">
          <Card.Title>
            {type === "Current" ? (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip
                    id={`tooltip-${type}`}
                    className="single-line-tooltip">
                    {"Change Reason: " + coverage.coverageChangeReason}
                  </Tooltip>
                }>
                <span>{`Current Coverage`}</span>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip
                    id={`tooltip-${type}`}
                    className="single-line-tooltip">
                    {coverage.coverageChangeReason}
                  </Tooltip>
                }>
                <span>{`Future Coverage:  ${truncate(coverage.coverageChangeReason, 31)}`}</span>
              </OverlayTrigger>
            )}
          </Card.Title>
          {hireRehireTooltip ? (
            <OverlayTrigger
              placement="right-end"
              overlay={
                <Tooltip
                  id={`tooltip-${coverage.id}`}
                  className="multi-line-tooltip">
                  {tooltipContent}
                </Tooltip>
              }>
              <p style={{ display: "flex", alignItems: "center" }}>
                Coverage Effective Date:{" "}
                {coverage.benefits.length > 0 ? coverage.startDate : "--"}
                <InformationCircleIcon
                  style={{ marginLeft: "8px" }}
                  height="20"
                  width="20"
                />
              </p>
            </OverlayTrigger>
          ) : (
            <p>
              Coverage Effective Date:{" "}
              {coverage.benefits.length > 0 ? coverage.startDate : "--"}
            </p>
          )}
          <p>
            Premium Effective Date:{" "}
            {coverage.benefits.length > 0 ? coverage.deductionStartDate : "--"}
          </p>
        </div>
      </Card.Header>
      <Card.Body>
        {coverage.benefits.length > 0 ? (
          <>
            {" "}
            <Table striped>
              <thead>
                <tr>
                  <th>Election</th>
                  <th>Option</th>
                  <th className="noWrap">Monthly Premium</th>
                </tr>
              </thead>
              <tbody>
                {coverage.benefits.map((benefit, index) => (
                  <tr key={index}>
                    <td>{benefit.benefitTypeTitle}</td>
                    <td>{benefit.selectedBenefitOptionTitle}</td>
                    <td style={{ textAlign: "right" }}>
                      {typeof benefit.monthlyPremium === "number"
                        ? `$${benefit.monthlyPremium.toFixed(2)}`
                        : benefit.monthlyPremium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="monthly-premium">
              <p className="premium-label">
                Total Monthly {`$${monthlyPremium}`}
              </p>
            </div>
          </>
        ) : (
          <div className="no-coverage-text">No Coverage, Not Alaska Care.</div>
        )}
      </Card.Body>
    </Card>
  );
};

CoverageCard.propTypes = {
  type: PropTypes.string.isRequired,
  coverage: PropTypes.object.isRequired,
};

export default CoverageCard;
