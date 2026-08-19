const Character = require('./domain.js');

class Game {
  start() {
    console.log('game started');
  }
}

class GameSavingData {
  // логика сохранения
}

function readGameSaving() {
  // чтение сохранения
}

function writeGameSaving() {
  // запись сохранения
}

module.exports = {
  Game,
  GameSavingData,
  readGameSaving,
  writeGameSaving
};