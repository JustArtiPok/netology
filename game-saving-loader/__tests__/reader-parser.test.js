import read from '../src/js/reader';
import json from '../src/js/parser';
import GameSavingLoader from '../src/js/GameSavingLoader';

describe('reader + parser (реальные реализации)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('read возвращает ArrayBuffer', async () => {
    const promise = read();
    await jest.runAllTimersAsync();
    const buffer = await promise;
    expect(buffer).toBeInstanceOf(ArrayBuffer);
    expect(buffer.byteLength).toBeGreaterThan(0);
  });

  test('json переводит ArrayBuffer в строку', async () => {
    const input = '{"test":1}';
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new Uint16Array(buffer);
    for (let i = 0; i < input.length; i += 1) {
      view[i] = input.charCodeAt(i);
    }

    const promise = json(buffer);
    await jest.runAllTimersAsync();
    expect(await promise).toBe(input);
  });

  test('полная цепочка load с реальными read/parser', async () => {
    const promise = GameSavingLoader.load();
    await jest.runAllTimersAsync();
    const saving = await promise;

    expect(saving).toEqual({
      id: 9,
      created: 1546300800,
      userInfo: {
        id: 1, name: 'Hitman', level: 10, points: 2000,
      },
    });
  });
});