import React, { createContext, useState, useContext } from "react";

export const ValidationErrorContext = createContext();

export function ValidationErrorProvider({ children }) {
  const [validationErrors, setValidationErrors] = useState(null);

  return (
    <ValidationErrorContext.Provider
      value={{ validationErrors, setValidationErrors }}>
      {children}
    </ValidationErrorContext.Provider>
  );
}

export function useValidationErrors() {
  return useContext(ValidationErrorContext);
}
