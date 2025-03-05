import React from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";

import CoverageCard from "../cards/CoverageCard";

import "./card-group.scss";

const CoverageCardGroup = ({ coverage }) => {
  return (
    <>
      <h3>Coverage</h3>
      <div className="card-group">
        <Row>
          {coverage.current && coverage.current && (
            <CoverageCard type="Current" coverage={coverage.current} />
          )}
        </Row>
        <Row>
          {coverage.future.map((coverageItem, index) => (
            <CoverageCard key={index} type="Upcoming" coverage={coverageItem} />
          ))}
        </Row>
      </div>
    </>
  );
};

CoverageCardGroup.propTypes = {
  coverage: PropTypes.object.isRequired,
};

export default CoverageCardGroup;
