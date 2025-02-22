import { TodoObject } from 'one-bite/components/todo/Todo.type';
import { useTranslation } from 'react-i18next';
import styles from './TodoItem.module.scss';

type Props = {
    todo: TodoObject;
    onUpdate: (targetId: number) => void;
    onDelete: (targetId: number) => void;
};
export default function TodoItem({ todo, onUpdate, onDelete }: Props) {
    const { t } = useTranslation();

    return (
        <div className={styles.todo_item}>
            <input
                onChange={() => {
                    onUpdate(todo.id);
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
                    onDelete(todo.id);
                }}
            >
                {t('todo.list.delete')}
            </button>
        </div>
    );
}
