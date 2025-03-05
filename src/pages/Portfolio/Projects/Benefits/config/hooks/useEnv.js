import { useContext } from "react";

import { EnvironmentContext } from "../EnvironmentContext";

function useEnv() {
  const ctx = useContext(EnvironmentContext);
  if (ctx === null) {
    throw new Error("useEnv must be used within an EnvironmentContext");
  }

  const { envName } = ctx.ENVIRONMENT;

  const isDev =
    envName.toLowerCase() === "local" || envName.toLowerCase() === "dev";
  const isProd = envName.toLowerCase() === "prod";

  return {
    isDev,
    isProd,
  };
}

export default useEnv;
