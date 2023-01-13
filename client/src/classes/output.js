export const TYPE = {
  SUC: "suc", // green
  ERR: "err", // red
  WARN: "warn", // yellow
  INFO: "info", // blue
  REFRESH: "refresh", // not for styling
  HIDE: "hide", 
};

export class Output {
  constructor(type) {
    this.type = type;
  }
}

export class Message extends Output {
  constructor(msg, type, action) {
    super(type);
    this.msg = msg;
    this.type = type;
    this.action = action;
  }
}

export class List extends Output {
  constructor(header, notes, type = "lst") {
    super(type);
    this.header = header;
    this.notes = notes;
  }
}
