class Character {
  constructor(name) {
    this._name = name;
    this._linkCharacter = {};
  }

  linkCharacter(char, linkToChar) {
    this._linkCharacter[char] = linkToChar;
  }

  knockDoor(char) {}
}

// super class for characters to behave
class Behaviour extends Character {
  constructor(behave, speak) {
    super(name);
    this._behave = behave;

    this._linkBehaviour = {};
  }

  linkBehaviour(doing, linkDoing) {
    this._linkBehaviour[doing] = linkDoing;
  }
}

const William = new Character("William");
const Sarah = new Character("Sarah");
const Mike = new Character("Mike");
const Milli = new Character("Milli");
const Paige = new Character("Paige");
const Charles = new Character("Charles");

export { William, Sarah, Mike, Milli, Paige, Charles };
