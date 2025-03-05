import { useState } from "react";

import PropTypes from "prop-types";

import SOAButton from "@/components/buttons/SOAButton";
import { BenefitPackagePropTypes } from "@/utils/benefitPackageUtils";

const StandardBenefitSelector = ({
  benefit,
  chosenOption,
  dependents,
  onChosenOptionChange,
}) => {
  const { getOptionById, getOptionByPlanAndLevel, plans, levels } = benefit;
  const [selectedPlanId, setSelectedPlanId] = useState(
    () => getOptionById(chosenOption.optionId).benefitPlanId,
  );
  const [selectedLevelId, setSelectedLevelId] = useState(
    () => getOptionById(chosenOption.optionId).benefitLevelId,
  );
  const hasDependents = dependents === "Y";

  const updateChosenOption = (newOption) => {
    if (newOption.benefitOptionId !== chosenOption.optionId) {
      onChosenOptionChange({
        optionId: newOption.benefitOptionId,
        electedMonthlyRate: null,
      });
    }
  };

  const handlePlanIdChange = (id) => {
    setSelectedPlanId(id);
    updateChosenOption(getOptionByPlanAndLevel(id, selectedLevelId));
  };

  const handleLevelIdChange = (id) => {
    setSelectedLevelId(id);
    updateChosenOption(getOptionByPlanAndLevel(selectedPlanId, id));
  };

  return (
    <>
      <div>
        <div className="title">
          <span>Choose Coverage Plan</span>
        </div>
        <div className="bttngroup">
          {plans.map(({ planId, planTitle }, idx) => (
            <SOAButton
              key={idx}
              onClick={() => handlePlanIdChange(planId)}
              text={planTitle}
              outline={planId !== selectedPlanId}
              tertiary={planId === selectedPlanId}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="title">
          <span>Choose Coverage Level</span>
        </div>
        <div className="bttngroup">
          {levels.map(({ levelId, levelTitle }, idx) => (
            <SOAButton
              key={idx}
              onClick={() => handleLevelIdChange(levelId)}
              text={levelTitle}
              outline={levelId !== selectedLevelId}
              tertiary={levelId === selectedLevelId}
              disabled={!hasDependents && levelTitle === "Employee and Family"}
            />
          ))}
        </div>
        {!hasDependents && (
          <div style={{ marginTop: "1em", color: "orange" }}>
            Employee and Family option is only available if you have dependents
            on file.
          </div>
        )}
      </div>
    </>
  );
};

StandardBenefitSelector.propTypes = {
  benefit: BenefitPackagePropTypes.benefitType.isRequired,
  chosenOption: PropTypes.shape({
    optionId: PropTypes.number.isRequired,
    electedMonthlyRate: PropTypes.number,
  }),
  onChosenOptionChange: PropTypes.func.isRequired,
};

export default StandardBenefitSelector;
