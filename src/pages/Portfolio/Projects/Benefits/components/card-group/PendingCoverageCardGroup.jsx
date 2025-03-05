import React from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";

import PendingCoverageCard from "../cards/PendingCoverageCard";

import "./card-group.scss";

const PendingCoverageCardGroup = ({ coverage }) => {
  return (
    <>
      <h3>Pending Choices</h3>
      <p>
        These elections may be pending receipt of employment information,
        additional documentation or administrative approval.{" "}
      </p>
      <div className="card-group">
        {coverage.map((coverageItem, index) => (
          <Row key={index}>
            <PendingCoverageCard coverage={coverageItem} />
          </Row>
        ))}
      </div>
    </>
  );
};

PendingCoverageCardGroup.propTypes = {
  coverage: PropTypes.array.isRequired,
};

export default PendingCoverageCardGroup;
