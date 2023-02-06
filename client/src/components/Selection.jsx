import { SmallNote } from "./Note";
import { AnimatePresence, motion } from "framer-motion";

export function Selection(props) {
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
      className="anm2"
    >
      <SelectionActions command={props.command} selection={props.selection} />
      <SelectionList select={props.select} selection={props.selection} />
    </motion.div>
  );
}

function SelectionActions(props) {
  return (
    <div id="btn-area">
      <ClearSelected size={props.selection.size} command={props.command} />
      <DeleteSelected selection={props.selection} command={props.command} />
      <ExportSelected />
    </div>
  );
}

function SelectionList(props) {
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

const DeleteSelected = (props) => {
  return (
    <input
      id="btn-del"
      className="sel-btn anm2"
      type="button"
      value="DELETE"
      onClick={() => props.command("delete", [props.selection.getIds()])}
    />
  );
};

const ClearSelected = (props) => {
  return (
    <input
      id="btn-clear"
      className="sel-btn anm2"
      type="button"
      value="CLEAR"
      onClick={() => props.command("clear")}
    />
  );
};

const ExportSelected = (props) => {
  return (
    <input
      id="btn-export"
      className="sel-btn anm2"
      type="button"
      value="EXPORT"
    />
  );
};
