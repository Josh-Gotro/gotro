import { useState } from "react";
import { Alert, Accordion, Col, Container, Row } from "react-bootstrap";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import PropTypes from "prop-types";

import BenefitSelectionSummary from "./components/BenefitSelectionSummary";
import HfsaBenefitSelector from "./components/HfsaBenefitSelector";
import OptOutableBenefitCard from "./components/OptOutableBenefitCard";
import StandardBenefitSelector from "./components/StandardBenefitSelector";

import { BenefitPackagePropTypes } from "@/utils/benefitPackageUtils";
import "../cards/cards.scss";

const BenefitsSelection = ({
  benefitPackage,
  benefitSelections,
  dependents,
  isHfsaInputValid,
  onBenefitSelectionChange,
  setIsHfsaInputValid,
}) => {
  const [activeKey, setActiveKey] = useState(0);
  const {
    benefits,
    computeTotalPremium,
    getBenefitSelectionSummary,
    isBenefitTypeHfsa,
  } = benefitPackage;

  const getSelectedOption = (benefitTypeId) =>
    benefitSelections.find((s) => s.benefitTypeId === benefitTypeId);

  const handleSelectedOptionChange = (benefit, selection) => {
    onBenefitSelectionChange({
      benefitTypeId: benefit.benefitTypeId,
      ...selection,
    });
  };

  const benefitSelectionSummaries = benefitSelections.map(
    getBenefitSelectionSummary,
  );

  const totalPremium = computeTotalPremium(benefitSelectionSummaries);

  return (
    <Container>
      <Row>
        <Col xs={5}>
          {dependents === "Y" && (
            <Alert className="alert-danger">
              <Row>
                <Col
                  xs={2}
                  className="d-flex justify-content-center align-items-center ">
                  <ExclamationCircleIcon height="40" width="40" />
                </Col>
                <Col xs={8}>
                  <span>
                    You will be required to agree to a dependents opt-out waiver
                    if you choose an Employee Only medical plan.{" "}
                  </span>
                </Col>
              </Row>
            </Alert>
          )}
          <BenefitSelectionSummary
            summaries={benefitSelectionSummaries}
            totalPremium={totalPremium}
          />
        </Col>

        <Col>
          <Accordion
            activeKey={activeKey}
            onSelect={(key) => setActiveKey(key)}>
            {benefits.map((b, idx) => (
              <Accordion.Item eventKey={idx} key={idx}>
                <Accordion.Header>{b.title}</Accordion.Header>
                <Accordion.Body>
                  <OptOutableBenefitCard
                    benefit={b}
                    dependents={dependents}
                    isHfsaInputValid={isHfsaInputValid}
                    selectedOption={getSelectedOption(b.benefitTypeId)}
                    setIsHfsaInputValid={setIsHfsaInputValid}
                    onSelectedOptionChange={(s) =>
                      handleSelectedOptionChange(b, s)
                    }
                    BenefitSelectionComponent={
                      isBenefitTypeHfsa(b.benefitTypeId)
                        ? (props) => (
                            <HfsaBenefitSelector
                              {...props}
                              setIsHfsaInputValid={setIsHfsaInputValid}
                              isHfsaInputValid={isHfsaInputValid}
                            />
                          )
                        : (props) => <StandardBenefitSelector {...props} />
                    }
                  />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

BenefitsSelection.propTypes = {
  benefitPackage: BenefitPackagePropTypes.benefitPackageType.isRequired,
  benefitSelections: PropTypes.arrayOf(
    BenefitPackagePropTypes.selectedOptionType,
  ).isRequired,
  onBenefitSelectionChange: PropTypes.func.isRequired,
};

export default BenefitsSelection;
