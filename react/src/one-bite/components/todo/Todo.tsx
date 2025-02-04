import TodoEditor from 'one-bite/components/todo/TodoEditor';
import TodoHeader from 'one-bite/components/todo/TodoHeader';
import TodoList from 'one-bite/components/todo/TodoList';
import styles from './Todo.module.scss';
import { useRef, useState } from 'react';

const mockData = [
    {
        id: 0,
        isDone: false,
        content: 'React 공부하기',
        date: new Date().getTime(),
    },
    {
        id: 1,
        isDone: false,
        content: '빨래하기',
        date: new Date().getTime(),
    },
    {
        id: 2,
        isDone: false,
        content: '노래 연습하기',
        date: new Date().getTime(),
    },
];

export default function Todo() {
    const [todos, setTodos] = useState(mockData);
    const idRef = useRef(3);

    const onCreate = (content: string) => {
        const newTodo = {
            id: idRef.current++,
            isDone: false,
            content,
            date: new Date().getTime(),
        };

        setTodos((prev) => [newTodo, ...prev]);
    };
    return (
        <div className={styles.todo_app}>
            <TodoHeader />
            <TodoEditor onCreate={onCreate} />
            <TodoList />
        </div>
    );
}
