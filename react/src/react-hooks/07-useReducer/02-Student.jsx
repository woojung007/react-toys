const Student = ({ name, dispatch, id, isHere, ACTION_TYPES }) => {
  return (
    <div>
      <span
        style={{
          textDecoration: isHere ? "line-through" : "none",
          color: isHere ? "gray" : "black",
          cursor: "pointer",
        }}
        onClick={() => {
          dispatch({ type: ACTION_TYPES.mark, payload: { id } });
        }}
      >
        {name}
      </span>
      <button
        onClick={() => {
          dispatch({ type: ACTION_TYPES.delete, payload: { id } });
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Student;
