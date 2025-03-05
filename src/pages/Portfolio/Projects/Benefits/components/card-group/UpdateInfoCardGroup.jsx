import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { Alert, Col } from "react-bootstrap";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { StaticSiteDataContext } from "../../config/StaticSiteDataContext";
import { SubscriberContext } from "@/config/SubscriberContext";
import UpdateCoverageCard from "../cards/UpdateCoverageCard";
import DependentCard from "../cards/DependentCard";

import "./card-group.scss";

const UpdateInfoCardGroup = () => {
  const { isOeStale } = useContext(StaticSiteDataContext);
  const { user } = useContext(SubscriberContext);

  const isSubscriber = user?.subscriberAccountId !== null;

  return (
    <>
      {isOeStale && isSubscriber && (
        <Alert className="alert-danger">
          <Row>
            <Col
              xs={2}
              className="d-flex justify-content-center align-items-center ">
              <ExclamationCircleIcon height="40" width="40" />
            </Col>
            <Col xs={8}>
              <p>
                Your recent coverage change requires you to update your Open
                Enrollment selections. Please click "Choose Coverage", select
                "Open Enrollment", and complete the enrollment process.
              </p>
            </Col>
          </Row>
        </Alert>
      )}
      <h3>Update Info</h3>
      <div className="card-group">
        <Row>
          <UpdateCoverageCard />
        </Row>
        <Row>
          <DependentCard />
        </Row>
      </div>
    </>
  );
};

UpdateInfoCardGroup.propTypes = {
  title: PropTypes.string,
};

export default UpdateInfoCardGroup;
