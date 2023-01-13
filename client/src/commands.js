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
export const get = async () => {
  const response = await fetch("/api/notes");
  const json = await response.json();
  if (response.ok) {
    return new List("found notes", json);
  } else {
    return new Message("Nothing")
  }
};
export const help = () => {};
export const list = () => {};
export const last = () => {};

export const search = async (query) => {
  const response = await fetch(`/api/notes/search?qry=${query.join("%20")}`);
  const json = await response.json();
  if (response.ok) {
    return new List("found notes", json);
  } else {
    return new Message("Nothing")
  }
};
