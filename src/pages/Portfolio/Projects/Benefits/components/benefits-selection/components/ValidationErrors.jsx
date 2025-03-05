/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Alert, Row, Col } from "react-bootstrap";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { useValidationErrors } from "@/config/ErrorContext";

const ValidationError = () => {
  const { validationErrors } = useValidationErrors();

  return (
    <>
      {validationErrors && (
        <Alert className="alert-danger">
          <Row>
            <Col
              xs={2}
              className="d-flex justify-content-center align-items-center ">
              <InformationCircleIcon height="40" width="40" />
            </Col>
            <Col xs={10}>{validationErrors}</Col>
          </Row>
        </Alert>
      )}
    </>
  );
};

export default ValidationError;
