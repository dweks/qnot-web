import std_dispatch from "../dispatch";

class Carg {
  constructor(cmd = null, args = null) {
    this.c = cmd;
    this.a = args;
  }

  isAdm() {
    return this.c && std_dispatch[this.c] !== undefined ? true : false;
  }

  isEmpty() {
    return this.c === null;
  }

  numArgs() {
    return this.a ? this.a.length : 0;
  }
}

export default Carg;