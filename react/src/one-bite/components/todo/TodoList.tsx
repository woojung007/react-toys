import { TodoContext } from 'one-bite/components/todo/Todo';
import TodoItem from 'one-bite/components/todo/TodoItem';
import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TodoList.module.scss';

export default function TodoList() {
    const data = useContext(TodoContext);
    const [search, setSearch] = useState('');

    const { t } = useTranslation();

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const getFilteredData = () => {
        if (search === '') {
            return data?.todos;
        }
        return data?.todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
    };

    const filteredTodos = getFilteredData();

    const { totalCount, doneCount, notDoneCOunt } = useMemo(() => {
        const totalCount = data?.todos.length ?? 0;
        const doneCount = data?.todos.filter((todo) => todo.isDone).length ?? 0;
        const notDoneCOunt = totalCount - doneCount;

        return {
            totalCount,
            doneCount,
            notDoneCOunt,
        };
    }, [data?.todos]);

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
                {filteredTodos?.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
}
