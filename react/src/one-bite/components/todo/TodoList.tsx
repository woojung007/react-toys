import TodoItem from 'one-bite/components/todo/TodoItem';
import styles from './TodoList.module.scss';
import { TodoObject } from 'one-bite/components/todo/Todo.type';
import { ChangeEvent, useState } from 'react';

type Props = {
    todos: TodoObject[];
};

export default function TodoList({ todos }: Props) {
    const [search, setSearch] = useState('');

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const getFilteredData = () => {
        if (search === '') {
            return todos;
        }
        return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
    };

    const filteredTodos = getFilteredData();
    return (
        <div className={styles.todo_list}>
            <h4>Todo List 🌱</h4>
            <input value={search} onChange={onChangeSearch} type='text' placeholder='검색어를 입력하세요' />

            <div className={styles.todos_wrapper}>
                {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
}
