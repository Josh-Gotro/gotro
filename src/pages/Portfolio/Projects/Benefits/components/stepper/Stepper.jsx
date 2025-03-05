import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./stepper.scss";

const Stepper = ({ steps, stepProps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // Functions to pass to step components
  const navigation = {
    goNext: () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    },
    goBack: () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    },
    goFinish: () => {
      navigate("/");
    },
    goStart: () => {
      setCurrentStep(0);
    },
  };

  const StepComponent = steps[currentStep].component;

  const stepComponentProps = { ...stepProps[currentStep], ...navigation };

  return (
    <div className="stepper">
      <div className="step-indicators">
        {steps.map((s, index) => (
          <div className="step-wrapper" key={index}>
            <div
              className={`step-indicator ${
                index === currentStep ? "active" : ""
              } ${index < currentStep ? "completed" : ""}`}
              key={index}>
              <span className="step-number">
                {index < currentStep ? s.iconFilled : s.iconOutlined}
              </span>
            </div>
            <span className="step-title">
              <br />
              {s.title}
            </span>
          </div>
        ))}
      </div>
      <div className="step-content">
        <StepComponent {...stepComponentProps} />
      </div>
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
    }),
  ).isRequired,
  stepProps: PropTypes.array,
};

export default Stepper;
