import read from './reader';
import json from './parser';
import GameSaving from './GameSaving';

export default class GameSavingLoader {
  static async load() {
    const buffer = await read();
    const parsed = await json(buffer);
    return new GameSaving(JSON.parse(parsed));
  }
}