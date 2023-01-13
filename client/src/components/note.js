const Note = (props) => {
  return (
    <div className="note">
      {props.title && <p className="note-title">{props.title}</p>}
      {props.body && <p className="note-body">{props.body}</p>}
      {props.tags && <p className="note-tags">{props.tags}</p>}
    </div>
  );
};

export default Note;
