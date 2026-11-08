export default class Character {
  constructor(name, baseAttack) {
    this.name = name;
    this.baseAttack = baseAttack;
    this._distance = 1;
    this._stoned = false;
  }

  get stoned() {
    return this._stoned;
  }

  set stoned(value) {
    this._stoned = value;
  }

  get attack() {
    let percent = 100 - (this._distance - 1) * 10;
    if (percent < 0) {
      percent = 0;
    }

    let attack = (this.baseAttack * percent) / 100;

    if (this._stoned) {
      attack -= Math.log2(this._distance) * 5;
    }

    return Math.round(attack);
  }

  set attack(distance) {
    this._distance = distance;
  }
}