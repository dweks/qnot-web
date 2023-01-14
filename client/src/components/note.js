const Note = (props) => {
  return (
    <div className="note">
      <div className="note-num">{props.num}</div>
      <div className="note-content">
        {props.title && <p className="note-title">{props.title}</p>}
        <p className="note-body">{props.body}</p>
        {props.tags && <p className="note-tags">{props.tags}</p>}
      </div>
    </div>
  );
};

export default Note;
