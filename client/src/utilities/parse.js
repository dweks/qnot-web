import std_dispatch from "./dispatch";
import Carg from "../classes/carg";

const REGTAG = new RegExp(/\B#[a-zA-Z][a-zA-Z0-9]+(\s|$)/, "g");

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
  let tags = ["untagged"];

  if (joinArgs.search(/::/) !== -1) {
    const parts = joinArgs.split(/::(.*)/s);
    title = parts[0];
    body = parts.slice(1).join(" ");
  }

  const foundTags = [];
  if (title !== "") {
    foundTags.push(...parseTags(title));
    title = title.replace(REGTAG, "");
  }

  foundTags.push(...parseTags(body));
  body = body.replace(REGTAG, "");

  if (body === "") {
    throw new Error("Note body is empty!");
  }

  if (foundTags.length) {
    tags = foundTags;
  }

  return { title, body, tags };
}

export function parseTags(string) {
  let tags = [];
  [...string.matchAll(REGTAG)].forEach((arr) => {
    arr.forEach((tag) => {
      if (tag !== "" && tag !== " ") {
        tags.push(tag.replace("#", "").replace(",", "").trim());
      }
    });
  });
  return tags;
}
