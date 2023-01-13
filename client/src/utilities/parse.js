import std_dispatch from "../dispatch";
import Carg from "../classes/carg";

const BARETAG = /[a-zA-Z0-9]+/;
const REGTAG = /\b#/ + BARETAG + /\b/;

function parseEntry(rawEntry) {
  let cmdMaybe = ""
  let argsMaybe = ""
  if (rawEntry.search(" ") > -1) {
    [cmdMaybe, ...argsMaybe] = rawEntry.split(" ");
  } else {
    cmdMaybe = rawEntry;
  }
  if (!std_dispatch.hasOwnProperty(cmdMaybe)) {
    throw new Error("Invalid entry");
  } else {
    return new Carg(cmdMaybe, argsMaybe);
  }

  if (rawEntry.search(/\|/) !== -1) {
    var parts = rawEntry.split("|")[0];
    var title = parts[0];
    var args = parts[2];
  } else {
    title = "";
  }
}

export default parseEntry;
