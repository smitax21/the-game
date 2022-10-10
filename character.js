class Character {
  constructor(name) {
    this._name = name;
    this._linkCharacter = {};
  }

  linkCharacter(char, linkToChar) {
    this._linkCharacter[char] = linkToChar;
  }
}

// super class for characters to behave
class Behaviour extends Character {
  constructor(name, behave, speak) {
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

function actionChar(action) {
  document.getElementById("description").innerHTML = action._linkCharacter;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    command = document.getElementById("userText").value;
    const actions = ["sit", "greet", "eat", "handshake", "fight", "pick"];
    if (actions.includes(command.toLowerCase())) {
      currentRoom = currentRoom.move(command);
      displayRoomInfo(currentRoom);
    } else {
      document.getElementById("userText").value = "";
      alert("that is not a valid command, Please try again");
    }
  }
});

// ---------------Creating the behaviour class------------------
class Behaviour {
  constructor(name, actions) {
    this._name = name;
    this._action = actions;
    this._linkActions;
  }

  actionNeeded(action, linkToAction) {
    this._actionLink[action] = linkToAction;
  }

  reaction(action) {
    if (action in this._actionLink) {
      return this._actionLink[action];
    } else {
      alert("Not a good action");
    }
  }
}
