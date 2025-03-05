import React, { useMemo, useState } from "react";
import {
  BuildingOffice2Icon as BuldingOffice2Outline,
  CheckCircleIcon as CheckCircleOutline,
  PaperAirplaneIcon as PaperAirplaneOutline,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckOutline,
} from "@heroicons/react/24/outline";
import {
  BuildingOffice2Icon as BuildingSolid,
  CheckCircleIcon as CheckCircleSolid,
  PaperAirplaneIcon as PaperAirplaneSolid,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckSolid,
} from "@heroicons/react/24/solid";

import Stepper from "@/components/stepper/Stepper";
import { transformBenefits } from "@/utils/benefitPackageUtils";

import FourComplete from "./FourComplete";
import OneWorkInfo from "./OneWorkInfo";
import ThreeBenefitsReview from "./ThreeBenefitsReview";
import TwoBenefitsSelection from "./TwoBenefitsSelection";

const OpenEnrollmentWorkflow = () => {
  const [stepData, setStepData] = useState({
    stepOneData: {},
    stepTwoData: {},
    stepThreeData: {},
    stepFourData: {},
  });
  const [coverageOptions, setCoverageOptions] = useState(null);
  const [selectedBenefits, setSelectedBenefits] = useState(null);

  const handleChoiceCriteria = (choiceCriteria, formData) => {
    setCoverageOptions(formData);
    setStepData((prevData) => ({
      ...prevData,
      stepOneData: formData,
      choiceCriteria: choiceCriteria,
    }));
  };

  const benefitPackage = useMemo(
    () => coverageOptions && transformBenefits(coverageOptions.benefits),
    [coverageOptions],
  );

  const handleBenefitsSelection = (benefits, optOutPlanIds) => {
    // if the benefit is an opt out plan, set optOutCertified to true
    benefits.forEach((benefit) => {
      if (optOutPlanIds.includes(benefit.benefitTypeId)) {
        benefit.optOutCertified = true;
      }
    });
    setSelectedBenefits(benefits);
    setStepData((prevData) => ({
      ...prevData,
      stepThreeData: benefits,
    }));
  };

  const steps = [
    {
      component: (props) =>
        stepData?.choiceCriteria ? (
          <OneWorkInfo
            {...props}
            handleChoiceCriteria={handleChoiceCriteria}
            choiceCriteria={stepData.choiceCriteria}
            setStepData={setStepData}
          />
        ) : (
          <OneWorkInfo
            {...props}
            handleChoiceCriteria={handleChoiceCriteria}
            setStepData={setStepData}
          />
        ),
      title: "Employment Info",
      iconFilled: <BuildingSolid height="32" width="32" />,
      iconOutlined: (
        <BuldingOffice2Outline
          className=" text-blue-500"
          height="32"
          width="32"
        />
      ),
    },
    {
      component: (props) => (
        <TwoBenefitsSelection
          {...props}
          benefitPackage={benefitPackage}
          choiceCriteria={stepData.choiceCriteria}
          handleBenefitsSelection={handleBenefitsSelection}
          hasDependents={stepData.stepOneData.dependentsIndicator}
          selectedBenefits={selectedBenefits}
        />
      ),
      title: "Select Benefits",
      iconFilled: <ClipboardDocumentCheckSolid height="32" width="32" />,
      iconOutlined: (
        <ClipboardDocumentCheckOutline
          className=" text-blue-500"
          height="32"
          width="32"
        />
      ),
    },
    {
      component: (props) => (
        <ThreeBenefitsReview
          {...props}
          benefitPackage={benefitPackage}
          selectedBenefits={selectedBenefits}
          choiceCriteria={stepData.choiceCriteria}
        />
      ),
      title: "Review & Submit",
      iconFilled: <PaperAirplaneSolid height="32" width="32" />,
      iconOutlined: (
        <PaperAirplaneOutline
          className=" text-blue-500"
          height="32"
          width="32"
        />
      ),
    },
    {
      component: FourComplete,
      title: "Complete",
      iconFilled: <CheckCircleSolid height="32" width="32" />,
      iconOutlined: (
        <CheckCircleOutline className=" text-blue-500" height="32" width="32" />
      ),
    },
  ];

  const stepProps = [
    {
      data: stepData.stepOneData,
      updateData: (newData) =>
        setStepData({ ...stepData, stepOneData: newData }),
    },
    {
      data: stepData.stepTwoData,
      updateData: (newData) =>
        setStepData({ ...stepData, stepTwoData: newData }),
    },
    {
      data: stepData.stepThreeData,
      updateData: (newData) =>
        setStepData({ ...stepData, stepThreeData: newData }),
    },
    {
      data: stepData.stepFourData,
      updateData: (newData) =>
        setStepData({ ...stepData, stepFourData: newData }),
    },
  ];

  return (
    <div className="stepper-container">
      <Stepper
        stepProps={stepProps}
        steps={steps}
        title="Benefits Enrollment"
      />
    </div>
  );
};

export default OpenEnrollmentWorkflow;
