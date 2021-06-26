type WatchKey = string

type ARef = {
  oldState: any
  state: any
  meta?: any
  watchersList?: Map<WatchKey, Function>
}

type WatchFunc = {
  (
    ref: ARef,
    key: WatchKey,
    oldState: unknown,
    newState: unknown
  ): void
}

const emptyMap = new Map()

const atom = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any
): ARef => ({
  oldState: undefined,
  state: initialState,
  meta
})

function execWatchFunc(
  this: ARef,
  func: WatchFunc,
  key: WatchKey
): void {
  const { oldState, state: newState } = this

  func(this, key, oldState, newState)
}

const notifyWatchers = (ref: ARef): void => {
  const { watchersList = emptyMap } = ref

  watchersList.forEach(execWatchFunc, ref)
}

const swap = <T, Arg>(
  ref: ARef,
  reducer: { (state: T, arg: Arg): T },
  arg: Arg
): T => {
  const r = ref
  const { state } = r
  const nextState = reducer(state, arg)

  r.oldState = state
  r.state = nextState
  notifyWatchers(r)

  return nextState
}

const read = <T>(ref: ARef): T => ref.state

const meta = (ref: ARef): unknown => ref.meta

const addWatch = (
  ref: ARef,
  key: WatchKey,
  func: WatchFunc
): WatchKey => {
  const r = ref

  r.watchersList = r.watchersList || new Map()
  r.watchersList.set(key, func)

  return key
}

const removeWatch = (
  ref: ARef,
  key: WatchKey
  // whether a watcher was removed
): boolean => {
  const { watchersList } = ref

  if (watchersList) {
    return watchersList.delete(key)
  }

  return false
}

export { atom, swap, read, meta, addWatch, removeWatch }
