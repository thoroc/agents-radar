import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not call fn immediately", () => {
    const fn = vi.fn();
    const wrapped = debounce(fn, 100);
    wrapped();
    expect(fn).not.toHaveBeenCalled();
  });

  it("calls fn after delay", () => {
    const fn = vi.fn();
    const wrapped = debounce(fn, 100);
    wrapped();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("resets timer on repeated calls", () => {
    const fn = vi.fn();
    const wrapped = debounce(fn, 100);
    wrapped();
    vi.advanceTimersByTime(50);
    wrapped();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("passes arguments through", () => {
    const fn = vi.fn();
    const wrapped = debounce(fn, 100);
    wrapped("a", "b");
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith("a", "b");
  });
});
