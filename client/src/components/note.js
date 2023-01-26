import { motion } from "framer-motion";
import deleteNoteImg from "../graphics/delete-note.png";

export const Note = (props) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      exit={{
        height: 0,
        opacity: 0,
        overflow: "hidden",
        transition: { duration: 0.3 },
      }}
      className="note"
    >
      <div className="note-num anm2" onClick={() => props.select(props.note)}>
        {props.num}
      </div>
      <div
        className={`note-content anm2 ${props.note.sticky ? "sticky " : ""}${
          props.selection.has(props.note) ? "selected" : ""
        }`}
        tabIndex={props.num}
      >
        {props.note.title && <p className="note-title">{props.note.title}</p>}
        <p className="note-body">{props.note.body}</p>
        <div className="note-tag-area">
          {props.note.tags && (
            <span className="note-tags anm2">{props.note.tags}</span>
          )}
        </div>
      </div>
      <div className="note-actions anm2">
        <div
          className="note-action note-del anm2"
          onClick={() => props.command("delete", [props.note._id])}
        >
          <img src={deleteNoteImg} alt="Delete this note" />
        </div>
        <div
          className="note-action note-stick"
          onClick={() =>
            props.command("stick", [props.note._id, props.note.sticky])
          }
        >
          s
        </div>
      </div>
    </motion.div>
  );
};

export const SmallNote = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      exit={{
        opacity: 0,
        height: 0,
        overflow: "hidden",
        transition: { ease: "easeOut", duration: 0.1 },
      }}
      className="sm-note anm2"
      onClick={() => props.select(props.note)}
    >
      {props.note.title && <p className="sm-note-title">{props.note.title}</p>}
      <p className="sm-note-body">{props.note.body}</p>
    </motion.div>
  );
};
