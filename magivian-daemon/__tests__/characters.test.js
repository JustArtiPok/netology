import Magician from '../src/js/Magician';
import Daemon from '../src/js/Daemon';

describe('Character (via Magician / Daemon)', () => {
  test('конструктор сохраняет имя и базовую атаку', () => {
    const m = new Magician('Merlin', 100);
    expect(m.name).toBe('Merlin');
    expect(m.baseAttack).toBe(100);
  });

  test('stoned по умолчанию false', () => {
    const m = new Magician('Merlin', 100);
    expect(m.stoned).toBe(false);
  });

  test('set stoned устанавливает флаг', () => {
    const m = new Magician('Merlin', 100);
    m.stoned = true;
    expect(m.stoned).toBe(true);
    m.stoned = false;
    expect(m.stoned).toBe(false);
  });

  test.each([
    [1, 100],
    [2, 90],
    [3, 80],
    [4, 70],
    [5, 60],
  ])('attack без дурмана на %i клетке равен %i', (distance, expected) => {
    const m = new Magician('Merlin', 100);
    m.attack = distance;
    expect(m.attack).toBe(expected);
  });

  test('attack без дурмана на расстоянии > 10 не уходит в минус', () => {
    const m = new Magician('Merlin', 100);
    m.attack = 20;
    expect(m.attack).toBe(0);
  });

  test('attack с дурманом на 1 клетке: 100 - log2(1)*5 = 100', () => {
    const m = new Magician('Merlin', 100);
    m.attack = 1;
    m.stoned = true;
    expect(m.attack).toBe(100);
  });

  test('attack с дурманом на 2 клетке: 90 - log2(2)*5 = 85', () => {
    const m = new Magician('Merlin', 100);
    m.attack = 2;
    m.stoned = true;
    expect(m.attack).toBe(85);
  });

  test('attack с дурманом на 4 клетке: 70 - log2(4)*5 = 60', () => {
    const m = new Magician('Merlin', 100);
    m.attack = 4;
    m.stoned = true;
    expect(m.attack).toBe(60);
  });

  test('attack с дурманом на 5 клетке округляется', () => {
    const m = new Magician('Merlin', 100);
    m.attack = 5;
    m.stoned = true;
    // 60 - log2(5)*5 ≈ 60 - 11.61 = 48.39 → 48
    expect(m.attack).toBe(48);
  });

  test('Daemon работает по той же логике', () => {
    const d = new Daemon('Azazel', 100);
    d.attack = 2;
    expect(d.attack).toBe(90);
    d.stoned = true;
    expect(d.attack).toBe(85);
  });

  test('смена stoned после установки attack пересчитывает результат', () => {
    const m = new Magician('Merlin', 100);
    m.attack = 2;
    expect(m.attack).toBe(90);
    m.stoned = true;
    expect(m.attack).toBe(85);
    m.stoned = false;
    expect(m.attack).toBe(90);
  });
});