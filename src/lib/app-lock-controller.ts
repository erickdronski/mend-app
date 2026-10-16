export type AppLockState = { enabled: boolean | null; locked: boolean };

/** Lifecycle logic kept separate so background/authentication races are testable. */
export function createAppLockController(deps: {
  readEnabled: () => Promise<boolean>;
  authenticate: () => Promise<boolean>;
  onState: (state: AppLockState) => void;
}) {
  let state: AppLockState = { enabled: null, locked: true };
  let appState = "active";
  let readRevision = 0;
  let lockCycle = 0;
  let prompting = false;
  let disposed = false;
  const isBackground = () => appState === "background";
  const publish = (next: AppLockState) => {
    state = next;
    if (!disposed) deps.onState(next);
  };

  async function unlock() {
    if (disposed || prompting || !state.enabled || appState !== "active") return;
    prompting = true;
    const cycle = lockCycle;
    try {
      const passed = await deps.authenticate();
      if (passed && !disposed && !isBackground() && cycle === lockCycle) {
        publish({ ...state, locked: false });
      }
    } catch {
      // A failed native prompt must leave the overlay and retry button usable.
    } finally { prompting = false; }
  }

  async function refresh() {
    const revision = ++readRevision;
    let enabled: boolean;
    try { enabled = await deps.readEnabled(); }
    catch {
      if (revision === readRevision) publish({ enabled: true, locked: true });
      return;
    }
    if (disposed || revision !== readRevision) return;
    if (enabled !== state.enabled) lockCycle += 1;
    publish({ enabled, locked: enabled ? (state.enabled !== true || state.locked) : false });
    if (enabled && state.locked && appState === "active") await unlock();
  }

  function onAppState(next: string) {
    appState = next;
    if (next === "background") {
      lockCycle += 1;
      if (state.enabled) publish({ ...state, locked: true });
    }
    void refresh();
  }

  return {
    refresh, unlock, onAppState,
    dispose() { disposed = true; readRevision += 1; lockCycle += 1; },
  };
}
