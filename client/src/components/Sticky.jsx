import { SmallNote } from "./Note";
import { AnimatePresence, motion } from "framer-motion";

export function Sticky(props) {
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
    ></motion.div>
  );
}

function StickyList(props) {
  return (
    <div id="selection-list">
      <h1 id="sel-title">{props.selection.header()}</h1>
      <AnimatePresence>
        {props.selection.notes.map((note) => (
          <SmallNote key={note._id} note={note} select={props.select} />
        ))}
      </AnimatePresence>
    </div>
  );
}
