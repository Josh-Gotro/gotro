import React, { useReducer, useState } from "react";

import {
  render,
  screen,
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import useShowFullPageLoad, {
  LoadingProvider,
  exportedForTesting,
} from "./LoadingProvider";

const { LoadingReducer } = exportedForTesting;

const TestComponent = () => {
  const [loading, setLoading] = useState(false);
  useShowFullPageLoad(loading);
  return (
    <>
      <button onClick={() => setLoading(true)} type="button">
        start
      </button>
      <button onClick={() => setLoading(false)} type="button">
        stop
      </button>
    </>
  );
};

describe("Loading Spinner Tests", () => {
  test("Spinner doesn't show by default", () => {
    render(
      <LoadingProvider hideDelay={0}>
        <TestComponent />
      </LoadingProvider>,
    );
    expect(screen.queryByRole("progressbar")).toBeFalsy();
  });

  test("Spinner shows when calling function", async () => {
    render(
      <LoadingProvider hideDelay={0}>
        <TestComponent />
      </LoadingProvider>,
    );

    act(() => userEvent.click(screen.getByText("start")));
    await waitFor(() => expect(screen.getByRole("progressbar")).toBeTruthy());
  });

  test("Spinner shows when loading and hides when not loading", async () => {
    render(
      <LoadingProvider hideDelay={0}>
        <TestComponent />
      </LoadingProvider>,
    );

    act(() => userEvent.click(screen.getByText("start")));
    await waitFor(() => expect(screen.getByRole("progressbar")).toBeTruthy());
    act(() => userEvent.click(screen.getByText("stop")));
    await waitFor(() => expect(screen.queryByRole("progressbar")).toBeFalsy());
  });
});

describe("Loading State Tests", () => {
  // Testing reducer in isolation because tests "rerender"
  // the components frequently and the LoadingProvider looses its state
  test('"start" increments count and sets loading', () => {
    const { result } = renderHook(() =>
      useReducer(LoadingReducer, {
        isLoading: false,
        activeRequestCount: 0,
      }),
    );
    act(() => {
      const [, dispatch] = result.current;
      dispatch("start");
    });
    const [state] = result.current;
    expect(state).toEqual({
      isLoading: true,
      activeRequestCount: 1,
    });
  });
  test('"start" increments count and keeps loading', () => {
    const { result } = renderHook(() =>
      useReducer(LoadingReducer, {
        isLoading: true,
        activeRequestCount: 3,
      }),
    );
    act(() => {
      const [, dispatch] = result.current;
      dispatch("start");
    });
    const [state] = result.current;
    expect(state).toEqual({
      isLoading: true,
      activeRequestCount: 4,
    });
  });
  test('"stop" decrements count and stops loading', () => {
    const { result } = renderHook(() =>
      useReducer(LoadingReducer, {
        isLoading: true,
        activeRequestCount: 1,
      }),
    );
    act(() => {
      const [, dispatch] = result.current;
      dispatch("stop");
    });
    const [state] = result.current;
    expect(state).toEqual({
      isLoading: false,
      activeRequestCount: 0,
    });
  });
  test('"stop" decrements count and keeps loading', () => {
    const { result } = renderHook(() =>
      useReducer(LoadingReducer, {
        isLoading: true,
        activeRequestCount: 2,
      }),
    );
    act(() => {
      const [, dispatch] = result.current;
      dispatch("stop");
    });
    const [state] = result.current;
    expect(state).toEqual({
      isLoading: true,
      activeRequestCount: 1,
    });
  });
  test('"stop" does nothing with initial state', () => {
    const { result } = renderHook(() =>
      useReducer(LoadingReducer, {
        isLoading: false,
        activeRequestCount: 0,
      }),
    );
    act(() => {
      const [, dispatch] = result.current;
      dispatch("stop");
    });
    const [state] = result.current;
    expect(state).toEqual({
      isLoading: false,
      activeRequestCount: 0,
    });
  });
});
