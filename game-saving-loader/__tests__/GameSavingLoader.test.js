import GameSavingLoader from '../src/js/GameSavingLoader';
import read from '../src/js/reader';
import json from '../src/js/parser';

jest.mock('../src/js/reader');
jest.mock('../src/js/parser');

describe('GameSavingLoader (с моками)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('load возвращает объект GameSaving', async () => {
    const buffer = new ArrayBuffer(4);
    const parsed = JSON.stringify({
      id: 9,
      created: 1546300800,
      userInfo: {
        id: 1, name: 'Hitman', level: 10, points: 2000,
      },
    });
    read.mockResolvedValue(buffer);
    json.mockResolvedValue(parsed);

    const saving = await GameSavingLoader.load();

    expect(saving.id).toBe(9);
    expect(saving.created).toBe(1546300800);
    expect(saving.userInfo).toEqual({
      id: 1, name: 'Hitman', level: 10, points: 2000,
    });
    expect(read).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledWith(buffer);
  });

  test('load пробрасывает ошибку из read', async () => {
    read.mockRejectedValue(new Error('read failed'));

    await expect(GameSavingLoader.load()).rejects.toThrow('read failed');
  });

  test('load пробрасывает ошибку из json', async () => {
    read.mockResolvedValue(new ArrayBuffer(4));
    json.mockRejectedValue(new Error('json failed'));

    await expect(GameSavingLoader.load()).rejects.toThrow('json failed');
  });
});