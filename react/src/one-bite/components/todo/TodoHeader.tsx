import { useTranslation } from 'react-i18next';
import styles from './TodoHeader.module.scss';

export default function TodoHeader() {
    const { t } = useTranslation();

    return (
        <div className={styles.todo_header}>
            <h3>{t(`todo.header.today`)} 🗓️</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
}
