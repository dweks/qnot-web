import { AnimatePresence, motion } from "framer-motion";
import { Note } from "./Note";
import selectAllImg from "../graphics/select-all.png";

export function LastEntry(props) {
  return (
    <div id="last">
      <span id="last-title">Last entry:</span>
      <span id="last-entry">{props.entry}</span>
    </div>
  );
}

export function Messages(props) {
  return (
    <motion.div
      key="messages"
      id="messages"
      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      exit={{
        height: 0,
        opacity: 0,
        overflow: "hidden",
        transition: { duration: 0.3 },
      }}
    >
      <p id={props.message.type}>{props.message.msg}</p>
    </motion.div>
  );
}

export function Listing(props) {
  return (
    <>
      <div id="list-header">
        <div
          id={`${
            props.listing.notes.length > 0 ? "select-all" : "noselect-all"
          }`}
          onClick={() => props.select(props.listing.notes)}
        >
          <img src={selectAllImg} alt="Select all listed notes" />
        </div>
        <h1>{props.listing.header}</h1>
      </div>
      <div id="listing">
        <AnimatePresence>
          {props.listing &&
            props.listing.notes.map((note, index) => (
              <Note
                key={note._id}
                num={index + 1}
                note={note}
                select={props.select}
                selection={props.selection}
                command={props.command}
              />
            ))}
        </AnimatePresence>
      </div>
    </>
  );
}
