import std_dispatch from "../dispatch";
import Carg from "../classes/carg";

const BARETAG = /[a-zA-Z0-9]+/;
const REGTAG = /\b#/ + BARETAG + /\b/;

export function parseEntry(rawEntry) {
  let cmdMaybe = "";
  let argsMaybe = "";
  if (rawEntry.search(" ") > -1) {
    [cmdMaybe, ...argsMaybe] = rawEntry.split(" ");
  } else {
    cmdMaybe = rawEntry;
  }
  if (!std_dispatch.hasOwnProperty(cmdMaybe)) {
    throw new Error(`Invalid entry: ${rawEntry}`);
  } else {
    return new Carg(cmdMaybe, argsMaybe);
  }
}

export function parseAdd(rawArgs) {
  const joinArgs = rawArgs.join(" ");
  let title = "";
  let body = joinArgs;
  const tags = "notags";
  if (joinArgs.search(/\|\|/) !== -1) {
    const parts = joinArgs.split("||");
    title = parts[0];
    body = parts[1];
  }
  return { title, body, tags };
}
