import { TodoObject } from 'one-bite/components/todo/Todo.type';
import TodoItem from 'one-bite/components/todo/TodoItem';
import { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TodoList.module.scss';

type Props = {
    todos: TodoObject[];
    onUpdate: (targetId: number) => void;
    onDelete: (targetId: number) => void;
};

export default function TodoList({ todos, onUpdate, onDelete }: Props) {
    const [search, setSearch] = useState('');

    const { t } = useTranslation();

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

    const { totalCount, doneCount, notDoneCOunt } = useMemo(() => {
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notDoneCOunt = totalCount - doneCount;

        return {
            totalCount,
            doneCount,
            notDoneCOunt,
        };
    }, [todos]);

    return (
        <div className={styles.todo_list}>
            <h4>{t('todo.list.title')} 🌱</h4>
            <div>
                <div>
                    {t('todo.list.total')} : {totalCount}
                </div>
                <div>
                    {t('todo.list.done')} : {doneCount}
                </div>
                <div>
                    {t('todo.list.notDone')} : {notDoneCOunt}
                </div>
            </div>
            <input value={search} onChange={onChangeSearch} type='text' placeholder={t('todo.list.placeholder')} />

            <div className={styles.todos_wrapper}>
                {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
}
