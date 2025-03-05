import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";

import NewHireCard from "../cards/NewHireCard";
import UpdatePersonalInfoCard from "../cards/UpdatePersonalInfoCard";
import OpenEnrollmentCard from "../cards/OpenEnrollmentCard";
import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";

import "./card-group.scss";

const ActionItemsCardGroup = ({ completedNewHire, completedOpenEnroll }) => {
  const { openEnrollment } = useContext(StaticSiteDataContext);

  return (
    <>
      <h3>Action Items</h3>
      <div className="card-group">
        <Row>
          <NewHireCard completedNewHire={completedNewHire} />
        </Row>
        {openEnrollment && (
          <Row>
            <OpenEnrollmentCard completedOpenEnroll={completedOpenEnroll} />
          </Row>
        )}
        <Row>
          <UpdatePersonalInfoCard />
        </Row>
      </div>
    </>
  );
};

ActionItemsCardGroup.propTypes = {
  title: PropTypes.string,
};

export default ActionItemsCardGroup;
