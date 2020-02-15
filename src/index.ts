/* eslint-disable @typescript-eslint/no-explicit-any */

type F = Function;

type ARef = {
  oldState: unknown;
  state: unknown;
  meta?: unknown;
  watchersList?: Map<unknown, Function>;
};

type WatchFunc = {(
  ref: ARef,
  key: unknown,
  oldState: unknown,
  newState: unknown
): void;};

const emptyMap = new Map();

const atom = (
  initialState: any,
  meta?: any,
): ARef =>
  ({
    oldState: undefined,
    state: initialState,
    meta,
  });

function execWatchFunc(
  this: ARef,
  func: WatchFunc,
  key: unknown,
): void {
  const {
    oldState,
    state: newState,
  } = this;

  func(this, key, oldState, newState);
}

const notifyWatchers = (ref: ARef): void => {
  const { watchersList = emptyMap } = ref;
  watchersList.forEach(execWatchFunc, ref);
};

const swap = <T, Arg>(
  ref: ARef,
  reducer: {(state: unknown, arg: Arg): T},
  arg: Arg,
): T => {
  const r = ref;
  const { state } = r;
  const nextState = reducer(state, arg);

  r.oldState = state;
  r.state = nextState;
  notifyWatchers(r);

  return nextState;
};

const read = (ref: ARef): unknown =>
  ref.state;

const meta = (ref: ARef): unknown =>
  ref.meta;

const addWatch = <Key>(
  ref: ARef,
  key: Key,
  func: WatchFunc,
): Key => {
  if (!ref.watchersList) {
    const r = ref;
    r.watchersList = new Map();
  }

  ref.watchersList.set(key, func);

  return key;
};

const removeWatch = <Key>(
  ref: ARef,
  key: Key,
  // whether a watcher was removed
): boolean => {
  const { watchersList } = ref;
  if (watchersList) {
    return watchersList.delete(key);
  }
  return false;
};

export {
  atom,
  swap,
  read,
  meta,
  addWatch,
  removeWatch,
};
