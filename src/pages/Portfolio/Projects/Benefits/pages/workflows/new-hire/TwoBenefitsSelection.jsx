import { useState } from "react";
import PropTypes from "prop-types";

import OptOutModal from "@/components/modal/OptOutModal";
import BenefitsSelection from "@/components/benefits-selection/BenefitsSelection";
import SOAButton from "@/components/buttons/SOAButton";
import ValidationErrors from "@/components/benefits-selection/components/ValidationErrors";
import { BenefitPackagePropTypes } from "@/utils/benefitPackageUtils";
import { useValidationErrors } from "@/config/ErrorContext";

import { validateCoverageChoices } from "../../../api/coverage/coverageService";

import "./new-hire-workflow.scss";

const TwoBenefitsSelection = ({
  choiceCriteria,
  hasDependents,
  goNext,
  goBack,
  benefitPackage,
  selectedBenefits,
  handleBenefitsSelection,
}) => {
  const { defaultSelections } = benefitPackage;
  const { setValidationErrors, validationErrors } = useValidationErrors();
  const [isHfsaInputValid, setIsHfsaInputValid] = useState(true);

  const [showOptOutWaiver, setShowOptOutWaiver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [optOutTypeIds, setOptOutTypeIds] = useState([]);
  const [validationResults, setValidationResults] = useState(null);
  const [benefitSelections, setBenefitSelections] = useState(
    selectedBenefits ?? defaultSelections,
  );

  // Find the validation results that require opt out certification and save the benefit type ids to an array.
  const getOptOutRequiredTypeIds = (validationResults) => {
    const ids = [];
    for (let i = 0; i < validationResults.benefitSelections.length; i++) {
      if (validationResults.benefitSelections[i].optOutCerificationRequired) {
        ids.push(validationResults.benefitSelections[i].benefitTypeId);
      }
    }
    setOptOutTypeIds(ids);
  };

  const handleValidate = async () => {
    setIsLoading(true);
    //  add hasDependents  to the choiceCriteria. This is separate from the choiceCriteria because it is unique to new-hire flow.
    choiceCriteria.hasDependents = hasDependents === "Y";
    try {
      const response = await validateCoverageChoices(
        choiceCriteria,
        benefitSelections,
      );
      if (response.optOutCertificationRequired) {
        setValidationResults(response);
        getOptOutRequiredTypeIds(response);
        setShowOptOutWaiver(true);
        return;
      } else {
        handleNext();
      }
    } catch (error) {
      console.error("Error validating coverage choices", error);
    }
  };

  const handleNext = () => {
    setValidationErrors(null);
    goNext();
    handleBenefitsSelection(benefitSelections, optOutTypeIds);
  };

  const handleBenefitSelectionChange = (selectedBenefit) => {
    setBenefitSelections((prev) =>
      prev.map((s) =>
        s.benefitTypeId === selectedBenefit.benefitTypeId ? selectedBenefit : s,
      ),
    );
  };

  const closeModal = () => {
    setShowOptOutWaiver(false);
  };

  return (
    <>
      <OptOutModal
        benefits={validationResults}
        show={showOptOutWaiver}
        onClose={closeModal}
        onAgree={handleNext}
      />

      <div className="step-container">
        <div className="benefit-selection">
          <BenefitsSelection
            benefitPackage={benefitPackage}
            benefitSelections={benefitSelections}
            isHfsaInputValid={isHfsaInputValid}
            setIsHfsaInputValid={setIsHfsaInputValid}
            onBenefitSelectionChange={handleBenefitSelectionChange}
            dependents={hasDependents}
          />
        </div>
        {validationErrors && (
          <div style={{ marginTop: "5em" }}>
            <ValidationErrors />
          </div>
        )}
        <div className="button-group">
          <SOAButton lg onClick={goBack} primary text="Back" />
          <SOAButton
            lg
            onClick={handleValidate}
            primary
            text={isLoading && !showOptOutWaiver ? "loading..." : "Next"}
            width="200px"
            disabled={!isHfsaInputValid}
          />
        </div>
      </div>
    </>
  );
};

TwoBenefitsSelection.propTypes = {
  goNext: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  benefitPackage: BenefitPackagePropTypes.benefitPackageType.isRequired,
  selectedBenefits: PropTypes.arrayOf(
    BenefitPackagePropTypes.selectedOptionType,
  ),
  handleBenefitsSelection: PropTypes.func.isRequired,
};

export default TwoBenefitsSelection;
