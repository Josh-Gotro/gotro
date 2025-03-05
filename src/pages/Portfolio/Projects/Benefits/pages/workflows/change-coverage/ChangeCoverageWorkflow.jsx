import React, { useMemo, useState } from "react";
import {
  BuildingOffice2Icon as BuldingOffice2Outline,
  CheckCircleIcon as CheckCircleOutline,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckOutline,
  PaperAirplaneIcon as PaperAirplaneOutline,
  UserGroupIcon as UserGroupOutline,
} from "@heroicons/react/24/outline";
import {
  BuildingOffice2Icon as BuildingSolid,
  CheckCircleIcon as CheckCircleSolid,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckSolid,
  PaperAirplaneIcon as PaperAirplaneSolid,
  UserGroupIcon as UserGroupSolid,
} from "@heroicons/react/24/solid";

import Stepper from "@/components/stepper/Stepper";
import { transformBenefits } from "@/utils/benefitPackageUtils";

import OneDependents from "./OneDependents";
import FiveComplete from "./FiveComplete";
import TwoWorkInfo from "./TwoWorkInfo";
import FourBenefitsReview from "./FourBenefitsReview";
import ThreeBenefitsSelection from "./ThreeBenefitsSelection";

const ChangeCoverageWorkflow = () => {
  const [stepData, setStepData] = useState({
    stepOneData: {},
    stepTwoData: {},
    stepThreeData: {},
    stepFourData: {},
    stepFiveData: {},
  });
  const [coverageOptions, setCoverageOptions] = useState(null);
  const [selectedBenefits, setSelectedBenefits] = useState(null);

  const handleChoiceCriteria = (choiceCriteria, info) => {
    setCoverageOptions(info);
    setStepData((prevData) => ({
      ...prevData,
      stepTwoData: info,
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
      component: (props) => <OneDependents {...props} />,
      title: "Dependents",
      iconFilled: <UserGroupSolid height="32" width="32" />,
      iconOutlined: (
        <UserGroupOutline className=" text-blue-500" height="32" width="32" />
      ),
    },
    {
      component: (props) =>
        stepData?.choiceCriteria ? (
          <TwoWorkInfo
            {...props}
            handleChoiceCriteria={handleChoiceCriteria}
            choiceCriteria={stepData.choiceCriteria}
            setStepData={setStepData}
          />
        ) : (
          <TwoWorkInfo
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
        <ThreeBenefitsSelection
          {...props}
          benefitPackage={benefitPackage}
          choiceCriteria={stepData.choiceCriteria}
          handleBenefitsSelection={handleBenefitsSelection}
          hasDependents={stepData.stepTwoData.dependentsIndicator}
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
        <FourBenefitsReview
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
      component: (props) => (
        <FiveComplete {...props} setStepData={setStepData} />
      ),
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
    {
      data: stepData.stepFiveData,
      updateData: (newData) =>
        setStepData({ ...stepData, stepFiveData: newData }),
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

export default ChangeCoverageWorkflow;
