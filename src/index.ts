type WatchKey = string

type ARef<S = unknown, M = unknown> = {
  oldState: S
  state: S
  meta?: M
  watchersList?: Map<WatchKey, Function>
}

type WatchFunc<Ref extends ARef<any>> = {
  (
    ref: Ref,
    key: WatchKey,
    oldState: Ref['oldState'],
    newState: Ref['state']
  ): void
}

const emptyMap = new Map()

const atom = <S, M>(
  initialState: S,
  meta?: M
): ARef<S, M> => ({
  oldState: undefined,
  state: initialState,
  meta
})

function execWatchFunc(
  this: ARef<any>,
  func: WatchFunc<typeof this>,
  key: WatchKey
): void {
  const { oldState, state: newState } = this

  func(this, key, oldState, newState)
}

const notifyWatchers = <Ref extends ARef>(
  ref: Ref
): void => {
  const { watchersList = emptyMap } = ref

  watchersList.forEach(execWatchFunc, ref)
}

const swap = <Ref extends ARef, Arg>(
  ref: Ref,
  reducer: {
    (state: Ref['state'], arg: Arg): Ref['state']
  },
  arg: Arg
): Ref['state'] => {
  const r = ref
  const { state } = r
  const nextState = reducer(state, arg)

  r.oldState = state
  r.state = nextState
  notifyWatchers(r)

  return nextState
}

const read = <Ref extends ARef>(ref: Ref): Ref['state'] =>
  ref.state

const meta = <Ref extends ARef>(ref: Ref): Ref['meta'] =>
  ref.meta

const addWatch = <Ref extends ARef>(
  ref: Ref,
  key: WatchKey,
  func: WatchFunc<Ref>
): WatchKey => {
  const r = ref

  r.watchersList = r.watchersList || new Map()
  r.watchersList.set(key, func)

  return key
}

const removeWatch = <Ref extends ARef>(
  ref: Ref,
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
