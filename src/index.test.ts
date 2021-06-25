import {
  atom,
  swap,
  meta,
  read,
  addWatch,
  removeWatch,
} from '.';

const add = (
  x: number,
  y: number,
): number =>
  x + y;

describe('atom', () => {
  test('swap', () => {
    const count$ = atom(0);
    const newState = swap(count$, add, 1);

    expect(
      newState,
    ).toBe(1);
  });

  test('meta', () => {
    const countMeta = {
      label: 'count$',
    };
    const count$ = atom(0, countMeta);

    expect(
      meta(count$),
    ).toBe(countMeta);
  });

  test('read', () => {
    const count$ = atom(0);

    expect(
      read(count$),
    ).toBe(0);
  });

  describe('watch', () => {
    const countMeta = {
      label: 'count$',
    };
    const count$ = atom(0, countMeta);
    const watchKey = '@countWatch';

    test('addWatch', () => {
      const fn = jest.fn();

      addWatch(count$, watchKey, fn);
      swap(count$, add, 1);
      expect(fn.mock.calls).toEqual([
        [count$, watchKey, 0, 1],
      ]);
    });

    test('removeWatch', () => {
      const fn = jest.fn();

      addWatch(count$, watchKey, fn);
      removeWatch(count$, watchKey);
      swap(count$, add, 1);
      expect(fn.mock.calls.length)
        .toBe(0);
    });
  });
});
