import { SmallNote } from "./components/note";
import { AnimatePresence } from "framer-motion";
import { SelectionObj } from "./classes/output";

export function SelActions(props) {
  return (
    <div id="btn-area">
      <ClearSelected clear={props.clear} />
      <DeleteSelected selection={props.selection} command={props.command} />
      <ExportSelected />
    </div>
  );
}

export function Selection(props) {
  return (
    <div id="selection">
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
      onClick={() => props.command("del", props.selection.getIds())}
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
      onClick={() => props.clear(new SelectionObj())}
    />
  );
};

const ExportSelected = (props) => {
  return (
    <input
      id="btn-clear"
      className="sel-btn anm2"
      type="button"
      value="EXPORT"
    />
  );
};
