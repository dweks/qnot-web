// Libraries
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, createRef, useRef } from "react";

// Utilities
import qnotLogo from "./graphics/qnot-logo.png";
import "./styles/App.css";
import { parseEntry } from "./utilities/parse";
import std_dispatch from "./utilities/dispatch";

// Data Structures
import Carg from "./classes/carg";
import SelectionObj from "./classes/selectionObject";
import { ListObj, MessageObj, TYPE as T, ACTION as A } from "./classes/output";

// Components
import Menu from "./components/Menu";
import { Messages, List } from "./components/Main";
import { Selection } from "./components/Selection";

export function App() {
  const [entry, setEntry] = useState("");
  const [selection, updateSelection] = useState(new SelectionObj());
  const [list, updateList] = useState(new ListObj("Nothing to list"));
  // const [sticky, updateSticky] = useState();

  const currentMessage = useRef("");
  const listCarg = useRef(new Carg());
  const inputRef = createRef();
  const renderCount = useRef(1);

  useEffect(() => {
    // console.log("MAIN RENDER:", renderCount.current);
    renderCount.current += 1;
  });

  useEffect(() => {
    command("last", 5);
  }, []);

  const processEntry = async (event) => {
    if (event.key === "Enter") {
      const rawEntry = inputRef.current.value;
      try {
        if (rawEntry !== "") {
          const result = parseEntry(rawEntry);
          if (result instanceof Carg) {
            await command(result.c, result.a);
          }
        }
      } catch (e) {
        currentMessage.current = new MessageObj(e.message, T.ERR);
      }
      setEntry(rawEntry);
      inputRef.current.value = "";
    }
  };

  const select = (notes) => {
    selection.add(notes);
    updateSelection(new SelectionObj(selection.notes));
  };

  const command = async (cmd, arg = "") => {
    const output = await std_dispatch[cmd](arg);

    if (output instanceof MessageObj) {
      currentMessage.current = output;
      switch (output.action) {
        case A.REFRESH:
          await command(listCarg.current.c, listCarg.current.a);
          break;
        case A.DELETED:
          await command(listCarg.current.c, listCarg.current.a);
          selection.removeById(output.supp);
          break;
        case A.NOLIST:
          updateList(new ListObj("Nothing to list", []));
          break;
        case A.CLEARSEL:
          updateSelection(new SelectionObj());
          break;
        default:
          console.log("ACTION: DEFAULT:", output.msg);
      }
    } else {
      listCarg.current = new Carg(cmd, arg);
      updateList(output);
    }
  };

  return (
    <div id="main">
      <Menu />
      <div id="center">
        <div id="head">
          <img src={qnotLogo} alt="qnot logo" />
          <AnimatePresence>
            {currentMessage.current.type !== T.HIDE && (
              <Messages message={currentMessage.current} />
            )}
          </AnimatePresence>
        </div>
        <div id="entry">
          <div id="prompt" className="anm2">
            <span id="prompt-char">{">"}</span>
            <input
              ref={inputRef}
              className="anm2"
              id="inp"
              type="text"
              name="entry"
              onKeyDown={processEntry}
              autoFocus={true}
            />
          </div>
        </div>
        {/* <LastEntry entry={entry} /> */}
        <List
          listing={list}
          select={select}
          selection={selection}
          command={command}
        />
      </div>
      <AnimatePresence>
        {!selection.empty() && (
          <Selection command={command} select={select} selection={selection} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
