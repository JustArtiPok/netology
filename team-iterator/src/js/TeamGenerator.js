export default class TeamGenerator {
  constructor() {
    this.members = [];
  }

  add(character) {
    this.members.push(character);
    return this;
  }

  * [Symbol.iterator]() {
    for (const member of this.members) {
      yield member;
    }
  }
}