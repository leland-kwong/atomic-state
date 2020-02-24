/* eslint-disable @typescript-eslint/no-explicit-any */
var emptyMap = new Map();
var atom = function (initialState, meta) {
    return ({
        oldState: undefined,
        state: initialState,
        meta: meta,
    });
};
function execWatchFunc(func, key) {
    var _a = this, oldState = _a.oldState, newState = _a.state;
    func(this, key, oldState, newState);
}
var notifyWatchers = function (ref) {
    var _a = ref.watchersList, watchersList = _a === void 0 ? emptyMap : _a;
    watchersList.forEach(execWatchFunc, ref);
};
var swap = function (ref, reducer, arg) {
    var r = ref;
    var state = r.state;
    var nextState = reducer(state, arg);
    r.oldState = state;
    r.state = nextState;
    notifyWatchers(r);
    return nextState;
};
var read = function (ref) {
    return ref.state;
};
var meta = function (ref) {
    return ref.meta;
};
var addWatch = function (ref, key, func) {
    if (!ref.watchersList) {
        var r = ref;
        r.watchersList = new Map();
    }
    ref.watchersList.set(key, func);
    return key;
};
var removeWatch = function (ref, key) {
    var watchersList = ref.watchersList;
    if (watchersList) {
        return watchersList.delete(key);
    }
    return false;
};
export { atom, swap, read, meta, addWatch, removeWatch, };
