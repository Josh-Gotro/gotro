import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  getSystemStatus,
  logout,
  STATUS_NORMAL,
} from "../api/session/sessionService";

const WARN_TIME_MINUTES = 30;
const LOGOUT_AFTER_WARN_TIME_MINUTES = 3;
const KEEP_ALIVE_CHECK_INTERVAL_MINUTES = 3;

const useSessionTracking = () => {
  // Calculate time intervals in milliseconds
  const warningTime = 1000 * 60 * WARN_TIME_MINUTES;
  const signoutTime =
    1000 * 60 * (WARN_TIME_MINUTES + LOGOUT_AFTER_WARN_TIME_MINUTES);
  const keepAliveTime = 1000 * 60 * KEEP_ALIVE_CHECK_INTERVAL_MINUTES;

  let warnTimeout = useRef(null);
  let logoutTimeout = useRef(null);
  let keepAliveInterval = useRef(null);

  const logoutFunc = useCallback(() => {
    if (keepAliveInterval.current) clearInterval(keepAliveInterval.current);
    logout();
  }, []);

  const checkStatus = useCallback(() => {
    getSystemStatus()
      .then((result) => {
        if (!result || result.systemStatusTypeId !== STATUS_NORMAL) {
          console.log("Status Result is: ", result); // eslint-disable-line no-console
          throw new Error("Abnormal system status received");
        }
      })
      .catch((err) => {
        console.error("System status check error: ", err); // eslint-disable-line no-console
        toast.warn("Your session has expired and you have been logged out.");
        setTimeout(logoutFunc, 3000);
      });
  }, [logoutFunc]);

  const warn = useCallback(() => {
    toast.warn(
      `You will be logged out automatically due to inactivity in ${LOGOUT_AFTER_WARN_TIME_MINUTES} minute${
        LOGOUT_AFTER_WARN_TIME_MINUTES !== 1 ? "s" : ""
      }`,
      {
        autoClose: LOGOUT_AFTER_WARN_TIME_MINUTES * 60 * 1000,
        closeOnClick: true,
      },
    );
  }, []);

  const clearTimeoutFunc = useCallback(() => {
    if (warnTimeout.current) clearTimeout(warnTimeout.current);
    if (logoutTimeout.current) clearTimeout(logoutTimeout.current);
  }, []);

  const startKeepAlive = useCallback(() => {
    keepAliveInterval.current = setInterval(checkStatus, keepAliveTime);
  }, [keepAliveTime, checkStatus]);

  const startTimer = useCallback(() => {
    warnTimeout.current = setTimeout(warn, warningTime);
    logoutTimeout.current = setTimeout(logoutFunc, signoutTime);
  }, [warn, logoutFunc, warningTime, signoutTime]);

  const resetTimer = useCallback(() => {
    clearTimeoutFunc();
    startTimer();
  }, [startTimer, clearTimeoutFunc]);

  useEffect(() => {
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, resetTimer);
    });

    startTimer();
    startKeepAlive();

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, resetTimer);
      });
      clearTimeoutFunc();
      if (keepAliveInterval.current) clearInterval(keepAliveInterval.current);
    };
  }, [resetTimer, startTimer, startKeepAlive, clearTimeoutFunc]);
  return null;
};

export default useSessionTracking;
