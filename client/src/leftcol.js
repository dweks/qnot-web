import { useState, createRef, useRef } from "react";
import parseEntry from "./utilities/parse";
import std_dispatch from "./dispatch";
import Carg from "./classes/carg";
import Note from "./components/note";
import { List, Message, TYPE as T } from "./classes/output";

export function Interface() {
  const [entryInput, setEntry] = useState("");
  const currentMessage = useRef("");
  const currentListing = useRef(new List("DEFAULT", []));

  const inputRef = createRef();

  const process = async (event) => {
    if (event.key === "Enter") {
      const rawEntry = inputRef.current.value;
      try {
        if (rawEntry !== "") {
          const result = parseEntry(rawEntry);
          if (result instanceof Carg) {
            const output = await std_dispatch[result.c](result.a);

            if (output instanceof Message) {
              currentMessage.current = output;
            } else {
              currentMessage.current = new Message("", T.HIDE);
              currentListing.current = output;
            }
          }
        }
      } catch (e) {
        currentMessage.current = new Message(e.message, T.ERR);
      }
      setEntry(rawEntry);
      inputRef.current.value = "";
    }
  };

  return (
    <div id="iface">
      <div id="entry">
        <Prompt />
        <input
          ref={inputRef}
          id="entry"
          type="text"
          name="entry"
          onKeyDown={process}
        />
      </div>
      <LastEntry entry={entryInput} />
      <Messages message={currentMessage.current} />
      <Listing listing={currentListing.current} />
    </div>
  );
}

function Prompt() {
  return <label id="prompt">{"qnot>"}</label>;
}

function LastEntry(props) {
  return (
    <div id="last">
      <span id="last-title">Last entry:</span>
      <span id="last-entry">"{props.entry}"</span>
    </div>
  );
}

function Messages(props) {
  return (
    <div id={"messages"}>
      <p className={props.message.type}>{props.message.msg}</p>
    </div>
  );
}

export function Listing(props) {
  return (
    <div id="listing">
      {props.listing &&
        props.listing.notes.map((note) => (
          <Note
            key={note._id}
            title={note.title}
            body={note.body}
            tags={note.tags}
          />
        ))}
    </div>
  );
}
