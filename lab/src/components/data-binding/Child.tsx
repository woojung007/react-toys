import React from "react";

interface Todo {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Todo[];
  onClickDeleteTodo: (id: number) => void;
}

function TodoList({ todos, onClickDeleteTodo }: TodoListProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2>Todo List</h2>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button
              className="px-2 h-9"
              onClick={() => onClickDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
