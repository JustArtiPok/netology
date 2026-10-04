import Validator from '../src/js/Validator';

describe('Validator', () => {
  const validator = new Validator();

  test.each([
    ['John', true],
    ['J', true],
    ['Jo', true],
    ['John_Doe', true],
    ['John-Doe', true],
    ['J0hn', true],
    ['User_123-abc', true],
    ['Abc123Def', true],
    ['A1b2C3d', true],
  ])('должен принимать username %s', (username, expected) => {
    expect(validator.validateUsername(username)).toBe(expected);
  });

  test.each([
    ['', false],
    ['1John', false],
    ['_John', false],
    ['-John', false],
    ['John1', false],
    ['John_', false],
    ['John-', false],
    ['John123', false],
    ['A1b2C3', false],
    ['John  Doe', false],
    ['John@Doe', false],
    ['Jöhn', false],
    ['John1234', false],
    ['abc1234def', false],
    [null, false],
    [undefined, false],
    [123, false],
  ])('должен отклонять username %s', (username, expected) => {
    expect(validator.validateUsername(username)).toBe(expected);
  });
});