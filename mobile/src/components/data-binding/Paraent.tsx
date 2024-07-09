import { ChangeEvent, useState } from "react";
import TodoList from "./Child";

interface Todo {
  id: number;
  text: string;
}

function TodoApp() {
  // 상태 관리
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // 입력 필드의 변경을 감지하여 inputValue 상태를 업데이트
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // 입력된 값을 todos 리스트에 추가
  const onClickAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue("");
    }
  };

  // 선택된 항목을 todos 리스트에서 삭제
  const onClickDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <h1>Todo App</h1>
      <div className="flex items-center gap-2">
        <input
          className="px-2 border h-9"
          type="text"
          value={inputValue}
          onChange={onChangeInput}
          placeholder="Enter a todo"
        />
        <button className="px-2 h-9" onClick={onClickAddTodo}>
          Add Todo
        </button>
      </div>

      <TodoList todos={todos} onClickDeleteTodo={onClickDeleteTodo} />
    </div>
  );
}

export default TodoApp;
