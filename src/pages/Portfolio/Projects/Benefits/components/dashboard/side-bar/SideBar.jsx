import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SubscriberContext } from "@/config/SubscriberContext";
import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import SOAButton from "../../buttons/SOAButton";

import "./side-bar.scss";

const SideBar = () => {
  const navigate = useNavigate();
  const { user, loading, userEmploymentInfo } = useContext(SubscriberContext);
  const [isHovered, setIsHovered] = useState(false);
  const { bargainingUnits } = useContext(StaticSiteDataContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getBargainingUnitTitle = (bargainingUnits, userEmploymentInfo) => {
    const unit = bargainingUnits.find(
      (bargainingUnit) =>
        bargainingUnit.bargainingUnitId === userEmploymentInfo.bargainingUnitId,
    );

    return unit ? unit.title : userEmploymentInfo.bargainingUnit ?? "N/A";
  };

  const getEmploymentStatus = (partFullTimeIndicator) => {
    switch (partFullTimeIndicator) {
      case "F":
        return "Full Time";
      case "P":
        return "Part Time";
      default:
        return "N/A";
    }
  };

  const getEligibility = (isEligible) => {
    switch (isEligible) {
      case "Y":
        return "Eligible";
      case "N":
        return "Not Eligible";
      default:
        return "N/A";
    }
  };

  function formatSSN(ssn) {
    return ssn.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    window.location.href = import.meta.env.VITE_APP_LINK_PORTAL_RETURN;
  };

  const handleEditClick = () => {
    navigate("/user-info");
  };

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phoneNumberString;
  };

  const redactSSN = (ssnString) => {
    const cleaned = ("" + ssnString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);
    if (match) {
      return "***  **  " + match[3];
    }
    return null;
  };

  return (
    <div className="side-bar">
      <h1>Retirement and Benefits</h1>

      <div>
        {user?.subscriberAccountId !== null ? (
          <>
            <div>
              <div className="info-edit">
                <span>{user ? "Personal Info" : ""}</span>
                {user && user.employmentId && (
                  <PencilSquareIcon
                    className="edit-icon"
                    height="20"
                    width="20"
                    color="orange"
                    onClick={handleEditClick}
                  />
                )}
              </div>
              <ul>
                <li>
                  {user?.firstName && "Name: " + user?.firstName + " "}
                  {user?.middleName && user?.middleName + " "}
                  {user?.lastName}
                </li>
                {user?.contactPhone && (
                  <li>{"Phone: " + formatPhoneNumber(user?.contactPhone)}</li>
                )}
                {user?.contactEmail && (
                  <li>{"Email: " + user?.contactEmail}</li>
                )}
                {user && user.ssn && (
                  <li>
                    {"SSN: "}
                    <span>
                      {user.ssn.includes('*') ? user.ssn : redactSSN(user.ssn)}
                    </span>
                  </li>
                )}
              </ul>
            </div>
            {userEmploymentInfo && (
              <>
                <span>Employment Info</span>
                <ul>
                  <li>
                    Status:{" "}
                    {getEmploymentStatus(
                      userEmploymentInfo?.partFullTimeIndicator,
                    )}
                  </li>
                  <li>
                    Benefits Eligible:{" "}
                    {getEligibility(
                      userEmploymentInfo?.healthEligibleIndicator,
                    )}
                  </li>
                  <li>
                    Bargaining Unit:{" "}
                    {getBargainingUnitTitle(
                      bargainingUnits,
                      userEmploymentInfo,
                    )}
                  </li>
                </ul>
              </>
            )}
          </>
        ) : (
          <div style={{ flexGrow: 1 }} />
        )}
      </div>

      <div>
        <span>Contact Us</span>
        <ul>
          <li>Phone: (555) 123-DEMO</li>
          <li>Local: (555) 456-7890</li>
          <li>Email: support@democompany.com</li>
        </ul>
      </div>
      <SOAButton onClick={handleClick} secondary text="Return to RnB" />
    </div>
  );
};

export default SideBar;
