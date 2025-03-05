import { useState } from "react";

import PropTypes from "prop-types";

import SOAButton from "@/components/buttons/SOAButton";
import { toDollarAmount } from "@/utils/formatters";

import BenefitOptOutSection from "./BenefitOptOutSection";

import "../../cards/cards.scss";
import { BenefitPackagePropTypes } from "@/utils/benefitPackageUtils";

const OptOutableBenefitCard = ({
  benefit,
  dependents,
  selectedOption,
  onSelectedOptionChange,
  BenefitSelectionComponent,
  setIsHfsaInputValid,
  isHfsaInputValid,
}) => {
  const [isOptedOut, setIsOptedOut] = useState(
    selectedOption.optionId === benefit.optOutOptionId,
  );

  const [chosenOption, setChosenOption] = useState(
    !isOptedOut ? selectedOption : benefit.initialAffirmativeSelection,
  );

  const handleOptOutClick = () => {
    setIsHfsaInputValid(true);
    setIsOptedOut(true);
    onSelectedOptionChange({
      optionId: benefit.optOutOptionId,
      electedMonthlyRate: null,
    });
  };

  const handleSelectBenefitsClick = () => {
    //  if HFSA then disable the submit button until a valid input is entered
    selectedOption.benefitTypeId === 4 && setIsHfsaInputValid(false);
    setIsOptedOut(false);
    onSelectedOptionChange(chosenOption);
  };

  const handleChosenOptionChange = (o) => {
    setChosenOption(o);
    onSelectedOptionChange(o);
  };

  return (
    <div className="benefit-card">
      {isOptedOut ? (
        <BenefitOptOutSection
          onSelectBenefitsClick={handleSelectBenefitsClick}
        />
      ) : (
        <>
          <BenefitSelectionComponent
            benefit={benefit}
            chosenOption={chosenOption}
            dependents={dependents}
            onChosenOptionChange={handleChosenOptionChange}
          />
          <div className="button-premium-container">
            <SOAButton
              onClick={handleOptOutClick}
              secondary={true}
              text={"Opt-Out"}
            />
            <span>
              Monthly Premium: $
              {toDollarAmount(benefit.calculatePremium(selectedOption))}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

OptOutableBenefitCard.propTypes = {
  benefit: BenefitPackagePropTypes.benefitType.isRequired,
  selectedOption: BenefitPackagePropTypes.selectedOptionType.isRequired,
  onSelectedOptionChange: PropTypes.func.isRequired,
  BenefitSelectionComponent: PropTypes.elementType.isRequired,
};

export default OptOutableBenefitCard;
