import TodoItem from 'one-bite/components/todo/TodoItem';
import styles from './TodoList.module.scss';

export default function TodoList() {
    return (
        <div className={styles.todo_list}>
            <h4>Todo List 🌱</h4>
            <input type='text' placeholder='검색어를 입력하세요' />

            <div className={styles.todos_wrapper}>
                <TodoItem />
                <TodoItem />
                <TodoItem />
            </div>
        </div>
    );
}
