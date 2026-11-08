import ArrayBufferConverter from '../src/js/ArrayBufferConverter';
import getBuffer from '../src/js/getBuffer';

describe('ArrayBufferConverter', () => {
  test('load сохраняет буфер', () => {
    const converter = new ArrayBufferConverter();
    const buffer = getBuffer();
    converter.load(buffer);
    expect(converter.buffer).toBe(buffer);
  });

  test('toString возвращает пустую строку, если буфер не загружен', () => {
    const converter = new ArrayBufferConverter();
    expect(converter.toString()).toBe('');
  });

  test('toString переводит ArrayBuffer в строку', () => {
    const converter = new ArrayBufferConverter();
    converter.load(getBuffer());
    const expected =
      '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
    expect(converter.toString()).toBe(expected);
  });

  test('toString корректно работает с произвольной строкой', () => {
    const input = 'Hello, world!';
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new Uint16Array(buffer);
    for (let i = 0; i < input.length; i += 1) {
      view[i] = input.charCodeAt(i);
    }

    const converter = new ArrayBufferConverter();
    converter.load(buffer);
    expect(converter.toString()).toBe(input);
  });

  test('toString можно вызывать повторно', () => {
    const converter = new ArrayBufferConverter();
    converter.load(getBuffer());
    const first = converter.toString();
    const second = converter.toString();
    expect(first).toBe(second);
  });

  test('load можно вызвать несколько раз', () => {
    const converter = new ArrayBufferConverter();

    const buf1 = (() => {
      const s = 'abc';
      const b = new ArrayBuffer(s.length * 2);
      const v = new Uint16Array(b);
      for (let i = 0; i < s.length; i += 1) v[i] = s.charCodeAt(i);
      return b;
    })();

    const buf2 = (() => {
      const s = 'xyz';
      const b = new ArrayBuffer(s.length * 2);
      const v = new Uint16Array(b);
      for (let i = 0; i < s.length; i += 1) v[i] = s.charCodeAt(i);
      return b;
    })();

    converter.load(buf1);
    expect(converter.toString()).toBe('abc');
    converter.load(buf2);
    expect(converter.toString()).toBe('xyz');
  });
});