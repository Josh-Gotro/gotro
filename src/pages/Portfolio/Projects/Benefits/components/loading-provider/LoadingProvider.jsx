import {
  React,
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import PropTypes from "prop-types";

import Bear from "./bear.webp";

const initialState = {
  isLoading: false,
  activeRequestCount: 0,
};

const LoadingReducer = (state, action) => {
  if (action === "start") {
    return {
      isLoading: true,
      activeRequestCount: state.activeRequestCount + 1,
    };
  } else {
    if (state.activeRequestCount > 1) {
      return {
        isLoading: true,
        activeRequestCount: state.activeRequestCount - 1,
      };
    } else {
      return { isLoading: false, activeRequestCount: 0 };
    }
  }
};

const DelayedSpinner = ({ isLoading, hideDelay = 250 }) => {
  const [show, setShow] = useState(isLoading);
  useEffect(() => {
    if (isLoading) {
      setShow(isLoading);
    } else {
      if (hideDelay === 0) {
        setShow(false);
      } else {
        const timer = setTimeout(() => {
          setShow(false);
        }, hideDelay);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, hideDelay]);

  return show ? <LoadingBear /> : null;
};

export const LoadingBear = () => {
  return (
    <div className="loading-overlay">
      <div
        aria-label="Loading"
        className="spinner-container"
        role="progressbar">
        <div className="ifa-spinner">
          <img alt="Content Loading" className="top-fish" src={Bear} />
          <p>Loading</p>
        </div>
      </div>
    </div>
  );
};

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children, hideDelay = 250 }) => {
  const [{ isLoading }, dispatch] = useReducer(LoadingReducer, initialState);
  return (
    <LoadingContext.Provider value={{ dispatch }}>
      <>
        <DelayedSpinner hideDelay={hideDelay} isLoading={isLoading} />
        {children}
      </>
    </LoadingContext.Provider>
  );
};

export default function useShowFullPageLoad(isLoading) {
  const ctx = useContext(LoadingContext);
  if (ctx === null) {
    throw new Error(
      "useShowFullPageLoad must be used within the LoadingContext",
    );
  }
  const { dispatch } = ctx;
  useEffect(() => {
    dispatch(isLoading ? "start" : "stop");
    // cleanup for when hook is in a component that unmounts
    return () => {
      if (isLoading) {
        dispatch("stop");
      }
    };
  }, [isLoading, dispatch]);
}

LoadingProvider.propTypes = {
  children: PropTypes.node,
  hideDelay: PropTypes.number,
};

DelayedSpinner.propTypes = {
  isLoading: PropTypes.bool,
  hideDelay: PropTypes.number,
};

export const exportedForTesting = { LoadingReducer };
