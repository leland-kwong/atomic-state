declare type ARef = {
    oldState: unknown;
    state: unknown;
    meta?: unknown;
    watchersList?: Map<unknown, Function>;
};
declare type WatchFunc = {
    (ref: ARef, key: unknown, oldState: unknown, newState: unknown): void;
};
declare const atom: (initialState: any, meta?: any) => ARef;
declare const swap: <T, Arg>(ref: ARef, reducer: (state: unknown, arg: Arg) => T, arg: Arg) => T;
declare const read: (ref: ARef) => unknown;
declare const meta: (ref: ARef) => unknown;
declare const addWatch: <Key>(ref: ARef, key: Key, func: WatchFunc) => Key;
declare const removeWatch: <Key>(ref: ARef, key: Key) => boolean;
export { atom, swap, read, meta, addWatch, removeWatch, };
