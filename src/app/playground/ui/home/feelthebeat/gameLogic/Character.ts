export interface CharacterInterface {
  moveUp: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  idle: () => void;
  lose: () => void;
  win: () => void;
}

class Character {
  character: CharacterInterface;

  constructor(chacter: CharacterInterface) {
    this.character = chacter;
  }
}

export default Character;
