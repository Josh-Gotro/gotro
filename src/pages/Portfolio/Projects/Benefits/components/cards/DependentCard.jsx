import { useContext, useState } from "react";
import { SubscriberContext } from "@/config/SubscriberContext";

import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import Modal from "../modal/Modal";
import SOAButton from "../buttons/SOAButton";

import "./cards.scss";

const DependentCard = () => {
  const {
    dependents,
    fetchDependentsData,
    errorFetchingDependents,
    dependentsLoading,
  } = useContext(SubscriberContext);

  const [showModal, setShowModal] = useState(false);

  const handleManageClick = () => {
    window.open(import.meta.env.VITE_APP_LINK_DEPENDENT_ENROLLMENT, "_blank");
  };

  const handleViewClick = () => {
    setShowModal(true); // open the modal when "View" button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // close the modal
  };

  const buttonExplainerCopy =
    "Manage Dependents will Redirect to the dependents portal in a new tab. Updates may take a few minutes to populate. Please refresh to see the latest information.";

  return (
    <Card className="coverageCard">
      <Card.Header className="card-header-standard">
        <div className="headerContent">
          <Card.Title>Dependents</Card.Title>
        </div>
      </Card.Header>
      <Card.Body>
        {errorFetchingDependents ? (
          "Error fetching dependents, please contact your administrator for details"
        ) : (
          <>
            <Card.Text>
              Manage or view dependents. Enter their information if you have
              Employee and Family coverage.
              <br />
              <br />
              Clicking Manage will open the Dependents Portal in a new tab.
            </Card.Text>
            <div className="button-group">
              <SOAButton onClick={handleManageClick} primary text="Manage" />
              <SOAButton onClick={handleViewClick} outline text="View" />
            </div>
            <Modal
              show={showModal}
              onClose={handleCloseModal}
              buttonAction={handleManageClick}
              secondaryButtonAction={fetchDependentsData}
              secondaryButtonLabel="Refresh"
              secondaryButtonLoading={dependentsLoading}
              actionButtonLabel="Manage Dependents"
              title="Your Dependents"
              buttonExplainer={buttonExplainerCopy}>
              {dependents && dependents.length === 0 ? (
                <div className="icon-text-wrapper">
                  <UserGroupIcon
                    className="text-blue-500"
                    height="80"
                    width="80"
                  />
                  <p>
                    You do not have any dependents on file. <br />
                    <br />
                    To add dependents please click Manage Dependents below which
                    will open the Dependents Portal in a new tab.
                  </p>
                </div>
              ) : (
                <>
                  {dependents &&
                    dependents.map((dependent, index) => (
                      <div key={index} className="dependents">
                        <div className="content base">
                          <div className="dependent-info">
                            <div>
                              <h2>{dependent.name}</h2>
                              <p>{dependent.relationship}</p>
                              <p>Born {dependent.birthDate}</p>
                            </div>

                            {/* If status is Pending or any other color then it will be warning color. Pending has its own icon.  */}
                            <div
                              className={`status ${dependent.status === "Verified" || dependent.status === "Terminated" ? dependent.status.toLowerCase() : "other"}`}>
                              <p>
                                <span className="status-icon-text">
                                  {dependent.status === "Verified" && (
                                    <CheckCircleIcon
                                      className="verified"
                                      height="24"
                                      width="24"
                                    />
                                  )}
                                  {dependent.status === "Pending" && (
                                    <ClockIcon height="24" width="24" />
                                  )}
                                  {dependent.status === "Terminated" && (
                                    <NoSymbolIcon height="24" width="24" />
                                  )}
                                  {dependent.status &&
                                    dependent.status !== "Verified" &&
                                    dependent.status !== "Pending" &&
                                    dependent.status !== "Terminated" && (
                                      <ExclamationTriangleIcon
                                        height="16"
                                        width="16"
                                      />
                                    )}
                                  Coverage {dependent.status}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </Modal>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

DependentCard.propTypes = {
  handleClick: PropTypes.func,
};

export default DependentCard;
