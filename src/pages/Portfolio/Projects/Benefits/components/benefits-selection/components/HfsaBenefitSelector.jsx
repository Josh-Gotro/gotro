import { useCallback, useState } from "react";
import { Alert, Row, Col } from "react-bootstrap";
import { BellAlertIcon } from "@heroicons/react/24/outline";

import PropTypes from "prop-types";

import SOAButton from "@/components/buttons/SOAButton";
// import { toDollarAmount } from "@/utils/formatters";

import { hfsaAlert, hfsaInfo } from "./hfsaInfo";
import { BenefitPackagePropTypes } from "@/utils/benefitPackageUtils";

import "../benefits-selection.scss";

const HfsaBenefitSelector = ({
  benefit,
  chosenOption,
  isHfsaInputValid,
  onChosenOptionChange,
  setIsHfsaInputValid,
}) => {
  const {
    getOptionById,
    getOptionByPlanAndLevel,
    levels,
    maxMonthlyRate,
    minMonthlyRate,
  } = benefit;
  const selectedPlanId = getOptionById(chosenOption.optionId).benefitPlanId;
  const [selectedLevelId, setSelectedLevelId] = useState(
    () => getOptionById(chosenOption.optionId).benefitLevelId,
  );

  const [monthlyAmount, setMonthlyAmount] = useState(
    chosenOption.electedMonthlyRate,
  );

  const updateChosenOption = (newOption, newMonthlyAmount) => {
    if (
      newOption.benefitOptionId !== chosenOption.optionId ||
      newMonthlyAmount !== chosenOption.electedMonthlyRate
    ) {
      onChosenOptionChange({
        optionId: newOption.benefitOptionId,
        electedMonthlyRate: newMonthlyAmount,
      });
    }
  };

  const handleLevelIdChange = (id) => {
    setSelectedLevelId(id);
    updateChosenOption(
      getOptionByPlanAndLevel(selectedPlanId, id),
      monthlyAmount,
    );
  };

  // set the input value locally to prevent the the component from re-rendering. because it is owned by a parent, this would otherwise cause the input to lose focus after each keystroke.
  const [localAmount, setLocalAmount] = useState(monthlyAmount || "");

  const handleMonthlyAmountChange = useCallback((e) => {
    const amount = e.target.value;

    // Only allow numeric input or empty string
    if (amount !== "" && !/^\d+$/.test(amount)) {
      return;
    }

    setLocalAmount(amount); // Set local state
  }, []);

  const handleBlur = useCallback(() => {
    const numericAmount = localAmount ? Number(localAmount) : null;

    if (
      numericAmount !== null &&
      (numericAmount < minMonthlyRate || numericAmount > maxMonthlyRate)
    ) {
      setIsHfsaInputValid(false);
    } else {
      setIsHfsaInputValid(true);
    }
    setMonthlyAmount(numericAmount);
    updateChosenOption(
      getOptionByPlanAndLevel(selectedPlanId, selectedLevelId),
      numericAmount,
    );
  }, [
    localAmount,
    setIsHfsaInputValid,
    setMonthlyAmount,
    updateChosenOption,
    selectedPlanId,
    selectedLevelId,
    minMonthlyRate,
    maxMonthlyRate,
  ]);

  const HfsaInfoSection = () => {
    const [showInfo, setShowInfo] = useState(false);

    return (
      <>
        <Alert className="alert-warn">
          <Row>
            <Col
              xs={2}
              className="d-flex justify-content-center align-items-center ">
              <BellAlertIcon height="30" width="30" />
            </Col>
            <Col xs={10}>{hfsaAlert()}</Col>
          </Row>
        </Alert>
        <span
          onClick={() => setShowInfo(!showInfo)}
          style={{ "color": "blue", "cursor": "pointer" }}>
          {showInfo ? "Hide Info" : "Show additional info about HFSA"}
        </span>
        {showInfo && (
          <div>
            <Alert className="alert-info">{hfsaInfo()}</Alert>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="title">
        <span>Select Streamlining</span>
      </div>
      <div className="bttngroup">
        {levels.map(({ levelId, levelTitle }, idx) => (
          <SOAButton
            key={idx}
            onClick={() => handleLevelIdChange(levelId)}
            text={levelTitle}
            outline={levelId !== selectedLevelId}
            tertiary={levelId === selectedLevelId}
          />
        ))}
      </div>
      <div>
        <span className="section-title title">Enter Monthly Contribution:</span>
      </div>
      <div className="input-container">
        <div>
          ${" "}
          <input
            onChange={handleMonthlyAmountChange}
            type="text"
            value={localAmount}
            placeholder={`Choose between $${minMonthlyRate} and $${maxMonthlyRate}`}
            className="hfsa-input"
            onBlur={handleBlur}
          />
          {!isHfsaInputValid && (
            <p className="validation-message">
              Please enter a number between ${minMonthlyRate} and $
              {maxMonthlyRate}.
            </p>
          )}
        </div>
      </div>
      <HfsaInfoSection />
    </>
  );
};

HfsaBenefitSelector.propTypes = {
  benefit: BenefitPackagePropTypes.benefitType.isRequired,
  chosenOption: PropTypes.shape({
    optionId: PropTypes.number.isRequired,
    electedMonthlyRate: PropTypes.number,
  }),
  onChosenOptionChange: PropTypes.func.isRequired,
};

export default HfsaBenefitSelector;
