import { useReducer, useState } from "react";
import Student from "./02-Student";

const ACTION_TYPES = {
  add: "add",
  delete: "delete",
  mark: "mark",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.add:
      const name = action.payload.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };

    case ACTION_TYPES.delete:
      return {
        count: state.count - 1,
        students: state.students.filter(
          (student) => student.id !== action.payload.id
        ),
      };

    case ACTION_TYPES.mark:
      return {
        count: state.count,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            return { ...student, isHere: !student.isHere };
          }
          return student;
        }),
      };
    default:
      return state;
  }
};

const initialState = {
  count: 0,
  students: [],
};

export default function AttendancePage() {
  const [name, setName] = useState("");
  const [studentInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>출석부</h1>
      <p>총 학생 수 : {studentInfo.count}</p>
      <input
        type="text"
        placeholder="이름을 입력해주세요."
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch({ type: ACTION_TYPES.add, payload: { name } });
          setName("");
        }}
      >
        추가
      </button>
      {studentInfo.students.map((student) => (
        <Student
          name={student.name}
          key={student.id}
          dispatch={dispatch}
          id={student.id}
          isHere={student.isHere}
          ACTION_TYPES={ACTION_TYPES}
        />
      ))}
    </div>
  );
}
