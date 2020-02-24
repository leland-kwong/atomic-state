import { atom, swap, meta, read, addWatch, removeWatch, } from '.';
var add = function (x, y) {
    return x + y;
};
describe('atom', function () {
    test('swap', function () {
        var count = atom(0);
        var newState = swap(count, add, 1);
        expect(newState).toBe(1);
    });
    test('meta', function () {
        var countMeta = {
            label: 'count',
        };
        var count = atom(0, countMeta);
        expect(meta(count)).toBe(countMeta);
    });
    test('read', function () {
        var count = atom(0);
        expect(read(count)).toBe(0);
    });
    describe('watch', function () {
        var countMeta = {
            label: 'count',
        };
        var count = atom(0, countMeta);
        var watchKey = '@countWatch';
        test('addWatch', function () {
            var fn = jest.fn();
            addWatch(count, watchKey, fn);
            swap(count, add, 1);
            expect(fn.mock.calls).toEqual([
                [count, watchKey, 0, 1],
            ]);
        });
        test('removeWatch', function () {
            var fn = jest.fn();
            addWatch(count, watchKey, fn);
            removeWatch(count, watchKey);
            swap(count, add, 1);
            expect(fn.mock.calls.length)
                .toBe(0);
        });
    });
});
