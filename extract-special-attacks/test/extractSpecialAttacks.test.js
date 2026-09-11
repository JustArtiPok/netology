import extractSpecialAttacks from '../src/extractSpecialAttacks';

test('Извлекает атаки с полными данными', () => {
  const character = {
    name: 'Лучник',
    type: 'Bowman',
    health: 50,
    level: 3,
    attack: 40,
    defence: 10,
    special: [
      {
        id: 8,
        name: 'Двойной выстрел',
        icon: 'http://...',
        description: 'Двойной выстрел наносит двойной урон',
      },
      {
        id: 9,
        name: 'Нокаутирующий удар',
        icon: 'http://...',
      },
    ],
  };

  const expected = [
    {
      id: 8,
      name: 'Двойной выстрел',
      icon: 'http://...',
      description: 'Двойной выстрел наносит двойной урон',
    },
    {
      id: 9,
      name: 'Нокаутирующий удар',
      icon: 'http://...',
      description: 'Описание недоступно',
    },
  ];

  expect(extractSpecialAttacks(character)).toEqual(expected);
});

test('Возвращает пустой массив, если нет поля special', () => {
  const character = { name: 'Лучник' };
  expect(extractSpecialAttacks(character)).toEqual([]);
});

test('Возвращает пустой массив, если special не массив', () => {
  const character = { special: 'не массив' };
  expect(extractSpecialAttacks(character)).toEqual([]);
});

test('Возвращает пустой массив для пустого special', () => {
  const character = { special: [] };
  expect(extractSpecialAttacks(character)).toEqual([]);
});

test('Извлекает все атаки, если все описания указаны', () => {
  const character = {
    special: [
      { id: 1, name: 'a', icon: 'i1', description: 'desc1' },
      { id: 2, name: 'b', icon: 'i2', description: 'desc2' },
    ],
  };
  const expected = [
    { id: 1, name: 'a', icon: 'i1', description: 'desc1' },
    { id: 2, name: 'b', icon: 'i2', description: 'desc2' },
  ];
  expect(extractSpecialAttacks(character)).toEqual(expected);
});