import orderByProps from '../src/orderByProps';

test('orderByProps with given order', () => {
  const obj = { name: 'мечник', health: 10, level: 2, attack: 80, defence: 40 };
  const order = ['name', 'level'];
  const expected = [
    { key: 'name', value: 'мечник' },
    { key: 'level', value: 2 },
    { key: 'attack', value: 80 },
    { key: 'defence', value: 40 },
    { key: 'health', value: 10 },
  ];
  expect(orderByProps(obj, order)).toEqual(expected);
});

test('orderByProps with empty order', () => {
  const obj = { name: 'мечник', health: 10, level: 2 };
  const order = [];
  const expected = [
    { key: 'health', value: 10 },
    { key: 'level', value: 2 },
    { key: 'name', value: 'мечник' },
  ];
  expect(orderByProps(obj, order)).toEqual(expected);
});

test('orderByProps with order containing non-existing keys', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const order = ['d', 'a'];
  const expected = [
    { key: 'a', value: 1 },
    { key: 'b', value: 2 },
    { key: 'c', value: 3 },
  ];
  expect(orderByProps(obj, order)).toEqual(expected);
});

test('orderByProps with empty object', () => {
  expect(orderByProps({}, ['a'])).toEqual([]);
});