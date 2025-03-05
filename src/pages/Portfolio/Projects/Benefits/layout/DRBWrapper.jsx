import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

import { SOAFooter } from "./SOAFooter";
import { SOAHeader } from "./SOAHeader";

export const DRBWrapper = ({ children }) => {
  return (
    <>
      <SOAHeader />
      <div className="p-0 pt-lg-1 px-3">
        <Row className="m-0 p-0">
          <Col className="m-0 p-0">
            <Row
              className="mx-0"
              style={{
                backgroundColor: "#FFF",
              }}>
              {children}
            </Row>
          </Col>
        </Row>
      </div>
      <SOAFooter />
    </>
  );
};

DRBWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DRBWrapper;
