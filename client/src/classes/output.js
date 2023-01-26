export const TYPE = {
  SUC: "suc", // green
  ERR: "err", // red
  WARN: "warn", // yellow
  INFO: "info", // blue
  NONE: "none",
};

export const ACTION = {
  REFRESH: "refresh",
  DELETED: "deleted",
  HIDE: "hide",
  NOLIST: "nolist",
  CLEARSEL: "clearsel",
  NONE: "none",
};

export class Output {
  constructor(msg, type) {
    this.msg = msg;
    this.type = type;
  }
}

export class MessageObj extends Output {
  constructor(
    msg,
    type = TYPE.NONE,
    action = ACTION.NONE,
    supplemental = undefined
  ) {
    super(msg, type);
    this.action = action;
    this.supp = supplemental;
  }
}

export class ListObj extends Output {
  constructor(header, notes = [], msg = " ", type = "lst") {
    super(msg, type);
    this.header = header;
    this.notes = notes;
  }
}
