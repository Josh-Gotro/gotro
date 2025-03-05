import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

import ValidationErrors from "@/components/benefits-selection/components/ValidationErrors";
import { useValidationErrors } from "@/config/ErrorContext";

import "./steps.scss";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const PersonalInfo = ({
  control,
  register,
  errors,
  watch,
  onSubmit,
  user,
  setValue,
}) => {
  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("middleName", user.middleName);
      setValue("lastName", user.lastName);
      setValue("contactPhone", user.contactPhone);
      setValue("contactEmail", user.contactEmail);
      setValue("ssn", user.ssn);
      if (!user.employmentId) {
        setValue("ssn2", user.ssn);
      }
      // Convert birthdate to YYYY-MM-DD format
      const birthdate = new Date(user.birthdate);
      const formattedBirthdate = birthdate.toISOString().split("T")[0];
      setValue("birthdate", formattedBirthdate);
    }
  }, [user, setValue]);

  const [showSSN, setShowSSN] = useState(false);
  const { validationErrors } = useValidationErrors();

  const NAME_FORMAT_PATTERN = /^[a-zA-Z]+$/;

  const ssnWatchValue = watch("ssn");
  const ssnValue = ssnWatchValue ? ssnWatchValue.replace(/-/g, "") : "";

  const hasEmploymentId = user?.employmentId != null;

  const formatSSN = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }
    return cleaned;
  };

  return (
    <>
      {!user ? (
        <>
          <h2>Welcome!</h2>
          <p>To get started, please enter the following information.</p>
        </>
      ) : (
        <h2 style={{ "marginBottom": ".5em" }}>Edit Your Information</h2>
      )}
      <form className="subscriber-info-personal" onSubmit={onSubmit}>
        <div className="input-group-row">
          <div className="input-group-personal">
            <label>First Name</label>
            <input
              defaultValue={user?.firstName}
              {...register("firstName", {
                required: "First name is required.",
                maxLength: {
                  value: 20,
                  message: "First name should not exceed 20 characters.",
                },
                pattern: {
                  value: NAME_FORMAT_PATTERN,
                  message: "Invalid first name format.",
                },
              })}
              disabled={hasEmploymentId}
            />
            {errors.firstName && (
              <p className="validation">First name is required.</p>
            )}
          </div>

          <div className="input-group-personal">
            <label>Middle Name</label>
            <input
              defaultValue={user?.middleName}
              {...register("middleName", {
                maxLength: {
                  value: 15,
                  message: "Middle name should not exceed 15 characters.",
                },
                pattern: {
                  value: NAME_FORMAT_PATTERN,
                  message: "Invalid middle name format.",
                },
              })}
              disabled={hasEmploymentId}
            />
            {errors.middleName && (
              <p className="validation">Middle name is required.</p>
            )}
          </div>

          <div className="input-group-personal">
            <label>Last Name</label>
            <input
              defaultValue={user?.lastName}
              {...register("lastName", {
                required: "Last name is required.",
                maxLength: {
                  value: 30,
                  message: "Last name should not exceed 30 characters.",
                },
                minLength: {
                  value: 2,
                  message: "Last name should be at least 2 characters.",
                },
                pattern: {
                  value: NAME_FORMAT_PATTERN,
                  message: "Invalid last name format.",
                },
              })}
              disabled={hasEmploymentId}
            />
            {errors.lastName && (
              <p className="validation">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="input-group-row">
          <div className="input-group-personal">
            <label>Contact Phone</label>
            <Controller
              name="contactPhone"
              control={control}
              defaultValue={user?.contactPhone || ""}
              render={({ field }) => (
                <input
                  {...field}
                  className={`pr-10 ${hasEmploymentId ? "" : "pl-10"}`}
                  placeholder="Enter phone number"
                />
              )}
            />
            {errors.contactPhone && (
              <p className="validation">{errors.contactPhone.message}</p>
            )}
          </div>

          <div className="input-group-personal">
            <label>Email</label>
            <input
              defaultValue={user?.contactEmail}
              {...register("contactEmail", {
                maxLength: {
                  value: 256,
                  message: "Email should not exceed 256 characters.",
                },
              })}
            />
            {errors.contactEmail && (
              <p className="validation">{errors.contactEmail.message} </p>
            )}
          </div>
        </div>

        <div className="input-group-single">
          <div className="input-group-full">
            <label>Birth Date</label>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]} // set max date to today
              disabled={hasEmploymentId}
              {...register("birthdate", {
                required: "Birthdate is required.",
                validate: (value) => {
                  const selectedDate = new Date(value + "T00:00:00"); // Convert input value to date with local time
                  const today = new Date(); // Get today's date
                  const oneHundredFiftyYearsAgo = new Date();
                  oneHundredFiftyYearsAgo.setFullYear(
                    today.getFullYear() - 150,
                  ); // Set date to 150 years ago

                  if (selectedDate > today) {
                    return "Birthdate cannot be in the future.";
                  } else if (selectedDate < oneHundredFiftyYearsAgo) {
                    return "Birthdate cannot be more than 150 years in the past.";
                  }

                  return true;
                },
              })}
            />
            {errors.birthdate && (
              <p className="validation">{errors.birthdate.message} </p>
            )}
          </div>
        </div>

        <div className="input-group-row">
          <div className="input-group-half">
            <label>SSN</label>
            <div className="relative">
              <Controller
                name="ssn"
                control={control}
                defaultValue={user?.ssn || ""}
                rules={{
                  required: "Social Security number is required.",
                  pattern: {
                    value: /^\d{9}$/,
                    message:
                      "Invalid Social Security number. It should be exactly 9 digits.",
                  },
                }}
                render={({ field }) =>
                  !hasEmploymentId ? (
                    <input
                      {...field}
                      disabled={hasEmploymentId}
                      className={`pr-10 ${hasEmploymentId ? "" : "pl-10"}`}
                      placeholder="Enter SSN"
                      value={
                        hasEmploymentId && !showSSN
                          ? "*********"
                          : formatSSN(field.value)
                      }
                      onChange={(e) => {
                        const formatted = formatSSN(e.target.value);
                        field.onChange(formatted.replace(/-/g, ""));
                      }}
                    />
                  ) : (
                    <input
                      {...field}
                      disabled={hasEmploymentId}
                      className={`pr-10 ${hasEmploymentId ? "" : "pl-10"}`}
                      value={
                        hasEmploymentId
                          ? showSSN
                            ? formatSSN(field.value)
                            : "*********"
                          : formatSSN(field.value)
                      }
                      onChange={(e) => {
                        const formatted = formatSSN(e.target.value);
                        field.onChange(formatted.replace(/-/g, ""));
                      }}
                    />
                  )
                }
              />
              {errors.ssn && <p className="validation">{errors.ssn.message}</p>}
              {hasEmploymentId && (
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowSSN(!showSSN)}>
                  {showSSN ? (
                    <EyeSlashIcon
                      className="text-blue-500"
                      height="24"
                      width="24"
                    />
                  ) : (
                    <EyeIcon className="text-blue-500" height="24" width="24" />
                  )}
                </div>
              )}
            </div>
            {errors.ssn1 && (
              <p className="validation">Social Security number is required.</p>
            )}
          </div>

          {!hasEmploymentId && (
            <div className="input-group-half">
              <label>Confirm SSN</label>
              <Controller
                name="ssn2"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) =>
                    value === ssnValue ||
                    "The two Social Security numbers do not match.",
                  pattern: {
                    value: /^\d{9}$/,
                    message:
                      "Invalid Social Security number. It should be exactly 9 digits.",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Confirm SSN"
                    value={formatSSN(field.value)}
                    onChange={(e) => {
                      const formatted = formatSSN(e.target.value);
                      field.onChange(formatted.replace(/-/g, ""));
                    }}
                  />
                )}
              />
              {errors.ssn2 && (
                <p className="validation">{errors.ssn2.message}</p>
              )}
            </div>
          )}
          {validationErrors && (
            <div style={{ marginTop: "5em", width: "100%" }}>
              <ValidationErrors />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

PersonalInfo.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object,
  setValue: PropTypes.func,
};

export default PersonalInfo;
