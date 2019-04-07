const util = require('util');

class Board {
  constructor() {
    this.init();
  }

  init() {
    this.empty = ''

    this.boardState = {
      'study': this.empty,
      'hall-1': this.empty,
      'library': this.empty,
      'hall-2': this.empty,
      'conservatory': this.empty,
      'hall-3': this.empty,
      'hall-4': this.empty,
      'hall-5': this.empty,
      'hall': this.empty,
      'hall-6': this.empty,
      'billiard-room': this.empty,
      'hall-7': this.empty,
      'ball-room': this.empty,
      'hall-8': this.empty,
      'hall-9': this.empty,
      'hall-10': this.empty,
      'lounge': this.empty,
      'hall-11': this.empty,
      'dining-room': this.empty,
      'hall-12': this.empty,
      'kitchen': this.empty
    }
  }

  printBoard() {
    util.log(this.boardState);
  }

  movePlayer(piece, location) {
      const oldLocation = Object.keys(this.boardState).find(key => object[key] === value);
      this.boardState[oldLocation] = this.empty;
      this.boardState[location] = piece;
      this.printBoard();
  }

  addPieceToStartingLocation(piece, startingLocation) {
    this.boardState[startingLocation] = piece;
  }

  getStartingLocationForPiece(name) {
    return this.startingLocationMap[name];
  }
}

module.exports = Board;