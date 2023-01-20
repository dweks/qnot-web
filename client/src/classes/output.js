export const TYPE = {
  SUC: "suc", // green
  ERR: "err", // red
  WARN: "warn", // yellow
  INFO: "info", // blue
};

export const ACTION = {
  REFRESH: "refresh",
  DELETED: "deleted",
  HIDE: "hide",
  NOLIST: "nolist",
  NONE: "none",
};

export class Output {
  constructor(msg, type) {
    this.msg = msg;
    this.type = type;
  }
}

export class MessageObj extends Output {
  constructor(msg, type, action = ACTION.NONE, supplemental = undefined) {
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

export class SelectionObj {
  constructor(notes = []) {
    this.notes = notes;
  }

  has(note) {
    return this.notes.some((n) => note._id === n._id);
  }

  addToggle(note) {
    const found = this.notes.find((n) => n._id === note._id);
    if (found) {
      this.notes.splice(this.notes.indexOf(found), 1);
    } else {
      this.notes.push(note);
    }
  }

  add(newNotes) {
    if (newNotes instanceof Array) {
      newNotes.forEach((n) => {
        if (!this.has(n)) {
          this.notes.push(n);
        }
      });
    } else {
      this.addToggle(newNotes);
    }
  }

  clear() {
    this.notes = [];
  }

  empty() {
    return this.notes.length < 1;
  }

  refresh() {
    this.notes = this.notes.slice(0, this.notes.length);
  }

  getIds() {
    return this.notes.from((n) => n._id);
  }
}
