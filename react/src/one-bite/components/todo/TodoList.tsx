import TodoItem from 'one-bite/components/todo/TodoItem';
import styles from './TodoList.module.scss';
import { TodoObject } from 'one-bite/components/todo/Todo.type';
import { ChangeEvent, useState } from 'react';

type Props = {
    todos: TodoObject[];
    onUpdate: (targetId: number) => void;
    onDelete: (targetId: number) => void;
};

export default function TodoList({ todos, onUpdate, onDelete }: Props) {
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

    const getAnalyzedData = () => {
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notDoneCOunt = totalCount - doneCount;

        return {
            totalCount,
            doneCount,
            notDoneCOunt,
        };
    };

    const { totalCount, doneCount, notDoneCOunt } = getAnalyzedData();

    return (
        <div className={styles.todo_list}>
            <h4>Todo List 🌱</h4>
            <div>
                <div>total : {totalCount}</div>
                <div>done : {doneCount}</div>
                <div>notDone : {notDoneCOunt}</div>
            </div>
            <input value={search} onChange={onChangeSearch} type='text' placeholder='검색어를 입력하세요' />

            <div className={styles.todos_wrapper}>
                {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
}
