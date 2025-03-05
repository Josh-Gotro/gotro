import React from "react";
import { Alert } from "react-bootstrap";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  NoSymbolIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

import PropTypes from "prop-types";

import SOAButton from "@/components/buttons/SOAButton";
import {
  hasDependentsOnFileCopy,
  noDependentsOnFileCopy,
} from "./DependentsCopy";

import "./steps.scss";

const ConfirmDependents = ({ dependents, dependentsLoading }) => {
  const hasDependents = dependents.length > 0;
  const dependentsCopy = hasDependents
    ? hasDependentsOnFileCopy
    : noDependentsOnFileCopy;

  const alertIcon = (dependent) => {
    switch (dependent.status) {
      case "Verified":
        return (
          <CheckCircleIcon
            className="verified"
            height="20"
            width="20"
            title={dependent.status}
          />
        );
      case "Terminated":
        return (
          <NoSymbolIcon
            className="terminated"
            height="20"
            width="20"
            title={dependent.status}
          />
        );
      case "Pending":
        return (
          <ClockIcon
            className="other"
            height="20"
            width="20"
            title={dependent.status}
          />
        );
      default:
        return (
          <ExclamationTriangleIcon
            className="other"
            height="20"
            width="20"
            title={dependent.status}
          />
        );
    }
  };

  const handleClick = () => {
    window.open(import.meta.env.VITE_APP_LINK_DEPENDENT_ENROLLMENT, "_blank");
  };

  return (
    <div
      className={`dependents-step-columns ${!hasDependents ? "first-column-centered" : ""}`}>
      <div className="dependents-call-to-action">
        <Alert variant="warning">
          <div className="dependents-callout-alert">
            <div className="dependent-callout-text">
              <div>
                <ShieldCheckIcon height="24" width="24" />
              </div>
              <div>
                {hasDependents ? "Review Dependents" : "No Dependents on file"}
              </div>
            </div>
            <div className="dependents-copy">{dependentsCopy}</div>
            <SOAButton
              lg
              onClick={handleClick}
              primary
              text="Manage Dependents"
              width="300px"
            />
          </div>
        </Alert>
      </div>
      {hasDependents ? (
        <div className="dependents-list">
          {dependentsLoading ? (
            <p>Loading...</p>
          ) : (
            dependents.map((dependent, index) => (
              <div key={index}>
                <div className="content base">
                  <p>
                    {dependent.name} {alertIcon(dependent)}
                  </p>
                  <p>Birthdate: {dependent.birthDate}</p>
                  <p>Relationship: {dependent.relationship}</p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

ConfirmDependents.propTypes = {
  dependents: PropTypes.array,
};

export default ConfirmDependents;
