import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import SOAButton from "@/components/buttons/SOAButton";
import WorkInfo from "@/components/steps/WorkInfo";
import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";
import { SubscriberContext } from "@/config/SubscriberContext";
import ValidationErrors from "@/components/benefits-selection/components/ValidationErrors";
import { useValidationErrors } from "@/config/ErrorContext";
import { getAlaskaDateString } from "@/utils/formatters";

import { postCoverageOptions } from "../../../api/coverage/coverageService";

import "./change-coverage-workflow.scss";

const TwoWorkInfo = ({
  choiceCriteria,
  goBack,
  goNext,
  handleChoiceCriteria,
  setStepData,
}) => {
  const {
    coverageChangeReason,
    bargainingUnits,
    getNextJanuaryFirst,
    openEnrollment,
  } = useContext(StaticSiteDataContext);
  const { userEmploymentInfo } = useContext(SubscriberContext);
  const { setValidationErrors, validationErrors } = useValidationErrors();

  // create const isBargainingUnitIdAlaskaCare that is  true if userEmploymentInfo.bargainingUnitId  is in bargainingUnits
  const isBargainingUnitIdAlaskaCare = bargainingUnits.some(
    (unit) => unit.bargainingUnitId === userEmploymentInfo.bargainingUnitId,
  );

  const defaultBargainingUnitId =
    choiceCriteria?.bargainingUnitId !== null &&
    choiceCriteria?.bargainingUnitId !== undefined
      ? choiceCriteria?.bargainingUnitId
      : isBargainingUnitIdAlaskaCare
        ? userEmploymentInfo?.bargainingUnitId?.toString()
        : "";

  const nextJanuaryFirst = getNextJanuaryFirst();

  const today = getAlaskaDateString();

  // Reformat eventDate without mutating choiceCriteria
  let eventDate =
    coverageChangeReason?.coverageChangeReasonId == 12
      ? nextJanuaryFirst
      : today;

  if (
    choiceCriteria &&
    choiceCriteria.eventDate &&
    typeof choiceCriteria.eventDate === "string"
  ) {
    if (choiceCriteria.eventDate.includes("/")) {
      // Reformat from MM/DD/YYYY to YYYY-MM-DD
      const [month, day, year] = choiceCriteria.eventDate.split("/");
      eventDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    } else if (choiceCriteria.eventDate.includes("-")) {
      // Date is already in YYYY-MM-DD format
      eventDate = choiceCriteria.eventDate;
    }
  }

  const defaultValues = {
    eventDate: eventDate,
    bargainingUnitId: defaultBargainingUnitId,
    partFullTime:
      choiceCriteria?.partFullTime ?? userEmploymentInfo?.partFullTimeIndicator,
    coverageChangeReasonId:
      choiceCriteria?.coverageChangeReasonId ??
      coverageChangeReason?.coverageChangeReasonId ??
      "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues,
  });

  // Use useEffect to reset the form values when choiceCriteria changes
  useEffect(() => {
    reset(defaultValues);
  }, [choiceCriteria, reset]);

  const handleFormSubmit = async (data) => {
    await setStepData(() => ({
      choiceCriteria: {
        eventDate: data.eventDate,
        bargainingUnitId: data.bargainingUnitId,
        partFullTime: data.partFullTime,
        coverageChangeReasonId: data.coverageChangeReasonId,
      },
    }));
    // Add new key-value pair
    data.coverageChangeReasonId = coverageChangeReason.coverageChangeReasonId;

    // Change date format for API submission
    const [year, month, day] = data.eventDate.split("-");
    data.eventDate = `${month}/${day}/${year}`;

    const coverageOptions = await postCoverageOptions(data);
    const hasDependentsOnRecord = coverageOptions.dependentsIndicator === "Y";

    await handleChoiceCriteria(data, coverageOptions);

    // Add dependents to stepData
    setStepData((prevData) => ({
      ...prevData,
      stepOneData: { ...prevData.stepOneData, hasDependentsOnRecord },
    }));
    setValidationErrors(null);
    goNext(); // call goNext after form submission
  };

  const handleGoBack = () => {
    const currentValues = getValues();
    setStepData(() => ({
      choiceCriteria: {
        eventDate: currentValues.eventDate,
        bargainingUnitId: currentValues.bargainingUnitId,
        partFullTime: currentValues.partFullTime,
        coverageChangeReasonId: currentValues.coverageChangeReasonId,
      },
    }));
    goBack();
  };

  return (
    <div className="step-container">
      <div className="work-info-container">
        <WorkInfo
          errors={errors}
          register={register}
          setStepData={setStepData}
        />
      </div>
      {validationErrors && (
        <div style={{ marginTop: "5em" }}>
          <ValidationErrors />
        </div>
      )}

      <div className="button-group">
        <SOAButton lg onClick={handleGoBack} primary text="Back" />
        <SOAButton
          lg
          onClick={handleSubmit(handleFormSubmit)}
          primary
          text="Next"
          width="200px"
        />
      </div>
    </div>
  );
};

TwoWorkInfo.propTypes = {
  goNext: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  handleChoiceCriteria: PropTypes.func.isRequired,
  setStepData: PropTypes.func.isRequired,
  choiceCriteria: PropTypes.object,
  stepData: PropTypes.object,
};

export default TwoWorkInfo;
