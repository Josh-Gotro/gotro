import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const EnvironmentContext = createContext(null);
export const DevUserContext = createContext(null);

export function EnvironmentProvider({ children }) {
  const env =
    process.env.NODE_ENV === "development"
      ? {
          ENVIRONMENT: {
            envName: "local",
          },
          PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL || "",
        }
      : {
          ENVIRONMENT: {
            envName: "prod",
          },
          PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL || "",
        };
  return (
    <EnvironmentContext.Provider value={env}>
      <DevUserProvider>{children}</DevUserProvider>
    </EnvironmentContext.Provider>
  );
}

function DevUserProvider({ children }) {
  const ctx = useContext(EnvironmentContext);
  if (ctx === null) {
    throw new Error("useEnv must be used within an EnvironmentContext");
  }
  let devUser = "isaac.asimov";
  if (ctx.ENVIRONMENT.envName.toLowerCase() !== "prod") {
    const lastUser = sessionStorage.getItem("dev-user");
    if (lastUser) {
      devUser = lastUser;
    }
  }
  const [devUsername, setDevUsername] = useState(devUser);

  const setDevUser = (username) => {
    sessionStorage.setItem("dev-user", username);
    setDevUsername(username);
  };

  return (
    <DevUserContext.Provider value={{ devUsername, setDevUser }}>
      {children}
    </DevUserContext.Provider>
  );
}

export function useEnvContext() {
  const ctx = useContext(EnvironmentContext);
  if (ctx === null) {
    throw new Error("useEnvContext must be used within an EnvironmentContext");
  }
  return ctx;
}

export function useDevUserContext() {
  const ctx = useContext(DevUserContext);
  if (ctx === null) {
    throw new Error("useDevUserContext must be used within an DevUserContext");
  }
  return ctx;
}

EnvironmentProvider.propTypes = {
  children: PropTypes.node,
};

DevUserProvider.propTypes = {
  children: PropTypes.node,
};
