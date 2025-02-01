import styles from './TodoItem.module.scss';

export default function TodoItem() {
    return (
        <div className={styles.todo_item}>
            <input className={styles.item_checkbox} type='checkbox' />
            <div className={styles.content}>Todo...</div>
            <div className={styles.date}>Date</div>
            <button>삭제</button>
        </div>
    );
}
