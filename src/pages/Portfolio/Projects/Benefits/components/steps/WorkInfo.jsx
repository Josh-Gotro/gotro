import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { StaticSiteDataContext } from "@/config/StaticSiteDataContext";
import { SubscriberContext } from "@/config/SubscriberContext";
import { getAlaskaDateString } from "@/utils/formatters";

import "./steps.scss";

const WorkInfo = ({ register, errors, onSubmit, setStepData }) => {
  const { bargainingUnits, loading } = useContext(StaticSiteDataContext);
  const { user } = useContext(SubscriberContext);
  const {
    openEnrollment,
    coverageChangeReasons,
    coverageChangeReasonsLoading,
    coverageChangeReason,
    setCoverageChangeReason,
  } = useContext(StaticSiteDataContext);
  const [selectedChangeReason, setSelectedChangeReason] = useState(
    coverageChangeReason ? coverageChangeReason.coverageChangeReasonId : "",
  );

  const today = getAlaskaDateString();

  const handleSelectChange = (event) => {
    setSelectedChangeReason(event.target.value);

    if (event.target.value == "12") {
      setCoverageChangeReason(openEnrollment);
      setStepData((prevData) => ({
        ...prevData,
        choiceCriteria: {
          eventDate: openEnrollment.eventDate,
          coverageChangeReasonId: openEnrollment.coverageChangeReasonId,
        },
      }));
    } else {
      setCoverageChangeReason({
        coverageChangeReasonId: event.target.value,
        title: event.target.options[event.target.selectedIndex].text,
      });

      setStepData((prevData) => ({
        ...prevData,
        choiceCriteria: {
          eventDate: today,
          coverageChangeReasonId: event.target.value,
        },
      }));
    }
  };

  return (
    <>
      <div className="work-info-contianer">
        <h2>Employment Info</h2>
        <p>
          {user?.employmentId
            ? "Please verify the information below."
            : "Please enter your employment information below."}
        </p>
      </div>
      <form className="subscriber-info" onSubmit={onSubmit}>
        <div className="input-select">
          <label>Coverage Reason</label>
          <select
            className="modern-select"
            value={selectedChangeReason}
            onChange={handleSelectChange}
            disabled={
              !user?.employmentId || (!user?.employmentId && openEnrollment)
            }>
            <option value="">Choose Coverage Reason</option>
            {!coverageChangeReasonsLoading && coverageChangeReasons ? (
              coverageChangeReasons.map((unit) => (
                <option
                  key={unit.coverageChangeReasonId}
                  value={unit.coverageChangeReasonId}>
                  {unit.title}
                </option>
              ))
            ) : (
              <>... loading</>
            )}
          </select>
        </div>

        <div className="input-select-date">
          <label>
            {user?.employmentId || openEnrollment ? "Event Date" : "Hire Date"}
          </label>
          <input
            type="date"
            disabled={coverageChangeReason?.coverageChangeReasonId === 12}
            className="modern-select date"
            max={today} // set max date to today
            {...register("eventDate", {
              required: "Event Date is required.",
              validate: (value) => {
                const selectedDate = new Date(value + "T00:00:00"); // Convert input value to date at start of the day

                if (!openEnrollment && selectedDate > today) {
                  return "Event Date cannot be in the future.";
                }

                return true;
              },
            })}
          />
          {errors.eventDate && (
            <p className="validation">{errors.eventDate.message}</p>
          )}
        </div>

        <div className="input-select">
          <label>Bargaining Unit</label>
          <select
            className="modern-select"
            {...register("bargainingUnitId", { required: true })}>
            <option value="">Select a Bargaining Unit</option>
            {!loading && bargainingUnits ? (
              bargainingUnits.map((unit) => (
                <option
                  key={unit.bargainingUnitId}
                  value={unit.bargainingUnitId}>
                  {unit.title}
                </option>
              ))
            ) : (
              <>... loading</>
            )}
          </select>
          {errors.bargainingUnitId && (
            <p className="validation">Bargaining Unit is required.</p>
          )}
        </div>

        <div className="input-select">
          <label>Employment Type</label>
          <select
            className="modern-select"
            {...register("partFullTime", { required: true })}>
            <option value="">Select Employment Type</option>
            <option value="F">Full Time</option>
            <option value="P">Part Time</option>
          </select>
          {errors.partFullTime && (
            <p className="validation">Employment Type is required.</p>
          )}
        </div>
      </form>
    </>
  );
};

WorkInfo.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

export default WorkInfo;
