// class for creating room
class Rooms {
  constructor(name, desc) {
    this._name = name;
    this._desc = desc;
    this._linkedCharacter = "";
    this._linkedRooms = {};
    this._linkedPuzzle = {};
  }

  linkRooms(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("Oouch!!! I bumped myself to the wall. Wrong direction");
      return this;
    }
  }

  linkCharacter(character) {
    this._linkedCharacter = character;
  }

  linkPuzzle(puzzle) {
    this._linkedPuzzle = puzzle;
  }
}

// Instantiating the new room
const FrontYard = new Rooms(
  "Front door",
  "To Knock the doore please type 'knock'"
);

const OpenDoor = new Rooms("open door", "To enter the house type 'front'");
const LivingRoom = new Rooms(
  "Living room",
  "It has big couch where big families can sit together. Ahh Nice sofa.To go to the dining and the kitchen type 'front', and to go back type 'back'"
);

const Kitchen = new Rooms(
  "Kitchen",
  "The host family is cooking food for us. All of them are preparing food.Right side leads to the bedroom and back side will lead to the dining room."
);

const DiningRoom = new Rooms(
  "Dining room",
  "Very spacious Dinning area with plants in the center.front side is Kitchen and Back side was Living room."
);

const BedRoom = new Rooms(
  "Bedroom",
  "The orange pillow in the bedroom is the centre of attraction. You can enjoy balcony if you go to the front and backward room was kitchen."
);

const StudyRoom = new Rooms(
  "Study room",
  "The studyroom has a desk and chair to work and study in a quite place. To go the the theater room type 'front'."
);

const TheaterRoom = new Rooms(
  "Theater room",
  "Movie nights happens here. To go to the Living room again 'right'"
);

const Balcony = new Rooms(
  "Balcony",
  "It has the perfect view from here and a small sofa to rest and drink."
);

// ---------------------class character------------------------------
class Character {
  constructor(name, knock, conversation, sit, eat) {
    this._name = name;
    this._knock = knock;
    this._conversation = conversation;
    this._sit = sit;
    this._eat = eat;
    this._actionLink = {};
  }
}

// Instantiating characters
const Guest = new Character("William", "Knocks", "Knock Knock");
const BabyBoy = new Character("Mike", "jump", "We have a guest uncle");
const BabyGirl = new Character("Milli", "happy", "Hello");
const Wife = new Character("Paige", "Greet", "Nice to see you.");
const Husband = new Character("Charles", "handshake", "Super Good to see you");

// --------------Creating the Puzzle class----------------------------
class Question {
  constructor(text, ans) {
    this._text = text;
    this._ans = ans;
    this._questionLink = {};
  }
}

// Instantiate question
const question1 = new Question("Name the animal in the living room");
question1._ans = "horse";

// Linking the rooms with other rooms
FrontYard.linkRooms("knock", OpenDoor);
OpenDoor.linkRooms("front", LivingRoom);
LivingRoom.linkRooms("back", FrontYard);
LivingRoom.linkRooms("front", DiningRoom);
DiningRoom.linkRooms("back", LivingRoom);
DiningRoom.linkRooms("front", Kitchen);
Kitchen.linkRooms("back", DiningRoom);
Kitchen.linkRooms("right", BedRoom);
BedRoom.linkRooms("left", Kitchen);
BedRoom.linkRooms("right", Balcony);
Balcony.linkRooms("left", BedRoom);
BedRoom.linkRooms("front", StudyRoom);
StudyRoom.linkRooms("back", BedRoom);
StudyRoom.linkRooms("front", TheaterRoom);
TheaterRoom.linkRooms("back", StudyRoom);
TheaterRoom.linkRooms("right", LivingRoom);

// link with characters
FrontYard.linkCharacter(Guest);
OpenDoor.linkCharacter(Husband);
LivingRoom.linkCharacter(BabyBoy);
DiningRoom.linkCharacter(Guest);
Kitchen.linkCharacter(Wife);
BedRoom.linkCharacter(Husband);
Balcony.linkCharacter(Guest);
StudyRoom.linkCharacter(Guest);
TheaterRoom.linkCharacter(Guest);

// Link with Puzzles
LivingRoom.linkPuzzle(question1);

// -------------Starting the game-----------------------
function startGame() {
  currentRoom = FrontYard;
  displayRoomInfo(currentRoom);
  displayPuzzle(currentRoom);
}

function displayRoomInfo(room) {
  document.getElementById("description").innerHTML =
    room._name + " : " + room._desc;
  document.getElementById("userText").value = "";
  document.getElementById("conversation").innerHTML =
    room._linkedCharacter._name + " : " + room._linkedCharacter._conversation;
}

function displayPuzzle(puzzle, answer) {
  let questionBox = document.getElementById("puzzle");
  let answerBox = document.getElementById("answer");
  if (currentRoom != LivingRoom) {
    questionBox.classList.add("hide");
    answerBox.classList.add("hide");
  } else {
    questionBox.classList.remove("hide");
    answerBox.classList.remove("hide");
    questionBox.innerHTML = puzzle._linkedPuzzle._text;
    console.log((questionBox.innerHTML = puzzle._linkedPuzzle._text));

    if (answerBox.value === question1._ans) {
      return "well done";
    } else {
      return "try again";
    }
  }
}

// applying keydown function
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    command = document.getElementById("userText").value;
    answer = document.getElementById("answer").value;
    const directions = ["right", "left", "front", "back"];
    const actions = [
      "knock",
      "sit",
      "greet",
      "eat",
      "handshake",
      "fight",
      "pick",
    ];

    // to change the direction
    if (
      directions.includes(command.toLowerCase()) ||
      actions.includes(command.toLowerCase())
    ) {
      currentRoom = currentRoom.move(command);
      displayRoomInfo(currentRoom);
      displayPuzzle(currentRoom);

      // setting up the images
      const img = document.querySelector("img");
      if (currentRoom == FrontYard) {
        img.src = "./img/door.jpg";
      } else if (currentRoom == OpenDoor) {
        img.src = "./img/greeting.jpg";
      } else if (currentRoom == LivingRoom) {
        img.src = "./img/living.webp";
      } else if (currentRoom == DiningRoom) {
        img.src = "./img/dining.png";
      } else if (currentRoom == Kitchen) {
        img.src = "./img/kitchen.jpg";
      } else if (currentRoom == StudyRoom) {
        img.src = "./img/study.jpg";
      } else if (currentRoom == TheaterRoom) {
        img.src = "./img/theater.jpg";
      } else if (currentRoom == BedRoom) {
        img.src = "./img/bed.jpg";
      } else if (currentRoom == Balcony) {
        img.src = "./img/balcony.jpg";
      } else {
        img.src = "./img/door.jpg";
      }
      document.body.appendChild(img);
    } else {
      document.getElementById("userText").value = " ";
      alert("that is not a valid command, Please try again");
    }
  }
});

startGame();
