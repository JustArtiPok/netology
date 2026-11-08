export default class Team {
  constructor() {
    this.members = [];
  }

  add(character) {
    this.members.push(character);
    return this;
  }

  [Symbol.iterator]() {
    let index = 0;
    const { members } = this;

    return {
      next() {
        if (index < members.length) {
          const value = members[index];
          index += 1;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}