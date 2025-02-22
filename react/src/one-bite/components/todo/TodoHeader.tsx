import { t } from 'i18next';
import styles from './TodoHeader.module.scss';

export default function TodoHeader() {
    return (
        <div className={styles.todo_header}>
            <h3>{t(`hello`)} 🗓️</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
}
