import { SmallNote } from "./components/note";
import { AnimatePresence } from "framer-motion";

export function Selection(props) {
  return (
    <div id="selection">
      <p id="sel-title">Selected Notes</p>
      {props.selection.notes.map((note) => (
        <AnimatePresence key={note._id}>
          <SmallNote key={note._id} note={note} select={props.select} />
        </AnimatePresence>
      ))}
    </div>
  );
}

export function SelActions(props) {
  return (
    <div id="btn-area">
      <input
        id="btn-del"
        className="anm2"
        type="button"
        value="DELETE"
        onClick={() => props.command("del", props.selection.getIds())}
      />
      <input
        id="btn-clear"
        className="anm2"
        type="button"
        value="CLEAR"
        onClick={() => props.clear([])}
      />
    </div>
  );
}
