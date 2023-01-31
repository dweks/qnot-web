import * as cmd from "./commands";

const std_dispatch = {
  a: cmd.add,
  add: cmd.add,
  f: cmd.edit,
  full: cmd.edit,
  g: cmd.get,
  get: cmd.get,
  h: cmd.help,
  help: cmd.help,
  ls: cmd.list,
  list: cmd.list,
  l: cmd.last,
  last: cmd.last,
  s: cmd.search,
  search: cmd.search,
  del: cmd.remove,
  delete: cmd.remove,
  stick: cmd.stick,
  clr: cmd.clear,
  clear: cmd.clear,
  sel: cmd.select,
  select: cmd.select,
};

export default std_dispatch;
