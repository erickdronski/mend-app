import { describe, expect, it, vi } from "vitest";
import { createAppLockController } from "../src/lib/app-lock-controller";

function setup(enabled = false) {
  const readEnabled = vi.fn().mockResolvedValue(enabled);
  const authenticate = vi.fn().mockResolvedValue(false);
  const onState = vi.fn();
  const lock = createAppLockController({ readEnabled, authenticate, onState });
  return { readEnabled, authenticate, onState, lock, state: () => onState.mock.lastCall?.[0] };
}

describe("app privacy lock", () => {
  it("applies a setting enabled during this app session", async () => {
    const f = setup(); await f.lock.refresh();
    expect(f.state()).toEqual({ enabled: false, locked: false });
    f.readEnabled.mockResolvedValue(true);
    await f.lock.refresh();
    expect(f.state()).toEqual({ enabled: true, locked: true });
    expect(f.authenticate).toHaveBeenCalledOnce();
  });

  it("covers the app on background and requires authentication again", async () => {
    const f = setup(true); f.authenticate.mockResolvedValue(true);
    await f.lock.refresh();
    expect(f.state().locked).toBe(false);
    f.lock.onAppState("background");
    expect(f.state().locked).toBe(true);
    f.authenticate.mockResolvedValue(false);
    f.lock.onAppState("active");
    await f.lock.refresh();
    expect(f.state().locked).toBe(true);
  });

  it("does not accept a prompt result from before backgrounding", async () => {
    const f = setup(true);
    let resolve!: (passed: boolean) => void;
    f.authenticate.mockImplementation(() => new Promise<boolean>(r => { resolve = r; }));
    const refresh = f.lock.refresh();
    await vi.waitFor(() => expect(f.authenticate).toHaveBeenCalledOnce());
    f.lock.onAppState("background");
    resolve(true); await refresh;
    expect(f.state().locked).toBe(true);
  });

  it("keeps retry available after a native authentication error", async () => {
    const f = setup(true); f.authenticate.mockRejectedValueOnce(new Error("Native failure"));
    await f.lock.refresh(); expect(f.state().locked).toBe(true);
    f.authenticate.mockResolvedValue(true); await f.lock.unlock();
    expect(f.state().locked).toBe(false);
  });

  it("removes the overlay when the setting is disabled", async () => {
    const f = setup(true); await f.lock.refresh();
    f.readEnabled.mockResolvedValue(false); await f.lock.refresh();
    expect(f.state()).toEqual({ enabled: false, locked: false });
  });

  it("does not publish native prompt completion after unmount", async () => {
    const f = setup(true);
    let resolve!: (passed: boolean) => void;
    f.authenticate.mockImplementation(() => new Promise<boolean>(r => { resolve = r; }));
    const refresh = f.lock.refresh();
    await vi.waitFor(() => expect(f.authenticate).toHaveBeenCalledOnce());
    f.lock.dispose(); const calls = f.onState.mock.calls.length;
    resolve(true); await refresh;
    expect(f.onState).toHaveBeenCalledTimes(calls);
  });
  it("accepts prompt-induced inactivity without repeatedly prompting", async () => {
    const f = setup(true);
    let resolve!: (passed: boolean) => void;
    f.authenticate.mockImplementation(() => new Promise<boolean>(r => { resolve = r; }));
    const refresh = f.lock.refresh();
    await vi.waitFor(() => expect(f.authenticate).toHaveBeenCalledOnce());
    f.lock.onAppState("inactive");
    resolve(true); await refresh;
    expect(f.state().locked).toBe(false);
    f.lock.onAppState("active"); await f.lock.refresh();
    expect(f.authenticate).toHaveBeenCalledOnce();
  });

});
