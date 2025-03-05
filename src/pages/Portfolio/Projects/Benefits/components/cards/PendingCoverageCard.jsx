import React, { useState } from "react";
import { Card, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import PropTypes from "prop-types";

import Modal from "../modal/Modal";
import SOAButton from "../buttons/SOAButton";
import { deleteCoverageChoice } from "../../api/coverage/coverageService";

import "./cards.scss";

const PendingCoverageCard = ({ coverage }) => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      await deleteCoverageChoice(coverage.id);
      setShowModal(false);
      // reload page
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error deleting coverage choice", error);
    }
  };

  const monthlyPremium = coverage.benefits
    .reduce((acc, benefit) => {
      if (!coverage) {
        return null;
      }
      if (typeof benefit?.monthlyPremium === "number") {
        return acc + benefit.monthlyPremium;
      }
      return acc;
    }, 0)
    .toFixed(2);

  const tooltipContent = {
    "Hire/Rehire":
      "If you are NOT subject to a waiting period, then your coverage will begin on your actual hire/rehire date. (see the AlaskaCare Plan Booklet section on When Coverage Begins)",
    "Other":
      "The start date depends on the actual event date. If the event date as submitted is not correct, the start date will use the actual event date when it becomes available to this system. (see the AlaskaCare Plan Booklet section on When Coverage Begins)",
  };

  const getStartDateLabel = (reason) => {
    switch (reason) {
      case "Hire/Rehire":
        return "Wait Period Start Date:";
      case "Open Enrollment":
        return "Start Date:";
      default:
        return "Projected Start Date:";
    }
  };

  const startDateLabel = getStartDateLabel(coverage.coverageChangeReason);

  const startDateContent = (
    <span>
      {startDateLabel}
      {coverage.projectedStartDate}
    </span>
  );

  const showTooltip = coverage.coverageChangeReason !== "Open Enrollment";

  return (
    <>
      <Card className="coverageCard">
        <Card.Header className="card-header-pending">
          <div className="headerContent">
            <Card.Title>{coverage.coverageChangeReason}</Card.Title>
            {showTooltip ? (
              <OverlayTrigger
                placement="right-end"
                overlay={
                  <Tooltip
                    id={`tooltip-${coverage.id}`}
                    className="multi-line-tooltip">
                    {tooltipContent[coverage.coverageChangeReason] ||
                      tooltipContent["Other"]}
                  </Tooltip>
                }>
                <p style={{ display: "flex", alignItems: "center", margin: 0 }}>
                  {startDateContent}
                  <InformationCircleIcon
                    style={{ marginLeft: "8px" }}
                    height="20"
                    width="20"
                  />
                </p>
              </OverlayTrigger>
            ) : (
              <p style={{ margin: 0 }}>{startDateContent}</p>
            )}
            <p style={{ margin: "4px 0 0 0" }}>
              Event Date: {coverage.eventDate}
            </p>
          </div>
        </Card.Header>
        <Card.Body>
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
                      ? `$ ${benefit.monthlyPremium.toFixed(2)}`
                      : benefit.monthlyPremium}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="monthly-premium">
            <p className="premium-label">Monthly {`$${monthlyPremium}`}</p>
            <SOAButton
              onClick={handleButtonClick}
              outline
              text="Delete Pending Coverage"
            />
          </div>
        </Card.Body>
      </Card>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        buttonAction={handleDelete}
        title="Confirm Delete"
        actionButtonLabel="Delete Pending Coverage"
        buttonExplainer={
          "Once Deleted, the pending coverage can not be recovered."
        }>
        <div>
          <p>
            Are you sure you would like to delete these coverage choices? You
            will not be able to retrieve selections that have been deleted.
          </p>
        </div>
      </Modal>
    </>
  );
};

PendingCoverageCard.propTypes = {
  coverage: PropTypes.object,
};

export default PendingCoverageCard;
