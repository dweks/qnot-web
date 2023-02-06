class SelectionObj {
  constructor(notes = []) {
    this.notes = notes;
    this.size = this.notes.length;
  }

  header() {
    const sMaybe = this.size > 1 ? "s" : "";
    return `${this.size} note${sMaybe} selected`;
  }

  has(note) {
    return this.notes.some((n) => note._id === n._id);
  }

  toggle(note) {
    const found = this.notes.find((n) => n._id === note._id);
    if (found) {
      this.notes.splice(this.notes.indexOf(found), 1);
    } else {
      this.notes.push(note);
    }
  }

  add(notes) {
    if (notes instanceof Array) {
      notes.forEach((n) => {
        if (!this.has(n)) {
          this.notes.push(n);
        }
      });
    } else {
      this.toggle(notes);
    }
  }

  removeById(noteId) {
    if (!noteId || !noteId.length) {
      return;
    }
    noteId.forEach((id) => {
      const found = this.notes.find((n) => n._id === id);
      if (found) {
        this.notes.splice(this.notes.indexOf(found), 1);
      }
    });
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
    if (this.notes.length) {
      return this.notes.map((n) => n._id);
    } else {
      return this.notes;
    }
  }
}
export default SelectionObj;
