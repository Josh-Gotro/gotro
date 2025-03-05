/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Alert } from "react-bootstrap";

export const hfsaInfo = () => {
  return (
    <>
      <p>
        If you enroll in the Health Flexible Spending Account (HFSA) and have
        unused funds at the end of the plan year, any remaining amount up to the
        rollover maximum limit will automatically carry over into the next plan
        year, even if you do not re-enroll. The rollover balance can be used in
        addition to your new annual election. You can access your rollover funds
        as long as you are an active AlaskaCare employee and are eligible to
        participate in HFSA. Left over amounts in excess of the rollover maximum
        limit will be forfeited. Visit the{" "}
        <Alert.Link href="https://drb.alaska.gov/employee/healthplans.html#hfsa">
          AlaskaCare Employee Health Plan
        </Alert.Link>{" "}
        webpage to view the current year's rollover amounts.
      </p>
      <p>
        HFSA can be set up "With Streamlining' or 'No Streamlining'. 'With
        Streamlining' means any unpaid portion of your claim (deductible,
        coinsurance, etc.) will go directly to your HFSA account for immediate
        reimbursement. You may not choose this option if you have another health
        plan that will coordinate with AlaskaCare. Choose 'No Streamlining' if
        you have other health coverage.
      </p>
    </>
  );
};

export const hfsaAlert = () => {
  return (
    <>
      <p>
        Do not select the HFSA with Streamlining option if you have other health
        coverage that will coordinate with AlaskaCare.
      </p>
      <p>
        Streamlining options available at this time are for medical claims,
        vision claims, and dental claims.
      </p>
    </>
  );
};
