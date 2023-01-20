class Carg {
  constructor(cmd = null, args = null) {
    this.c = cmd;
    this.a = args;
  }

  isDel() {
    return this.c && (this.c === "del" || this.c === "delete");
  }

  isEmpty() {
    return this.c === null;
  }

  numArgs() {
    return this.a ? this.a.length : 0;
  }
}

export default Carg;
