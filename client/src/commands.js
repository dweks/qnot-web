import { List, Message, TYPE as T } from "./classes/output";

export const add = async (args) => {
  if (args === "") {
    return new Message("Command `add` must take arguments.", T.ERR);
  }
  const note = {
    title: "title",
    body: args.join(" "),
    tags: "tags",
  };
  const response = await fetch("/api/notes", {
    method: "POST",
    body: JSON.stringify(note),
    headers: {
      "Content-type": "application/json",
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error);
  } else {
    return new Message("Note added.", T.SUC);
  }
};

export const remove = () => {};
export const edit = () => {};
export const get = async (tags) => {
  const response = await fetch(`/api/notes/gather?tags=${tags}`);
  const json = await response.json();
  if (response.ok) {
    return new List("found notes", json);
  } else {
    return new Message("Nothing")
  }
};
export const help = () => {};
export const list = () => {};

export const search = async (query) => {
  const response = await fetch(`/api/notes/search?qry=${query.join("%20")}`);
  const json = await response.json();
  if (response.ok && json.length !== 0) {
    return new List("found notes", json);
  } else {
    return new Message(`Nothing found for ${query.join(" ")}`, T.WARN)
  }
};

export const last = async (num) => {
  if (num === "" || num < 1) {
    num = 1;
  }
  const response = await fetch(`/api/notes/last?num=${num}`);
  const json = await response.json();
  if (response.ok && json.length !== 0) {
    let pluralMaybe = "modified note"
    if (json.length > 1) {
      pluralMaybe = num.toString() + " modified notes"
    }
    return new List(`Last ${pluralMaybe}`, json);
  } else {
    return new Message("Nothing", T.WARN)
  }

};
