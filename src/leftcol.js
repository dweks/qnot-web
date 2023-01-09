import { useState, createRef } from "react";

export function Interface() {
  const [entryString, processEntry] = useState("");
  const input = createRef();

  const process = (event) => {
    if (event.key === "Enter") {
      processEntry(event.target.value);
      input.current.value = ""
    }

  };

  return (
    <div id="iface">
      <div id="entry">
        <Prompt />
        <input
          ref={input}
          id="entry"
          type="text"
          name="entry"
          onKeyDown={process}
        />
      </div>
      <LastEntry entry={entryString} />
      <Messages entry={entryString} />
      <Listing entry={entryString} />
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
  return <div id="messages">{props.entry}</div>;
}

function Listing(props) {
  return (
    <div id="listing">
      <h1>{props.entry}</h1>
    </div>
  );
}
