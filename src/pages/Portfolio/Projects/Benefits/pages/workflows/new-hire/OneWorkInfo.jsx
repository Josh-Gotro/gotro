import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Alert, Row, Col } from "react-bootstrap";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

import SOAButton from "@/components/buttons/SOAButton";
import WorkInfo from "@/components/steps/WorkInfo";
import { useValidationErrors } from "@/config/ErrorContext";
import ValidationErrors from "@/components/benefits-selection/components/ValidationErrors";
import { getAlaskaDateString } from "@/utils/formatters";
import DemoBanner from "@/components/demo-banner/DemoBanner";

import { postCoverageOptions } from "../../../mockServices/mockCoverageService";
import "./new-hire-workflow.scss";

const OneWorkInfo = ({
  choiceCriteria,
  goNext,
  handleChoiceCriteria,
  setStepData,
}) => {
  const { setValidationErrors, validationErrors } = useValidationErrors();
  const [showInfo, toggleShowInfo] = useState(false);
  const navigate = useNavigate();
  const today = getAlaskaDateString();

  // Reformat eventDate without mutating choiceCriteria
  let eventDate = today;

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
    eventDate: eventDate || "",
    bargainingUnitId: choiceCriteria?.defaultBargainingUnitId,
    partFullTime: choiceCriteria?.partFullTime,
    coverageChangeReasonId: choiceCriteria?.coverageChangeReasonId
      ? choiceCriteria?.coverageChangeReasonId
      : 1,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: choiceCriteria || {},
  });

  const dependentsValue = watch("hasDependents"); // Watch the value of the "dependents" field

  useEffect(() => {
    if (dependentsValue === "true") {
      // If the value is 'true' (note that the value from the select field will be a string)
      toggleShowInfo(true); // Set showInfo to true
    } else {
      toggleShowInfo(false);
    } // Otherwise, set showInfo to false
  }, [dependentsValue]); // Run this effect whenever dependentsValue changes

  // Reformat date if it is in MM/DD/YYYY format
  if (
    choiceCriteria &&
    choiceCriteria.eventDate &&
    typeof choiceCriteria.eventDate === "string" &&
    choiceCriteria.eventDate.includes("/")
  ) {
    const [month, day, year] = choiceCriteria.eventDate.split("/");
    const reformattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    choiceCriteria.eventDate = reformattedDate;
  }

  const handleCancelClick = () => {
    navigate("/");
  };

  useEffect(() => {
    reset(defaultValues);
  }, [choiceCriteria, reset]);

  const handleFormSubmit = async (data) => {
    setStepData(() => ({
      choiceCriteria: {
        eventDate: data.eventDate,
        bargainingUnitId: data.bargainingUnitId,
        partFullTime: data.partFullTime,
        hasDependents: data.hasDependents,
      },
    }));
    // Add new key-value pair
    data.coverageChangeReasonId = 1;

    // Change date format
    let dateParts = data.eventDate.split("-");
    data.eventDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
    const coverageOptions = await postCoverageOptions(data);
    const hasDependentsOnRecord = choiceCriteria?.dependentsIndicator === "Y";

    await handleChoiceCriteria(data, coverageOptions);

    // Add dependents to stepData
    setStepData((prevData) => ({
      ...prevData,
      stepOneData: { ...prevData.stepOneData, hasDependentsOnRecord },
      choiceCriteria: {
        ...prevData.choiceCriteria,
        hasDependents: data.hasDependents,
      },
    }));
    setValidationErrors(null);
    goNext(); // call goNext after form submission
  };

  return (
    <div className="step-container">
      <DemoBanner />
      <div>
        <WorkInfo
          errors={errors}
          onSubmit={handleSubmit(handleFormSubmit)}
          register={register}
        />

        {/* Additional Field for new employees as they do not have access to dependents portal as a new user.  */}
        <div className="dependents-input">
          <label>Dependents </label>
          <select
            className="modern-select"
            {...register("hasDependents", { required: true })}>
            <option value="">Do you have dependents?</option>
            <option value={true}>Yes, I have dependents.</option>
            <option value={false}>No, I do not have Dependents</option>
          </select>
          {errors.partFullTime && (
            <p className="validation">Employment Type is required.</p>
          )}
          {validationErrors && (
            <div style={{ marginTop: "5em" }}>
              <ValidationErrors />
            </div>
          )}
        </div>
        {showInfo && (
          <Alert className="alert-warn dependents-callout">
            <Row>
              <Col
                xs={2}
                className="d-flex justify-content-center align-items-center ">
                <InformationCircleIcon height="40" width="40" />
              </Col>
              <Col xs={8}>
                <span>
                  Once your information has been processed, please return for
                  instructions on how to enter your dependents information
                </span>
              </Col>
            </Row>
          </Alert>
        )}
      </div>

      <div className="button-group">
        <SOAButton lg onClick={handleCancelClick} secondary text="Cancel" />
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

OneWorkInfo.propTypes = {
  choiceCriteria: PropTypes.object,
  goNext: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goFinish: PropTypes.func.isRequired,
};
export default OneWorkInfo;
