import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, createRef, useRef } from "react";
import { parseEntry } from "./utilities/parse";
import std_dispatch from "./dispatch";
import Carg from "./classes/carg";
import {
  ListObj,
  MessageObj,
  TYPE as T,
  ACTION as A,
  SelectionObj,
} from "./classes/output";
import { Messages, LastEntry, Listing } from "./center";
import { Selection, SelActions } from "./right";
import "./styles/App.css";

export function Main() {
  const [entry, setEntry] = useState("");
  const [selection, updateSelection] = useState(new SelectionObj());
  const [list, updateList] = useState(new ListObj("Nothing to list"));
  // const [sticky, updateSticky] = useState();

  const currentMessage = useRef("");
  const listCarg = useRef(new Carg());
  const inputRef = createRef();

  const renderCount = useRef(1);
  useEffect(() => {
    console.log("MAIN RENDER:", renderCount.current);
    renderCount.current += 1;
  });

  useEffect(() => {
    command("last", 5)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error:", err);
      })
      .finally(() => console.log("done"));
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
          select(output.supp);
          break;
        case A.NOLIST:
          updateList(new ListObj("Nothing to list", []));
          break;
        default:
          console.log("ACTION: DEFAULT", output.msg);
      }
    } else {
      currentMessage.current = new MessageObj("", T.HIDE);
      listCarg.current = new Carg(cmd, arg);
      updateList(output);
    }
  };

  return (
    <div id="main">
      <Left />
      <div id="center">
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
        <AnimatePresence>
          {currentMessage.current.type !== T.HIDE && (
            <Messages message={currentMessage.current} />
          )}
        </AnimatePresence>
        <Listing
          listing={list}
          select={select}
          selection={selection}
          command={command}
        />
      </div>
      <AnimatePresence>
        {!selection.empty() && (
          <Right
            command={command}
            select={select}
            selection={selection}
            clear={updateSelection}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Left(props) {
  return <div id="left">left</div>;
}

function Right(props) {
  return (
    <motion.div
      id="right"
      key="messages"
      initial={{ x: -300, opacity: 0, overflow: "hidden" }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      exit={{
        x: -300,
        opacity: 0,
        overflow: "hidden",
        transition: { duration: 0.3 },
      }}
    >
      <SelActions
        key="selactions"
        command={props.command}
        clear={props.clear}
        selection={props.selection}
      />
      <Selection
        key="selection"
        select={props.select}
        selection={props.selection}
      />
    </motion.div>
  );
}

export default Main;
