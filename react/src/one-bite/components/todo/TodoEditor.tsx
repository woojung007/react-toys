import styles from './TodoEditor.module.scss'

export default function TodoEditor() {
    return (
        <div className={styles.todo_editor}>
            <input type='text' placeholder='새로운 Todo...' />
            <button>추가</button>
        </div>
    );
}
