import { ListObj, MessageObj, TYPE as T, ACTION as A } from "./classes/output";
import { parseAdd } from "./utilities/parse";

export const add = async (args) => {
  if (args === "" || args.length === 0 || args[0] === "") {
    return new MessageObj("Command `add` must take arguments.", T.ERR);
  }
  const note = parseAdd(args);
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
    return new MessageObj("Note added.", T.SUC, A.REFRESH);
  }
};

export const remove = async (notes) => {
  if (!notes.length) {
    return new MessageObj("Select notes before deleting.", T.ERR);
  }

  const response = await fetch(
    `/api/notes/delete?notes=${JSON.stringify(notes)}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    return new MessageObj("Notes deleted", T.SUC, A.DELETED, notes);
  } else {
    return new MessageObj("Notes NOT deleted", T.ERR);
  }
};

export const edit = () => {};
export const get = async (tags) => {
  if (!tags.length) {
    return new MessageObj("Provide tags to search for.", T.ERR);
  }
  const response = await fetch(`/api/notes/gather?tags=${tags}`);
  const json = await response.json();
  if (response.ok) {
    return new ListObj(`All notes with tags ${tags.join(", ")}:`, json);
  } else {
    return new MessageObj(`Nothing found for tags ${tags.join(", ")}.`, T.WARN);
  }
};
export const help = () => {};
export const list = () => {};

export const search = async (query) => {
  const response = await fetch(`/api/notes/search?qry=${query.join("%20")}`);
  const json = await response.json();
  if (response.ok && json.length !== 0) {
    return new ListObj("found notes", json);
  } else {
    return new MessageObj(`Nothing found for ${query.join(" ")}`, T.WARN);
  }
};

export const last = async (num) => {
  if (num === "" || num < 1) {
    num = 1;
  }
  const response = await fetch(`/api/notes/last?num=${num}`);
  const json = await response.json();
  if (response.ok && json.length !== 0) {
    let pluralMaybe = "modified note";
    if (json.length > 1) {
      pluralMaybe = num.toString() + " modified notes";
    }
    return new ListObj(`Last ${pluralMaybe}`, json);
  } else {
    return new MessageObj("Nothing found", T.WARN, A.NOLIST);
  }
};

export const stick = async ([id, sticky]) => {
  console.log("in command: ", id, sticky);
  const response = await fetch(
    `/api/notes?id=${id}&sticky=${JSON.stringify(!sticky)}`
  );
  const json = await response.json();
  console.log(json);
  if (response.ok && json.length !== 0) {
    console.log("GOOD");
    return new MessageObj("Note stuck", T.SUC, A.REFRESH);
  } else {
    console.log("BAD");
    return new MessageObj("Nothing found", T.WARN, A.NOLIST);
  }
};
