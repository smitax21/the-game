class Room {
  constructor(name, desc, img) {
    this._name = name;
    this._desc = desc;
    this._img = img;
    this._linkedRooms = {};
  }

  linkRooms(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You are going wrong way");
      return this;
    }
  }
}

// Instantiating the new rooms
const FrontYard = new Room("Front door", "KNOCK!!! KNOCK!!!");
const LivingRoom = new Room(
  "Living room",
  "It has big couch where big families can sit together."
);

const Kitchen = new Room("Kitchen", "The host family is cooking food for us.");

const DiningRoom = new Room(
  "Dining room",
  "Very spacious Dinning area with plants in the center."
);

const BedRoom = new Room(
  "Bedroom",
  "The orange pillow in the bedroom is the centre of attraction."
);

const StudyRoom = new Room(
  "Study room",
  "The studyroom has a desk and chair to work and study in a quite place."
);

const TheaterRoom = new Room("Theater room", "Movie nights happens here");

const Balcony = new Room(
  "Balcony",
  "It has the perfect view from here and a small sofa to rest and drink."
);

// Linking the rooms with other rooms
FrontYard.linkRooms("north", LivingRoom);
LivingRoom.linkRooms("south", FrontYard);
LivingRoom.linkRooms("north", DiningRoom);
DiningRoom.linkRooms("south", LivingRoom);
DiningRoom.linkRooms("north", Kitchen);
Kitchen.linkRooms("south", DiningRoom);
Kitchen.linkRooms("east", BedRoom);
BedRoom.linkRooms("west", Kitchen);
BedRoom.linkRooms("east", Balcony);
Balcony.linkRooms("west", BedRoom);
BedRoom.linkRooms("north", StudyRoom);
StudyRoom.linkRooms("south", BedRoom);
StudyRoom.linkRooms("north", TheaterRoom);
TheaterRoom.linkRooms("south", StudyRoom);
TheaterRoom.linkRooms("east", LivingRoom);

function startGame() {
  currentRoom = FrontYard;
  displayRoomInfo(currentRoom);
}

function displayRoomInfo(room) {
  document.getElementById("description").innerHTML = room._desc;
  document.getElementById("userText").focus();
}

// applying keydown function
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    command = document.getElementById("userText").value;
    const directions = ["east", "west", "north", "south"];
    if (directions.includes(command.toLowerCase())) {
      currentRoom = currentRoom.move(command);
      displayRoomInfo(currentRoom);

      // setting up the images
      const img = document.querySelector("img");
      if (currentRoom == FrontYard) {
        img.src = "./img/door.jpg";
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
      document.getElementById("userText").value = "";
      alert("that is not a valid command, Please try again");
    }
  }
});

// console.log(DiningRoom.move("west"));
// console.log(Kitchen.move("east"));
// console.log(Kitchen._linkedRooms);
// console.log(Kitchen.move("east"));

startGame();
