import { TodoObject } from 'one-bite/components/todo/Todo.type';
import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TodoItem.module.scss';
import { TodoContext } from 'one-bite/components/todo/Todo';

type Props = {
    todo: TodoObject;
};

function TodoItem({ todo }: Props) {
    const data = useContext(TodoContext);

    const { t } = useTranslation();

    return (
        <div className={styles.todo_item}>
            <input
                onChange={() => {
                    data?.onUpdate(todo.id);
                }}
                readOnly
                checked={todo.isDone}
                className={styles.item_checkbox}
                type='checkbox'
            />
            <div className={styles.content}>{todo.content}</div>
            <div className={styles.date}>{new Date(todo.date).toDateString()}</div>
            <button
                onClick={() => {
                    data?.onDelete(todo.id);
                }}
            >
                {t('todo.list.delete')}
            </button>
        </div>
    );
}

// 고차 컴포넌트 (HOC)
// export default memo(TodoItem, (prevProps, nextProps) => {
//     // True -> Props 바뀌지 않음 -> 리렌더링 X
//     // False -> Props 바뀜 -> 리렌더링 O
//     if (prevProps.todo.id !== nextProps.todo.id) return false;
//     if (prevProps.todo.isDone !== nextProps.todo.isDone) return false;
//     if (prevProps.todo.content !== nextProps.todo.content) return false;
//     if (prevProps.todo.date !== nextProps.todo.date) return false;

//     return true;
// });
export default memo(TodoItem);
