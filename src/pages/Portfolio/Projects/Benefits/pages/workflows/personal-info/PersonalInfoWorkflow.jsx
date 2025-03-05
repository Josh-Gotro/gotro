import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import SOAButton from "@/components/buttons/SOAButton";
import PersonalInfo from "@/components/steps/PersonalInfo";
import { useValidationErrors } from "@/config/ErrorContext";

import { SubscriberContext } from "../../../config/SubscriberContext";

import "./personal-info.scss";

const PersonalInfoWorkflow = () => {
  const { user, setUser } = useContext(SubscriberContext);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const navigate = useNavigate();
  const { setValidationErrors } = useValidationErrors();

  useEffect(() => {
    if (user) {
      setIsUserDataLoaded(true);
    }
  }, [user]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const handlecancel = () => {
    setValidationErrors(null);
    navigate("/");
  };

  const handleUserFormSubmit = async (data) => {
    if (isUserDataLoaded) {
      try {
        if (data.birthdate) {
          const date = new Date(data.birthdate + "T00:00:00");
          const formattedDate = `${
            date.getMonth() + 1 < 10 ? "0" : ""
          }${date.getMonth() + 1}/${
            date.getDate() < 10 ? "0" : ""
          }${date.getDate()}/${date.getFullYear()}`;
          data.birthdate = formattedDate;
        }
        await setUser(data);
        setValidationErrors(null);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="step-container">
      <div>
        <PersonalInfo
          control={control}
          errors={errors}
          onSubmit={handleSubmit(handleUserFormSubmit)}
          register={register}
          user={user}
          setValue={setValue}
          watch={watch}
        />
      </div>

      <div className="button-group">
        <SOAButton
          lg
          onClick={handlecancel}
          secondary
          text="Cancel"
          width="200px"
        />
        <SOAButton
          lg
          onClick={handleSubmit(handleUserFormSubmit)}
          primary
          text="Submit"
          width="200px"
        />
      </div>
    </div>
  );
};

export default PersonalInfoWorkflow;
