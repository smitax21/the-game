class Object {
  constructor(name, desc) {
    this._name = name;
    this._desc = desc;
    this._linkObject = {};
  }

  linkObject(does, objectToLink) {
    this._linkObject[does] = objectToLink;
  }
}

const Plates = new Object("Plate", "Lets eat!!!");

export { Plates };
