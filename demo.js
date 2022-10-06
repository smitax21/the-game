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

function startGame() {
  currentRoom = LivingRoom;
  displayRoomInfo(currentRoom);
}

function displayRoomInfo(room) {
  document.getElementById("description").innerHTML = room._desc;
  //   document.getElementById("userText").focus();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    command = document.getElementById("userText").value;
    const directions = ["east", "west", "north", "south"];
    if (directions.includes(command.toLowerCase())) {
      currentRoom = currentRoom.move(command);
      displayRoomInfo(currentRoom);
    } else {
      document.getElementById("userText").value = "";
      alert("that is not a valid command, Please try again");
    }
  }
});

const LivingRoom = new Room("Living room", "It has a spooky sofa");
const Kitchen = new Room("Kitchen", "The kitchen has a foul smell");
const DiningRoom = new Room(
  "Dining room",
  "All the chairs are broken and there are mouses running around"
);
const BedRoom = new Room(
  "Bedroom",
  "It has a bed and the walls are ruined badly with blood stains"
);
const Balcony = new Room(
  "Balcony",
  "The glass door is broken and it has written 'I am coming for you'"
);

LivingRoom.linkRooms("east", Kitchen);
Kitchen.linkRooms("west", LivingRoom);
Kitchen.linkRooms("east", DiningRoom);
DiningRoom.linkRooms("west", Kitchen);

// console.log(DiningRoom.move("west"));
// console.log(Kitchen.move("east"));

startGame();
