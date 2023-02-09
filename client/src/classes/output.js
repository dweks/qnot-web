export const PERPAGE = 6;
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
    this.count = notes.length;
    this.pages = Math.ceil(this.count / PERPAGE);
    this.currPage = 1;
    this.view = this.setView();
  }

  prevPage() {
    if (this.currPage === 1) {
      return -1;
    }
    this.currPage -= 1;
    this.view = this.setView();
  }

  nextPage() {
    if (this.currPage === this.pages) {
      return -1;
    }
    this.currPage += 1;
    this.view = this.setView();
  }

  setView() {
    return this.notes.slice(
      (this.currPage - 1) * PERPAGE,
      Math.min(this.currPage * PERPAGE, this.count)
    );
  }
}
