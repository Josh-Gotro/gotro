import React, { useContext, Suspense, useEffect, useState } from "react";

import { SubscriberContext } from "@/config/SubscriberContext";

import ActionItemsCardGroup from "../../card-group/ActionItemsCardGroup";
import UpdateInfoCardGroup from "../../card-group/UpdateInfoCardGroup";
import { getUserCoverage } from "../../../api/coverage/coverageService";

import "./card-container.scss";

const CoverageCardGroup = React.lazy(
  () => import("../../card-group/CoverageCardGroup"),
);
const PendingCoverageCardGroup = React.lazy(
  () => import("../../card-group/PendingCoverageCardGroup"),
);

const CardContainer = () => {
  const { user } = useContext(SubscriberContext);
  const [userCoverage, setUserCoverage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedOpenEnroll, setCompletedOpenEnroll] = useState();
  const [completedNewHire, setCompletedNewHire] = useState();

  useEffect(() => {
    const fetchUserCoverage = async () => {
      if (user && user.subscriberAccountId !== null) {
        const coverage = await getUserCoverage();
        setUserCoverage(coverage);
        setIsLoading(false);
      }
    };
    user && user.subscriberAccountId !== null && fetchUserCoverage();
  }, [user]);

  useEffect(() => {
    const hasOpenEnrollment = userCoverage?.pending.some(
      (coverage) => coverage.coverageChangeReason === "Open Enrollment",
    );
    setCompletedOpenEnroll(hasOpenEnrollment);

    const hasHireRehire = userCoverage?.pending.some(
      (coverage) => coverage.coverageChangeReason === "Hire/Rehire",
    );
    setCompletedNewHire(hasHireRehire);
  }, [userCoverage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && !user.employmentId && (
        <>
          <ActionItemsCardGroup
            completedOpenEnroll={completedOpenEnroll}
            completedNewHire={completedNewHire}
          />
          {user?.hasPendingChoices && (
            <PendingCoverageCardGroup coverage={userCoverage?.pending} />
          )}
        </>
      )}

      {user && user.employmentId && (
        <>
          <UpdateInfoCardGroup />
          {userCoverage && userCoverage.current && (
            <Suspense fallback={<div>Loading...</div>}>
              <CoverageCardGroup coverage={userCoverage} />
            </Suspense>
          )}
          {userCoverage.pending.length > 0 && (
            <Suspense fallback={<div>Loading...</div>}>
              <PendingCoverageCardGroup coverage={userCoverage.pending} />
            </Suspense>
          )}
        </>
      )}

      <div className="card-container"></div>
    </>
  );
};

export default CardContainer;
