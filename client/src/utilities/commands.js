import { ListObj, MessageObj, TYPE as T, ACTION as A } from "../classes/output";
import { parseAdd } from "./parse";

// Add notes

export const add = async (rawNote) => {
  if (rawNote === "" || rawNote.length === 0 || rawNote[0] === "") {
    return new MessageObj("Command `add` must take arguments.", T.ERR);
  }
  const parsedNote = parseAdd(rawNote);

  const tagsExistResponse = await fetch(
    `/api/notes/tags?tags=${JSON.stringify(parsedNote.tags)}`
  );
  // tags Ids that already exist in DB
  const tagsExistJson = await tagsExistResponse.json();

  if (tagsExistResponse.ok) {
    const tagResponse = await fetch("/api/notes/tags", {
      method: "POST",
      body: JSON.stringify(parsedNote.tags),
      headers: {
        "Content-type": "application/json",
      },
    });
    const tagJson = await tagResponse.json();

    if (tagsExistJson.length || tagJson.length) {
      parsedNote.tags = [].concat(
        Array.from(tagsExistJson, (tag) => {
          return tag._id;
        }).concat(
          Array.from(tagJson, (tag) => {
            return tag._id;
          })
        )
      );
    }
  }

  const noteResponse = await fetch("/api/notes", {
    method: "POST",
    body: JSON.stringify(parsedNote),
    headers: {
      "Content-type": "application/json",
    },
  });
  const noteJson = await noteResponse.json();

  if (!noteResponse.ok) {
    throw new Error(noteJson.error);
  } else {
    return new MessageObj(`Note added: "${parsedNote.body}"`, T.SUC, A.REFRESH);
  }
};

// Remove selected notes

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

// Edit one note
export const edit = () => {};

// Get notes by tag

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

// Help
export const help = () => {};

// List certain items

export const list = () => {};

// Search in both title and note body for keyword

export const search = async (query) => {
  const response = await fetch(`/api/notes/search?qry=${query.join("%20")}`);
  const json = await response.json();
  if (response.ok && json.length !== 0) {
    return new ListObj("found notes", json);
  } else {
    return new MessageObj(`Nothing found for ${query.join(" ")}`, T.WARN);
  }
};

// List most recent n notes

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

// Make note sticky/unsticky

export const stick = async ([id, sticky]) => {
  const response = await fetch(`/api/notes/sticky/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json-patch+json",
    },
  });
  if (response.ok) {
    return new MessageObj("", T.NONE, A.REFRESH);
  } else {
    return new MessageObj("", T.NONE, A.NONE);
  }
};

// Clear selection

export const clear = async () => {
  return new MessageObj("Selection cleared", T.SUC, A.CLEARSEL);
};

// Select specific notes

export const select = async (notes) => {
  if (notes.length === 0) {
    return new MessageObj("Nothing selected", T.WARN);
  } else {
    return new MessageObj("", T.INFO, A.SELECT, notes);
  }
};