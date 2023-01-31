export const TYPE = {
  SUC: "suc",
  ERR: "err",
  WARN: "warn",
  INFO: "info",
  NONE: "none",
  LIST: "list",
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
    msg = "",
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
  constructor(header, notes = [], msg = "", type = TYPE.LIST) {
    super(msg, type);
    this.header = header;
    this.notes = notes;
    // console.log("ListObj:", notes);
  }
}
