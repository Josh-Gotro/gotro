import React, { useContext, useState } from "react";

import PropTypes from "prop-types";

import SOAButton from "@/components/buttons/SOAButton";
import BenefitReviewCard from "@/components/cards/BenefitReviewCard";
import { SubscriberContext } from "@/config/SubscriberContext";
import { toDollarAmount } from "@/utils/formatters";
import { useValidationErrors } from "@/config/ErrorContext";
import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";
import DemoBanner from "@/components/demo-banner/DemoBanner";

import { postCoverageChoices } from "../../../mockServices/mockCoverageService";
import { BenefitPackagePropTypes } from "@/utils/benefitPackageUtils";

const ThreeBenefitsReview = ({
  benefitPackage,
  selectedBenefits,
  choiceCriteria,
  goNext,
  goBack,
}) => {
  const { refreshUserData, setNewUserInputsForOE } =
    useContext(SubscriberContext);
  const [isLoading, setIsLoading] = useState(false);
  const { lookupBenefitById, getBenefitSelectionSummary, computeTotalPremium } =
    benefitPackage;
  const selectionSummaries = selectedBenefits.map(getBenefitSelectionSummary);
  const totalMonthlyPremium = computeTotalPremium(selectionSummaries);
  const { setValidationErrors } = useValidationErrors();
  const { fetchCoverageChangeReasons } = useContext(StaticSiteDataContext);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Change benefits format
    const benefitSelections = selectedBenefits.map(
      ({ benefitTypeId, optionId, electedMonthlyRate, optOutCertified }) => ({
        benefitTypeId,
        selectedBenefitOptionId: optionId,
        electedMonthlyRate,
        optOutCertified,
      }),
    );

    setNewUserInputsForOE(choiceCriteria);
    await postCoverageChoices(choiceCriteria, benefitSelections);
    await fetchCoverageChangeReasons();
    await refreshUserData();

    setValidationErrors(null);
    setIsLoading(false);
    goNext(); // call goNext after form submission
  };

  return (
    <div className="step-container">
      <DemoBanner />
      <div className="step-five">
        <h3>Review Benefits</h3>
        {selectionSummaries.map((summary, idx) => (
          <BenefitReviewCard
            key={idx}
            benefit={lookupBenefitById(summary.benefitTypeId)}
            summary={summary}
          />
        ))}
        <div className="total-monthly-premium">
          <div className="premium-label">Your Monthly Premium</div>
          <div className="premium-amount">{`$${toDollarAmount(totalMonthlyPremium)}`}</div>
        </div>
        <div className="button-group">
          <SOAButton lg onClick={goBack} primary text="Back" />
          <SOAButton
            lg
            onClick={handleSubmit}
            primary
            text={isLoading ? "loading..." : "Submit"}
            width="200px"
          />
        </div>
        <div className="review-benefits">
          <span>
            Please carefully review your selections and print a copy of this
            page before submitting. To edit, please click the back button next
            to Submit to return to the Select Benefits step.
          </span>
        </div>
      </div>
    </div>
  );
};

ThreeBenefitsReview.propTypes = {
  benefitPackage: BenefitPackagePropTypes.benefitPackageType.isRequired,
  selectedBenefits: PropTypes.arrayOf(
    BenefitPackagePropTypes.selectedOptionType,
  ).isRequired,
  choiceCriteria: PropTypes.object.isRequired,
  goNext: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default ThreeBenefitsReview;
