import TodoEditor from 'one-bite/components/todo/TodoEditor';
import TodoHeader from 'one-bite/components/todo/TodoHeader';
import TodoList from 'one-bite/components/todo/TodoList';
import styles from './Todo.module.scss';

export default function Todo() {
    return (
        <div className={styles.todo_app}>
            <TodoHeader />
            <TodoEditor />
            <TodoList />
        </div>
    );
}
