import { TodoObject } from 'one-bite/components/todo/Todo.type';
import styles from './TodoItem.module.scss';

type Props = {
    todo: TodoObject;
};
export default function TodoItem({ todo }: Props) {
    return (
        <div className={styles.todo_item}>
            <input readOnly checked={todo.isDone} className={styles.item_checkbox} type='checkbox' />
            <div className={styles.content}>{todo.content}</div>
            <div className={styles.date}>{new Date(todo.date).toDateString()}</div>
            <button>삭제</button>
        </div>
    );
}
