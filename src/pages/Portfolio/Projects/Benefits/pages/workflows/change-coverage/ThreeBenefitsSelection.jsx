import { useState } from "react";
import PropTypes from "prop-types";

import BenefitsSelection from "@/components/benefits-selection/BenefitsSelection";
import SOAButton from "@/components/buttons/SOAButton";
import OptOutModal from "@/components/modal/OptOutModal";
import ValidationErrors from "@/components/benefits-selection/components/ValidationErrors";
import { useValidationErrors } from "@/config/ErrorContext";

import { validateCoverageChoices } from "../../../api/coverage/coverageService";

import "./change-coverage-workflow.scss";

const ThreeBenefitsSelection = ({
  choiceCriteria,
  goNext,
  goBack,
  benefitPackage,
  selectedBenefits,
  hasDependents,
  handleBenefitsSelection,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [optOutTypeIds, setOptOutTypeIds] = useState([]);
  const [showOptOutWaiver, setShowOptOutWaiver] = useState(false);
  const [validationResults, setValidationResults] = useState(null);
  const [isHfsaInputValid, setIsHfsaInputValid] = useState(true);

  const { setValidationErrors, validationErrors } = useValidationErrors();

  const { defaultSelections } = benefitPackage;

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

  const handleNext = async () => {
    setValidationErrors(null);
    goNext();
    handleBenefitsSelection(benefitSelections, optOutTypeIds);
  };

  const closeModal = () => {
    setIsLoading(false);
    setShowOptOutWaiver(false);
  };

  const handleBenefitSelectionChange = (selectedBenefit) => {
    setBenefitSelections((prev) =>
      prev.map((s) =>
        s.benefitTypeId === selectedBenefit.benefitTypeId ? selectedBenefit : s,
      ),
    );
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
            onBenefitSelectionChange={handleBenefitSelectionChange}
            setIsHfsaInputValid={setIsHfsaInputValid}
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

ThreeBenefitsSelection.propTypes = {
  goNext: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default ThreeBenefitsSelection;
