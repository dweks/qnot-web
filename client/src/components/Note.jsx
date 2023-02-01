import { motion } from "framer-motion";
import Tag from "./Tag";
import deleteNoteImg from "../graphics/delete-note.png";
import pinNoteImg from "../graphics/pin-note.png";

export const Note = (props) => {
  function classIfSelected(classText) {
    return props.selection.has(props.note) ? classText : "";
  }

  function classIfSticky(classText) {
    return props.note.sticky ? classText : "";
  }

  function toggleSelect() {
    props.select(props.note);
  }

  function togglePin() {
    props.command("stick", [props.note._id, props.note.sticky]);
  }

  function deleteNote() {
    props.command("delete", [props.note._id]);
  }

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
      <NoteNumber
        num={props.num}
        selectedClass={classIfSelected}
        select={toggleSelect}
      />
      <NoteContent
        note={props.note}
        selectedClass={classIfSelected}
        stickyClass={classIfSticky}
      />
      <NoteActions delete={deleteNote} pin={togglePin} />
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
      {props.note.title && <NoteTitle title={props.note.title} />}
      <NoteBody body={props.note.body} />
    </motion.div>
  );
};

const NoteNumber = (props) => {
  return (
    <div
      className={`note-num anm2 ${props.selectedClass("selected-num")}`}
      onClick={() => props.select()}
    >
      {props.num}
    </div>
  );
};

const NoteContent = (props) => {
  return (
    <div
      className={`note-content anm2 ${
        props.stickyClass("sticky ") + props.selectedClass("selected")
      }`}
    >
      {props.note.title && <NoteTitle title={props.note.title} />}
      <NoteBody body={props.note.body} />
      <NoteTags tags={props.note.tags} id={props.note._id} />
    </div>
  );
};

const NoteTitle = (props) => {
  return <h1 className="note-title">{props.title}</h1>;
};

const NoteBody = (props) => {
  return <p className="note-body">{props.body}</p>;
};

const NoteTags = (props) => {
  return (
    <div className="note-tag-area">
      {props.tags.sort().map((tag) => {
        return <Tag key={props.id + tag._id} tag={tag.tag} />;
      })}
    </div>
  );
};

const NoteActions = (props) => {
  return (
    <div className="note-actions anm2">
      <NoteActionSticky pin={props.pin} />
      <NoteActionDelete delete={props.delete} />
    </div>
  );
};

const NoteActionDelete = (props) => {
  return (
    <div
      className="note-action note-act-del anm1"
      onClick={() => props.delete()}
    >
      <img className="anm2" src={deleteNoteImg} alt="Delete this note" />
    </div>
  );
};

const NoteActionSticky = (props) => {
  return (
    <div
      className="note-action note-act-stick anm1"
      onClick={() => props.pin()}
    >
      <img className="anm2" src={pinNoteImg} alt="Pin this note" />
    </div>
  );
};