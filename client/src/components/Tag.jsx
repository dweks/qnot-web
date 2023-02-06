const Tag = (props) => {
  return (
    <span
      className="note-tags anm2"
      onClick={() => props.command("get", [props.tag])}
    >
      {props.tag}
    </span>
  );
};

export default Tag;
